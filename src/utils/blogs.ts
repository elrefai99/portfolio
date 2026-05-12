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

export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  tags: string[]
  blocks: BlogBlock[]
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: 'jwt-vs-paseto-tokens',
    title: 'JWT vs PASETO',
    excerpt:
      'I have shipped JWT in production, gotten burned by it, switched to PASETO for auth and payments, and learned that most teams never question the default.',
    category: 'Backend Security',
    date: '2026-05-12',
    readTime: '14 min read',
    tags: ['Security', 'JWT', 'PASETO', 'Auth', 'Tokens', 'Node.js', 'TypeScript'],
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
  }
]

export const getBlogBySlug = (slug: string) => blogs.find((blog) => blog.slug === slug)
