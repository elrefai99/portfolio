export type BlogBlock =
  | {
    type: 'paragraph'
    text: string
  }
  | {
    type: 'heading'
    text: string
  }
  | {
    type: 'list'
    items: string[]
  }
  | {
    type: 'code'
    language: string
    filename?: string
    code: string
  }

/**
 * A named entity the post is about, with authoritative URLs (Wikipedia, spec,
 * official docs). Feeds BlogPosting `about`/`mentions` in JSON-LD so search
 * and AI engines can disambiguate the topic (entity SEO).
 */
export type BlogEntity = {
  name: string
  sameAs: string | string[]
}

export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  metaTitle?: string
  metaDescription?: string
  date: string
  updated?: string
  readTime: string
  tags: string[]
  /** Primary topics first — the first three become schema `about`, the rest `mentions`. */
  entities?: BlogEntity[]
  /** Slugs of related posts — rendered as "Related notes" internal links on the post page. */
  relatedSlugs?: string[]
  blocks: BlogBlock[]
  ogImage?: string
}

export const blogs: BlogPost[] = [
  {
    id: 5,
    slug: 'aws-ec2-s3-kubernetes-production-deployments',
    ogImage: '/og/blog-aws-ec2-s3-kubernetes-production-deployments.png',
    title: 'From One EC2 Box to Kubernetes: How SRVJ Actually Deploys on AWS',
    excerpt:
      'How SRVJ\'s deployment grew up in three acts — a single EC2 box with NGINX and pm2, Docker Compose, and finally a Kubernetes cluster with kustomize, an NGINX ingress, and an HPA. Plus the S3 patterns that outlived every stage.',
    metaTitle: 'AWS EC2, S3 & Kubernetes: SRVJ\'s Deployment Journey',
    metaDescription:
      'How SRVJ\'s Node.js deployment evolved from one EC2 box with NGINX and pm2 to Docker Compose and Kubernetes — plus S3 avatars and presigned uploads.',
    category: 'Cloud & DevOps',
    date: '2026-07-09',
    updated: '2026-07-10',
    readTime: '13 min read',
    tags: ['AWS', 'EC2', 'S3', 'EKS', 'Kubernetes', 'Docker', 'NGINX', 'CI/CD', 'Node.js', 'DevOps'],
    entities: [
      { name: 'Amazon Web Services', sameAs: ['https://en.wikipedia.org/wiki/Amazon_Web_Services', 'https://aws.amazon.com'] },
      { name: 'Amazon EC2', sameAs: 'https://en.wikipedia.org/wiki/Amazon_Elastic_Compute_Cloud' },
      { name: 'Kubernetes', sameAs: ['https://en.wikipedia.org/wiki/Kubernetes', 'https://kubernetes.io'] },
      { name: 'Amazon S3', sameAs: 'https://en.wikipedia.org/wiki/Amazon_S3' },
      { name: 'Docker', sameAs: 'https://en.wikipedia.org/wiki/Docker_(software)' },
      { name: 'NGINX', sameAs: 'https://en.wikipedia.org/wiki/Nginx' },
    ],
    relatedSlugs: ['crdts-yjs-collaborative-editing-srvj', 'server-sent-events-real-time-notifications-srvj'],
    blocks: [
      {
        type: 'paragraph',
        text: 'SRVJ — the [collaborative diagram tool](/projects/srvj) I keep writing about — runs on AWS, but it didn\'t start on Kubernetes, and it shouldn\'t have. This post is its deployment story in three acts: a single EC2 box with NGINX and pm2, then Docker Compose, then a Kubernetes cluster — plus the S3 patterns that survived every stage untouched.',
      },
      {
        type: 'paragraph',
        text: 'I\'m writing it this way because most AWS content starts at the end. You get the EKS tutorial with the Terraform modules and the service mesh, and nobody tells you that a $10 EC2 instance with a well-configured NGINX serves real production traffic just fine — or when, exactly, it stops being fine.',
      },
      {
        type: 'heading',
        text: 'Act one: a box, NGINX, and pm2',
      },
      {
        type: 'paragraph',
        text: 'SRVJ\'s backend started life the way most Node.js backends do: one EC2 instance, Route 53 pointing at its Elastic IP, NGINX terminating TLS and reverse-proxying to the app, and pm2 keeping the process alive. It\'s unfashionable and it works.',
      },
      {
        type: 'code',
        language: 'nginx',
        filename: 'srvj.conf',
        code:
          'upstream srvj_backend {\n' +
          '    server srvj-app:60459;\n' +
          '    keepalive 32;\n' +
          '}\n\n' +
          'limit_req_zone $binary_remote_addr zone=api_limit:10m  rate=30r/s;\n' +
          'limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=5r/m;\n\n' +
          'server {\n' +
          '    listen 443 ssl http2;\n' +
          '    server_name api.srvj.com;\n' +
          '    # (TLS, security headers, and Host/X-Forwarded-* lines omitted for brevity)\n\n' +
          '    # ── API routes ─────────────────────────────────\n' +
          '    location /api/ {\n' +
          '        limit_req zone=api_limit burst=50 nodelay;\n' +
          '        proxy_pass http://srvj_backend;\n' +
          '        proxy_http_version 1.1;\n' +
          '        proxy_set_header Connection "";\n' +
          '        proxy_buffering off;\n' +
          '    }\n\n' +
          '    # ── Auth routes (stricter: 5 req/min) ──────────\n' +
          '    location /api/v1/auth/ {\n' +
          '        limit_req zone=auth_limit burst=3 nodelay;\n' +
          '        proxy_pass http://srvj_backend;\n' +
          '        proxy_http_version 1.1;\n' +
          '        proxy_set_header Connection "";\n' +
          '    }\n\n' +
          '    # ── SSE notifications (long-lived, unbuffered) ─\n' +
          '    location /api/v1/notifications/stream {\n' +
          '        proxy_pass http://srvj_backend;\n' +
          '        proxy_http_version 1.1;\n' +
          '        proxy_set_header Connection "";\n' +
          '        proxy_buffering off;\n' +
          '        proxy_cache off;\n' +
          '        proxy_request_buffering off;\n' +
          '        chunked_transfer_encoding off;\n' +
          '        proxy_read_timeout 86400s;\n' +
          '        proxy_send_timeout 86400s;\n' +
          '    }\n\n' +
          '    # ── WebSockets (collab) ────────────────────────\n' +
          '    location /socket.io/ {\n' +
          '        proxy_pass http://srvj_backend;\n' +
          '        proxy_http_version 1.1;\n' +
          '        proxy_set_header Upgrade $http_upgrade;\n' +
          '        proxy_set_header Connection "upgrade";\n' +
          '        proxy_read_timeout 86400s;\n' +
          '        proxy_send_timeout 86400s;\n' +
          '    }\n\n' +
          '    # ── Metrics (internal only) ────────────────────\n' +
          '    location /metrics {\n' +
          '        deny all;\n' +
          '        return 403;\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'Every non-obvious line here came from a real incident, not a template. The auth routes get their own rate-limit zone — five requests a minute, not thirty a second — so credential stuffing dies at the proxy without Node spending a single cycle on it. The empty Connection "" header is the easiest one to miss: it pairs with keepalive 32 in the upstream block, and without it NGINX silently opens and closes a fresh upstream connection per request, throwing the keepalive pool away.',
      },
      {
        type: 'paragraph',
        text: 'The SSE location is the paranoid one, and every line earns its place: proxy_buffering, proxy_cache, and proxy_request_buffering all off, chunked_transfer_encoding off, and day-long read/send timeouts so NGINX doesn\'t kill a quiet stream at its 60-second default. With buffering on, NGINX holds your carefully streamed events hostage until its buffer fills, and "real-time" notifications arrive in batches. The WebSocket location needs the opposite treatment — the Upgrade/Connection pair, without which the collab handshake dies at the proxy. And /metrics is a flat deny: Prometheus scrapes from inside the network, the internet gets a 403.',
      },
      {
        type: 'paragraph',
        text: 'pm2 runs the app in cluster mode — one worker per vCPU behind a shared port:',
      },
      {
        type: 'code',
        language: 'js',
        filename: 'ecosystem.config.js',
        code:
          'module.exports = {\n' +
          '  apps: [{\n' +
          '    name: \'api\',\n' +
          '    script: \'./dist/server.js\',\n' +
          '    instances: \'max\',\n' +
          '    exec_mode: \'cluster\',\n' +
          '    max_memory_restart: \'512M\',\n' +
          '    env_production: { NODE_ENV: \'production\' },\n' +
          '  }],\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'Cluster mode has a trap that\'s especially vicious for SRVJ: workers don\'t share memory. The SSE connection registry fragments across workers — solvable with Redis Pub/Sub, which the notification pipeline needed anyway. The Yjs collab rooms are the harder case: a room is an in-memory Y.Doc, and two clients on the same diagram must reach the same process. On the single box that meant keeping the collab-bearing app in one process and scaling vertically — an early taste of exactly the problem act three is about.',
      },
      {
        type: 'paragraph',
        text: 'What finally hurt wasn\'t performance. It was that the box itself was the deployment artifact. Deploys were SSH-and-pull. The Node version, the system packages, the NGINX config — all hand-applied state that existed nowhere in git. Every month the server drifted a little further from anything I could reproduce, and rollback meant remembering what I\'d changed.',
      },
      {
        type: 'heading',
        text: 'Act two: same box, but Docker',
      },
      {
        type: 'paragraph',
        text: 'The fix for drift is making the artifact immutable. GitHub Actions builds a Docker image on every push to main, tags it with the commit SHA, and pushes it to ECR. The EC2 box pulls and restarts. Same hardware, completely different operational story:',
      },
      {
        type: 'list',
        items: [
          'The image is the whole runtime — Node version, native deps, everything. "Works on my machine" stops being a sentence anyone says.',
          'Rollback is re-tagging: pull the previous SHA, restart. Under a minute, no archaeology.',
          'The box degrades into a dumb Docker host. Nothing on it is precious anymore — I could rebuild it from a short user-data script.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In SRVJ\'s case the compose file is three containers on a private bridge network: the app, Redis with append-only persistence, and NGINX with the act-one config mounted read-only. That\'s also when the upstream stopped being 127.0.0.1:3000 and became a Docker service name — the srvj-app:60459 you saw in the config above.',
      },
      {
        type: 'paragraph',
        text: 'This stage is criminally underrated. Docker-on-EC2 has none of Kubernetes\' complexity and buys you 80% of its reproducibility. If SRVJ had stayed a single well-understood process with vertical headroom left on the instance, this is where the story would end — and for most backends, it should.',
      },
      {
        type: 'heading',
        text: 'The S3 pattern that never changed: presigned uploads',
      },
      {
        type: 'paragraph',
        text: 'While the compute story kept evolving, file uploads landed on a pattern in week one that has survived every migration since: clients upload directly to S3 with presigned URLs, and the backend never proxies a user\'s file bytes.',
      },
      {
        type: 'paragraph',
        text: 'The naive version — multipart POST to the API, which streams to S3 — makes your API instance a file proxy. SRVJ\'s uploads are avatars and images dropped onto the canvas; routing those through Express means tying up workers, memory, and bandwidth on traffic that S3 could have absorbed directly. The presigned flow inverts it: the client asks the API for permission, gets a short-lived URL, and does the heavy lifting itself.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'upload.service.ts',
        code:
          'import { S3Client, PutObjectCommand } from \'@aws-sdk/client-s3\'\n' +
          'import { getSignedUrl } from \'@aws-sdk/s3-request-presigner\'\n' +
          'import crypto from \'crypto\'\n\n' +
          'const s3 = new S3Client({ region: process.env.AWS_REGION })\n\n' +
          'export async function createUploadUrl(userId: string, contentType: string) {\n' +
          '  if (!ALLOWED_TYPES.has(contentType)) throw new Error(\'Unsupported type\')\n\n' +
          '  const key = `uploads/${userId}/${crypto.randomUUID()}`\n' +
          '  const url = await getSignedUrl(\n' +
          '    s3,\n' +
          '    new PutObjectCommand({\n' +
          '      Bucket: process.env.S3_BUCKET!,\n' +
          '      Key: key,\n' +
          '      ContentType: contentType,\n' +
          '    }),\n' +
          '    { expiresIn: 300 }, // 5 minutes — permission, not possession\n' +
          '  )\n' +
          '  return { url, key }\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'Three details matter more than the happy path. The key is server-generated — clients never choose where they write, which closes the overwrite-someone-else\'s-file hole. The content type is validated and baked into the signature, so the URL can\'t be reused for a different payload. And the URL expires in minutes, because it\'s a permission slip, not a possession.',
      },
      {
        type: 'paragraph',
        text: 'Reads go through CloudFront, not S3 directly. The bucket is private; CloudFront gets access through Origin Access Control, and every image URL the API returns is a CDN URL. Users in Cairo hit a nearby edge instead of the bucket\'s region, S3 GET costs drop to near nothing on hot objects, and the bucket itself has no public surface at all.',
      },
      {
        type: 'heading',
        text: 'The other S3 path: avatars born on the server',
      },
      {
        type: 'paragraph',
        text: 'Not every object in the bucket arrives through a presigned URL, though. When a new account registers, SRVJ generates the user\'s default avatar on the backend — a colored tile with their initials, rendered with sharp and pushed straight to S3:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'avatar.service.ts',
        code:
          'export const avatarProfile = async (firstName: string, lastName: string, id: string) => {\n' +
          '  const backgroundColor = getRandomColor(colorArray) // 12-color brand palette\n' +
          '  const textColor = getTextColor(backgroundColor)\n' +
          '  let initials = buildInitials(firstName, lastName)\n\n' +
          '  // Arabic initials get spacing — two joined glyphs read as a word, not initials\n' +
          '  if (await detectScript(`${firstName} ${lastName}`) === \'Arabic\')\n' +
          '    initials = initials.split(\'\').join(\' \')\n\n' +
          '  const imageBuffer = await sharp({\n' +
          '    create: { width: 450, height: 450, channels: 4, background: backgroundColor },\n' +
          '  })\n' +
          '    .composite([{\n' +
          '      input: Buffer.from(`\n' +
          '        <svg width="450" height="450">\n' +
          '          <text x="50%" y="60%" font-size="150" font-family="Arial"\n' +
          '                text-anchor="middle" fill="${textColor}">${initials}</text>\n' +
          '        </svg>`),\n' +
          '      top: 0, left: 0,\n' +
          '    }])\n' +
          '    .png()\n' +
          '    .toBuffer()\n\n' +
          '  const d = new Date()\n' +
          '  const key = `cdn/user/${d.getFullYear()}/${d.getMonth() + 1}/${id}.png`\n\n' +
          '  await s3Client.send(new PutObjectCommand({\n' +
          '    Bucket: process.env.AWS_S3_BUCKET!,\n' +
          '    Key: key,\n' +
          '    Body: imageBuffer,\n' +
          '    ContentType: \'image/png\',\n' +
          '  }))\n\n' +
          '  return `${process.env.CDN_CLOUD_URL}${key}` // CloudFront URL, never raw S3\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'The part I\'m fondest of is the text color. Instead of hardcoding white-on-anything, the background\'s perceived brightness is computed with the classic YIQ weights — red, green, and blue don\'t contribute equally to how bright a color looks — and the initials flip to dark slate on light tiles:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'avatar.service.ts',
        code:
          'function getTextColor(backgroundColor: string) {\n' +
          '  const hex = backgroundColor.replace(\'#\', \'\')\n' +
          '  const red = parseInt(hex.slice(0, 2), 16)\n' +
          '  const green = parseInt(hex.slice(2, 4), 16)\n' +
          '  const blue = parseInt(hex.slice(4, 6), 16)\n' +
          '  const brightness = (red * 299 + green * 587 + blue * 114) / 1000\n' +
          '  return brightness > 160 ? \'#1F2937\' : \'#F8FAFC\'\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'A few details that matter beyond the pixels. Names in Egypt are Arabic as often as English, so the script detection walks the name\'s Unicode code points (the 0x0600–0x06FF block and friends) rather than assuming Latin initials. The object key is partitioned by year and month — cdn/user/2026/7/… — which keeps prefixes browsable and makes lifecycle rules trivial later. And the function returns the CloudFront URL, not the S3 one, so the private-bucket rule from the previous section holds even for objects the server created itself.',
      },
      {
        type: 'paragraph',
        text: 'It\'s also the counterpoint to the presigned pattern, and the rule that reconciles them: whoever owns the bytes talks to S3. A user\'s photo upload is theirs — presigned URL, direct to bucket. A generated avatar is the server\'s — PutObjectCommand from the process that made it. Both end up behind the same CDN.',
      },
      {
        type: 'heading',
        text: 'Act three: SRVJ\'s shape and the case for Kubernetes',
      },
      {
        type: 'paragraph',
        text: 'SRVJ broke the single-box model for a boring, structural reason: it isn\'t one process. The same image runs twice with different entrypoints — API pods serving REST, SSE streams, and the Yjs collab WebSockets (node dist/src/app.js), and a BullMQ worker draining the notification queue (node dist/src/MessageQueue/index.js). They deploy together but scale apart: a burst of collab sessions needs API capacity, a notification storm needs worker throughput, and on one box all of it shares one blast radius and one scaling knob.',
      },
      {
        type: 'paragraph',
        text: 'This is the actual Kubernetes threshold, in my experience. Not traffic. Shape. The moment your system is several processes with different scaling profiles and you\'re hand-writing systemd units or docker-compose overrides to fake orchestration, you\'re implementing a worse Kubernetes on your own time.',
      },
      {
        type: 'code',
        language: 'mermaid',
        filename: 'srvj-aws.mmd',
        code:
          'flowchart LR\n' +
          '    U[Client] --> R53[Route 53]\n' +
          '    R53 --> CF[CloudFront]\n' +
          '    CF -->|images, static| S3[(Private S3 bucket)]\n' +
          '    CF -->|api + collab| ING[NGINX Ingress]\n' +
          '    ING --> API[API pods, HPA 2-8]\n' +
          '    API --> PG[(PostgreSQL)]\n' +
          '    API --> M[(MongoDB)]\n' +
          '    API --> RD[(Redis StatefulSet)]\n' +
          '    W[BullMQ worker] --> RD\n' +
          '    W --> PG\n' +
          '    U -.presigned PUT.-> S3',
      },
      {
        type: 'paragraph',
        text: 'A confession before the YAML: SRVJ\'s cluster today is self-managed on EC2, not EKS — kustomize-applied manifests, an NGINX ingress controller, local-path storage. Running it myself is exactly how I learned what EKS\'s control-plane fee actually buys: etcd care, control-plane upgrades, certificate rotation — the parts of Kubernetes you least want to own at 3 AM. The manifests are portable either way; moving to EKS changes who runs the control plane, not what the app looks like.',
      },
      {
        type: 'paragraph',
        text: 'The API deployment is where the operational lessons from acts one and two turned into configuration:',
      },
      {
        type: 'code',
        language: 'yaml',
        filename: 'k8s/api/deployment.yaml',
        code:
          'apiVersion: apps/v1\n' +
          'kind: Deployment\n' +
          'metadata:\n' +
          '  name: srvj-api\n' +
          '  namespace: srvj\n' +
          'spec:\n' +
          '  replicas: 2\n' +
          '  strategy:\n' +
          '    rollingUpdate:\n' +
          '      maxUnavailable: 0   # never dip below capacity mid-deploy\n' +
          '      maxSurge: 1\n' +
          '  template:\n' +
          '    spec:\n' +
          '      terminationGracePeriodSeconds: 30\n' +
          '      securityContext:\n' +
          '        runAsNonRoot: true\n' +
          '      containers:\n' +
          '        - name: srvj-api\n' +
          '          image: srvj-backend:latest\n' +
          '          command: [node, -r, tsconfig-paths/register, dist/src/app.js]\n' +
          '          envFrom:\n' +
          '            - secretRef: { name: srvj-secret }\n' +
          '          ports:\n' +
          '            - containerPort: 60459\n' +
          '          securityContext:\n' +
          '            allowPrivilegeEscalation: false\n' +
          '            capabilities: { drop: [ALL] }\n' +
          '            seccompProfile: { type: RuntimeDefault }\n' +
          '          resources:\n' +
          '            requests: { cpu: 200m, memory: 256Mi }\n' +
          '            limits: { cpu: 1000m, memory: 1Gi }\n' +
          '          readinessProbe:\n' +
          '            httpGet: { path: /api/health, port: 60459 }\n' +
          '            initialDelaySeconds: 10\n' +
          '          livenessProbe:\n' +
          '            httpGet: { path: /api/health, port: 60459 }\n' +
          '            initialDelaySeconds: 20\n' +
          '          lifecycle:\n' +
          '            preStop:\n' +
          '              exec: { command: [/bin/sh, -c, sleep 5] }',
      },
      {
        type: 'paragraph',
        text: 'Both probes currently point at the same /api/health endpoint, and that deserves an honest note. Readiness and liveness are different questions — "can I serve a request right now" versus "is this process worth keeping alive" — and the dangerous failure mode is a liveness probe that checks dependencies: if MongoDB blips and liveness notices, Kubernetes restart-loops every healthy pod in sympathy with the database. The endpoint is dependency-free today, which keeps that trap shut; splitting it into a ready check that verifies Mongo and Redis and a live check that verifies nothing is the planned refinement.',
      },
      {
        type: 'paragraph',
        text: 'The preStop sleep plus the 30-second termination grace is the other hard-won pattern. During a rollout the pod is removed from the endpoints list and sent SIGTERM concurrently — without a grace window, in-flight requests and open SSE streams die mid-byte. A few seconds of "keep serving, take nothing new" makes deploys invisible to connected clients. And the security context — runAsNonRoot, all capabilities dropped, no privilege escalation, default seccomp — costs nothing at this stage and is miserable to retrofit later.',
      },
      {
        type: 'paragraph',
        text: 'The worker is the same image with a different entrypoint and deliberately different rules. Its strategy is Recreate, not RollingUpdate: during an API rollout you want old and new pods overlapping; during a worker rollout, overlap means two workers competing for the same BullMQ jobs mid-deploy. It also gets 60 seconds of termination grace instead of 30, because "finish the job you\'re holding" takes longer than "finish the HTTP request you\'re serving". Scaling is asymmetric too — an HPA takes the API from 2 to 8 replicas on 70% CPU or 80% memory, while the worker stays at one replica until job volume, not traffic, says otherwise. That asymmetry is the whole point of splitting them.',
      },
      {
        type: 'paragraph',
        text: 'And the act-one NGINX config didn\'t die — it migrated into the ingress controller as annotations and snippets. The global rate limit became limit-rps: 30; a server-snippet reproduces the 5-per-minute auth zone; the SSE location moved wholesale, buffering kills and day-long timeouts intact; /metrics is still a flat 403. Same hard-won lines, new address.',
      },
      {
        type: 'heading',
        text: 'The deploy: one apply, and an honest gap',
      },
      {
        type: 'paragraph',
        text: 'The whole stack is kustomize-driven — namespace, secrets, the Redis StatefulSet, both Deployments, the HPA, and the ingress are one kubectl apply -k k8s/ away, and the manifest tree in git is the cluster\'s source of truth:',
      },
      {
        type: 'code',
        language: 'yaml',
        filename: 'k8s/kustomization.yaml',
        code:
          'namespace: srvj\n\n' +
          'resources:\n' +
          '  - namespace.yaml\n' +
          '  - secret.yaml\n' +
          '  - redis/statefulset.yaml\n' +
          '  - redis/service.yaml\n' +
          '  - api/deployment.yaml\n' +
          '  - api/service.yaml\n' +
          '  - api/hpa.yaml\n' +
          '  - worker/deployment.yaml\n' +
          '  - ingress/configmap.yaml\n' +
          '  - ingress/ingress.yaml',
      },
      {
        type: 'paragraph',
        text: 'The honest gap: the image is still srvj-backend:latest with imagePullPolicy: IfNotPresent, which means a rollout doesn\'t reliably pick up a new build — the act-two lesson about immutable SHA-tagged artifacts hasn\'t been fully carried into the cluster yet. It\'s the top of the improvement list, because kubectl rollout undo is only a real rollback when tags are immutable. What already works in my favor: maxUnavailable: 0 means a build whose pods never pass readiness stalls the rollout while the old pods keep serving — a bad deploy degrades into a stuck rollout, not an outage.',
      },
      {
        type: 'heading',
        text: 'What Kubernetes actually costs (it\'s not just the invoice)',
      },
      {
        type: 'paragraph',
        text: 'I\'d be lying if I presented act three as pure upside. Self-managing the cluster means I am the control plane\'s administrator — upgrades, certificates, backups — which is precisely the ledger EKS\'s flat fee is weighed against; it doesn\'t remove the YAML, it removes being the etcd administrator, and the nodes are still just EC2 underneath. The in-cluster Redis is a single-replica StatefulSet on local-path storage, which pins it to one node: fine for a rebuildable queue, unacceptable if it ever grows into primary state. And the collab rooms live in-memory inside the API pods, so two clients editing the same diagram can land on different replicas — session affinity papers over it until the Redis fanout between pods lands (the same unsolved item from the [CRDTs post](/blogs/crdts-yjs-collaborative-editing-srvj)).',
      },
      {
        type: 'paragraph',
        text: 'So the honest decision matrix, from someone running all three stages in production simultaneously:',
      },
      {
        type: 'list',
        items: [
          'One service, one team, predictable load → Docker on a single EC2 box. This is most backends, and it\'s where SRVJ lived happily for its first stretch.',
          'Multiple processes with different scaling profiles, zero-downtime deploys as a requirement → Kubernetes earns its complexity, and a managed control plane (EKS) is the part worth paying for. This is SRVJ today.',
          'File uploads → presigned S3 URLs behind CloudFront, at every stage, regardless of everything else. The one decision I\'ve never revisited.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The progression matters more than the destination. Every stage solved the specific pain the previous one produced — drift got me to Docker, shape got me to Kubernetes — and each migration was small because the artifact (the image) and the S3 paths were already settled. If there\'s one takeaway: adopt the boring parts early, and let the orchestration wait until your architecture, not your ambition, asks for it.',
      },
    ],
  },
  {
    id: 4,
    slug: 'crdts-yjs-collaborative-editing-srvj',
    ogImage: '/og/blog-crdts-yjs-collaborative-editing-srvj.png',
    title: 'CRDTs, Yjs, and the Day I Stopped Writing Conflict-Resolution Code',
    excerpt:
      'Why I stopped writing conflict-resolution code for SRVJ\'s collaborative diagrams — CRDTs from first principles (G-Counter, LWW-Register, OR-Set, sequence types), then Yjs and the authenticated WebSocket relay that keeps every editor converged.',
    metaTitle: 'CRDTs & Yjs: Conflict-Free Real-Time Collaboration',
    metaDescription:
      'How CRDTs and Yjs power conflict-free collaborative editing in SRVJ — G-Counter, LWW-Register and OR-Set explained, plus an authenticated WebSocket relay.',
    category: 'Distributed Systems',
    date: '2026-07-06',
    updated: '2026-07-10',
    readTime: '13 min read',
    tags: ['CRDT', 'Yjs', 'Collaborative Editing', 'Real-Time', 'Distributed Systems', 'WebSocket', 'TypeScript', 'Node.js'],
    entities: [
      { name: 'Conflict-free replicated data type', sameAs: ['https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type', 'https://crdt.tech'] },
      { name: 'Yjs', sameAs: ['https://github.com/yjs/yjs', 'https://docs.yjs.dev'] },
      { name: 'Collaborative real-time editor', sameAs: 'https://en.wikipedia.org/wiki/Collaborative_real-time_editor' },
      { name: 'Operational transformation', sameAs: 'https://en.wikipedia.org/wiki/Operational_transformation' },
      { name: 'WebSocket', sameAs: 'https://en.wikipedia.org/wiki/WebSocket' },
    ],
    relatedSlugs: ['server-sent-events-real-time-notifications-srvj', 'aws-ec2-s3-kubernetes-production-deployments'],
    blocks: [
      {
        type: 'paragraph',
        text: 'While building SRVJ (a collaborative diagram tool I\'ve been working on), I hit the problem every real-time app eventually hits: two people drag the same node at the same time. Who wins?',
      },
      {
        type: 'paragraph',
        text: 'My first instinct was the classic one — lock the node while someone is editing it. Terrible idea. Locks in a whiteboard feel like someone grabbing your mouse. Second instinct: last-write-wins on the server. Also bad, because "last" depends on network latency, and someone\'s work silently disappears. Third instinct: operational transformation, the Google Docs approach. I read two papers, looked at the transformation matrices you need to maintain for every pair of operations, and closed the tab.',
      },
      {
        type: 'paragraph',
        text: 'Then I found CRDTs, and the whole problem class just... dissolved. This post is what I wish someone had handed me at the start.',
      },
      {
        type: 'heading',
        text: 'So what is a CRDT?',
      },
      {
        type: 'paragraph',
        text: 'CRDT stands for Conflict-free Replicated Data Type. The idea sounds almost too simple: instead of writing code that resolves conflicts, you design the data structure so conflicts can\'t exist. Every replica can accept writes independently — no coordination, no locks, no central authority — and when replicas exchange their states, they are mathematically guaranteed to converge to the same result.',
      },
      {
        type: 'paragraph',
        text: 'The guarantee comes from three properties of the merge function:',
      },
      {
        type: 'list',
        items: [
          'Commutative — `merge(a, b) === merge(b, a)`. Order of arrival doesn\'t matter.',
          'Associative — `merge(merge(a, b), c) === merge(a, merge(b, c))`. Grouping doesn\'t matter.',
          'Idempotent — `merge(a, a) === a`. Receiving the same update twice doesn\'t matter.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If your merge satisfies these, replicas can gossip updates in any order, drop duplicates, arrive late — and still end up identical. This property has a name: strong eventual consistency. Not "eventually the server decides." Every replica that has seen the same set of updates is in the same state, deterministically.',
      },
      {
        type: 'paragraph',
        text: 'There are two families. State-based CRDTs ship the whole state and merge it (simple, chunky payloads). Operation-based CRDTs ship individual operations (small payloads, but you need reliable delivery). Most production systems, Yjs included, ship compact operation deltas.',
      },
      {
        type: 'heading',
        text: 'Where would you actually use one?',
      },
      {
        type: 'paragraph',
        text: 'CRDTs are not a general-purpose replacement for your database. They shine in a specific set of situations:',
      },
      {
        type: 'paragraph',
        text: 'Collaborative editing — the obvious one. Docs, whiteboards, kanban boards, Figma-style tools. Anywhere multiple cursors touch the same object.',
      },
      {
        type: 'paragraph',
        text: 'Offline-first apps — a mobile client edits locally on a plane, syncs three hours later, and the merge just works. No "your version / their version" dialog.',
      },
      {
        type: 'paragraph',
        text: 'Distributed counters and presence — likes, view counts, "who\'s online" across regions. Riak shipped CRDTs years ago, Redis has CRDT-based active-active replication in its enterprise offering.',
      },
      {
        type: 'paragraph',
        text: 'Multi-region writes — when you want every region to accept writes without a consensus round-trip per operation.',
      },
      {
        type: 'paragraph',
        text: 'The common thread: availability over coordination. If your domain genuinely needs a single serialized truth (account balances, inventory), CRDTs are the wrong tool. You can\'t CRDT your way out of "don\'t sell the same seat twice."',
      },
      {
        type: 'heading',
        text: 'The classic algorithms',
      },
      {
        type: 'paragraph',
        text: 'Fair warning: the first three are almost disappointingly simple. That\'s the point — the intelligence lives in the data structure, not in some clever resolver.',
      },
      {
        type: 'heading',
        text: 'G-Counter (grow-only counter)',
      },
      {
        type: 'paragraph',
        text: 'Each replica only increments its own slot. The total is the sum, and merge is an element-wise `max`.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'g-counter.ts',
        code:
          'interface GCounterState {\n' +
          '  counts: Record<string, number>;\n' +
          '}\n\n' +
          'class GCounter {\n' +
          '  private counts = new Map<string, number>();\n\n' +
          '  constructor(private readonly replicaId: string) {}\n\n' +
          '  increment(): void {\n' +
          '    const current = this.counts.get(this.replicaId) ?? 0;\n' +
          '    this.counts.set(this.replicaId, current + 1);\n' +
          '  }\n\n' +
          '  value(): number {\n' +
          '    let total = 0;\n' +
          '    for (const count of this.counts.values()) total += count;\n' +
          '    return total;\n' +
          '  }\n\n' +
          '  merge(other: GCounter): void {\n' +
          '    for (const [id, count] of other.counts.entries()) {\n' +
          '      const mine = this.counts.get(id) ?? 0;\n' +
          '      this.counts.set(id, Math.max(mine, count));\n' +
          '    }\n' +
          '  }\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'Why does `max` work? Because a replica\'s own counter only ever grows, the highest value you\'ve seen from a replica is its latest value. Merge twice, merge in any order — same result. All three properties, for free.',
      },
      {
        type: 'paragraph',
        text: 'Need decrements? That\'s the PN-Counter: two G-Counters, one for increments and one for decrements, value = P − N. Nothing more to it.',
      },
      {
        type: 'heading',
        text: 'LWW-Register (last-writer-wins register)',
      },
      {
        type: 'paragraph',
        text: 'A single value with a timestamp. On merge, the higher timestamp wins; ties break on replica ID so both sides pick the same winner.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'lww-register.ts',
        code:
          'interface LWWEntry<T> {\n' +
          '  value: T;\n' +
          '  timestamp: number;\n' +
          '  replicaId: string;\n' +
          '}\n\n' +
          'class LWWRegister<T> {\n' +
          '  constructor(private entry: LWWEntry<T>, private readonly replicaId: string) {}\n\n' +
          '  set(value: T): void {\n' +
          '    this.entry = { value, timestamp: Date.now(), replicaId: this.replicaId };\n' +
          '  }\n\n' +
          '  get(): T {\n' +
          '    return this.entry.value;\n' +
          '  }\n\n' +
          '  merge(other: LWWRegister<T>): void {\n' +
          '    const remote = other.entry;\n' +
          '    const newer =\n' +
          '      remote.timestamp > this.entry.timestamp ||\n' +
          '      (remote.timestamp === this.entry.timestamp && remote.replicaId > this.entry.replicaId);\n' +
          '    if (newer) this.entry = remote;\n' +
          '  }\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'Be honest with yourself about what this is: it\'s deterministic data loss. One concurrent write silently loses. That\'s fine for a "node color" field. It\'s not fine for text.',
      },
      {
        type: 'heading',
        text: 'OR-Set (observed-remove set)',
      },
      {
        type: 'paragraph',
        text: 'A plain set breaks under concurrency: if I remove `"x"` while you re-add `"x"`, what should survive? The OR-Set answers "add wins" by tagging every add with a unique ID. Remove only kills the tags you have actually observed — a concurrent add carries a fresh tag the remove never saw, so it survives.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'or-set.ts',
        code:
          'class ORSet<T> {\n' +
          '  private adds = new Map<T, Set<string>>();\n' +
          '  private removes = new Map<T, Set<string>>();\n\n' +
          '  add(value: T): void {\n' +
          '    const tags = this.adds.get(value) ?? new Set<string>();\n' +
          '    tags.add(crypto.randomUUID());\n' +
          '    this.adds.set(value, tags);\n' +
          '  }\n\n' +
          '  remove(value: T): void {\n' +
          '    const observed = this.adds.get(value);\n' +
          '    if (!observed) return;\n' +
          '    const removed = this.removes.get(value) ?? new Set<string>();\n' +
          '    for (const tag of observed) removed.add(tag);\n' +
          '    this.removes.set(value, removed);\n' +
          '  }\n\n' +
          '  has(value: T): boolean {\n' +
          '    const added = this.adds.get(value);\n' +
          '    if (!added) return false;\n' +
          '    const removed = this.removes.get(value);\n' +
          '    for (const tag of added) {\n' +
          '      if (!removed?.has(tag)) return true;\n' +
          '    }\n' +
          '    return false;\n' +
          '  }\n\n' +
          '  merge(other: ORSet<T>): void {\n' +
          '    for (const [value, tags] of other.adds) {\n' +
          '      const mine = this.adds.get(value) ?? new Set<string>();\n' +
          '      for (const tag of tags) mine.add(tag);\n' +
          '      this.adds.set(value, mine);\n' +
          '    }\n' +
          '    for (const [value, tags] of other.removes) {\n' +
          '      const mine = this.removes.get(value) ?? new Set<string>();\n' +
          '      for (const tag of tags) mine.add(tag);\n' +
          '      this.removes.set(value, mine);\n' +
          '    }\n' +
          '  }\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'Notice what just appeared: removed tags stick around forever. Those are tombstones, and they\'re the tax you pay across almost every CRDT design. Hold that thought.',
      },
      {
        type: 'heading',
        text: 'Sequence CRDTs — where it gets genuinely hard',
      },
      {
        type: 'paragraph',
        text: 'Counters, registers, and sets are a weekend project. Ordered sequences — text, arrays, lists of diagram nodes — are a different animal. Array indices are meaningless under concurrency: your "insert at index 3" and my "delete index 2" arrive in different orders on different replicas and index-based logic falls apart instantly.',
      },
      {
        type: 'paragraph',
        text: 'The trick every sequence CRDT uses: stop using indices. Give every inserted item a globally unique ID (typically `clientID + logical clock`) and describe its position relative to its neighbors — "I was inserted after item (client 4, clock 17)". Deletes don\'t remove items; they mark them as tombstones so late-arriving "insert after X" operations still find X. The algorithms — RGA, Logoot, LSEQ, and YATA (the one Yjs implements) — differ mainly in how they order items that were concurrently inserted at the same position, and how they keep metadata from eating you alive.',
      },
      {
        type: 'paragraph',
        text: 'I\'m not going to implement YATA in a blog post, and honestly, neither should you in production code. Which brings me to Yjs.',
      },
      {
        type: 'heading',
        text: 'What is Yjs?',
      },
      {
        type: 'paragraph',
        text: 'Yjs (github.com/yjs/yjs) is a production-grade CRDT implementation, and probably the fastest one in the JavaScript ecosystem. It gives you shared types — `Y.Map`, `Y.Array`, `Y.Text`, `Y.XmlFragment` — that behave like normal data structures locally but sync conflict-free across any number of peers.',
      },
      {
        type: 'paragraph',
        text: 'The parts that made me pick it over rolling my own:',
      },
      {
        type: 'paragraph',
        text: 'It\'s operation-based and binary. Every local change emits a compact binary update. You don\'t ship documents around; you ship diffs measured in bytes.',
      },
      {
        type: 'paragraph',
        text: 'State vectors make sync a two-step handshake. A client sends a state vector — essentially "here\'s the latest clock I\'ve seen from each peer" — and the other side responds with exactly the updates that are missing. No diffing full documents, no re-sending history.',
      },
      {
        type: 'paragraph',
        text: 'The engineering is brutal, in a good way. Yjs merges adjacent items written by the same client into single structs, so typing a 1,000-character paragraph doesn\'t create 1,000 objects. That single optimization is a large part of why it benchmarks well ahead of naive implementations.',
      },
      {
        type: 'paragraph',
        text: 'Transport-agnostic. Yjs doesn\'t care how updates travel. WebSocket, WebRTC, carrier pigeon — the `y-protocols` package defines the sync and awareness message formats, and you bring the pipe.',
      },
      {
        type: 'paragraph',
        text: 'It also ships awareness as a separate protocol: ephemeral presence data (cursors, selections, "Ali is here") that propagates to peers but deliberately never enters the document. Cursor positions in your edit history would be noise; keeping them out is the right default.',
      },
      {
        type: 'heading',
        text: 'Why Yjs in SRVJ',
      },
      {
        type: 'paragraph',
        text: 'SRVJ diagrams are collaboratively edited in real time, and I wanted three things: no lock UX, no server round-trip per keystroke, and a server that doesn\'t need to understand diagram semantics to keep everyone consistent. Yjs delivers all three, because of the single most important realization in this whole build:',
      },
      {
        type: 'paragraph',
        text: 'The backend is a relay and a persistence layer. It is not a conflict resolver. Convergence is a property of the data type. The server just moves bytes and occasionally writes them down.',
      },
      {
        type: 'paragraph',
        text: 'Here\'s the actual flow in SRVJ\'s collab layer:',
      },
      {
        type: 'code',
        language: 'mermaid',
        filename: 'collab-sync.mmd',
        code:
          'sequenceDiagram\n' +
          '    participant C as Client (Y.Doc)\n' +
          '    participant G as attachCollab (WS upgrade)\n' +
          '    participant R as Room (Y.Doc + awareness)\n' +
          '    participant M as MongoDB\n\n' +
          '    C->>G: upgrade /collab/:site_id (PASETO cookie/Bearer)\n' +
          '    G->>G: origin check + auth + RBAC\n' +
          '    G-->>C: close 4400/4401/4403/4404 on failure\n' +
          '    G->>R: getRoom(siteId) - create if absent\n' +
          '    R->>M: loadDocument (binary snapshot, else seed from diagram)\n' +
          '    C->>R: SyncStep1 (my state vector)\n' +
          '    R-->>C: SyncStep2 (only what you\'re missing)\n' +
          '    C->>R: binary update (edit)\n' +
          '    R->>R: role gate - EDITOR+ only\n' +
          '    R-->>C: broadcast to every room connection\n' +
          '    R->>M: debounced storeDocument',
      },
      {
        type: 'paragraph',
        text: 'A few implementation details worth calling out, because this is where the theory meets an Express server at 2 AM:',
      },
      {
        type: 'paragraph',
        text: 'Auth happens before any document bytes flow. The WebSocket upgrade on `/collab` checks the origin, extracts the diagram\'s `site_id` from the URL, verifies the PASETO access token from cookie or Bearer header, and resolves the user\'s role — the same identity and RBAC stack the REST layer uses. Failures close the socket with specific codes (4400 bad request, 4401 unauthenticated, 4403 forbidden, 4404 not found) so the client can tell why it was rejected.',
      },
      {
        type: 'paragraph',
        text: 'One in-memory Room per open diagram. A Room owns a `Y.Doc`, an awareness instance, and the set of connections. The interesting bit is read/write gating at the protocol level: a `VIEWER` can send SyncStep1 and receive the full document — reading is syncing — but their SyncStep2 and update messages are silently dropped. Only `EDITOR` and above mutate the doc. RBAC enforced inside the sync protocol handler, not just at the door.',
      },
      {
        type: 'paragraph',
        text: 'Dual-debounced persistence. Writing to MongoDB on every keystroke would be absurd; debouncing naively means a user who never stops dragging could postpone persistence forever. So there are two timers: a short trailing debounce (`COLLAB_DEBOUNCE`) that fires after a pause, and a hard cap (`COLLAB_MAX_DEBOUNCE`) tracked from the first pending edit that forces a write even mid-storm. Quiet rooms persist quickly, busy rooms persist at most every max-interval, and the DB never sees per-keystroke traffic.',
      },
      {
        type: 'paragraph',
        text: 'Two representations on every save. `storeDocument` writes `Y.encodeStateAsUpdate(doc)` as a binary `Buffer` — the CRDT source of truth a returning session resumes from — and also projects `nodes`, `edges`, and `metadata` as plain JSON back onto the queryable diagram document. The rest of the API can read diagrams without knowing Yjs exists. If no snapshot exists yet, `loadDocument` seeds the Y.Doc from the plain diagram inside a single transaction, so pre-collab diagrams onboard cleanly.',
      },
      {
        type: 'paragraph',
        text: 'Boring but necessary guards. Per-connection rate limiting (200 messages per 10-second window), 30-second ping/pong liveness, and when the last client leaves, the room persists one final time and tears itself down. Integration tests with Vitest and `y-websocket` confirm the parts I care about: an edit on client A lands on client B and in the store, and edits never leak between rooms.',
      },
      {
        type: 'heading',
        text: 'The parts I haven\'t solved',
      },
      {
        type: 'paragraph',
        text: 'I\'d be lying if I ended on "and everything is perfect."',
      },
      {
        type: 'paragraph',
        text: 'Tombstones. Remember the OR-Set tax? Yjs pays it too — deleted items persist as tombstones inside the document so late operations can still resolve their positions. A diagram that lives for months of heavy editing accumulates history it will never need again. There are approaches (snapshotting, `Y.encodeStateAsUpdateV2`, periodic doc rebuilds when no clients are connected), but I don\'t have a compaction strategy in production yet. It\'s the top item on the list.',
      },
      {
        type: 'paragraph',
        text: 'Horizontal scaling. Rooms are in-memory, per instance. Two users on the same diagram must land on the same instance, which is fine today and a real constraint tomorrow. The known fix is a Redis pub/sub fanout between instances so a room can span processes — the same pattern SRVJ already uses for [notification delivery](/blogs/server-sent-events-real-time-notifications-srvj) — but the collab layer hasn\'t crossed that bridge yet.',
      },
      {
        type: 'paragraph',
        text: 'LWW inside the map. Concurrent edits to the same key of a `Y.Map` resolve last-writer-wins. Two people recoloring the same node at the same instant: one color survives. For diagram properties that\'s the correct trade — nobody wants a merge dialog over a hex code — but it\'s worth knowing which semantics you\'re getting where.',
      },
      {
        type: 'paragraph',
        text: 'If you\'re building anything multiplayer, my honest advice is: don\'t write the merge logic. Pick the data structure that makes merging a non-event, put a thin authenticated relay in front of it, and spend your energy on the two problems that actually remain — persistence and cleanup. That\'s the whole trick, and it took me an embarrassing amount of reading to learn it.',
      },
    ],
  },
  {
    id: 3,
    slug: 'server-sent-events-real-time-notifications-srvj',
    ogImage: '/og/blog-server-sent-events-real-time-notifications-srvj.png',
    title: 'Server-Sent Events (SSE): Real-Time Notifications in SRVJ',
    excerpt:
      'How SRVJ delivers real-time notifications with Server-Sent Events, BullMQ, Redis Pub/Sub, and PostgreSQL — a persist-then-fan-out pipeline that scales horizontally without sticky sessions.',
    metaTitle: 'Server-Sent Events (SSE) for Real-Time Notifications',
    metaDescription:
      'Real-time notifications with SSE, BullMQ, Redis Pub/Sub and PostgreSQL — a persist-then-fan-out pipeline that scales horizontally without sticky sessions.',
    category: 'Backend Architecture',
    date: '2026-06-27',
    updated: '2026-07-10',
    readTime: '9 min read',
    tags: ['SSE', 'Server-Sent Events', 'Real-Time', 'BullMQ', 'Redis', 'PostgreSQL', 'Node.js', 'System Design'],
    entities: [
      { name: 'Server-sent events', sameAs: ['https://en.wikipedia.org/wiki/Server-sent_events', 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events'] },
      { name: 'Redis', sameAs: ['https://en.wikipedia.org/wiki/Redis', 'https://redis.io'] },
      { name: 'Publish–subscribe pattern', sameAs: 'https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern' },
      { name: 'WebSocket', sameAs: 'https://en.wikipedia.org/wiki/WebSocket' },
      { name: 'PostgreSQL', sameAs: 'https://en.wikipedia.org/wiki/PostgreSQL' },
    ],
    relatedSlugs: ['crdts-yjs-collaborative-editing-srvj', 'aws-ec2-s3-kubernetes-production-deployments'],
    blocks: [
      {
        type: 'paragraph',
        text: 'SRVJ is a collaborative diagram tool I\'ve been building — think Miro, but as a playground for backend architecture. The collaborative canvas itself runs over WebSockets ([that story gets its own post](/blogs/crdts-yjs-collaborative-editing-srvj)), but notifications — board invitations, chat messages, mentions — needed a delivery path of their own.',
      },
      {
        type: 'paragraph',
        text: 'This post is about that path: why it\'s Server-Sent Events rather than another WebSocket, and the pipeline behind it — BullMQ, PostgreSQL, and Redis Pub/Sub, arranged so notifications survive crashes, reach every open tab, and keep working when the app scales past one instance.',
      },
      {
        type: 'heading',
        text: 'What is SSE?',
      },
      {
        type: 'paragraph',
        text: 'Server-Sent Events is the boring half of real-time: a plain HTTP response the server never finishes. The client opens a request, the server holds the connection open and writes events into it whenever something happens. Communication is strictly one-way — server to client.',
      },
      {
        type: 'paragraph',
        text: 'The client side is almost embarrassingly simple, because browsers ship it natively as the EventSource API: automatic reconnection, named events, last-event-ID tracking — no library required.',
      },
      {
        type: 'heading',
        text: 'Why SSE?',
      },
      {
        type: 'paragraph',
        text: 'Because notifications don\'t need a second direction. Collaborative editing is genuinely bidirectional — clients push document updates continuously — so it earns its WebSocket. A notification is different: the server has something to say, and the client just listens.',
      },
      {
        type: 'paragraph',
        text: 'Paying for a bidirectional protocol — the upgrade handshake, a separate connection lifecycle, load-balancer configuration — to send messages one way is buying capability you\'ll never use. SSE is plain HTTP: it flows through the same middleware, proxies, and auth as every other request.',
      },
      {
        type: 'heading',
        text: 'Notification Architecture',
      },
      {
        type: 'paragraph',
        text: 'The pipeline is persist-then-fan-out, and every stage after the user action is asynchronous:',
      },
      {
        type: 'list',
        items: [
          'A domain event occurs (board invitation, chat message, etc.).',
          'A BullMQ job is created.',
          'A worker processes the job.',
          'The notification is persisted in PostgreSQL.',
          'The worker publishes the event to Redis Pub/Sub.',
          'The application instance that owns the user\'s SSE connection delivers the notification instantly.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Generation and delivery are fully decoupled: the API returns as soon as the job is queued, the worker guarantees the notification lands in PostgreSQL, and Redis answers "which instance holds this user\'s connection" without anyone ever having to ask.',
      },
      {
        type: 'heading',
        text: 'Opening the SSE Stream',
      },
      {
        type: 'paragraph',
        text: 'Every authenticated user establishes a long-lived HTTP connection to /stream.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'sse.stream.ts',
        code:
          'res.writeHead(200, {\n' +
          '  "Content-Type": "text/event-stream",\n' +
          '  "Cache-Control": "no-cache",\n' +
          '  Connection: "keep-alive",\n' +
          '  "X-Accel-Buffering": "no",\n' +
          '});\n' +
          'res.flushHeaders?.();',
      },
      {
        type: 'paragraph',
        text: 'Every one of those headers is load-bearing:',
      },
      {
        type: 'list',
        items: [
          'Content-Type: text/event-stream — Tells the browser that this endpoint will continuously stream events rather than returning a traditional HTTP response.',
          'Cache-Control: no-cache — Prevents intermediaries and browsers from caching streamed events.',
          'Connection: keep-alive — Keeps the HTTP connection open for future events.',
          'X-Accel-Buffering: no — Disables buffering in Nginx. Without this header, notifications may be delayed because Nginx could buffer responses before sending them to clients.',
        ],
      },
      {
        type: 'heading',
        text: 'Managing Active Connections',
      },
      {
        type: 'paragraph',
        text: 'The same user is routinely connected from three browser tabs and a phone at once, and the registry has to model that. Each new connection is registered like this:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'sse.connections.ts',
        code:
          'const client: SSEClient = { userId, res };\n' +
          'let connections = clients.get(userId);\n' +
          'if (!connections) {\n' +
          '  connections = new Set<SSEClient>();\n' +
          '  clients.set(userId, connections);\n' +
          '}\n' +
          'connections.add(client);',
      },
      {
        type: 'paragraph',
        text: 'Internally, the structure looks like:',
      },
      {
        type: 'code',
        language: 'ts',
        code: 'Map<userId, Set<SSEClient>>',
      },
      {
        type: 'paragraph',
        text: 'The Map gives constant-time lookup of everything a user has open; the Set inside it gives cheap add/remove and de-duplication as tabs come and go. When a notification arrives for a user, delivery is one lookup and a loop — every tab, every device, one write each.',
      },
      {
        type: 'heading',
        text: 'Immediately Opening the Stream',
      },
      {
        type: 'paragraph',
        text: 'After the connection is registered, the server immediately writes an empty event:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'sse.stream.ts',
        code: 'res.write(`: connected\\n\\n`);',
      },
      {
        type: 'paragraph',
        text: 'That line is an SSE comment — clients ignore its content — but writing it flushes the response and makes the browser fire onopen immediately, instead of leaving the connection in limbo until the first real notification happens to arrive.',
      },
      {
        type: 'heading',
        text: 'Cleaning Up Disconnected Clients',
      },
      {
        type: 'paragraph',
        text: 'Because SSE connections are long-lived, proper cleanup is essential.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'sse.cleanup.ts',
        code:
          'req.on("close", () => {\n' +
          '  connections!.delete(client);\n' +
          '  if (connections!.size === 0) {\n' +
          '    clients.delete(userId);\n' +
          '  }\n' +
          '});',
      },
      {
        type: 'paragraph',
        text: 'Skip this and three things go wrong at once: the registry grows without bound, dead sockets accumulate, and the delivery loop starts writing into closed responses. With long-lived connections, cleanup is a correctness requirement, not hygiene.',
      },
      {
        type: 'heading',
        text: 'Redis as the Distribution Layer',
      },
      {
        type: 'paragraph',
        text: 'Everything so far lives in one process\'s memory — which breaks the moment SRVJ runs more than one instance:',
      },
      {
        type: 'list',
        items: [
          'Instance A → User 1 connected',
          'Instance B → User 2 connected',
          'Instance C → Worker running',
        ],
      },
      {
        type: 'paragraph',
        text: 'The worker on instance C has no idea which instance holds user 1\'s connection — and it shouldn\'t have to. Redis Pub/Sub solves the routing problem by never asking it: the worker publishes once, and whichever instance owns the connection delivers. Two Redis clients are needed:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'redis.ts',
        code:
          'export const redis = createClient({ url });\n' +
          'export const subscriber = redis.duplicate();',
      },
      {
        type: 'paragraph',
        text: 'The duplicate isn\'t optional: a Redis connection in subscriber mode can\'t issue normal commands anymore, so Pub/Sub gets its own dedicated connection while the original client keeps serving the rest of the application.',
      },
      {
        type: 'heading',
        text: 'Publishing Notifications',
      },
      {
        type: 'paragraph',
        text: 'After the worker persists the notification in PostgreSQL, it publishes an event.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'notification.worker.ts',
        code:
          'const payload = {\n' +
          '  id: uuidv4(),\n' +
          '  sender: data.sender,\n' +
          '  userId: data.userId,\n' +
          '  type: data.type,\n' +
          '  title: data.title,\n' +
          '  message: data.message,\n' +
          '  createdAt: new Date().toISOString(),\n' +
          '};\n\n' +
          'await prisma.notification.create({\n' +
          '  data: {\n' +
          '    fromUserId: Number(payload.sender),\n' +
          '    toUserId: Number(payload.userId),\n' +
          '    title: payload.title,\n' +
          '    message: payload.message,\n' +
          '  }\n' +
          '});\n\n' +
          'await redis.publish(\n' +
          '  "notifications",\n' +
          '  JSON.stringify(payload)\n' +
          ');',
      },
      {
        type: 'paragraph',
        text: 'The ordering is the whole design: persist first, publish second. PostgreSQL is the source of truth — an offline user finds the notification waiting when they fetch via the REST API, and a crash between the two steps loses only a realtime push, never the notification itself. Flip the order and the failure mode inverts: a user could see a notification that was never stored.',
      },
      {
        type: 'heading',
        text: 'Delivering Notifications to Connected Users',
      },
      {
        type: 'paragraph',
        text: 'Every application instance subscribes to Redis.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'sse.subscriber.ts',
        code:
          'await subscriber.subscribe(\n' +
          '  "notifications",\n' +
          '  (message) => {\n' +
          '    const payload = JSON.parse(message);\n' +
          '    const connections = clients.get(\n' +
          '      String(payload.userId)\n' +
          '    );\n' +
          '    if (!connections || connections.size === 0)\n' +
          '      return;\n\n' +
          '    const frame =\n' +
          '      `event: notification\\n` +\n' +
          '      `data: ${JSON.stringify(payload)}\\n\\n`;\n\n' +
          '    for (const client of connections) {\n' +
          '      client.res.write(frame);\n' +
          '    }\n' +
          '  }\n' +
          ');',
      },
      {
        type: 'paragraph',
        text: 'The elegance is in what each part doesn\'t need to know:',
      },
      {
        type: 'list',
        items: [
          'Each server instance only knows about its local SSE connections.',
          'Redis broadcasts the event to every instance.',
          'Only the instance holding the user\'s connection actually sends the event.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This architecture allows horizontal scaling without introducing sticky sessions or centralized connection management.',
      },
      {
        type: 'heading',
        text: 'Background Processing with BullMQ',
      },
      {
        type: 'paragraph',
        text: 'The front of the pipeline matters as much as the delivery end: the API never creates notifications inline. It drops a job on BullMQ and returns.',
      },
      {
        type: 'code',
        language: 'text',
        filename: 'notification-flow.txt',
        code:
          'User Action\n' +
          '      ↓\n' +
          'BullMQ Job\n' +
          '      ↓\n' +
          'Worker\n' +
          '      ↓\n' +
          'Database\n' +
          '      ↓\n' +
          'Redis Pub/Sub\n' +
          '      ↓\n' +
          'SSE',
      },
      {
        type: 'paragraph',
        text: 'The queue buys the usual things, and every one of them matters here:',
      },
      {
        type: 'list',
        items: [
          'Prevents request blocking.',
          'Improves API response times.',
          'Supports retries.',
          'Handles transient failures.',
          'Decouples business logic from delivery logic.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A failed notification can be retried without affecting the user\'s original request.',
      },
      {
        type: 'heading',
        text: 'Hardening for Production',
      },
      {
        type: 'paragraph',
        text: 'The pipeline above is the version that ships first, and it\'s deliberately simple. As SRVJ grows past a single instance and starts retrying jobs under load, three refinements matter. None of them change the core idea — they make it correct at scale.',
      },
      {
        type: 'heading',
        text: 'Scaling the Fan-Out: Per-User Channels',
      },
      {
        type: 'paragraph',
        text: 'The version above publishes every notification to a single global notifications channel, and every instance subscribes to it. That\'s the simplest thing that works, and at a small number of instances it\'s completely fine.',
      },
      {
        type: 'paragraph',
        text: 'But notice what happens as you scale out: every instance receives every notification and then discards the ones it doesn\'t own. With N instances, roughly (N-1)/N of that fan-out is wasted CPU and network that grows with both notification volume and instance count.',
      },
      {
        type: 'paragraph',
        text: 'The refinement is per-user channels — notif:user:{id}. Each instance subscribes only to the users currently connected to it, and unsubscribes when the last tab for that user disconnects:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'sse.channels.ts',
        code:
          '// on connect (first tab for this user on this instance)\n' +
          'await subscriber.subscribe(`notif:user:${userId}`, handleMessage);\n\n' +
          '// on disconnect (last tab gone)\n' +
          'await subscriber.unsubscribe(`notif:user:${userId}`);',
      },
      {
        type: 'paragraph',
        text: 'The publish side targets the user directly instead of broadcasting:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'notification.worker.ts',
        code: 'await redis.publish(`notif:user:${payload.userId}`, JSON.stringify(payload));',
      },
      {
        type: 'paragraph',
        text: 'Now each instance receives only the messages for users it actually holds.',
      },
      {
        type: 'paragraph',
        text: 'Tradeoffs. You trade a fixed broadcast cost for subscribe/unsubscribe churn on every connect and disconnect, plus many short-lived channels in Redis. That\'s a good trade once instance count and notification volume grow; the single global channel is fine while you\'re small. Pick the per-user model the moment you horizontally scale the app tier in earnest.',
      },
      {
        type: 'heading',
        text: 'Idempotent Worker Writes',
      },
      {
        type: 'paragraph',
        text: 'BullMQ delivers at-least-once. A worker that crashes after writing to PostgreSQL but before acking the job will see that job again on restart — and a blind create produces a duplicate notification.',
      },
      {
        type: 'paragraph',
        text: 'The fix is a stable dedup key (the domain eventId, or a deterministic hash of type + sender + recipient + target) plus a unique constraint, so the second delivery becomes a no-op instead of a duplicate:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'notification.worker.ts',
        code:
          'await prisma.notification.upsert({\n' +
          '  where: { eventId: payload.eventId },\n' +
          '  update: {},\n' +
          '  create: {\n' +
          '    eventId: payload.eventId,\n' +
          '    fromUserId: Number(payload.sender),\n' +
          '    toUserId: Number(payload.userId),\n' +
          '    title: payload.title,\n' +
          '    message: payload.message,\n' +
          '  },\n' +
          '});',
      },
      {
        type: 'paragraph',
        text: 'Tradeoff. You need a deterministic key and a unique column — a little schema discipline. And worth being honest: exactly-once across queue → DB → Redis doesn\'t really exist. Idempotent writes are how you approximate it, and they\'re non-negotiable the moment the consumer has side effects.',
      },
      {
        type: 'heading',
        text: 'Surviving Reconnections',
      },
      {
        type: 'paragraph',
        text: 'SSE auto-reconnects, but Redis Pub/Sub has no buffer: anything published while a client was disconnected is simply gone. Two ways to close that gap:',
      },
      {
        type: 'list',
        items: [
          'Refetch on reconnect — When EventSource fires onopen, the client calls the REST list endpoint (GET /notifications) to reconcile against PostgreSQL. This needs nothing extra and is the pragmatic default for SRVJ.',
          'Last-Event-ID replay — On reconnect the browser sends the Last-Event-ID header automatically, and the server replays what was missed. This requires a durable per-user log to replay from — which pushes you toward Redis Streams.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For SRVJ, the refetch path wins: the durable store already exists, so the realtime layer is free to be lossy.',
      },
      {
        type: 'heading',
        text: 'Pub/Sub vs Redis Streams',
      },
      {
        type: 'paragraph',
        text: 'Redis Pub/Sub is fire-and-forget — no subscriber connected at publish time means the message is dropped, with no replay and no acknowledgement. That\'s acceptable here precisely because the REST list reconciles anything lost.',
      },
      {
        type: 'paragraph',
        text: 'If you ever need "no notification missed in realtime, even across reconnects, without a refetch," move the channel to Redis Streams (XADD + consumer groups + XACK). You get at-least-once delivery and replay via XRANGE, at the cost of a trimming policy (MAXLEN), consumer-group bookkeeping, and more memory. Reach for it only when the refetch model stops being good enough — not before.',
      },
      {
        type: 'heading',
        text: 'Why I Chose SSE',
      },
      {
        type: 'paragraph',
        text: 'For server-generated notifications, SSE provided:',
      },
      {
        type: 'list',
        items: [
          'Native browser support.',
          'Automatic reconnection.',
          'Simple architecture.',
          'Lower operational complexity.',
          'Lightweight server-to-client communication.',
          'Seamless integration with existing HTTP infrastructure.',
        ],
      },
      {
        type: 'paragraph',
        text: 'SSE is not a replacement for WebSockets, but for notification delivery in SRVJ, it turned out to be the right tool for the job.',
      },
      {
        type: 'paragraph',
        text: 'Next in the series: How CRDTs and Yjs power collaborative editing in SRVJ.',
      },
    ],
  },
  {
    id: 2,
    slug: 'paymob-amazon-payment-services-integration',
    ogImage: '/og/blog-paymob-amazon-payment-services-integration.png',
    title: 'PayMob & Amazon Payment Services: What the Docs Don\'t Cover',
    excerpt:
      'Months of integrating PayMob and Amazon Payment Services (PayFort) into a production marketplace, distilled — the provider adapter, the payment state machine, the verify-then-enqueue webhook pipeline, and the reconciliation job that catches everything else.',
    metaTitle: 'PayMob & Amazon Payment Services (PayFort) Integration',
    metaDescription:
      'Integrating PayMob and Amazon Payment Services (PayFort) in production — the adapter pattern, payment state machine, webhook pipeline and reconciliation.',
    category: 'Payment Integration',
    date: '2026-06-12',
    updated: '2026-07-09',
    readTime: '12 min read',
    tags: ['Payments', 'Paymob', 'Amazon Payment Services', 'PayFort', 'Webhooks', 'BullMQ', 'Node.js', 'TypeScript'],
    entities: [
      { name: 'Paymob', sameAs: 'https://paymob.com' },
      { name: 'Amazon Payment Services', sameAs: 'https://paymentservices.amazon.com' },
      { name: 'Webhook', sameAs: 'https://en.wikipedia.org/wiki/Webhook' },
      { name: 'HMAC', sameAs: 'https://en.wikipedia.org/wiki/HMAC' },
      { name: 'Idempotence', sameAs: 'https://en.wikipedia.org/wiki/Idempotence' },
    ],
    relatedSlugs: ['jwt-vs-paseto-tokens'],
    blocks: [
      {
        type: 'paragraph',
        text: 'I\'ve spent the last few months integrating two payment providers into a production marketplace: PayMob and Amazon Payment Services (the thing everyone still calls PayFort). The docs got me to my first sandbox transaction in an afternoon. Everything after that, I had to figure out the hard way.',
      },
      {
        type: 'paragraph',
        text: 'So this post is the writeup I wish existed when I started. It\'s not "how to call the PayMob API" — there are ten of those already and they all stop right before the part that hurts. This is about the architecture that sits between your Express app and two providers that disagree on basically everything.',
      },
      {
        type: 'paragraph',
        text: 'Fair warning: this assumes you\'re a backend engineer who\'s shipped things before. I\'m not going to explain what a webhook is.',
      },

      {
        type: 'heading',
        text: 'Two providers, one interface (or: how I stopped writing if-statements)',
      },
      {
        type: 'paragraph',
        text: 'My first version had `if (provider === \'paymob\')` checks scattered around. It worked for about two weeks. Then I needed refunds, and the branching got ugly fast, because these two providers genuinely agree on nothing:',
      },
      {
        type: 'list',
        items: [
          'PayMob auth is a three-step dance — authenticate, create an order, get a payment key. APS signs every single request with a signature you compute over the sorted request params plus a passphrase.',
          'PayMob webhooks come with an HMAC computed over a very specific ordering of fields concatenated together. APS sends a signature you recompute yourself with the same sorted-params scheme.',
          'PayMob wants amounts in piasters. APS wants the amount multiplied by the currency\'s decimal factor, which is different per currency. Yes, I got this wrong once.',
          '"Success" in PayMob is a boolean and a transaction object. In APS it\'s a numeric response code where the `14xxx` family means success and everything else means go check the table.',
        ],
      },
      {
        type: 'paragraph',
        text: 'So I pulled everything behind one internal interface: create intent, capture, refund, verify webhook, normalize status. One adapter per provider. The rest of the codebase has no idea PayMob exists.',
      },
      {
        type: 'paragraph',
        text: 'The payoff came faster than expected. APS merchant accounts are scoped to a single currency — something I learned when an EGP transaction went through a USD-configured account and failed in a way that made zero sense. The fix lived entirely inside the APS adapter. Nothing else in the system changed. That\'s the whole argument for the pattern, honestly.',
      },
      {
        type: 'paragraph',
        text: 'The catch: the shared interface is a lowest common denominator. PayMob has installment stuff, APS has tokenization quirks, and neither maps cleanly. You either keep growing the interface (it gets bloated) or you add a providerOptions passthrough and accept the leak. I went with the leak. A documented escape hatch beats pretending two different products are the same product.',
      },

      {
        type: 'heading',
        text: 'Payments are state machines whether you like it or not',
      },
      {
        type: 'paragraph',
        text: 'Early on, payment status was just a string field that any code path could update. Then a late PayMob retry arrived after my expiry job had already marked an intent as expired, flipped it back to success, and I spent an evening figuring out why an expired payment had sent a confirmation email.',
      },
      {
        type: 'paragraph',
        text: 'Now every intent goes through an actual state machine:',
      },
      {
        type: 'code',
        language: 'mermaid',
        filename: 'payment-intent-states.mmd',
        code:
          'stateDiagram-v2\n' +
          '    [*] --> CREATED\n' +
          '    CREATED --> PENDING: redirect to provider\n' +
          '    PENDING --> PROCESSING: webhook received\n' +
          '    PROCESSING --> SUCCEEDED: verified success\n' +
          '    PROCESSING --> FAILED: verified failure\n' +
          '    PENDING --> EXPIRED: TTL exceeded\n' +
          '    SUCCEEDED --> REFUND_PENDING: refund requested\n' +
          '    REFUND_PENDING --> REFUNDED: refund confirmed\n' +
          '    REFUND_PENDING --> SUCCEEDED: refund rejected\n' +
          '    FAILED --> [*]\n' +
          '    EXPIRED --> [*]\n' +
          '    REFUNDED --> [*]',
      },
      {
        type: 'paragraph',
        text: 'The rule is simple: transitions get validated at write time, with an atomic compare-and-set on the current state. A FAILED intent can\'t become SUCCEEDED no matter what shows up. An EXPIRED intent rejects everything. When two writers race — say, a webhook handler and a reconciliation job hitting the same intent milliseconds apart — the loser gets a rejected transition instead of silently winning by being last.',
      },
      {
        type: 'paragraph',
        text: 'A status field describes. A state machine enforces. That\'s the difference, and it only matters in exactly the moments when everything else is going wrong, which is exactly when you need it.',
      },
      {
        type: 'paragraph',
        text: 'The annoying part: now you have to handle legitimate out-of-order events explicitly. Under load, APS can deliver an authorization webhook after the capture webhook. The state machine forces you to sit down and decide what that means instead of letting the last write win. More design work up front. Way fewer 2 AM surprises.',
      },

      {
        type: 'heading',
        text: 'Webhooks: do almost nothing, fast',
      },
      {
        type: 'paragraph',
        text: 'Here\'s the mistake I see in nearly every integration tutorial: the webhook handler verifies the signature, updates the database, sends an email, updates inventory, and then returns 200. If anything in that chain is slow or throws, the provider retries, and now you\'ve processed the same payment twice. And PayMob retries aggressively. It will not be polite about it.',
      },
      {
        type: 'paragraph',
        text: 'What actually works:',
      },
      {
        type: 'code',
        language: 'mermaid',
        filename: 'webhook-pipeline.mmd',
        code:
          'sequenceDiagram\n' +
          '    participant P as Provider (PayMob / APS)\n' +
          '    participant W as Webhook Endpoint\n' +
          '    participant Q as BullMQ Queue\n' +
          '    participant J as Worker\n' +
          '    participant DB as MongoDB\n' +
          '    participant L as Ledger\n\n' +
          '    P->>W: POST webhook payload\n' +
          '    W->>W: Verify HMAC / signature (raw body)\n' +
          '    alt invalid signature\n' +
          '        W-->>P: 401\n' +
          '    else valid\n' +
          '        W->>Q: Enqueue, jobId = provider txn id\n' +
          '        W-->>P: 200 within milliseconds\n' +
          '    end\n' +
          '    Q->>J: Deliver job (deduped by jobId)\n' +
          '    J->>DB: Atomic state transition\n' +
          '    alt transition valid\n' +
          '        J->>L: Append ledger entry\n' +
          '        J->>Q: Enqueue side effects (email, inventory)\n' +
          '    else transition invalid\n' +
          '        J->>J: Log it, drop it\n' +
          '    end',
      },
      {
        type: 'paragraph',
        text: 'The endpoint does two things: cryptographic verification and enqueueing. That\'s it. Everything else happens in a BullMQ worker.',
      },
      {
        type: 'paragraph',
        text: 'Verification stays synchronous and happens against the raw body, before you trust a single field in the payload. If you enqueue unverified payloads, congratulations, your queue is now an attack surface.',
      },
      {
        type: 'paragraph',
        text: 'The trick I like most here: use the provider\'s transaction ID as the BullMQ job ID. BullMQ dedupes jobs with the same ID, so PayMob\'s retry storm collapses into one job before your handler logic even runs. Idempotency at the queue layer, basically free.',
      },
      {
        type: 'paragraph',
        text: 'There is a real cost, though. Returning 200 now means "received and verified," not "processed." If the worker dies permanently, the provider walks away believing delivery succeeded, and nobody retries anything. That gap is exactly why reconciliation exists — more on that below. I considered going back to synchronous processing once or twice, but coupling your webhook response time to your slowest side effect is a worse deal in every scenario I could come up with.',
      },

      {
        type: 'heading',
        text: 'The outbound side: don\'t trust your own retries either',
      },
      {
        type: 'paragraph',
        text: 'Webhooks cover inbound duplicates. But your own server retrying a capture or refund after a timeout is just as dangerous, and nobody talks about it.',
      },
      {
        type: 'paragraph',
        text: 'The scenario: you call the APS refund API, it times out. Did the refund go through? You genuinely don\'t know. Their behavior under timeout is ambiguous. Retry blindly and you might refund twice — and explaining a double refund to finance is a conversation I\'d like to never have.',
      },
      {
        type: 'paragraph',
        text: 'So before any provider call, I write an operation record keyed by a deterministic idempotency key: intent ID plus operation type plus attempt scope. The retry path checks that record first, then queries the provider for the operation\'s actual status before re-issuing anything. It turns "did I just double-refund someone" from a panic into a database query.',
      },
      {
        type: 'paragraph',
        text: 'Cost: more writes, more state, and you need a cleanup policy for stale records. Cheap insurance.',
      },

      {
        type: 'heading',
        text: 'The ledger, or: your database will lie to you eventually',
      },
      {
        type: 'paragraph',
        text: 'The intent record answers "what is the state right now." It cannot answer "what happened, in what order, according to whom." For that I keep an append-only ledger — every event is a new immutable row referencing the intent. Webhook received? Row. Transition applied? Row. Reconciliation corrected something? Row, tagged as such.',
      },
      {
        type: 'paragraph',
        text: 'The first time PayMob\'s dashboard and my database disagreed about a transaction, the ledger was how I reconstructed what actually happened. Mutable state tells you where you ended up. The ledger tells you how you got there. It\'s also the thing your finance team actually wants when they audit — not the current status, the history.',
      },
      {
        type: 'paragraph',
        text: 'And no, the provider\'s dashboard doesn\'t replace this. Providers prune, paginate, and occasionally revise their own records. The ledger is the only record you control.',
      },
      {
        type: 'paragraph',
        text: 'Could I have gone full event sourcing and derived all state from events? Sure. But replaying events to answer "what\'s the current status" is a lot of machinery for a payments subsystem. The hybrid — intent record for current state, ledger for history — is the pragmatic middle ground, and I haven\'t regretted it.',
      },

      {
        type: 'heading',
        text: 'Reconciliation: the job that catches everyone else\'s mistakes',
      },
      {
        type: 'paragraph',
        text: 'Every layer above has some narrow failure window. A webhook lost after the 200. A worker crash mid-transition. The provider revising a status on their side. Reconciliation is the scheduled job that sweeps up after all of them:',
      },
      {
        type: 'list',
        items: [
          'Pull intents stuck in non-terminal states past a threshold.',
          'Hit the provider\'s transaction inquiry API for ground truth.',
          'Apply corrections through the state machine — no backdoors, corrections are transitions like everything else.',
          'Write a ledger entry tagged as reconciliation-sourced.',
          'Alert on anything it can\'t resolve on its own.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Why pull-based inquiry instead of trusting webhook retries? Because webhook delivery is at-least-once in theory and at-most-once whenever the provider is having a bad day. The inquiry API doesn\'t depend on their delivery infrastructure being healthy.',
      },
      {
        type: 'paragraph',
        text: 'Two things to watch. Inquiry APIs are rate-limited, so the job needs cursor pagination and backoff — don\'t hammer them. And the sneaky one: reconciliation can mask upstream bugs. If it\'s quietly fixing hundreds of intents a day, your webhook pipeline is broken and the job is hiding the evidence. I track the correction rate as a health metric. The day it spikes, something upstream broke.',
      },

      {
        type: 'heading',
        text: 'The stuff that actually bit me',
      },
      {
        type: 'paragraph',
        text: 'Quick field notes, because every comparison post out there stops at a pricing table:',
      },
      {
        type: 'list',
        items: [
          'PayMob\'s HMAC field ordering — the HMAC is computed over a specific concatenation of fields, including booleans serialized as lowercase strings. Get one field wrong and every webhook fails verification with an error message that tells you absolutely nothing. I lost real hours to this.',
          'APS currency-scoped merchant accounts — one account, one currency. Multi-currency means multiple accounts and routing logic in your adapter. Find this out before launch. I almost didn\'t.',
          'Refunds are where the bugs live — PayMob refunds reference the original transaction directly. APS refunds are brand-new operations with their own signature computation and their own response-code space. Whatever time you budgeted for refund testing, double it.',
          'Both sandboxes lie, differently — APS sandbox response codes don\'t cover the full production failure space. PayMob\'s sandbox webhook timing is much gentler than production retry behavior. Fire synthetic duplicate webhooks at your own endpoint before going live — production will do it for you otherwise, at a worse time.',
        ],
      },

      {
        type: 'heading',
        text: 'Wrapping up',
      },
      {
        type: 'paragraph',
        text: 'Nothing here is exotic. Adapters, state machines, queues, ledgers, a reconciliation job — you\'ve seen all of these before. What took me a while to internalize is that payments need all of them at once, because each one covers a failure mode the others can\'t reach. Skip the adapter and provider quirks spread through your codebase. Skip the state machine and races corrupt your data. Skip verify-then-enqueue and retries double-process. Skip the ledger and you can\'t audit anything. Skip reconciliation and every gap above turns into silent data loss.',
      },
      {
        type: 'paragraph',
        text: 'Build all five and something nice happens: PayMob and APS stop being a source of incidents and become what payment infrastructure should be — boring.',
      },
      {
        type: 'paragraph',
        text: 'If you\'ve integrated either of these and hit something I didn\'t cover, I\'d genuinely like to hear about it.',
      },
    ],
  },
  {
    id: 1,
    slug: 'jwt-vs-paseto-tokens',
    ogImage: '/og/blog-jwt-vs-paseto-tokens.png',
    title: 'JWT vs PASETO: Choosing the Right Token for the Job',
    excerpt:
      'I shipped JWT in production, got burned, and switched to PASETO for auth and payments — but the real lesson is token taxonomy: signed vs encrypted vs opaque, and which job each one actually belongs to.',
    metaTitle: 'JWT vs PASETO: Choosing the Right Token Type',
    metaDescription:
      'JWT vs PASETO for auth and payments — signed vs encrypted vs opaque tokens, algorithm safety, revocation, and picking the right token type for each job.',
    category: 'Backend Security',
    date: '2026-05-12',
    updated: '2026-07-09',
    readTime: '14 min read',
    tags: ['Security', 'JWT', 'PASETO', 'Auth', 'Tokens', 'Node.js', 'TypeScript'],
    entities: [
      { name: 'JSON Web Token', sameAs: ['https://en.wikipedia.org/wiki/JSON_Web_Token', 'https://datatracker.ietf.org/doc/html/rfc7519'] },
      { name: 'PASETO', sameAs: ['https://paseto.io', 'https://github.com/paseto-standard/paseto-spec'] },
      { name: 'EdDSA', sameAs: 'https://en.wikipedia.org/wiki/EdDSA' },
      { name: 'Authenticated encryption', sameAs: 'https://en.wikipedia.org/wiki/Authenticated_encryption' },
    ],
    relatedSlugs: ['paymob-amazon-payment-services-integration'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Let me be upfront about something: the way I handle tokens in my own backends is not what most teams do. I use PASETO for both auth and payment tokens. Most of the industry uses JWT for everything. This post is my honest take on why I made that switch, what the real tradeoffs are, and — more importantly — what token format you choose matters far less than whether you are using the right type of token for the job at all.',
      },
      {
        type: 'paragraph',
        text: 'This is my opinion. JWT is not wrong. If your team is already on JWT, uses a maintained library, and has proper algorithm enforcement in place, you are fine. I am not here to tell you to migrate. I am here to explain the reasoning behind my choices and let you decide if any of it applies to your situation.',
      },

      {
        type: 'heading',
        text: 'First, understand what you are actually issuing',
      },
      {
        type: 'paragraph',
        text: 'A token is a portable claim. You encode some data, sign or encrypt it, hand it to a client, and trust it when you see it again — without calling a database. That last part is why tokens are so appealing. It is also why they cause so much damage when misused.',
      },
      {
        type: 'paragraph',
        text: 'There are three fundamentally different things people call "tokens" and they are not interchangeable:',
      },
      {
        type: 'list',
        items: [
          'Signed tokens — the payload is readable by anyone. You are only proving it was not tampered with. JWT (JWS) and PASETO v4.public both fall here.',
          'Encrypted tokens — the payload is hidden. Only someone with the key can read it. JWE and PASETO v4.local fall here.',
          'Opaque tokens — a random string with no embedded claims. You must hit a database to know what it means.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Most developers only know the first category. That is the root of every token security problem I have seen.',
      },

      {
        type: 'heading',
        text: 'JWT — what it actually does well',
      },
      {
        type: 'paragraph',
        text: 'JWT is everywhere because it genuinely solved a real problem at the right moment. When OAuth 2.0 and OpenID Connect became the standard handshake between services, having a universal, self-describing token format was essential. Every API gateway, every identity provider, every load balancer, every auth library in every language understands JWT. That interoperability is not something you throw away lightly — and for most teams, it is the reason JWT is the correct default.',
      },
      {
        type: 'paragraph',
        text: 'Asymmetric JWT — signed with ES256 specifically — works well for distributed systems. Your auth service holds the private key and signs tokens. Every other service holds the public key and verifies them. No shared secret, no service-to-service trust dependency. The JWKS endpoint makes public key discovery and rotation automatic. This is a genuinely well-designed system.',
      },
      {
        type: 'list',
        items: [
          'Universal support — OAuth, OIDC, AWS Cognito, Auth0, Okta, every API gateway. JWT is the lingua franca and that matters.',
          'Asymmetric signing — services verify without holding the signing key.',
          'JWKS — automatic public key discovery and rotation over HTTP. Nothing in the PASETO world has an equivalent.',
          'Standardised claims — iss, sub, aud, exp, iat, jti. Every library validates them.',
          'Tooling — jwt.io, debug middleware, framework plugins. Fifteen years of ecosystem depth.',
        ],
      },

      {
        type: 'heading',
        text: 'JWT — where it gets teams into trouble',
      },
      {
        type: 'paragraph',
        text: 'The JWT spec made one decision that has caused an outsized amount of damage: the signing algorithm is declared inside the token header, by the client. The server is supposed to enforce its own expected algorithm. In practice, many libraries historically did not do that by default. The result was the alg: none attack and the algorithm confusion attack — both of which should not have been possible if the spec had made different choices.',
      },
      {
        type: 'paragraph',
        text: 'These vulnerabilities are largely a 2015 story if you are using a maintained library today. But the underlying design is still there. Algorithm safety in JWT is a code review discipline. You need to remember to set the algorithms allowlist. You need to review every new developer\'s auth middleware. You need library upgrades to not introduce regressions. It is manageable — most production JWT systems are fine — but it is discipline-dependent rather than structurally enforced.',
      },
      {
        type: 'list',
        items: [
          'alg: none attack — declare no algorithm, strip the signature, submit. Fixed in modern libraries but the design is still a footgun.',
          'Algorithm confusion — RS256 server tricked into accepting HS256 where the "secret" is the public key. Same root cause.',
          'Sensitive payload — JWT is signed, not encrypted. The payload is base64url. Anyone who intercepts the token reads your claims. This is the one that surprises junior developers the most.',
          'Long expiry — access tokens set to 24 hours or more because "users hate logging in". Irrevocable without a blocklist you never built.',
        ],
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'jwt.what-not-to-do.ts',
        code:
          '// Real mistakes I have seen in production codebases.\n\n' +
          '// 1. No algorithm enforcement\n' +
          'jwt.verify(token, secret)\n' +
          '// The library accepts whatever alg the token header claims.\n\n' +
          '// 2. Reading claims before verification\n' +
          'const { userId } = JSON.parse(\n' +
          '  Buffer.from(token.split(".")[1], "base64url").toString()\n' +
          ')\n' +
          '// You just trusted an unverified token.\n\n' +
          '// 3. Sensitive data in a signed (not encrypted) token\n' +
          'jwt.sign({ userId, email, plan: "enterprise", cardLastFour: "4242" }, secret)\n' +
          '// base64url is not encryption. Anyone with the token reads this.\n\n' +
          '// 4. HS256 with a weak secret\n' +
          'const secret = process.env.JWT_SECRET ?? "dev-secret"\n' +
          '// Offline brute-forceable from any captured token.\n',
      },
      {
        type: 'paragraph',
        text: 'The correct version of JWT auth is not complicated — it just requires deliberate choices:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'jwt.done-right.ts',
        code:
          "import jwt from 'jsonwebtoken'\n" +
          "import { readFileSync } from 'fs'\n\n" +
          'const privateKey = readFileSync("./keys/ec-private.pem")\n' +
          'const publicKey  = readFileSync("./keys/ec-public.pem")\n\n' +
          'export interface AuthTokenPayload {\n' +
          '  sub:       string\n' +
          '  role:      string\n' +
          '  sessionId: string\n' +
          '  jti:       string\n' +
          '}\n\n' +
          'export function signAuthToken(payload: Omit<AuthTokenPayload, "jti">): string {\n' +
          '  return jwt.sign(\n' +
          '    { ...payload, jti: crypto.randomUUID() },\n' +
          '    privateKey,\n' +
          '    {\n' +
          '      algorithm: "ES256",\n' +
          '      expiresIn:  "15m",\n' +
          '      issuer:    "api.example.com",\n' +
          '      audience:  "web-client",\n' +
          '    }\n' +
          '  )\n' +
          '}\n\n' +
          'export function verifyAuthToken(token: string): AuthTokenPayload {\n' +
          '  return jwt.verify(token, publicKey, {\n' +
          '    algorithms: ["ES256"],   // allowlist — this line is mandatory\n' +
          '    issuer:    "api.example.com",\n' +
          '    audience:  "web-client",\n' +
          '  }) as AuthTokenPayload\n' +
          '}\n',
      },

      {
        type: 'heading',
        text: 'PASETO — why I switched and what it actually fixes',
      },
      {
        type: 'paragraph',
        text: 'I want to be clear: I use PASETO in my own stack. This is not the industry standard and I am not claiming it should be. Most production systems run JWT and they are fine. But when I was building a backend where I controlled every service end to end, I chose PASETO for auth and payments — and here is why.',
      },
      {
        type: 'paragraph',
        text: 'The version and purpose are baked into the token prefix — v4.public, v4.local. A server that calls V4.verify() will only ever process a v4.public token signed with Ed25519. There is no alg field. There is no negotiation. You cannot misconfigure it into an algorithm confusion vulnerability because the footgun literally does not exist in the API. That is the structural guarantee JWT cannot give you.',
      },
      {
        type: 'paragraph',
        text: 'For auth tokens I use PASETO v4.public — Ed25519 signed. It is faster than RSA, the keys are smaller, and the API has one right way to use it. For payment tokens I use PASETO v4.local — XChaCha20-Poly1305 encrypted. Real encryption, not base64. The implicit assertion feature lets me bind the token to the authenticated user ID at the encryption layer, not just as a claim in the payload.',
      },
      {
        type: 'list',
        items: [
          'Algorithm safety by design — version prefix is the algorithm contract. No runtime negotiation, no discipline required.',
          'v4.public uses Ed25519 — faster than RS256, smaller keys than RSA-2048, same asymmetric trust model.',
          'v4.local = real encryption — XChaCha20-Poly1305 authenticated encryption. Payload is ciphertext, not encoded text.',
          'Implicit assertions — bind a token cryptographically to external context without embedding it in the payload.',
          'Simpler API — fewer options means fewer wrong choices.',
        ],
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'paseto.auth.ts',
        code:
          "import { V4 } from 'paseto'\n\n" +
          '// const { secretKey, publicKey } = await V4.generateKey("public", { format: "paserk" })\n\n' +
          'const secretKey = process.env.PASETO_SECRET_KEY!\n' +
          'const publicKey = process.env.PASETO_PUBLIC_KEY!\n\n' +
          'export interface AuthTokenPayload {\n' +
          '  sub:       string\n' +
          '  role:      string\n' +
          '  sessionId: string\n' +
          '}\n\n' +
          'export async function signAuthToken(\n' +
          '  payload: AuthTokenPayload\n' +
          '): Promise<string> {\n' +
          '  return V4.sign(\n' +
          '    { ...payload, iss: "api.example.com", aud: "web-client" },\n' +
          '    secretKey,\n' +
          '    { expiresIn: "15 minutes" }\n' +
          '  )\n' +
          '}\n\n' +
          'export async function verifyAuthToken(\n' +
          '  token: string\n' +
          '): Promise<AuthTokenPayload> {\n' +
          '  const payload = await V4.verify(token, publicKey, {\n' +
          '    issuer:         "api.example.com",\n' +
          '    audience:       "web-client",\n' +
          '    clockTolerance: "1 minute",\n' +
          '  })\n' +
          '  return payload as AuthTokenPayload\n' +
          '}\n',
      },

      {
        type: 'heading',
        text: 'PASETO — the honest reasons most teams do not use it',
      },
      {
        type: 'paragraph',
        text: 'The technical case for PASETO is solid. The adoption reality is not. The main reason most teams stay on JWT has nothing to do with JWT being better — it is ecosystem lock-in. OAuth 2.0, OpenID Connect, AWS Cognito, Auth0, Okta, every API gateway and third-party identity provider speaks JWT. None of them speak PASETO. If you need to integrate with any of those, you are using JWT whether you like it or not.',
      },
      {
        type: 'paragraph',
        text: 'The other barrier is that PASETO is simply not well known. Most developers learned tokens through JWT tutorials. They have never heard of PASETO. The ecosystem is smaller, the tooling is thinner, and when something breaks in production at 2am there are fewer Stack Overflow answers. That is a real cost.',
      },
      {
        type: 'list',
        items: [
          'No OAuth / OIDC support — every major IdP speaks JWT. If you need third-party auth integration, PASETO is not an option.',
          'No JWKS equivalent — public key discovery is something you build yourself. JWT solved this years ago.',
          'v4.local key distribution — symmetric key needs to reach every decrypting service. Wider key distribution = wider blast radius.',
          'Small ecosystem — fewer libraries, fewer developers with production experience, less tooling.',
          'Switching cost — teams already on JWT have working systems. Migrating for a structural improvement is a hard sell.',
        ],
      },
      {
        type: 'paragraph',
        text: 'I use PASETO because I built systems from scratch where I controlled every service and had no third-party IdP requirements. If your situation is different — and for most teams it is — JWT done properly is the right call.',
      },

      {
        type: 'heading',
        text: 'The more important conversation — token taxonomy',
      },
      {
        type: 'paragraph',
        text: 'JWT vs PASETO is honestly the less interesting debate. The damage I see most often in production is not teams using the wrong format — it is teams using the right format for the wrong job. A signed stateless token used where an opaque revocable one was needed. That mistake costs you regardless of whether the token is JWT or PASETO.',
      },

      {
        type: 'heading',
        text: 'Auth tokens — short-lived, asymmetrically signed',
      },
      {
        type: 'paragraph',
        text: 'I use PASETO v4.public here. Most teams use JWT ES256. Both are valid if done correctly — 15 minutes maximum, asymmetric signing, no sensitive data in the payload, a jti for revocation. The difference is structural vs disciplinary algorithm safety. Pick whichever fits your stack.',
      },
      {
        type: 'list',
        items: [
          'JWT ES256 if you need OAuth / OIDC / third-party IdP integration.',
          'PASETO v4.public if you own the full stack and want algorithm safety by construction.',
          '15 minute expiry. Not one hour. Not one day.',
          'Payload: sub, role, sessionId. Nothing you would be embarrassed to see in a log.',
        ],
      },

      {
        type: 'heading',
        text: 'Refresh tokens — opaque, always',
      },
      {
        type: 'paragraph',
        text: 'This one is not a matter of opinion. Refresh tokens should not be JWT. They should not be PASETO. They should be a cryptographically random string stored as a hashed row in your database. The entire point of a refresh token is that you can revoke it. A stateless token cannot be revoked without a blocklist, and if you need a blocklist you have already defeated the purpose of going stateless. Use the database.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'refresh-token.service.ts',
        code:
          "import crypto from 'crypto'\n\n" +
          'export function generateRefreshToken() {\n' +
          '  const raw    = crypto.randomBytes(48).toString("base64url")\n' +
          '  const hashed = crypto.createHash("sha256").update(raw).digest("hex")\n' +
          '  return { raw, hashed }\n' +
          '  // Store hashed in DB. Send raw to client via HttpOnly Secure cookie.\n' +
          '  // You will never see the raw value again — just like a password.\n' +
          '}\n\n' +
          '// On rotation: delete the old row, insert a new one.\n' +
          '// If a rotated token comes back in, that is a replay — revoke the session immediately.\n',
      },

      {
        type: 'heading',
        text: 'Payment tokens — encrypted, always',
      },
      {
        type: 'paragraph',
        text: 'This is where I feel most strongly. Payment tokens carry order amounts, PSP card tokens, idempotency keys, merchant references. They should be encrypted — not signed. Most teams sign a JWT with the payment details in the payload and call it done. That payload is base64url. It is not encrypted. Anyone who captures that token in transit, in a log, or in a browser history can read exactly what is in it.',
      },
      {
        type: 'paragraph',
        text: 'I use PASETO v4.local here. The payload is XChaCha20-Poly1305 encrypted. Only the payment service holds the symmetric key. The implicit assertion binds the token to the authenticated user ID at the encryption layer — not as a claim in the payload, but mixed into the encryption itself. If someone extracts a payment token and tries to use it in a different user\'s session, the decryption fails. Not an authorization check that can be bypassed — a cryptographic failure.',
      },
      {
        type: 'paragraph',
        text: 'To be honest: most backends do not need this level of precision. But payment data is the highest-value target in most systems and the cost of doing it properly is low once you understand the API.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'payment-token.service.ts',
        code:
          "import { V4 } from 'paseto'\n\n" +
          '// This key lives ONLY in the payment service.\n' +
          '// Not in the API gateway. Not in the order service. Only here.\n' +
          'const paymentKey = process.env.PASETO_PAYMENT_LOCAL_KEY!\n\n' +
          'export interface PaymentTokenPayload {\n' +
          '  orderId:        string\n' +
          '  userId:         string\n' +
          '  amount:         number\n' +
          '  currency:       string\n' +
          '  pspCardToken:   string  // PSP-issued token. Not the raw card number. Ever.\n' +
          '  idempotencyKey: string\n' +
          '}\n\n' +
          'export async function issuePaymentToken(\n' +
          '  payload: PaymentTokenPayload\n' +
          '): Promise<string> {\n' +
          '  return V4.encrypt(\n' +
          '    { ...payload, iss: "payment-service", aud: "payment-service" },\n' +
          '    paymentKey,\n' +
          '    {\n' +
          '      expiresIn: "5 minutes",\n' +
          '      // Mixed into the encryption — not a payload claim.\n' +
          '      // Wrong userId = cryptographic failure, not an authorization check.\n' +
          '      assertion: Buffer.from(payload.userId),\n' +
          '    }\n' +
          '  )\n' +
          '}\n\n' +
          'export async function consumePaymentToken(\n' +
          '  token:  string,\n' +
          '  userId: string  // from the verified auth token\n' +
          '): Promise<PaymentTokenPayload> {\n' +
          '  const payload = await V4.decrypt(token, paymentKey, {\n' +
          '    issuer:    "payment-service",\n' +
          '    audience:  "payment-service",\n' +
          '    assertion: Buffer.from(userId),\n' +
          '  })\n' +
          '  return payload as PaymentTokenPayload\n' +
          '}\n',
      },

      {
        type: 'heading',
        text: 'API keys — prefixed opaque strings',
      },
      {
        type: 'paragraph',
        text: 'API keys need to be revocable instantly. That requires a database row. Stripe figured this out years ago — a prefixed random string (sk_live_, sk_test_), shown once, stored hashed, looked up on every request. Not clever, but correct. JWT and PASETO are the wrong tools here.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'api-key.service.ts',
        code:
          "import crypto from 'crypto'\n\n" +
          "type KeyEnv = 'live' | 'test'\n\n" +
          'export function generateApiKey(env: KeyEnv) {\n' +
          '  const prefix = env === "live" ? "sk_live" : "sk_test"\n' +
          '  const secret = crypto.randomBytes(32).toString("base64url")\n' +
          '  const raw    = `${prefix}_${secret}`\n' +
          '  const hashed = crypto.createHash("sha256").update(raw).digest("hex")\n' +
          '  // Store: { hashed, prefix, scopes, createdAt, lastUsedAt }\n' +
          '  // Return raw once. After this moment it is gone from your system.\n' +
          '  return { raw, hashed, prefix }\n' +
          '}\n\n' +
          'export async function verifyApiKey(\n' +
          '  raw: string,\n' +
          '  db: { findByHash: (h: string) => Promise<{ scopes: string[] } | null> }\n' +
          ') {\n' +
          '  const hashed = crypto.createHash("sha256").update(raw).digest("hex")\n' +
          '  const record = await db.findByHash(hashed)\n' +
          '  if (!record) throw new Error("Invalid API key")\n' +
          '  return record\n' +
          '}\n',
      },

      {
        type: 'heading',
        text: 'Email verification and password reset — also opaque',
      },
      {
        type: 'paragraph',
        text: 'I have seen teams use JWT for password reset links. The argument is "stateless, no database needed." The problem: if a user requests five reset emails, all five tokens are valid until exp. No single-use enforcement, no way to invalidate them when the password changes, no way to expire them early. A random string in a database row, deleted on use. That is it.',
      },
      {
        type: 'list',
        items: [
          '32 bytes of crypto.randomBytes, stored hashed in the DB.',
          'Expiry in the DB row, not the token. You can change it without reissuing.',
          'Delete on successful use. Single-use by default.',
          'Rate-limit issuance — one per user per 5 minutes at minimum.',
        ],
      },

      {
        type: 'heading',
        text: 'Revocation — neither format solves this',
      },
      {
        type: 'paragraph',
        text: 'A stateless token is valid until exp. JWT or PASETO — makes no difference. A user logs out, changes their password, gets suspended — the token does not care. The pragmatic answer is a Redis blocklist keyed by jti with a TTL equal to the token\'s remaining lifetime. One sub-millisecond read per request. Acceptable cost for real-time revocation.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'token-blocklist.ts',
        code:
          "import { Redis } from 'ioredis'\n\n" +
          'const redis = new Redis(process.env.REDIS_URL!)\n\n' +
          'export async function revokeToken(\n' +
          '  jti:       string,\n' +
          '  expiresAt: number\n' +
          '): Promise<void> {\n' +
          '  const ttl = expiresAt - Math.floor(Date.now() / 1000)\n' +
          '  if (ttl > 0) {\n' +
          '    await redis.set(`bl:${jti}`, "1", "EX", ttl)\n' +
          '  }\n' +
          '}\n\n' +
          'export async function isRevoked(jti: string): Promise<boolean> {\n' +
          '  return (await redis.exists(`bl:${jti}`)) === 1\n' +
          '}\n',
      },

      {
        type: 'heading',
        text: 'The decision matrix',
      },
      {
        type: 'list',
        items: [
          'Auth / access token → PASETO v4.public (my choice) or JWT ES256 (industry standard). 15 min. Both valid.',
          'Refresh token → Opaque random string, hashed in DB. Not negotiable.',
          'Payment token → PASETO v4.local (my choice). Encrypted, 5 min, implicit assertion. Most teams use signed JWT — that is the weaker option.',
          'API key → Prefixed opaque string, hashed in DB. Revocable, scoped, shown once.',
          'Email verification / password reset → Opaque random string, hashed in DB. Delete on use.',
          'Service-to-service → JWT ES256 with short expiry and explicit aud per target service.',
        ],
      },

      {
        type: 'heading',
        text: 'What I actually think',
      },
      {
        type: 'paragraph',
        text: 'JWT done properly is not dangerous. ES256, explicit algorithm enforcement, 15 minute expiry, no sensitive payload data, a jti, and a JWKS endpoint — that is a solid foundation and it is what most well-run teams have. The algorithm confusion vulnerabilities are mostly a historical story at this point if you are on a maintained library.',
      },
      {
        type: 'paragraph',
        text: 'I use PASETO because I prefer the algorithm safety to be structural rather than something I have to enforce through code review. And I use PASETO v4.local for payments because payment data should be encrypted, not just signed, and the implicit assertion gives me a cryptographic binding I cannot get from JWT without reaching for JWE — which is a significantly more complex spec.',
      },
      {
        type: 'paragraph',
        text: 'But this is my stack, my choice, and my opinion. PASETO adoption is low not because JWT is better but because switching costs are real and most teams are not in greenfield territory. If you are starting fresh and you own the whole system, I think PASETO is the cleaner choice. If you are integrating with third-party identity providers, you are using JWT and that is fine.',
      },
      {
        type: 'paragraph',
        text: 'Either way — the format is the smaller decision. The bigger one is whether you are using a signed stateless token for a job that needs an opaque revocable one. Refresh tokens that are JWT. Password reset links that are JWT. API keys that are JWT. Get the taxonomy right first. Then worry about JWT vs PASETO.',
      },
    ],
  },
]

export const getBlogBySlug = (slug: string) => blogs.find((blog) => blog.slug === slug)

/** Total word count across all textual blocks — feeds BlogPosting.wordCount for rich results. */
export const blogWordCount = (blog: BlogPost) =>
  blog.blocks.reduce((total, block) => {
    const text =
      block.type === 'paragraph' || block.type === 'heading'
        ? block.text
        : block.type === 'list'
          ? block.items.join(' ')
          : block.code
    return total + text.trim().split(/\s+/).filter(Boolean).length
  }, 0)

/** Reading minutes parsed from `readTime` ("13 min read" → 13), else estimated at 200 wpm. */
export const blogReadMinutes = (blog: BlogPost) => {
  const match = blog.readTime.match(/\d+/)
  return match ? Number(match[0]) : Math.max(1, Math.round(blogWordCount(blog) / 200))
}
