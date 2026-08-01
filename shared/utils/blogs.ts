export type BlogBlock =
  | {
    type: 'paragraph'
    text: string
  }
  | {
    type: 'heading'
    text: string
    level?: 2 | 3
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

export type BlogEntity = {
  name: string
  sameAs: string | string[]
}

export type BlogFaq = {
  question: string
  answer: string
}

export type BlogHowToStep = {
  name: string
  text: string
  anchor?: string
}

export type BlogHowTo = {
  name: string
  totalTime: string
  tool?: string[]
  supply?: string[]
  steps: BlogHowToStep[]
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
  entities?: BlogEntity[]
  relatedSlugs?: string[]
  blocks: BlogBlock[]
  ogImage?: string
  faq?: BlogFaq[]
  howTo?: BlogHowTo
  proficiencyLevel?: 'Beginner' | 'Expert'
  dependencies?: string[]
}

export const blogs: BlogPost[] = [
  {
    id: 8,
    slug: 'github-actions-build-gate-trigger',
    ogImage: '/og/blog-github-actions-build-gate-trigger.png',
    title: 'GitHub Actions in Production, Part 1: The Build Gate That Wasn\'t Guarding Anything',
    excerpt:
      'A CI workflow that ran on every push to the production branch, went green for months, and protected nothing — because it fired at the same moment as the deploys it was supposed to gate. On the difference between reporting and enforcement, and why the trigger matters more than the steps.',
    metaTitle: 'GitHub Actions CI: Why Your Build Gate Runs Too Late',
    metaDescription:
      'A CI check on push to your production branch reports; a check on pull_request with branch protection enforces. Plus pnpm caching order, frozen lockfiles, and least-privilege permissions.',
    category: 'Cloud & DevOps',
    date: '2026-08-01',
    readTime: '11 min read',
    tags: ['GitHub Actions', 'CI/CD', 'TypeScript', 'pnpm', 'Node.js', 'DevOps', 'Continuous Integration'],
    entities: [
      { name: 'GitHub Actions', sameAs: ['https://en.wikipedia.org/wiki/GitHub', 'https://github.com/features/actions'] },
      { name: 'Continuous integration', sameAs: 'https://en.wikipedia.org/wiki/Continuous_integration' },
      { name: 'TypeScript', sameAs: ['https://en.wikipedia.org/wiki/TypeScript', 'https://www.typescriptlang.org'] },
      { name: 'pnpm', sameAs: 'https://pnpm.io' },
    ],
    relatedSlugs: ['automated-github-releases-tags', 'github-actions-script-injection'],
    faq: [
      {
        question: 'Why is a GitHub Actions check on push different from a check on pull_request?',
        answer:
          'A check triggered by push to your production branch runs after the merge has already happened, so it can only report a failure. A check triggered by pull_request, combined with branch protection, blocks the merge itself. The YAML is nearly identical; only the guarantee differs.',
      },
      {
        question: 'Why must pnpm/action-setup run before actions/setup-node?',
        answer:
          'actions/setup-node with cache set to pnpm shells out to `pnpm store path` to locate the store it caches, so the pnpm binary must already be on PATH. Reversing the two steps produces `Unable to locate executable file: pnpm`, an error that points at the Node step while the real cause is the step below it.',
      },
      {
        question: 'Should CI use pnpm install or pnpm install --frozen-lockfile?',
        answer:
          'Use --frozen-lockfile. Bare `pnpm install` rewrites pnpm-lock.yaml when it has drifted from package.json, so the pipeline validates a dependency tree nobody committed. pnpm defaults the flag to true when CI=true, but stating it explicitly keeps the guarantee when the workflow is copied elsewhere.',
      },
      {
        question: 'What permissions does a build-only GitHub Actions job need?',
        answer:
          'Only `contents: read`. Granting `contents: write` lets the run\'s GITHUB_TOKEN push commits, move tags, and edit releases, and `id-token: write` mints OIDC tokens for cloud federation a compile job never performs. Over-broad permissions blocks usually arrive by copy-paste rather than by decision.',
      },
      {
        question: 'What is the default timeout for a GitHub Actions job?',
        answer:
          'Six hours. A dependency install hanging against an unresponsive registry will hold a runner slot for a full working day before GitHub kills it. Setting timeout-minutes to roughly ten on a job that normally takes ninety seconds turns a silent resource leak into a fast, obvious failure.',
      },
    ],
    proficiencyLevel: 'Expert',
    dependencies: ['Node.js 20+', 'pnpm 9', 'A GitHub repository'],
    blocks: [
      {
        type: 'paragraph',
        text: 'We had a workflow called `test-build.yml`. It ran on every push to `live`, installed dependencies with pnpm, ran `pnpm build`, and went green. It did that for months before I looked at it properly and realised it wasn\'t protecting anything at all.',
      },
      {
        type: 'paragraph',
        text: 'Thirty lines. No test runner, no linter, no coverage threshold. Just a compile.',
      },
      {
        type: 'heading',
        text: 'Introduction',
      },
      {
        type: 'paragraph',
        text: 'I\'m starting the series with this one because it\'s the least impressive workflow I\'ve written and the one I learned the most from. Everything I got wrong here was invisible. The pipeline was green, the deploys worked, nobody complained. The problem was structural, and structural problems don\'t announce themselves.',
      },
      {
        type: 'paragraph',
        text: 'The short version: a build check that runs after the merge isn\'t a gate. It\'s a report. I spent time tuning the steps inside a workflow whose trigger made the steps irrelevant, which is a specific kind of wasted effort that I now watch for.',
      },
      {
        type: 'heading',
        text: 'Why this workflow exists',
      },
      {
        type: 'paragraph',
        text: 'Everything in this stack is TypeScript on Node, and before there was any CI at all, the most common way we broke production wasn\'t a logic bug. It was a build error that only showed up on the server.',
      },
      {
        type: 'paragraph',
        text: 'The shape of it was always the same. Someone renames a field on an interface. Their editor is fine with it because the dev server runs through a transpile-only path that strips types without checking them, so nothing complains locally. They push. The deploy script SSHes into the box, runs `npm run build`, and `tsc` dies on some file they never opened, three imports downstream of the thing they renamed.',
      },
      {
        type: 'paragraph',
        text: 'Now you\'ve got a half-deployed service. The `git pull` worked. `node_modules` is updated. The build output is stale or missing. And you found out about it because the deploy script printed a stack trace at eleven at night.',
      },
      {
        type: 'paragraph',
        text: 'That\'s a bad failure mode, and not because the error is hard to fix. It\'s bad because you\'re not preventing a bad release anymore, you\'re recovering from a partial one. Different problem, much worse timing.',
      },
      {
        type: 'paragraph',
        text: 'So the goal was narrow: prove `tsc` succeeds on a clean checkout with a fresh install, on a machine that isn\'t mine, before that same command runs on a box serving traffic.',
      },
      {
        type: 'paragraph',
        text: 'Notice what\'s not in there. No unit tests. No linting. I scoped it to the failure I was actually having rather than the checks that would look good in a README, and I\'d still defend that. Starting with the check that maps to your real incidents beats starting with the check that maps to your insecurity about not having enough checks.',
      },
      {
        type: 'paragraph',
        text: 'What I won\'t defend is the name. `test-build.yml`, titled "Test Build TypeScript Project", running no tests. That\'s a small lie in a filename, and it costs you the first time someone opens the file expecting a test suite and finds a compile.',
      },
      {
        type: 'heading',
        text: 'Architecture',
      },
      {
        type: 'paragraph',
        text: 'One job, one runner, four steps in a line. No matrix, no fan-out, nothing uploaded.',
      },
      {
        type: 'code',
        language: 'text',
        code:
          'push → live  ──┐\n' +
          '               ├──► ubuntu-latest ──► checkout ──► pnpm ──► node 20 (+cache)\n' +
          'workflow_dispatch ─┘                                            │\n' +
          '                                                                ▼\n' +
          '                                                    pnpm install ──► pnpm build\n' +
          '                                                                       │\n' +
          '                                                        pass ──────────┴────────── fail\n' +
          '                                                          │                          │\n' +
          '                                                   (deploy already                (red X on a\n' +
          '                                                    running in parallel)          commit that\n' +
          '                                                                                  already merged)',
      },
      {
        type: 'paragraph',
        text: 'I drew the flaw into the diagram on purpose. This workflow triggers on `push` to `live`, which is the same event that fires the Docker build, the ECS deploy, the EC2 deploy, and the S3 backup. Six workflows, one event, all starting at the same instant. Nothing connects them.',
      },
      {
        type: 'paragraph',
        text: 'So when the build fails, the deploy is already running. The gate and the thing it\'s supposedly gating are siblings. There\'s no parent-child relationship anywhere in the setup.',
      },
      {
        type: 'paragraph',
        text: 'The obvious response is "make it a required check on pull requests," and that is the right answer, but I want to be honest that it isn\'t free. Branch protection means no direct pushes to `live`, every change goes through a PR, and every hotfix waits for CI to finish before you can merge it. On a two-person team pushing fixes to a live property, that friction is real, and plenty of teams look at it and reasonably decide speed matters more.',
      },
      {
        type: 'paragraph',
        text: 'My actual mistake wasn\'t choosing speed. It was never making the choice. The friction never got weighed, it just never got confronted, and "we didn\'t think about it" is a worse position than either option.',
      },
      {
        type: 'heading',
        text: 'Step-by-step explanation',
      },
      {
        type: 'paragraph',
        text: 'The trigger:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'on:\n' +
          '  push:\n' +
          '    branches: ["live"]\n' +
          '  workflow_dispatch:',
      },
      {
        type: 'paragraph',
        text: '`workflow_dispatch` is the underrated half of that. It puts a manual re-run button on the Actions tab, and the reason that matters is what it replaces. Without it, re-running a pipeline means pushing an empty commit. Every `chore: retrigger CI` sitting in your production branch history is a small permanent tax on `git log` and a landmine for `git bisect`.',
      },
      {
        type: 'paragraph',
        text: 'Runner is `ubuntu-latest`. For a Node compile that\'s correct and I wouldn\'t change it. The floating tag means GitHub upgrades the image underneath me without asking, which is technically a supply chain surface, but this job holds no credentials and touches nothing, so I\'ll take the maintenance saving.',
      },
      {
        type: 'paragraph',
        text: 'Then pnpm before Node, and the order is load-bearing:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- uses: pnpm/action-setup@v4\n' +
          '  with: { version: 9 }\n' +
          '\n' +
          '- uses: actions/setup-node@v4\n' +
          '  with:\n' +
          '    node-version: "20"\n' +
          '    cache: \'pnpm\'',
      },
      {
        type: 'paragraph',
        text: 'People get this backwards constantly. `setup-node` with `cache: \'pnpm\'` shells out to `pnpm store path` to find the content-addressable store it\'s meant to be caching, so pnpm has to already be on `PATH`. Swap those two steps and you get `Error: Unable to locate executable file: pnpm`, which points at the Node setup step while the actual cause is the step below it. I\'ve watched two different people lose twenty minutes to that error message.',
      },
      {
        type: 'paragraph',
        text: 'What you get for the correct ordering is pnpm\'s global store cached against the lockfile hash. On a commit where dependencies haven\'t moved, install drops from tens of seconds to a couple, and because pnpm hard-links out of the store instead of copying files, the restore is cheap in a way that a lot of "cached" installs aren\'t.',
      },
      {
        type: 'paragraph',
        text: 'Then the install itself:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- run: pnpm install',
      },
      {
        type: 'paragraph',
        text: 'This is the line I\'d change first, and it\'s one flag. Bare `pnpm install` will happily rewrite `pnpm-lock.yaml` if the lockfile and `package.json` have drifted apart. In CI that\'s backwards. It means the pipeline quietly resolves a dependency tree that nobody committed, and the build you just validated isn\'t the build anyone else will get.',
      },
      {
        type: 'paragraph',
        text: '`--frozen-lockfile` fails loudly instead of silently fixing it.',
      },
      {
        type: 'paragraph',
        text: 'Now, pnpm does default `--frozen-lockfile` to true when `CI=true`, and GitHub Actions sets that. So in practice this is safer than it reads. I still want it written down. Relying on an implicit environment-dependent default for something that determines whether your build is reproducible feels wrong, and the moment anyone copies this template into a CI system that doesn\'t set `CI`, the protection vanishes without a word.',
      },
      {
        type: 'paragraph',
        text: 'The build:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- run: pnpm build',
      },
      {
        type: 'paragraph',
        text: 'Which runs `tsc` underneath, and that\'s the whole gate. Type checking earns its place here. It won\'t tell you the code does the right thing, but it catches an entire family of refactor breakage that tests routinely miss, and it does it across every file rather than only the paths someone bothered to write assertions for. Tests check the behaviour you thought of. The compiler checks every consumer of every symbol you touched.',
      },
      {
        type: 'paragraph',
        text: 'Last, the permissions:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'permissions:\n' +
          '  contents: write\n' +
          '  id-token: write',
      },
      {
        type: 'paragraph',
        text: 'This is too much and I\'d fix it today. A job that checks out code and compiles it needs `contents: read`. `contents: write` hands the run\'s `GITHUB_TOKEN` the ability to push commits, move tags, and edit releases. `id-token: write` mints OIDC tokens for cloud federation that this workflow never does.',
      },
      {
        type: 'paragraph',
        text: 'Neither is exploitable by itself. But the entire argument for least privilege in CI is that you don\'t get to know in advance which package in your dependency tree turns hostile, and `permissions` is about the cheapest control GitHub gives you. There\'s no reason to leave it open.',
      },
      {
        type: 'heading',
        text: 'Interesting implementation details',
      },
      {
        type: 'paragraph',
        text: 'The thing I keep coming back to is that if you\'re only going to run one check on a TypeScript codebase, `tsc` is probably the right one. It needs no fixtures, no test database, no setup. It has close to zero false positive rate, its failures are unambiguous, and it\'s whole-program. That\'s a lot of coverage for `pnpm build`.',
      },
      {
        type: 'paragraph',
        text: 'The other detail worth pulling out is the six-hour default job timeout, which I didn\'t know about for an embarrassingly long time. A `pnpm install` hanging against a wedged registry connection will sit there burning a runner slot for a full working day before GitHub kills it. `timeout-minutes: 10` on a job that normally takes ninety seconds turns a silent resource leak into a fast obvious failure, and it costs one line.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'paragraph',
        text: 'The big one is treating "the build ran" as "the change is safe." A green compile says your types line up. It says nothing about whether the code does what it\'s supposed to. Naming the workflow "Test Build" actively invites that confusion, including from the person who wrote it, which in this case was me.',
      },
      {
        type: 'paragraph',
        text: 'Second is the one this whole article is about: putting the gate downstream of the merge. A check on `push: live` is reporting. A check on `pull_request` with branch protection is enforcement. The YAML is nearly identical and the guarantee isn\'t remotely the same.',
      },
      {
        type: 'paragraph',
        text: 'Then there\'s the `setup-node` ordering, where the error message misdirects you. Bare `install` in CI, where lockfile drift resolves silently instead of failing. And copying `permissions` blocks between workflows, which is how least privilege actually decays in practice. Nobody decides to over-permission a job. They paste a block from a workflow that needed it into one that doesn\'t, and nothing breaks, so nobody removes it.',
      },
      {
        type: 'paragraph',
        text: 'One that\'s subtler: assuming a cache hit means a correct cache. `cache: \'pnpm\'` keys on the lockfile hash, so if you\'re not enforcing the lockfile, you can end up restoring a store built from a resolution that no longer matches what you\'re about to install.',
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'Design the trigger before you design the steps. I put real thought into the pnpm and Node ordering and zero thought into whether `push: live` was the right event, and the trigger made all of that careful work decorative. Now the first question I answer for any new workflow is what it\'s allowed to prevent, and everything else follows from that.',
      },
      {
        type: 'paragraph',
        text: 'Scope to your real incidents, then be honest about what you scoped to. Building a compile-only gate because compile errors were the actual problem was fine engineering. Calling the result "test-build" wasn\'t. Names are the cheapest documentation you\'ll ever write, and vague ones are how a team ends up believing it has coverage it doesn\'t have.',
      },
      {
        type: 'paragraph',
        text: 'The cheapest controls are the ones you skip. `permissions: contents: read`. `timeout-minutes: 10`. `--frozen-lockfile`. Three lines, no ongoing maintenance, real risk reduction. They get skipped because nothing visibly breaks without them, which is exactly the property that makes them worth adding deliberately rather than waiting to need them.',
      },
      {
        type: 'paragraph',
        text: 'And a fast pipeline is a pipeline people actually use. The store cache isn\'t a micro-optimisation. Once CI takes more than a couple of minutes, people stop waiting for it before they merge, and a check nobody waits for has stopped being a check.',
      },
      {
        type: 'heading',
        text: 'Production considerations',
      },
      {
        type: 'paragraph',
        text: 'The ordering problem has a middle path I didn\'t see at first. Running the gate in parallel with the deploys is fast and wrong. Chaining everything with `needs:` is correct and serialises your deploy behind a compile. What actually works is keeping this as a fast PR gate and letting the deploy workflows fire unconditionally on `live`, because if the merge was already blocked by the PR check, the code reaching `live` has been verified. You get enforcement without adding latency to the deploy path.',
      },
      {
        type: 'paragraph',
        text: 'On secrets: this job doesn\'t touch any, which is why the over-broad `permissions` block is latent rather than active. That distinction is worth sitting with. It\'s fine today because of a property of the job that one added step could change, and nobody\'s going to re-audit the permissions block when they add that step.',
      },
      {
        type: 'paragraph',
        text: 'Cost is real on private repos. Public repos get free minutes, private ones don\'t, and a six-hour ceiling on a job that fires on every push to your production branch is a billing exposure rather than a theoretical one.',
      },
      {
        type: 'paragraph',
        text: 'Supply chain, finally. Every action here is pinned to a major version tag, and tags are mutable. A compromised or force-moved `@v4` executes attacker code inside a job that currently has `contents: write`. Pinning to full commit SHAs with Dependabot handling the bumps removes that entirely and costs you nothing except uglier YAML.',
      },
      {
        type: 'heading',
        text: 'Improvements',
      },
      {
        type: 'paragraph',
        text: 'Roughly in order of what I\'d do first.',
      },
      {
        type: 'paragraph',
        text: 'Move the trigger to `pull_request` and make it a required status check. That\'s the whole thing. It converts the workflow from observation into enforcement and everything below it is detail. Keep `push: live` alongside if you want a post-merge sanity check.',
      },
      {
        type: 'paragraph',
        text: 'Add the checks the name already promises, as separate jobs so the failures are individually readable:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'jobs:\n' +
          '  verify:\n' +
          '    strategy:\n' +
          '      fail-fast: false\n' +
          '      matrix:\n' +
          '        task: [lint, typecheck, test]\n' +
          '    steps:\n' +
          '      # ... setup ...\n' +
          '      - run: pnpm ${{ matrix.task }}',
      },
      {
        type: 'paragraph',
        text: '`fail-fast: false` is the part people leave off. You want every failure from one run, not just whichever one lost the race.',
      },
      {
        type: 'paragraph',
        text: 'Tighten the job contract:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'permissions:\n' +
          '  contents: read\n' +
          'timeout-minutes: 10\n' +
          'concurrency:\n' +
          '  group: ci-${{ github.ref }}\n' +
          '  cancel-in-progress: true',
      },
      {
        type: 'paragraph',
        text: 'The concurrency block kills superseded runs when someone pushes three times in a row, which cuts queue contention and gets you feedback faster on the commit that actually matters.',
      },
      {
        type: 'paragraph',
        text: 'After that: `--frozen-lockfile` explicitly, SHA-pin the actions with Dependabot configured for `github-actions`, and convert the whole thing to a `workflow_call` reusable workflow with `node-version` and `pnpm-version` inputs. That last one matters more than it sounds, because right now this job is copy-pasted across every Node service I run, and every copy diverges the moment someone fixes a bug in one of them and not the others.',
      },
      {
        type: 'paragraph',
        text: 'Then rename it. `ci.yml`, or `build.yml` until it genuinely runs tests. The file is currently writing a cheque it can\'t cash.',
      },
      {
        type: 'paragraph',
        text: 'Next: `release.yml`, which is thirty-two lines and is probably the highest-leverage thing in the whole library.',
      },
    ],
  },
  {
    id: 9,
    slug: 'automated-github-releases-tags',
    ogImage: '/og/blog-automated-github-releases-tags.png',
    title: 'GitHub Actions in Production, Part 2: Thirty-Two Lines That Replaced a Job Nobody Was Doing',
    excerpt:
      'The shortest workflow I have written returns more than pipelines I spent days on. Tag-triggered GitHub Releases with generated notes, why releasing and deploying are different events, and why I deliberately stopped short of full semantic-release automation.',
    metaTitle: 'Automated GitHub Releases from Version Tags (32 Lines)',
    metaDescription:
      'Tag-triggered release automation with generate_release_notes: why tags beat branch triggers for continuously deployed services, the fetch-depth trap, and curating notes with .github/release.yml.',
    category: 'Cloud & DevOps',
    date: '2026-08-01',
    readTime: '10 min read',
    tags: ['GitHub Actions', 'CI/CD', 'Automation', 'Git', 'Semantic Versioning', 'DevOps', 'Release Management'],
    entities: [
      { name: 'GitHub Actions', sameAs: ['https://en.wikipedia.org/wiki/GitHub', 'https://github.com/features/actions'] },
      { name: 'Git', sameAs: ['https://en.wikipedia.org/wiki/Git', 'https://git-scm.com'] },
      { name: 'Software versioning', sameAs: 'https://en.wikipedia.org/wiki/Software_versioning' },
    ],
    relatedSlugs: ['github-actions-build-gate-trigger', 'docker-buildx-caching-github-actions'],
    faq: [
      {
        question: 'Why trigger releases from tags instead of pushes to main?',
        answer:
          'For a continuously deployed service, "is this code live" and "is this a version" are different questions. Code reaches production several times a week; versions get declared far less often, at points where you want a stable reference. Tags keep deployment automatic and versioning deliberate.',
      },
      {
        question: 'Why did my tag push not trigger the release workflow?',
        answer:
          'Plain `git push` does not push tags. You need `git push origin v1.4.0` or `git push --follow-tags`. Nearly every team hits this once, tags, pushes, sees nothing happen, and concludes the workflow is broken. Putting --follow-tags in a written release procedure fixes it permanently.',
      },
      {
        question: 'Does generate_release_notes need fetch-depth: 0 on actions/checkout?',
        answer:
          'No. GitHub computes those notes server-side from the commit graph and merged pull requests, so a shallow clone is fine. Tools that generate changelogs locally, such as semantic-release or git-cliff, do need fetch-depth: 0, and most "my changelog is empty" reports trace back to that.',
      },
      {
        question: 'What happens if you delete and re-push a Git tag?',
        answer:
          'The workflow triggers again and creates a second release for the same version, and anything already pinned to that tag now points at different code. Tags are immutable by convention, so the correct recovery from a bad release is a new patch version rather than a moved tag.',
      },
      {
        question: 'How do you group generated GitHub release notes into sections?',
        answer:
          'Add a .github/release.yml file. GitHub reads it and groups pull requests into titled categories by label, and excludes labels such as dependencies or ci. It turns a flat PR list into a structured changelog without changing the workflow at all.',
      },
    ],
    proficiencyLevel: 'Expert',
    dependencies: ['A GitHub repository', 'Git tags following v*.*.*'],
    blocks: [
      {
        type: 'paragraph',
        text: 'The best workflow I\'ve written is also the shortest one. Three steps, no conditionals, no error handling:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'name: Auto Release on Version Tag\n' +
          '\n' +
          'on:\n' +
          '  push:\n' +
          '    tags: ["v*.*.*"]\n' +
          '\n' +
          'permissions:\n' +
          '  contents: write\n' +
          '\n' +
          'jobs:\n' +
          '  release:\n' +
          '    runs-on: ubuntu-latest\n' +
          '    steps:\n' +
          '      - uses: actions/checkout@v4\n' +
          '      - uses: softprops/action-gh-release@v2\n' +
          '        with:\n' +
          '          tag_name: ${{ github.ref_name }}\n' +
          '          name: Release ${{ github.ref_name }}\n' +
          '          generate_release_notes: true',
      },
      {
        type: 'paragraph',
        text: 'It has never failed. I\'ve never debugged it. It has never woken anyone up. And it took over the one task in our process that was reliably not getting done.',
      },
      {
        type: 'heading',
        text: 'Introduction',
      },
      {
        type: 'paragraph',
        text: 'Most CI/CD writing gravitates toward the complicated stuff, which makes sense because that\'s where the interesting failures are. But a decent chunk of the value I\'ve gotten out of automation came from workflows shaped like this one. Small, boring, and executed every single time without anyone remembering to do it.',
      },
      {
        type: 'paragraph',
        text: 'The engineering in here isn\'t in the YAML. There\'s barely any YAML. It\'s in deciding what event should count as "a release," and that decision took longer than writing the file.',
      },
      {
        type: 'heading',
        text: 'Why this workflow exists',
      },
      {
        type: 'paragraph',
        text: 'Release notes lose every priority argument they\'re ever in. They\'re useful to everybody and urgent to nobody, so they get written when there\'s spare time, and there\'s never spare time. What you end up with is a repo where the tag list is the only changelog and `v2.4.0` tells you precisely one thing, which is that it came after `v2.3.0`.',
      },
      {
        type: 'paragraph',
        text: 'The specific pain that pushed me into building this was support archaeology. Someone reports a bug. You need to know whether the fix is already out. That means finding the commit that fixed it, working out which tag contains it, and then figuring out whether that tag was actually deployed. Step two is `git tag --contains <sha>`, which is fine if you happen to remember it exists and you\'re sitting in front of a clone. Useless to a project manager asking in Slack.',
      },
      {
        type: 'paragraph',
        text: 'The other reason was more conceptual, and I only articulated it later. We had no artifact that said this set of changes is a version we\'re standing behind. The deploy pipeline runs on every push to `live`, so production just moves continuously. "Released" wasn\'t a state anything tracked. It was a vibe.',
      },
      {
        type: 'paragraph',
        text: 'Those two problems shaped the design. Releases had to be explicit, created by a deliberate human act rather than falling out of every merge. And the notes had to be generated, because anything requiring someone to sit down and write prose was going to get skipped. I knew that because it had already been getting skipped for a year.',
      },
      {
        type: 'heading',
        text: 'Architecture',
      },
      {
        type: 'code',
        language: 'text',
        code:
          '   developer                GitHub                    Actions\n' +
          '       │                       │                          │\n' +
          '       │  git tag v1.4.0       │                          │\n' +
          '       │  git push --tags ────►│                          │\n' +
          '       │                       │ ref matches "v*.*.*"     │\n' +
          '       │                       │─────────────────────────►│\n' +
          '       │                       │                          │ checkout\n' +
          '       │                       │                          │ diff tag..previous-tag\n' +
          '       │                       │                          │ collect merged PRs\n' +
          '       │                       │◄─────────────────────────│ POST /releases\n' +
          '       │                       │  (GITHUB_TOKEN,          │\n' +
          '       │                       │   contents: write)       │\n' +
          '       │  ◄── Release page ────│                          │',
      },
      {
        type: 'paragraph',
        text: 'The decision worth defending is tag-triggered rather than branch-triggered.',
      },
      {
        type: 'paragraph',
        text: 'Cutting a release on every push to `main` is common and I think it\'s usually wrong for a service. It smashes together two questions that aren\'t the same question: is this code live, and is this a version. For anything continuously deployed those genuinely differ. Code hits production several times a week. Versions get declared much less often, at moments where you want a stable reference point. Before a risky migration. After a feature lands. When a client integration needs something to pin to.',
      },
      {
        type: 'paragraph',
        text: 'Tags keep those separate. Deployment stays automatic and frequent, versioning stays manual and meaningful.',
      },
      {
        type: 'paragraph',
        text: 'The cost is that a human has to remember to tag, and that cost is real. I\'ll come back to it, because the obvious fix isn\'t one I\'ve taken.',
      },
      {
        type: 'paragraph',
        text: 'The glob is worth a note. `v*.*.*` enforces the shape without enforcing the semantics. `v1.4.0` matches, `v1.4` doesn\'t, `release-4` doesn\'t. `v1.4.0-rc.1` does match, because the pattern isn\'t anchored at the end, which turned out to be convenient. Prereleases flow through the same path. They just don\'t get flagged as prereleases, which I\'ll get to.',
      },
      {
        type: 'heading',
        text: 'Step-by-step explanation',
      },
      {
        type: 'paragraph',
        text: 'Two things about the trigger that bite people.',
      },
      {
        type: 'paragraph',
        text: 'It\'s a glob, not a regex. `*` in Actions ref filters doesn\'t cross `/` but matches basically everything else, including letters. So `v*.*.*` will cheerfully match `vfoo.bar.baz`. If you actually care about SemVer, validate it in a step rather than trusting the filter to do it.',
      },
      {
        type: 'paragraph',
        text: 'And `git push` doesn\'t push tags. You need `git push origin v1.4.0` or `git push --follow-tags`. Everyone hits this exactly once: they tag, they push, nothing happens, and they conclude the workflow is broken. Putting `--follow-tags` in a written release procedure fixes it permanently.',
      },
      {
        type: 'paragraph',
        text: 'The permissions block:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'permissions:\n' +
          '  contents: write',
      },
      {
        type: 'paragraph',
        text: 'Here the scope is right and necessary. Creating a release writes to repository contents, and since GitHub moved default token permissions to read-only for new repos, dropping this block gets you a 403 from the release API.',
      },
      {
        type: 'paragraph',
        text: 'That\'s a nice illustration of something I\'ve come to prefer, actually. Declaring `permissions` explicitly beats inheriting the default, because the default varies by repo age and by org policy. A workflow that works in one repository can fail in another for reasons that aren\'t visible in the file. When a setting is required, you\'re forced to think about it. In the build workflow, where it was optional, it got copy-pasted wrong and sat there.',
      },
      {
        type: 'paragraph',
        text: 'Then checkout:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- uses: actions/checkout@v4',
      },
      {
        type: 'paragraph',
        text: 'Here\'s a subtlety I didn\'t know when I wrote this. `generate_release_notes: true` is computed server-side by the GitHub API, not locally from git history. GitHub already has the commit graph and the PR associations, so it doesn\'t need your working tree. The checkout isn\'t strictly required.',
      },
      {
        type: 'paragraph',
        text: 'I keep it anyway, for two reasons. The moment you want to attach a build artifact, a changelog file, or a signature, you need the tree, and this is the natural place for that to go. And `action-gh-release` reads repository context that behaves more predictably with a checkout present. It costs about two seconds. Cutting it to save that would be optimising the wrong axis.',
      },
      {
        type: 'paragraph',
        text: 'The release step:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- uses: softprops/action-gh-release@v2\n' +
          '  with:\n' +
          '    tag_name: ${{ github.ref_name }}\n' +
          '    name: Release ${{ github.ref_name }}\n' +
          '    generate_release_notes: true',
      },
      {
        type: 'paragraph',
        text: '`github.ref_name` on a tag push gives you the bare tag (`v1.4.0`) rather than the full ref, which is why it works directly in both fields. Setting `tag_name` explicitly even though the action can infer it means the workflow still behaves if it ever gets invoked through some other trigger.',
      },
      {
        type: 'paragraph',
        text: '`generate_release_notes` is doing all the work. GitHub walks back from this tag to the previous one, collects the pull requests merged in that range, groups them by label, credits the authors, and adds a "New Contributors" section. The output is genuinely decent.',
      },
      {
        type: 'heading',
        text: 'Interesting implementation details',
      },
      {
        type: 'paragraph',
        text: 'The part I find most interesting is that the quality of the output is entirely downstream of your process. The action doesn\'t parse commits, it reads merged PRs. A team squash-merging with clean titles gets a changelog that reads like someone wrote it. A team merging branches with `fix stuff` and force-pushing to main gets noise.',
      },
      {
        type: 'paragraph',
        text: 'Which produces a feedback loop I didn\'t design and wouldn\'t have predicted. Sloppy PR titles now show up in a public artifact that people look at, so PR titles got better. Not because anyone made a rule. The automation just made the sloppiness visible.',
      },
      {
        type: 'paragraph',
        text: 'Two operational things worth knowing before you need them.',
      },
      {
        type: 'paragraph',
        text: 'Re-running against an existing tag isn\'t cleanly idempotent. Depending on the inputs you\'ll either update the existing release or get an error. Not something you want to discover while re-running a release job at 2am.',
      },
      {
        type: 'paragraph',
        text: 'And deleting a tag then re-pushing it triggers this again and produces a second release for the same version. Since tags are supposed to be immutable references, and something out there may already have pinned to that one, the correct recovery from a bad release is a new patch version. Never a moved tag. I know this because I moved a tag once.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'paragraph',
        text: 'Forgetting to push the tag is the universal one, and it\'s a documentation problem rather than a workflow problem.',
      },
      {
        type: 'paragraph',
        text: 'Omitting `permissions: contents: write` gives you a 403 that reads like an authentication failure when it\'s actually an authorisation failure, which sends people off debugging the wrong thing entirely.',
      },
      {
        type: 'paragraph',
        text: 'The one that catches more experienced people is assuming `fetch-depth: 0` is unnecessary in general. It\'s unnecessary here, specifically because generation happens server-side. Carry that assumption into a `semantic-release` or `git-cliff` setup and you\'ll get empty changelogs, because those tools read local history and `actions/checkout` defaults to a depth-1 clone. A good chunk of the "my changelog is empty" issues on those projects trace back to exactly this. It\'s a landmine sitting one refactor away from this file.',
      },
      {
        type: 'paragraph',
        text: 'Moving tags produces duplicate releases and breaks anyone pinned to them.',
      },
      {
        type: 'paragraph',
        text: 'And nothing in this workflow verifies that the tagged commit ever passed CI. You can tag a broken commit and get a beautiful release page for it, which is a hole I\'ve left open.',
      },
      {
        type: 'paragraph',
        text: 'Last one, which is more of a design opinion: don\'t couple release creation to deployment. Different concerns, different failure modes. Keeping them in separate workflows means a Docker Hub outage can\'t stop you cutting a version.',
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'The value of automation is frequency times friction, not complexity. This workflow is trivial and it returns more than pipelines I\'ve spent days on, because the task it replaced was high-friction, high-frequency, and boring. That\'s exactly the profile humans skip. Complex automation replaces work you\'d have done carefully anyway. Simple automation replaces work you\'d have quietly not done, which is why it wins.',
      },
      {
        type: 'paragraph',
        text: 'Make the machine\'s output depend on the human\'s discipline. Generating notes from PR titles created a loop that improved PR titles. Automation that surfaces the quality of your inputs is worth more than automation that papers over it, and I\'d like to find more places to apply that.',
      },
      {
        type: 'paragraph',
        text: 'Separate "deployed" from "released." For anything continuously deployed those are different states, and collapsing them means you lose the ability to reference a version at all.',
      },
      {
        type: 'heading',
        text: 'Production considerations',
      },
      {
        type: 'paragraph',
        text: 'The thing that gives me slight pause is that this is third-party code running with `contents: write`. `softprops/action-gh-release` is widely used and well maintained, and it\'s still someone else\'s code with write access to my repository. Pin it by commit SHA rather than `@v2`. Tags are mutable, SHAs aren\'t. This is the one workflow in the library where I don\'t think SHA pinning is optional, precisely because the permission is real rather than latent.',
      },
      {
        type: 'paragraph',
        text: 'There\'s no verification that the tagged commit is releasable. In a stricter setup I\'d want the release job to check the CI status for that SHA before publishing, either via `needs:` in a combined workflow or by querying the check-runs API and refusing to publish against a red commit. Right now it trusts the human completely.',
      },
      {
        type: 'paragraph',
        text: 'Prereleases come out undifferentiated. `v1.4.0-rc.1` matches the glob and produces a normal release, so anyone watching for stable versions sees it. Detecting the hyphen and setting `prerelease: true` is a one-liner and prevents a real confusion.',
      },
      {
        type: 'paragraph',
        text: 'And there are no artifacts attached. For a service that\'s fine, because the deployable thing is a container image in ECR, not a tarball on a release page. For anything other people consume, a CLI or a library or something self-hosted, an empty release is a lot less useful, and attaching build output plus checksums is the obvious next move.',
      },
      {
        type: 'heading',
        text: 'Improvements',
      },
      {
        type: 'paragraph',
        text: 'Pin the action to a SHA, with Dependabot on `github-actions` so the pin moves through reviewable PRs instead of silently.',
      },
      {
        type: 'paragraph',
        text: 'Auto-detect prereleases:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- uses: softprops/action-gh-release@<sha>\n' +
          '  with:\n' +
          '    tag_name: ${{ github.ref_name }}\n' +
          '    name: Release ${{ github.ref_name }}\n' +
          '    generate_release_notes: true\n' +
          '    prerelease: ${{ contains(github.ref_name, \'-\') }}',
      },
      {
        type: 'paragraph',
        text: 'One expression, correctly classifies every SemVer prerelease identifier.',
      },
      {
        type: 'paragraph',
        text: 'Validate the tag properly, since the glob accepts non-SemVer strings. A short guard rejecting anything that doesn\'t match `^v[0-9]+\\.[0-9]+\\.[0-9]+(-[0-9A-Za-z.-]+)?$` catches typos like `v1.40` before they become a permanent public release.',
      },
      {
        type: 'paragraph',
        text: 'Gate on green CI by querying check-runs for the tagged SHA. Closes the hole above.',
      },
      {
        type: 'paragraph',
        text: 'The one with the best effort-to-output ratio, though, is curating the generated notes with `.github/release.yml`. GitHub reads that file and uses it to group PRs into sections by label:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'changelog:\n' +
          '  exclude:\n' +
          '    labels: [dependencies, ci]\n' +
          '  categories:\n' +
          '    - title: Breaking Changes\n' +
          '      labels: [breaking]\n' +
          '    - title: Features\n' +
          '      labels: [feature, enhancement]\n' +
          '    - title: Fixes\n' +
          '      labels: [bug, fix]',
      },
      {
        type: 'paragraph',
        text: 'That turns a flat list of PR titles into something structured, and it doesn\'t touch the workflow at all.',
      },
      {
        type: 'paragraph',
        text: 'Attach artifacts and checksums if anything downstream consumes releases rather than images.',
      },
      {
        type: 'paragraph',
        text: 'And then there\'s full automation, which I\'ve deliberately not done. `semantic-release` or release-please can derive the version from Conventional Commits and remove the manual tagging step entirely. I\'ve read the setup guides twice and backed off both times. Manual tagging is the last human checkpoint in a path that is otherwise fully automatic from merge to production, and I value that checkpoint more than I value saving thirty seconds. Automate the tedious part. Keep the decision.',
      },
      {
        type: 'paragraph',
        text: 'Next: `push-docker-hub.yml`, where layer caching saved us minutes per build and a nested expression I never noticed made the whole file invalid.',
      },
    ],
  },
  {
    id: 10,
    slug: 'docker-buildx-caching-github-actions',
    ogImage: '/og/blog-docker-buildx-caching-github-actions.png',
    title: 'GitHub Actions in Production, Part 3: Docker Layer Caching and Graceful Degradation',
    excerpt:
      'A Docker publishing pipeline with my favourite design decision and my most instructive bug four lines apart: credential probing that keeps fork builds useful, BuildKit remote caching that turns multi-minute builds into seconds, and a nested expression that made the whole file invalid.',
    metaTitle: 'Docker Layer Caching in GitHub Actions: A Production Guide',
    metaDescription:
      'BuildKit cache-to mode=max on the GitHub Actions cache backend, credential probing for fork PRs, immutable SHA tags, and the nested-expression bug actionlint would have caught.',
    category: 'Cloud & DevOps',
    date: '2026-08-01',
    readTime: '13 min read',
    tags: ['Docker', 'GitHub Actions', 'BuildKit', 'CI/CD', 'DevOps', 'Containers', 'Supply Chain Security'],
    entities: [
      { name: 'Docker', sameAs: ['https://en.wikipedia.org/wiki/Docker_(software)', 'https://www.docker.com'] },
      { name: 'GitHub Actions', sameAs: ['https://en.wikipedia.org/wiki/GitHub', 'https://github.com/features/actions'] },
      { name: 'Open Container Initiative', sameAs: 'https://en.wikipedia.org/wiki/Open_Container_Initiative' },
    ],
    relatedSlugs: ['ecs-deployment-github-actions', 'github-actions-build-gate-trigger'],
    faq: [
      {
        question: 'Why is my Docker layer cache not working in GitHub Actions?',
        answer:
          'Most often because docker/setup-buildx-action is missing. The type=gha cache backend only exists under BuildKit, so without that step cache-from and cache-to are silently ignored. You get a working build with no caching and no error explaining why it is slow.',
      },
      {
        question: 'What is the difference between cache-to mode=min and mode=max?',
        answer:
          'mode=min caches only the layers present in the final image and discards intermediate stages. On a multi-stage Node build where the expensive stage is a dependency install in a builder that gets thrown away, min caches almost nothing useful. mode=max keeps every stage.',
      },
      {
        question: 'Why should you never deploy the Docker latest tag?',
        answer:
          'latest is a mutable pointer, so two deploys "of the same image" can be different bytes, and nothing records which digest was running. Tag every image with the commit SHA as well, and pin deployments to that immutable tag or to a digest.',
      },
      {
        question: 'Why does comparing a GitHub Actions step output to true always fail?',
        answer:
          'Step outputs are always strings. Writing `if: steps.x.outputs.flag == true` compares a string to a boolean and is always false, so the step silently skips. Compare against the quoted string instead: `== \'true\'`.',
      },
      {
        question: 'What happens when a GitHub Actions workflow references an undefined secret?',
        answer:
          'It interpolates to an empty string rather than raising an error. That makes a misspelled secret name silently disable whatever depended on it while the workflow still reports green, which is why probing for a credential before using it should be paired with a summary that says which path actually ran.',
      },
    ],
    proficiencyLevel: 'Expert',
    dependencies: ['Docker', 'A Dockerfile', 'A container registry account'],
    blocks: [
      {
        type: 'paragraph',
        text: 'This is the workflow I\'d most want to walk someone through in an interview, because it has my favourite decision in the whole library and my most instructive bug sitting about four lines apart.',
      },
      {
        type: 'paragraph',
        text: 'The decision: the pipeline checks whether it has credentials before it tries to use them, and does something useful either way. With Docker Hub secrets set, it builds and pushes. Without them, it still builds, tags locally, and says plainly that it didn\'t push. Someone who forks the repo gets a real build validation instead of a red X caused by a secret they can never have.',
      },
      {
        type: 'paragraph',
        text: 'The bug: the tagging block right underneath uses nested `${{ }}` expressions inside a `format()` call, which isn\'t valid GitHub Actions syntax. It would fail at evaluation time. In a template that never runs in the repository it lives in.',
      },
      {
        type: 'heading',
        text: 'Introduction',
      },
      {
        type: 'paragraph',
        text: 'Both halves are worth writing about. Graceful degradation is a pattern I\'ve since applied in three other places and I think more pipelines should use it. And the bug is a small lesson about template libraries specifically: code that isn\'t executed where it lives will rot, and being careful is not a substitute for running it.',
      },
      {
        type: 'heading',
        text: 'Why this workflow exists',
      },
      {
        type: 'paragraph',
        text: 'Container images are the deploy artifact for most of these services, and moving the build into CI rather than someone\'s laptop solved three separate things.',
      },
      {
        type: 'paragraph',
        text: 'Reproducibility first. An image built on my machine inherits my Docker cache, whatever base image I happened to pull three weeks ago, and my architecture. An image built on a clean runner from a clean checkout is defined by the Dockerfile and the lockfile and nothing else. Once you\'ve spent an afternoon debugging an "it works locally" problem that turned out to be a stale cached layer from a previous month, you stop building release images locally. I\'ve spent that afternoon.',
      },
      {
        type: 'paragraph',
        text: 'Traceability second. "What commit is that container running?" needs an answer, and tagging only `latest` guarantees it doesn\'t have one.',
      },
      {
        type: 'paragraph',
        text: 'And decoupling build from deploy. Publishing to a registry means the image exists independently of any environment. ECS can pull it, a staging box can pull it, a colleague reproducing a bug can pull it, and you can pull it three weeks later to roll back. That decoupling is basically the entire point of a registry, and it\'s why this workflow lives separately from the deploy workflows rather than being a step inside them.',
      },
      {
        type: 'paragraph',
        text: 'The credential probing came from an incident rather than a principle, which is usually how the good patterns arrive. Someone forked a repo, opened a PR, and CI failed because `docker/login-action` got an empty username. GitHub deliberately withholds secrets from `pull_request` runs originating in forks, and that\'s correct behaviour, otherwise anyone could open a PR that modifies the workflow to print your registry token. But the contributor was staring at a failure with no possible fix on their end, and that\'s a rubbish experience.',
      },
      {
        type: 'paragraph',
        text: 'So I restructured it to ask what it can do instead of assuming what it will do.',
      },
      {
        type: 'heading',
        text: 'Architecture',
      },
      {
        type: 'code',
        language: 'text',
        code:
          'push:live / workflow_dispatch\n' +
          '          │\n' +
          '          ▼\n' +
          '    checkout ──► setup-buildx\n' +
          '          │\n' +
          '          ▼\n' +
          '  ┌───────────────────────────┐\n' +
          '  │  probe: is DOCKER_USER    │\n' +
          '  │  secret non-empty?        │\n' +
          '  └────────┬──────────┬───────┘\n' +
          '        yes│          │no\n' +
          '           ▼          ▼\n' +
          '     login to    (skip login)\n' +
          '     Docker Hub       │\n' +
          '           │          │\n' +
          '           └────┬─────┘\n' +
          '                ▼\n' +
          '        docker/build-push-action\n' +
          '        ├── cache-from: type=gha      ◄── restore layers from\n' +
          '        ├── cache-to:   type=gha,max      GitHub\'s cache backend\n' +
          '        ├── build-args: BUILD_DATE, VCS_REF\n' +
          '        └── push: <probe result>\n' +
          '                │\n' +
          '                ▼\n' +
          '        write $GITHUB_STEP_SUMMARY',
      },
      {
        type: 'paragraph',
        text: 'Two properties matter here.',
      },
      {
        type: 'paragraph',
        text: 'The probe result is a step output, not a condition that gets re-evaluated. It runs once, writes `push=true|false` to `$GITHUB_OUTPUT`, and every downstream step reads that one value. Which means the login step, the push flag, and the summary can\'t disagree with each other. That\'s a class of bug I\'ve hit elsewhere, where the same condition is written in three places and one of them drifts during a refactor.',
      },
      {
        type: 'paragraph',
        text: 'And build and push are one step rather than two. `docker/build-push-action` with `push: false` still does the whole build. That\'s the property that makes the degradation work without forking the build logic into a separate no-push branch. One code path, one switch.',
      },
      {
        type: 'heading',
        text: 'Step-by-step explanation',
      },
      {
        type: 'paragraph',
        text: 'Buildx setup first:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- uses: docker/setup-buildx-action@v3',
      },
      {
        type: 'paragraph',
        text: 'This is a prerequisite, not an optimisation, and getting that wrong is a nasty little trap. Buildx installs BuildKit, and the GitHub Actions cache backend (`type=gha`) only exists under BuildKit. Leave this step out and `cache-from`/`cache-to` are silently ignored. You get a working build with zero caching and no error telling you why it\'s slow.',
      },
      {
        type: 'paragraph',
        text: 'Then the probe:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- name: Check DockerHub credentials\n' +
          '  id: check-dockerhub\n' +
          '  run: |\n' +
          '    if [ -n "${{ secrets.DOKCER_USERNAME }}" ]; then\n' +
          '      echo "push=true" >> $GITHUB_OUTPUT\n' +
          '    else\n' +
          '      echo "push=false" >> $GITHUB_OUTPUT\n' +
          '    fi',
      },
      {
        type: 'paragraph',
        text: 'Two things to flag, one embarrassing.',
      },
      {
        type: 'paragraph',
        text: 'The secret name is misspelled. `DOKCER_USERNAME`. It\'s consistent across all four places it appears, so it works, but this is a genuinely dangerous typo. Referencing an undefined secret in Actions isn\'t an error, it interpolates to an empty string. So if someone later "fixes" the spelling in the repository settings without fixing all four references in the YAML, the probe silently returns false and the pipeline stops publishing while still reporting green. A misspelling that fails safe is still a misspelling that\'s going to bite somebody.',
      },
      {
        type: 'paragraph',
        text: 'The second thing is the interpolation. `${{ secrets.… }}` inside a `run:` block gets substituted into the script text before the shell ever sees it. That\'s templating, not variable expansion. For a value I control it\'s harmless, but as a habit it\'s exactly how shell injection vulnerabilities get written, and the safe form costs nothing:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- env:\n' +
          '    DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}\n' +
          '  run: |\n' +
          '    if [ -n "$DOCKER_USERNAME" ]; then …',
      },
      {
        type: 'paragraph',
        text: 'Now the value arrives through the environment as data and the shell never parses it as source. I\'ll come back to this properly in the Discord article, where the same pattern is actually exploitable rather than just untidy.',
      },
      {
        type: 'paragraph',
        text: 'Login, conditionally:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- if: steps.check-dockerhub.outputs.push == \'true\'\n' +
          '  uses: docker/login-action@v2',
      },
      {
        type: 'paragraph',
        text: 'Note the string comparison. Step outputs are always strings, so `== \'true\'`, never `== true`. I\'ve written `== true` and watched a step skip silently more than once.',
      },
      {
        type: 'paragraph',
        text: '`@v2` is also outdated, current is v3. Look at the version spread across this one file: `setup-buildx@v3`, `login-action@v2`, `build-push-action@v4`. Three actions, three different vintages, all added at different times and never revisited. That\'s what Dependabot is for and I didn\'t have it configured.',
      },
      {
        type: 'paragraph',
        text: 'Now the build step, which is where the bug lives:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- uses: docker/build-push-action@v4\n' +
          '  with:\n' +
          '    context: .\n' +
          '    push: ${{ steps.check-dockerhub.outputs.push }}\n' +
          '    tags: |\n' +
          '      ${{ … format(\'{0}/${{project_name}}:latest\', secrets.DOKCER_USERNAME) … }}\n' +
          '    cache-from: type=gha\n' +
          '    cache-to: type=gha,mode=max\n' +
          '    build-args: |\n' +
          '      BUILD_DATE=${{ github.event.head_commit.timestamp }}\n' +
          '      VCS_REF=${{ github.sha }}',
      },
      {
        type: 'paragraph',
        text: 'That tags block is broken twice over.',
      },
      {
        type: 'paragraph',
        text: '`${{project_name}}` isn\'t valid Actions expression syntax. `project_name` isn\'t a context or a named value, and the runner rejects it with `Unrecognized named-value: \'project_name\'`. It\'s meant to be a find-and-replace placeholder, something you swap out before using the template. But it\'s written in syntax that looks like it evaluates, which is the worst possible choice. A placeholder should look like a placeholder. `__PROJECT_NAME__` and nobody\'s confused.',
      },
      {
        type: 'paragraph',
        text: 'And it\'s nested inside `format(…)`, which is already inside a `${{ }}`. Expressions don\'t nest. Everything from the inner `${{` onward gets parsed as part of the outer expression, so it\'s a syntax error regardless of the named-value problem.',
      },
      {
        type: 'paragraph',
        text: 'The fix kills both issues and gets rid of the placeholder entirely:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'env:\n' +
          '  IMAGE_NAME: ${{ github.event.repository.name }}\n' +
          '…\n' +
          '    tags: |\n' +
          '      ${{ steps.check-dockerhub.outputs.push == \'true\'\n' +
          '          && format(\'{0}/{1}:latest\', secrets.DOCKER_USERNAME, env.IMAGE_NAME)\n' +
          '          || format(\'{0}:local\', env.IMAGE_NAME) }}',
      },
      {
        type: 'paragraph',
        text: '`github.event.repository.name` is always right and never needs replacing. A template that derives its values can\'t be deployed half-configured, which is the actual lesson.',
      },
      {
        type: 'paragraph',
        text: 'The caching is the performance story and it\'s the part that works well. `cache-from: type=gha` with `cache-to: type=gha,mode=max` stores BuildKit\'s layer cache in GitHub\'s cache service, so layers survive across runs on ephemeral runners.',
      },
      {
        type: 'paragraph',
        text: '`mode=max` is the flag that matters. The default is `min`, which only caches layers present in the final image and throws away intermediate stages. On a multi-stage Node build, where the expensive stage is `npm ci` running in a builder that gets discarded, `min` caches almost nothing you care about. `mode=max` keeps every stage.',
      },
      {
        type: 'paragraph',
        text: 'On a commit where dependencies haven\'t moved this is the difference between a multi-minute build and a sub-minute one. The trade-off is cache size against GitHub\'s 10GB per-repository budget, and eviction is LRU, so a busy repo running several caching workflows can start thrashing. If that happens, `scope` on the cache config lets you partition per workflow.',
      },
      {
        type: 'paragraph',
        text: 'The build args:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'build-args:\n' +
          '  BUILD_DATE=${{ github.event.head_commit.timestamp }}\n' +
          '  VCS_REF=${{ github.sha }}',
      },
      {
        type: 'paragraph',
        text: 'These follow the OCI annotation convention and make the image self-describing, so `docker inspect` on a mystery container tells you which commit built it and when. Worth knowing that `github.event.head_commit` only exists on `push` events, so on a `workflow_dispatch` run `BUILD_DATE` comes out empty. `github.event.repository.updated_at` or just generating a timestamp is the robust version.',
      },
      {
        type: 'paragraph',
        text: 'The summary step writes markdown to `$GITHUB_STEP_SUMMARY`, which renders on the run page. I think this is badly underused. The difference between reading a rendered table of image tags and expanding six collapsed log groups to hunt for them is real, especially when you\'re triaging something.',
      },
      {
        type: 'paragraph',
        text: 'One flaw though. The summary hardcodes `**Status**: ✅ Build completed successfully`. The step has no `if:` guard and no failure branch, so it only ever runs on success, which means the line is technically accurate and also completely meaningless. It\'s stating a constant, not reporting a result. A summary that can only say "success" is decoration.',
      },
      {
        type: 'heading',
        text: 'Interesting implementation details',
      },
      {
        type: 'paragraph',
        text: 'Graceful degradation generalises further than I expected. The rule is roughly: when a pipeline can\'t do the privileged thing, it should still do the useful thing, and be explicit about which one happened. Applies to signing, deploying, publishing coverage, anywhere a fork or a permission boundary can withhold credentials. The alternative, failing hard on missing secrets, trains people to ignore red builds, and a build status people ignore is worse than no build status at all.',
      },
      {
        type: 'paragraph',
        text: 'The dual tagging is the rollback story. `latest` for convenience, `:${{ github.sha }}` for immutability. `latest` is a moving pointer and should never be the thing production pins to, but as a human-facing convenience sitting next to an immutable tag it earns its place.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'paragraph',
        text: 'Skipping `setup-buildx-action` and then wondering why the caching isn\'t doing anything is the one I\'d bet money on people hitting. No BuildKit, no `type=gha`, no error message.',
      },
      {
        type: 'paragraph',
        text: 'Leaving `cache-to` at the default `min` on a multi-stage build caches the cheap layers and rebuilds the expensive ones on every run, which is close to the worst possible outcome since you\'re paying the cache write cost for nothing.',
      },
      {
        type: 'paragraph',
        text: 'Deploying `latest` in production. It\'s a mutable pointer, two deploys "of the same image" can be different bytes, and immutable digests or SHA tags are the only defensible thing to pin to.',
      },
      {
        type: 'paragraph',
        text: 'Comparing step outputs to booleans. They\'re strings. `== true` is always false.',
      },
      {
        type: 'paragraph',
        text: 'Assuming a misspelled secret errors. It doesn\'t, it\'s empty.',
      },
      {
        type: 'paragraph',
        text: 'Interpolating secrets into shell scripts, which works fine until the day it\'s user-controlled data instead of a secret and then it\'s a vulnerability.',
      },
      {
        type: 'paragraph',
        text: 'Writing placeholders in syntax that looks executable.',
      },
      {
        type: 'paragraph',
        text: 'And hardcoding "success" in a summary, which is reporting your intent rather than the outcome.',
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'Templates that aren\'t executed where they live will rot. The tagging bug survived because this workflow sits in a reference repo with no Dockerfile. It gets copied out and modified before it ever runs, so nothing validates it in place. If I were rebuilding this library from scratch the single most valuable thing I\'d add is a CI job running `actionlint` over every workflow, which catches invalid named-values and nested expressions statically. That one addition would have caught the bug the day I wrote it.',
      },
      {
        type: 'paragraph',
        text: 'A placeholder\'s syntax is part of its contract. Make unreplaced placeholders look obviously unreplaced, or better, derive the value so there\'s nothing to replace and the failure mode doesn\'t exist.',
      },
      {
        type: 'paragraph',
        text: 'Designing for the least-privileged caller improved the pipeline for everyone. That surprised me a bit. The fork PR case felt like an edge case I was accommodating, and it ended up producing a cleaner design than what I had.',
      },
      {
        type: 'paragraph',
        text: 'And version drift is silent debt. Three actions, three vintages, all working. Nothing forces the update, so nothing updates. That\'s precisely the decay Dependabot exists to stop, and I didn\'t have it on.',
      },
      {
        type: 'heading',
        text: 'Production considerations',
      },
      {
        type: 'paragraph',
        text: 'Registry credentials are a supply chain asset and I don\'t think that\'s widely internalised. A leaked Docker Hub push token means someone can publish a malicious `latest` that your infrastructure pulls automatically. Use an access token scoped to a single repository, never a password, and rotate it. Where the registry supports OIDC federation, that removes the stored credential entirely.',
      },
      {
        type: 'paragraph',
        text: 'There\'s no vulnerability scanning. The image ships without anything ever looking at it. A Trivy or Grype step that fails on HIGH or CRITICAL is a few lines and it\'s the most obvious missing control here.',
      },
      {
        type: 'paragraph',
        text: 'No signing, no attestation. Nothing proves this image came out of this pipeline. `build-push-action` v6 will generate SLSA provenance and an SBOM with two flags, and cosign signing is a short extra step.',
      },
      {
        type: 'paragraph',
        text: 'Single architecture, `linux/amd64` only. Deploy to Graviton or hand it to someone on an ARM laptop and it won\'t start. `platforms: linux/amd64,linux/arm64` fixes it, at roughly double the build time when the cache is cold.',
      },
      {
        type: 'paragraph',
        text: 'No concurrency control, which means two quick pushes to `live` race and whichever finishes last wins `latest`. That may not be the newer commit. A `concurrency` group with `cancel-in-progress: true` sorts it.',
      },
      {
        type: 'paragraph',
        text: 'And cache poisoning across branches is a documented attack surface worth reading about. GitHub scopes the cache per branch with fallback to the default branch, which mostly contains it, but layer cache written by a build on a compromised branch is a real vector.',
      },
      {
        type: 'heading',
        text: 'Improvements',
      },
      {
        type: 'paragraph',
        text: 'Fix the tags block and drop the placeholder, using `github.event.repository.name`. That\'s the change that makes the template actually correct rather than nearly correct.',
      },
      {
        type: 'paragraph',
        text: 'Add `actionlint` to CI, because it catches exactly the bug class above:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- run: |\n' +
          '    bash <(curl -s https://raw.githubusercontent.com/rhysd/actionlint/main/scripts/download-actionlint.bash)\n' +
          '    ./actionlint -color',
      },
      {
        type: 'paragraph',
        text: 'Upgrade and SHA-pin everything, with Dependabot managing the bumps.',
      },
      {
        type: 'paragraph',
        text: 'Add concurrency:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'concurrency:\n' +
          '  group: docker-${{ github.ref }}\n' +
          '  cancel-in-progress: true',
      },
      {
        type: 'paragraph',
        text: 'Replace the hand-rolled tag logic with `docker/metadata-action`, which generates semver tags, branch tags, SHA tags and OCI labels from the event context and is far better tested than anything I\'d write:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- id: meta\n' +
          '  uses: docker/metadata-action@v5\n' +
          '  with:\n' +
          '    images: ${{ secrets.DOCKER_USERNAME }}/${{ github.event.repository.name }}\n' +
          '    tags: |\n' +
          '      type=sha,format=long\n' +
          '      type=raw,value=latest,enable={{is_default_branch}}',
      },
      {
        type: 'paragraph',
        text: 'Scan before publishing, with Trivy and `exit-code: 1` on HIGH/CRITICAL, sitting between build and push so a vulnerable image never reaches the registry at all.',
      },
      {
        type: 'paragraph',
        text: 'Generate SBOM and provenance with `sbom: true` and `provenance: mode=max` on v6.',
      },
      {
        type: 'paragraph',
        text: 'Multi-arch via QEMU plus `platforms`.',
      },
      {
        type: 'paragraph',
        text: 'And make the summary honest. Derive the status from the job state instead of asserting it, and add an `if: failure()` branch so a failed build reports as a failed build.',
      },
      {
        type: 'paragraph',
        text: 'Next: `push-ecs.yml`, which contains the one line I\'d defend hardest and a deploy mechanism that only works by accident.',
      },
    ],
  },
  {
    id: 11,
    slug: 'ecs-deployment-github-actions',
    ogImage: '/og/blog-ecs-deployment-github-actions.png',
    title: 'GitHub Actions in Production, Part 4: The Line That Makes a Green Check Mean Something',
    excerpt:
      'Deploying to ECS Fargate from GitHub Actions. Why `aws ecs wait services-stable` is the line I would defend hardest, and why `--force-new-deployment` against a latest tag is a race condition that makes rollback impossible and your running version unknowable.',
    metaTitle: 'Deploy to AWS ECS with GitHub Actions: Avoiding the latest Tag Trap',
    metaDescription:
      'Why --force-new-deployment redeploys the old task definition, how mutable latest tags make concurrent deploys nondeterministic, and how immutable task definition revisions plus OIDC fix it.',
    category: 'Cloud & DevOps',
    date: '2026-08-01',
    readTime: '14 min read',
    tags: ['AWS', 'Amazon ECS', 'Docker', 'GitHub Actions', 'CI/CD', 'DevOps', 'OIDC', 'Fargate'],
    entities: [
      { name: 'Amazon Web Services', sameAs: ['https://en.wikipedia.org/wiki/Amazon_Web_Services', 'https://aws.amazon.com'] },
      { name: 'Docker', sameAs: ['https://en.wikipedia.org/wiki/Docker_(software)', 'https://www.docker.com'] },
      { name: 'OpenID Connect', sameAs: 'https://en.wikipedia.org/wiki/OpenID#OpenID_Connect_(OIDC)' },
    ],
    relatedSlugs: ['ec2-ssh-pm2-zero-downtime-deploy', 'docker-buildx-caching-github-actions', 'aws-ec2-s3-kubernetes-production-deployments'],
    faq: [
      {
        question: 'Does aws ecs update-service --force-new-deployment deploy a new image?',
        answer:
          'No. It starts new tasks using the service\'s currently registered task definition and never changes that definition. It only appears to deploy new code when the task definition references a mutable tag such as latest that you happened to move just beforehand.',
      },
      {
        question: 'Why is deploying through the latest tag a race condition?',
        answer:
          'Two runs started minutes apart both push latest before either calls update-service, so the first run can pull the second run\'s image. The pipeline reports that the first commit deployed when it did not, and nothing anywhere records that the mismatch happened.',
      },
      {
        question: 'What does aws ecs wait services-stable actually check?',
        answer:
          'It polls until the service has one deployment in PRIMARY, the running task count matches the desired count, and tasks are passing health checks. Without it, update-service returns 200 immediately and the job goes green while new tasks are crash-looping in the background.',
      },
      {
        question: 'How do you roll back an ECS deployment?',
        answer:
          'Point the service at a previous task definition revision: `aws ecs update-service --task-definition my-app:41`. That only works if each deploy registered a new revision pinned to an immutable image tag. If your task definition references latest, no previous revision exists to roll back to.',
      },
      {
        question: 'Should GitHub Actions use IAM access keys or OIDC for AWS?',
        answer:
          'OIDC. The runner presents a signed identity token, AWS STS exchanges it for credentials scoped to that job, and the role\'s trust policy constrains which repository and branch may assume it. There is no long-lived stored credential to leak, expire, or forget to rotate.',
      },
    ],
    proficiencyLevel: 'Expert',
    dependencies: ['An AWS account', 'An ECS cluster and service', 'An ECR repository'],
    blocks: [
      {
        type: 'paragraph',
        text: 'There\'s exactly one line in this workflow I\'d defend to the death:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'aws ecs wait services-stable --cluster "$ECS_CLUSTER" --services "$ECS_SERVICE"',
      },
      {
        type: 'paragraph',
        text: 'Everything before it is plumbing. Checkout, build, push, an API call. That line is the difference between a pipeline that starts a deployment and one that confirms a deployment, and it\'s the reason a green check here means containers are running and healthy rather than meaning AWS accepted an HTTP request.',
      },
      {
        type: 'paragraph',
        text: 'There\'s also a design flaw in how the image actually reaches those containers that I didn\'t spot for a long time, and which I\'ve since seen in nearly every ECS pipeline I\'ve looked at. Walking through it is most of this article.',
      },
      {
        type: 'heading',
        text: 'Introduction',
      },
      {
        type: 'paragraph',
        text: 'These services run on ECS Fargate behind a load balancer. This is the most operationally serious workflow in the library, in the sense that it\'s the one that can take a production service down, and it\'s the one I\'ve rewritten the most times.',
      },
      {
        type: 'heading',
        text: 'Why this workflow exists',
      },
      {
        type: 'paragraph',
        text: 'Before the pipeline existed, deploying meant: build locally, push to ECR, open the AWS console, find the service, click Update service, tick Force new deployment, click through three screens, then sit on the Tasks tab hitting refresh to find out whether the new tasks stabilised or crash-looped.',
      },
      {
        type: 'paragraph',
        text: 'Three problems with that, and the tedium is the least of them.',
      },
      {
        type: 'paragraph',
        text: 'It isn\'t reproducible. Which image did you push? Tagged how? Built from which commit? From a working tree that may or may not have had uncommitted changes in it? An hour later nobody knows, including you.',
      },
      {
        type: 'paragraph',
        text: 'It has no failure signal, and this is the one that actually hurt. The console shows a deployment in progress. If the new task definition crashes on startup, and it usually crashes for boring reasons like a missing env var or a migration that hasn\'t run, ECS just retries it. The old tasks keep serving. The deployment sits in `IN_PROGRESS` more or less forever. Unless somebody is watching that tab, the outcome is "we think we deployed and we didn\'t," which is strictly worse than a clean failure because now the whole team believes the change is live and starts reasoning from that.',
      },
      {
        type: 'paragraph',
        text: 'And it doesn\'t work with more than one person. Console deploys can\'t be reviewed, can\'t be audited, and can\'t happen while you\'re asleep.',
      },
      {
        type: 'paragraph',
        text: 'The second requirement was cheap Dockerfile validation on a non-production branch. Finding out your Dockerfile is broken during a production deploy is entirely avoidable. Pushing to `dev` builds the image and stops, with no AWS credentials anywhere in the execution path.',
      },
      {
        type: 'heading',
        text: 'Architecture',
      },
      {
        type: 'code',
        language: 'text',
        code:
          '                    push\n' +
          '                     │\n' +
          '         ┌───────────┴────────────┐\n' +
          '         ▼                        ▼\n' +
          '    branch: dev              branch: live\n' +
          '         │                        │\n' +
          '    docker build             configure-aws-credentials\n' +
          '    (no creds,                    │\n' +
          '     no registry)            amazon-ecr-login\n' +
          '         │                        │\n' +
          '    build summary            docker build + tag (sha, latest)\n' +
          '         │                        │\n' +
          '         ✓                   docker push × 2\n' +
          '                                  │\n' +
          '                             ecs update-service --force-new-deployment\n' +
          '                                  │\n' +
          '                             ecs wait services-stable  ◄── blocks here\n' +
          '                                  │                        until steady state\n' +
          '                             ┌────┴────┐                   or timeout\n' +
          '                             ▼         ▼\n' +
          '                          stable    timeout → job fails',
      },
      {
        type: 'paragraph',
        text: 'One job handling two behaviours via step-level `if:` guards, rather than two files or two jobs.',
      },
      {
        type: 'paragraph',
        text: 'The argument for that: `dev` and `live` share the checkout, the Dockerfile, and the build semantics. Split them into separate files and every fix to the shared part has to happen twice, and the second one gets forgotten. Drift between "the thing that validates" and "the thing that deploys" is how you end up with a build that\'s green on `dev` and dies on `live`.',
      },
      {
        type: 'paragraph',
        text: 'The argument against is also real. A nine-step job where six steps carry `if: github.ref_name == \'live\'` is harder to read than two focused files, and the run log on a `dev` push is mostly skipped steps, which looks broken to anyone who doesn\'t already know the structure. There\'s a cleaner middle ground with a shared reusable workflow and two thin callers, which I\'ll get to.',
      },
      {
        type: 'paragraph',
        text: 'The environment separation here is stronger than it looks, and it\'s worth calling out. On a `dev` push, `configure-aws-credentials` never runs, so AWS credentials are never materialised in the runner environment at all. That\'s not a policy or a convention. It\'s a structural property of the workflow, and structural guarantees survive people editing things in ways that policies don\'t.',
      },
      {
        type: 'heading',
        text: 'Step-by-step explanation',
      },
      {
        type: 'paragraph',
        text: 'Starting with the trigger, which contains a filter that does nothing:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'on:\n' +
          '  push:\n' +
          '    branches: [live, dev]\n' +
          '    paths:\n' +
          '      - \'**\'\n' +
          '      - \'Dockerfile\'',
      },
      {
        type: 'paragraph',
        text: '`\'**\'` matches every file in the repo, so adding `\'Dockerfile\'` is redundant and the filter as a whole is equivalent to having no filter. Harmless, but it reads like there\'s path-based optimisation happening, and there isn\'t. If the intent was "only run when things affecting the image change" it\'d need to be an actual list: `src/**`, `package.json`, `pnpm-lock.yaml`, `Dockerfile`. That\'s meaningful on a monorepo and pure overhead on a single-service repo. I\'d just delete it rather than half-implement it.',
      },
      {
        type: 'paragraph',
        text: 'Environment config:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'env:\n' +
          '  AWS_REGION: us-east-1\n' +
          '  ECR_REPOSITORY: egystay\n' +
          '  ECS_CLUSTER: ${{ secrets.AWS_ECS_CLUSTER }}\n' +
          '  ECS_SERVICE: ${{ secrets.AWS_ECS_SERVICE }}',
      },
      {
        type: 'paragraph',
        text: 'Cluster and service names are stored as secrets, and they aren\'t secrets. They\'re configuration. They show up in CloudTrail and they\'re sitting in your Terraform anyway. GitHub repository variables (`vars.*`) are the right home: same injection mechanism, but visible in the UI and in logs, which makes debugging a failed deploy dramatically less painful than staring at a wall of `***`. Reserve secrets for things that grant access.',
      },
      {
        type: 'paragraph',
        text: 'Also `AWS_REGION: us-east-1` is declared and never used, because the credentials step reads `secrets.AWS_IAM_REGION` instead. Two sources of truth for one value, one of them dead. Small thing, but it\'s the kind of small thing that sends someone down a wrong path at 3am.',
      },
      {
        type: 'paragraph',
        text: 'Dockerfile validation on `dev`:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- name: Check Docker build\n' +
          '  if: github.ref_name == \'dev\'\n' +
          '  run: docker build -t $ECR_REPOSITORY:${{ github.sha }} .',
      },
      {
        type: 'paragraph',
        text: 'Simple and it works. No credentials, no registry, no BuildKit cache, which means a cold build every single time. On a slow Dockerfile that\'s minutes of runner time per push, and adding `setup-buildx-action` with `cache-from: type=gha` here would cost nothing. The Docker Hub workflow in this same repo already does that. Same repo, same image, two different caching strategies, because I wrote them months apart and never went back.',
      },
      {
        type: 'paragraph',
        text: 'Then AWS auth:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- uses: aws-actions/configure-aws-credentials@v4\n' +
          '  with:\n' +
          '    aws-access-key-id: ${{ secrets.AWS_IAM_ACCESS_KEY }}\n' +
          '    aws-secret-access-key: ${{ secrets.AWS_IAM_SECRET_ACCESS_KEY }}',
      },
      {
        type: 'paragraph',
        text: 'This works, and it\'s the first thing I\'d change. Long-lived IAM access keys are permanent credentials living in GitHub\'s secret store. They don\'t expire, they don\'t rotate themselves, and if they leak through a compromised action or an over-permissive trigger or someone debugging with an `env` dump, whoever has them can do whatever that IAM user can do, indefinitely, until a human notices and revokes.',
      },
      {
        type: 'paragraph',
        text: 'GitHub\'s OIDC provider replaces the whole arrangement. The runner presents a signed identity token, AWS STS swaps it for credentials valid only for that job, and the role\'s trust policy constrains which repository and which branch is allowed to assume it. There\'s no stored credential to leak because there\'s no stored credential.',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'permissions:\n' +
          '  id-token: write\n' +
          '  contents: read\n' +
          '\n' +
          '- uses: aws-actions/configure-aws-credentials@v4\n' +
          '  with:\n' +
          '    role-to-assume: arn:aws:iam::<account>:role/github-actions-ecs-deploy\n' +
          '    aws-region: us-east-1',
      },
      {
        type: 'paragraph',
        text: 'One-time IAM setup, removes an entire category of standing risk. There\'s an irony I enjoy here, which is that `test-build.yml` declares `id-token: write` and has no use for it, while this workflow needs it and doesn\'t declare it.',
      },
      {
        type: 'paragraph',
        text: 'Build, tag, push:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .\n' +
          'docker tag  … :$IMAGE_TAG  … :latest\n' +
          'docker push … :$IMAGE_TAG\n' +
          'docker push … :latest',
      },
      {
        type: 'paragraph',
        text: 'Dual tagging again, immutable SHA plus moving `latest`. Right instinct.',
      },
      {
        type: 'paragraph',
        text: 'Then the deploy, and this is the part I got wrong:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'aws ecs update-service --cluster "$ECS_CLUSTER" --service "$ECS_SERVICE" --force-new-deployment',
      },
      {
        type: 'paragraph',
        text: 'What that command actually does is tell ECS to start new tasks using the service\'s currently registered task definition. It does not change the task definition. It does not tell ECS anything about the image you just built.',
      },
      {
        type: 'paragraph',
        text: 'The only reason this deploys your new code is that the task definition presumably references `…:latest`, and you just moved `latest` to point at the new image. So the deploy works as a side effect. Push a tag, then trigger a pull of that tag.',
      },
      {
        type: 'paragraph',
        text: 'Three things go wrong with that.',
      },
      {
        type: 'paragraph',
        text: 'It\'s a race. Two commits merged a couple of minutes apart produce two workflow runs. Run A pushes `latest`, run B pushes `latest`, then run A\'s `update-service` fires and pulls B\'s image. Your pipeline reports that commit A deployed successfully. It didn\'t. Nothing anywhere records that this happened.',
      },
      {
        type: 'paragraph',
        text: 'The deployed version is unknowable from AWS. The task definition says `:latest` and nothing in ECS records which digest that resolved to at pull time. So "what\'s running in production right now" has no reliable answer, and that question always gets asked during an incident.',
      },
      {
        type: 'paragraph',
        text: 'And rollback isn\'t possible through ECS. There\'s no previous task definition revision to go back to, because the revision never changed. Rolling back means re-pushing an old image to `latest` and forcing another deployment, which is mutating a tag to undo a deploy. That\'s the opposite of what you want while production is down.',
      },
      {
        type: 'paragraph',
        text: 'The correct pattern registers a new task definition revision pinned to the immutable SHA tag, then points the service at that revision. AWS ships actions for exactly this:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- id: task-def\n' +
          '  uses: aws-actions/amazon-ecs-render-task-definition@v1\n' +
          '  with:\n' +
          '    task-definition: .aws/task-definition.json\n' +
          '    container-name: api\n' +
          '    image: ${{ steps.build-image.outputs.image }}   # the :sha tag\n' +
          '\n' +
          '- uses: aws-actions/amazon-ecs-deploy-task-definition@v1\n' +
          '  with:\n' +
          '    task-definition: ${{ steps.task-def.outputs.task-definition }}\n' +
          '    service: ${{ vars.ECS_SERVICE }}\n' +
          '    cluster: ${{ vars.ECS_CLUSTER }}\n' +
          '    wait-for-service-stability: true',
      },
      {
        type: 'paragraph',
        text: 'Now every deploy creates an auditable revision bound to exactly one commit, and rollback is `update-service --task-definition my-app:41`. Which you can run from your phone.',
      },
      {
        type: 'paragraph',
        text: 'Then the line that earns the whole workflow:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'aws ecs wait services-stable --cluster "$ECS_CLUSTER" --services "$ECS_SERVICE"',
      },
      {
        type: 'paragraph',
        text: 'This polls until the service has one deployment in `PRIMARY`, running count matches desired count, and tasks are passing health checks. If the new tasks crash-loop, it never reaches stable, the command eventually times out non-zero, and the job goes red.',
      },
      {
        type: 'paragraph',
        text: 'Without it, `update-service` returns immediately with a 200 and the job goes green while your new tasks are failing health checks in the background. The pipeline would be reporting the success of an API call as the success of a deployment. That\'s the failure mode that makes teams stop trusting CI/CD entirely, and once that trust is gone you don\'t get it back cheaply.',
      },
      {
        type: 'paragraph',
        text: 'Worth knowing the default waiter polls every 15 seconds up to 40 times, so about ten minutes. Services with long draining periods or slow health checks can blow through that and fail a deploy that would have succeeded, so it\'s worth tuning against your actual rollout time rather than accepting the default.',
      },
      {
        type: 'paragraph',
        text: 'Last, the summary step, which lies.',
      },
      {
        type: 'paragraph',
        text: 'It has no `if:` guard, so it runs on `dev` too, where it prints `✅ Image pushed to ECR`, an empty `Registry:` field because ECR login never ran, and a SHA tag that exists only on the runner\'s local Docker daemon. Every single `dev` push produces a run page stating something untrue.',
      },
      {
        type: 'paragraph',
        text: 'It also contradicts itself. After `wait services-stable` has already completed the deployment, the summary says "Next Steps: 1. Update ECS task definition 2. Deploy new task/service." That\'s leftover text from an earlier version where the workflow stopped at ECR and I never cleaned it up. A summary claiming the deploy hasn\'t happened, printed after the deploy happened, is worse than having no summary.',
      },
      {
        type: 'heading',
        text: 'Interesting implementation details',
      },
      {
        type: 'paragraph',
        text: 'The structural environment isolation is the thing I\'m happiest with. The `dev` path can\'t reach AWS because the credentials step is guarded, not because a document says it shouldn\'t. Guarantees enforced by structure survive contact with people editing things.',
      },
      {
        type: 'paragraph',
        text: 'And the fact that most of the value of this workflow lives in a command that produces no output and does nothing except refuse to return early still strikes me as funny.',
      },
      {
        type: 'paragraph',
        text: 'Small practical note: the `aws` CLI is preinstalled on GitHub-hosted runners, which is why there\'s no install step. Convenient, and a hidden dependency on the runner image that will surprise you the day you move to self-hosted.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'paragraph',
        text: 'Using `--force-new-deployment` as your deploy mechanism. It redeploys the existing task definition, and if that definition points at a mutable tag then your deploys are racy and your rollbacks are impossible. This is the big one and it\'s everywhere.',
      },
      {
        type: 'paragraph',
        text: 'Skipping the stability wait, so green means "AWS accepted the request" and nothing else.',
      },
      {
        type: 'paragraph',
        text: 'Long-lived IAM keys where OIDC is available.',
      },
      {
        type: 'paragraph',
        text: 'Storing configuration in secrets, which buys you nothing and makes every failed deploy harder to debug.',
      },
      {
        type: 'paragraph',
        text: '`paths: [\'**\']`, a filter that filters nothing.',
      },
      {
        type: 'paragraph',
        text: 'Unguarded summary steps, which will eventually report the wrong thing on whichever branch you weren\'t thinking about when you wrote them.',
      },
      {
        type: 'paragraph',
        text: 'No concurrency group, so two `live` pushes produce overlapping `update-service` calls against the same service.',
      },
      {
        type: 'paragraph',
        text: 'And no rollback path at all. `wait services-stable` detects the failure and then nothing acts on it. ECS\'s deployment circuit breaker will, if you turn it on.',
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'A deploy isn\'t done when the API accepts it. That reframed how I look at every deployment pipeline I encounter now, and the question I ask first is: what does green actually mean here? If the answer is "we sent a request," the pipeline is a notification system wearing a deployment costume.',
      },
      {
        type: 'paragraph',
        text: 'Mutable tags in production configuration are a latent incident waiting for enough traffic. `latest` is fine as a human convenience and disqualifying as a deployment reference. The moment two deploys can overlap, "which image is running" stops having an answer, and that\'s precisely the question you need answered when you can least afford to go looking.',
      },
      {
        type: 'paragraph',
        text: 'Summaries have to be derived, never asserted. Both this workflow and the Docker Hub one hardcode success strings, which is the same bug twice: reporting intent instead of outcome. Any status line that can\'t render "failed" isn\'t reporting anything.',
      },
      {
        type: 'paragraph',
        text: 'And consistency across a library is itself a feature. Two workflows in one repo building the same image with different caching, different tagging, different auth. Each was reasonable on the day it was written. Together they\'re inconsistent, and inconsistency is where the bugs live, because it\'s where your assumptions stop transferring.',
      },
      {
        type: 'heading',
        text: 'Production considerations',
      },
      {
        type: 'paragraph',
        text: 'The deployment circuit breaker is the single most valuable setting here and it isn\'t in the pipeline at all, it\'s service configuration:',
      },
      {
        type: 'code',
        language: 'json',
        code:
          '"deploymentConfiguration": {\n' +
          '  "deploymentCircuitBreaker": { "enable": true, "rollback": true }\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'That turns a detected failure into an automatic recovery. Everything the pipeline does to detect failure is worth more once something acts on it.',
      },
      {
        type: 'paragraph',
        text: 'Database migrations aren\'t addressed anywhere and they\'re the thing most likely to hurt. Rolling deploys mean old and new code run simultaneously for the duration of the rollout. Any schema change has to be backward compatible for that whole window or you get errors from whichever version loses the race. Expand/contract is the standard answer, and it\'s a discipline the pipeline fundamentally can\'t enforce for you.',
      },
      {
        type: 'paragraph',
        text: 'IAM scope matters here more than anywhere else in the library. The deploy role needs `ecr:*` on one repository and `ecs:UpdateService` plus `DescribeServices` on one service. Not `PowerUserAccess`. Deploy credentials are the highest-value target in the entire system.',
      },
      {
        type: 'paragraph',
        text: 'No timeout, so a hung waiter can sit for the six-hour default.',
      },
      {
        type: 'paragraph',
        text: 'And there\'s an observability gap I want to be honest about: the pipeline knows the deploy stabilised. It has no idea whether error rates spiked afterward. Stability is a much weaker signal than health, and this workflow only verifies the former.',
      },
      {
        type: 'heading',
        text: 'Improvements',
      },
      {
        type: 'paragraph',
        text: 'Pin deploys to immutable task definition revisions using `render-task-definition` and `deploy-task-definition`. That single change fixes the race, the auditability, and the rollback story together.',
      },
      {
        type: 'paragraph',
        text: 'Migrate to OIDC and delete the standing credential.',
      },
      {
        type: 'paragraph',
        text: 'Turn on the ECS circuit breaker with rollback.',
      },
      {
        type: 'paragraph',
        text: 'Add concurrency, deliberately without cancellation:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'concurrency:\n' +
          '  group: ecs-deploy-${{ github.ref }}\n' +
          '  cancel-in-progress: false',
      },
      {
        type: 'paragraph',
        text: '`false` matters here. Cancelling a deploy halfway through a rollout is worse than queueing it behind the current one.',
      },
      {
        type: 'paragraph',
        text: 'Guard the summary, derive its content, delete the stale next-steps text, add an `if: failure()` branch.',
      },
      {
        type: 'paragraph',
        text: 'Use GitHub Environments. An `environment: production` on the job gets you required reviewers, deployment history, environment-scoped secrets, and the deployment timeline in the UI. That\'s the piece of real environment management that\'s currently missing, and right now it\'s being approximated with branch names and suffixed secret names.',
      },
      {
        type: 'paragraph',
        text: 'Add layer caching to both build paths so they match the Docker Hub workflow.',
      },
      {
        type: 'paragraph',
        text: 'Move cluster and service to `vars`, delete the dead `AWS_REGION`.',
      },
      {
        type: 'paragraph',
        text: 'Extract the shared parts into a `workflow_call` workflow taking `environment`, `cluster`, `service` and `ecr-repository` inputs, so the dev/live split becomes two five-line callers instead of six `if:` guards scattered through one job.',
      },
      {
        type: 'paragraph',
        text: 'And add a post-deploy smoke test. Curl a health endpoint through the load balancer once the service is stable. Stable tasks and a working service are not the same claim, and I\'d rather the pipeline made the stronger one.',
      },
      {
        type: 'paragraph',
        text: 'Next: `push-ec2.yml`, where the deploy runs over SSH and a heredoc expands variables on the wrong machine.',
      },
    ],
  },
  {
    id: 12,
    slug: 'ec2-ssh-pm2-zero-downtime-deploy',
    ogImage: '/og/blog-ec2-ssh-pm2-zero-downtime-deploy.png',
    title: 'GitHub Actions in Production, Part 5: The Heredoc That Expands on the Wrong Machine',
    excerpt:
      'Deploying a Node service to a single EC2 box over SSH with pm2. Zero downtime comes down to one word, the runner is a control plane rather than a build host, and an unquoted heredoc delimiter means your shell variables resolve on entirely the wrong machine.',
    metaTitle: 'Zero-Downtime EC2 Deploys with GitHub Actions, SSH and pm2',
    metaDescription:
      'Why pm2 reload beats restart, how an unquoted heredoc delimiter expands variables on the runner instead of the server, and why building on the production host caps your reliability.',
    category: 'Cloud & DevOps',
    date: '2026-08-01',
    readTime: '14 min read',
    tags: ['AWS', 'EC2', 'pm2', 'Node.js', 'GitHub Actions', 'SSH', 'DevOps', 'Zero Downtime'],
    entities: [
      { name: 'Amazon Elastic Compute Cloud', sameAs: ['https://en.wikipedia.org/wiki/Amazon_Elastic_Compute_Cloud', 'https://aws.amazon.com/ec2/'] },
      { name: 'Secure Shell', sameAs: 'https://en.wikipedia.org/wiki/Secure_Shell' },
      { name: 'Node.js', sameAs: ['https://en.wikipedia.org/wiki/Node.js', 'https://nodejs.org'] },
    ],
    relatedSlugs: ['ecs-deployment-github-actions', 'snapshot-source-to-s3-threat-model', 'aws-ec2-s3-kubernetes-production-deployments'],
    faq: [
      {
        question: 'What is the difference between pm2 reload and pm2 restart?',
        answer:
          'reload performs a rolling restart across cluster-mode workers, starting a replacement and routing to it before killing the old one, so the listening socket never closes. restart kills every process and starts fresh, dropping in-flight requests. That one word is the entire zero-downtime story on this model.',
      },
      {
        question: 'Why does an unquoted heredoc delimiter break an SSH deploy?',
        answer:
          'With `<< ENDSSH` the runner\'s shell expands every $ in the body before anything reaches the server, so server-side variables resolve locally and command substitution executes on the runner. Quoting it as `<< \'ENDSSH\'` stops local expansion; pass the values you do want as explicit environment variables.',
      },
      {
        question: 'Does pm2 reload alone guarantee zero downtime?',
        answer:
          'Only in cluster mode with more than one instance, and only if the application handles SIGINT and SIGTERM by draining connections. A single fork-mode process still has a gap, and an app that ignores the signal gets hard-killed after kill_timeout, dropping requests anyway.',
      },
      {
        question: 'Why use git fetch and reset --hard instead of git pull when deploying?',
        answer:
          'git pull is fetch plus merge, and merges conflict. On a server anyone has ever edited a file on directly, the pull either fails mid-deploy or produces a merge commit on production. fetch followed by reset --hard makes the server\'s tree exactly match the remote, unconditionally.',
      },
      {
        question: 'Why is running npm install on the production server a problem?',
        answer:
          'Dependency installation is CPU and IO heavy, so on a small instance it competes with the application it is deploying and makes the service slow during every deploy. It is also non-deterministic; npm ci installs exactly the lockfile and fails on drift, which is what a production deploy wants.',
      },
    ],
    proficiencyLevel: 'Expert',
    dependencies: ['An EC2 instance', 'pm2', 'Node.js 20+'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Not everything runs in a container. There are profitable, load-bearing Node services out there running on a single EC2 instance under pm2 behind Nginx, and they\'ll keep running that way for years, because migrating them to ECS costs more than it returns.',
      },
      {
        type: 'paragraph',
        text: 'This workflow deploys to those. It\'s the least fashionable pipeline in the library and, measured by actual traffic served, probably the most important one.',
      },
      {
        type: 'paragraph',
        text: 'It also has the most interesting bug, which is a shell heredoc that expands variables on the runner instead of the server. It works. It has always worked. It\'s one added line away from not working, and the way it breaks is unpleasant.',
      },
      {
        type: 'heading',
        text: 'Introduction',
      },
      {
        type: 'paragraph',
        text: 'The starting point was a procedure in a document. Someone with the PEM file SSHes in, `cd`s to the project directory, pulls, installs, builds, restarts pm2, saves. Six commands in order on the correct host.',
      },
      {
        type: 'paragraph',
        text: 'Everything below is what happened when I tried to turn that into a workflow, and what I\'d do differently now.',
      },
      {
        type: 'heading',
        text: 'Why this workflow exists',
      },
      {
        type: 'paragraph',
        text: 'The failure modes of a documented manual procedure are boringly predictable once you\'ve watched them a few times.',
      },
      {
        type: 'paragraph',
        text: 'Steps get skipped. `pm2 save` is the classic, because nothing breaks when you forget it. Everything works fine right up until the instance reboots and pm2 comes back running a process list from three deploys ago.',
      },
      {
        type: 'paragraph',
        text: 'The wrong verb gets used. `pm2 restart` instead of `pm2 reload`, which drops every in-flight request. Nobody notices at 2pm on a Tuesday with light traffic.',
      },
      {
        type: 'paragraph',
        text: 'The wrong host gets deployed to. Two servers, two similar hostnames, one terminal, one person who\'s been at it since morning.',
      },
      {
        type: 'paragraph',
        text: 'And access becomes the bottleneck. Only people holding a production PEM can deploy, so every deploy queues behind one person\'s availability, which is fine until that person is on a plane.',
      },
      {
        type: 'paragraph',
        text: 'Encoding it fixed all four. Order is fixed, host is derived from the branch, the correct pm2 verb is baked in, and the private key lives in GitHub\'s secret store instead of on laptops.',
      },
      {
        type: 'paragraph',
        text: 'There\'s one constraint that shaped everything else here, and it\'s worth stating plainly: the server is the source of truth for the running code. No registry, no artifact store, no image. Deploying means making the server\'s working tree match the branch and then reloading the process. That constraint drives the good decisions below and all of the bad ones.',
      },
      {
        type: 'heading',
        text: 'Architecture',
      },
      {
        type: 'code',
        language: 'text',
        code:
          '   push: live\n' +
          '       │\n' +
          '       ▼\n' +
          '  ubuntu-latest runner\n' +
          '       │\n' +
          '       │  ── no checkout! ──────────────────┐\n' +
          '       │                                     │ the runner never needs\n' +
          '       ▼                                     │ the source; the server\n' +
          '  write SSH key → ~/.ssh/deploy_key          │ pulls it directly\n' +
          '  chmod 600                                  │\n' +
          '  ssh-keyscan host → known_hosts             │\n' +
          '       │                                     │\n' +
          '       ▼                                     │\n' +
          '  ssh root@host << ENDSSH  ──────────────────┘\n' +
          '       │\n' +
          '       │  ┌─────────────── on the EC2 box ───────────────┐\n' +
          '       │  │  set -e                                       │\n' +
          '       │  │  cd /root/properties                          │\n' +
          '       │  │  git pull origin live                         │\n' +
          '       │  │  npm install                                  │\n' +
          '       │  │  [ -f tsconfig.json ] && npm run build        │\n' +
          '       │  │  pm2 reload ecosystem.config.cjs --only app   │  ◄── zero downtime\n' +
          '       │  │  pm2 save                                     │\n' +
          '       │  └───────────────────────────────────────────────┘\n' +
          '       ▼\n' +
          '  rm -f deploy_key   (if: always())',
      },
      {
        type: 'paragraph',
        text: 'Two things I\'d keep.',
      },
      {
        type: 'paragraph',
        text: 'There\'s no `actions/checkout`. The runner is a control plane here, not a build host. It issues an SSH command and waits while the server fetches its own source from git. Skipping checkout saves time, and more usefully it expresses what the runner\'s job actually is. A lot of SSH deploy workflows check out code they then never touch, which always reads to me like someone pasted a template without asking what each step was for.',
      },
      {
        type: 'paragraph',
        text: 'And the key never persists. Written to the ephemeral runner\'s disk, used, deleted under `if: always()` so a failed deploy still cleans up. Runners get destroyed after the job anyway so this is belt-and-braces, but it\'s the right instinct and `if: always()` on cleanup steps is a habit worth having everywhere.',
      },
      {
        type: 'paragraph',
        text: 'Where it\'s weak: there\'s no artifact. The deployed state is whatever `git pull` plus `npm install` happened to produce on that machine at that moment. Two servers deploying the identical commit can end up with different `node_modules` if some transitive dependency published in between. There\'s no rollback target, no way to answer "what exactly is running," and no atomicity, so if `npm install` dies halfway you have a live server with a half-updated dependency tree serving traffic.',
      },
      {
        type: 'heading',
        text: 'Step-by-step explanation',
      },
      {
        type: 'paragraph',
        text: 'Key setup, which contains a small contradiction:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- run: |\n' +
          '    mkdir -p ~/.ssh\n' +
          '    if [ "${{ github.ref_name }}" = "live" ]; then\n' +
          '      echo "${{ secrets.EC2_SSH_KEY_LIVE }}" > ~/.ssh/deploy_key\n' +
          '      ssh-keyscan -H "${{ secrets.EC2_IP_LIVE_HOST }}" >> ~/.ssh/known_hosts\n' +
          '    else\n' +
          '      …PBE variants…\n' +
          '    fi\n' +
          '    chmod 600 ~/.ssh/deploy_key',
      },
      {
        type: 'paragraph',
        text: '`chmod 600` is required rather than tidy. OpenSSH flatly refuses to use a key file that\'s group or world readable.',
      },
      {
        type: 'paragraph',
        text: 'The `ssh-keyscan` is the interesting part. It fetches the host\'s public key into `known_hosts`, which looks like host verification. But the deploy step then passes `-o StrictHostKeyChecking=no`, which tells SSH not to verify anything. The two cancel out.',
      },
      {
        type: 'paragraph',
        text: 'I want to be precise about what\'s lost, because it\'s less than it first appears. `ssh-keyscan` on a fresh runner is trust-on-first-use against a host you\'ve never seen before, so it isn\'t real verification either. Someone sitting in the middle at scan time poisons the file and you\'re none the wiser. The genuinely secure version pins the host key as a secret:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- run: echo "${{ secrets.EC2_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts',
      },
      {
        type: 'paragraph',
        text: 'and drops `StrictHostKeyChecking=no` entirely, so you\'re comparing against a fingerprint you established out of band. In practice what\'s here is about as safe as most SSH deploy pipelines. It just shouldn\'t look like it\'s doing verification when it isn\'t, because that\'s the kind of thing someone reads quickly and then stops worrying about.',
      },
      {
        type: 'paragraph',
        text: 'There\'s also dead code in the branch selector. The trigger is `branches: ["live"]`, so the entire `else` branch, the whole PBE staging path with its own key and host, is unreachable. The README claims this deploys on push to `live` or `dev`, which means the trigger got narrowed at some point and the body didn\'t. Unreachable conditionals in deploy scripts are worse than dead code elsewhere, because they read as tested paths and nobody checks. Either add `dev` to the trigger or delete the branch.',
      },
      {
        type: 'paragraph',
        text: 'Now the heredoc:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no $HOST << ENDSSH\n' +
          '  set -e\n' +
          '  cd $PROJECT_DIR\n' +
          '  git pull origin ${{ github.ref_name }}\n' +
          '  …\n' +
          'ENDSSH',
      },
      {
        type: 'paragraph',
        text: 'The delimiter is unquoted. `<< ENDSSH`, not `<< \'ENDSSH\'`. That means the runner\'s shell expands every `$…` in the body before a single byte travels over the network.',
      },
      {
        type: 'paragraph',
        text: 'It happens to work. `$PROJECT_DIR` is set on the runner, so it expands to the right path and the server receives a literal `cd /root/properties`. Fine.',
      },
      {
        type: 'paragraph',
        text: 'But it\'s a trap with the safety off, and the trap springs on whoever edits this file next. Add any line referencing a server-side variable, `$HOME`, `$PATH`, `$NODE_ENV`, `$(date)` for a log line, `$(git rev-parse HEAD)` to record what got deployed, and it gets evaluated on the runner instead. `$NODE_ENV` comes out empty. `$(date)` gives you the runner\'s clock. And `$(...)` is arbitrary command execution on the runner, which is currently holding your production SSH key in a file it can read.',
      },
      {
        type: 'paragraph',
        text: 'The robust form quotes the delimiter and passes values deliberately:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'ssh -i ~/.ssh/deploy_key "$HOST" \\\n' +
          '    "PROJECT_DIR=\'$PROJECT_DIR\' REF=\'${{ github.ref_name }}\' bash -s" << \'ENDSSH\'\n' +
          '  set -euo pipefail\n' +
          '  cd "$PROJECT_DIR"\n' +
          '  git fetch --prune origin "$REF"\n' +
          '  git reset --hard "origin/$REF"\n' +
          '  …\n' +
          'ENDSSH',
      },
      {
        type: 'paragraph',
        text: 'Now the boundary is explicit. Quoted delimiter means nothing expands locally, and the values you do want get passed across as environment variables on purpose. This is the change I\'d make first out of everything in this article.',
      },
      {
        type: 'paragraph',
        text: 'One thing that is wired correctly: `set -e` works. The remote shell reads the script from stdin, aborts on first failure, ssh propagates the exit code, the step fails. Fail-fast is fine.',
      },
      {
        type: 'paragraph',
        text: '`git pull` is not fine. It\'s fetch plus merge, and merges conflict. If anyone has ever edited a file directly on the server, and on a box people SSH into somebody has, the pull either fails or produces a merge commit on a production server. `git fetch` followed by `git reset --hard origin/<branch>` is deterministic: the server\'s tree becomes exactly the remote\'s, no negotiation.',
      },
      {
        type: 'paragraph',
        text: 'Then `npm install`, which has two problems stacked on each other.',
      },
      {
        type: 'paragraph',
        text: '`install` rather than `ci`. `npm ci` installs exactly what\'s in the lockfile, wipes `node_modules` first, and fails if they\'ve drifted. `install` mutates the lockfile and resolves fresh versions. On a production deploy you want the deterministic one, obviously, and I don\'t have a good reason for why this says `install` other than that\'s what I type locally.',
      },
      {
        type: 'paragraph',
        text: 'And it runs on the server that\'s currently serving traffic. Dependency installation is CPU and IO heavy. On a small instance it competes directly with the running application, so deploys make the service slow, which is exactly when you don\'t want deploys to feel risky. The image-based workflows in this same library don\'t have this problem at all, because build and run happen on different machines.',
      },
      {
        type: 'paragraph',
        text: 'The conditional build is a bit I still like:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'if [ -f tsconfig.json ]; then npm run build; fi',
      },
      {
        type: 'paragraph',
        text: 'One template serving both JS and TS services without forking. Checking for `tsconfig.json` is a slightly indirect proxy and checking whether a `build` script exists in `package.json` would be more direct, but the intent holds up.',
      },
      {
        type: 'paragraph',
        text: 'Then the good part:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'pm2 reload ecosystem.config.cjs --only ${{project_name}}',
      },
      {
        type: 'paragraph',
        text: '`reload` does a rolling restart across cluster-mode workers. It starts a replacement, waits for it to come up, routes traffic to it, kills the old one, then moves to the next. The listening socket is never closed, so nothing gets refused. `pm2 restart` kills everything and starts fresh, dropping whatever was in flight.',
      },
      {
        type: 'paragraph',
        text: 'That distinction is the entire zero-downtime story on this deployment model, and it\'s one word.',
      },
      {
        type: 'paragraph',
        text: 'Two caveats people miss. Reload only gives you true zero downtime in cluster mode with more than one instance; a single fork-mode process still has a gap while it comes back. And your app has to actually handle `SIGINT`/`SIGTERM` by draining connections, otherwise pm2 hard-kills it after `kill_timeout` and you drop requests anyway. The pipeline can\'t enforce that. The application has to cooperate, and mine didn\'t for the first few months.',
      },
      {
        type: 'paragraph',
        text: '`${{project_name}}` is the same invalid placeholder I wrote about in the Docker Hub article. Not a valid Actions named-value, fails expression evaluation. Deriving it from `github.event.repository.name` or reading the app name out of the ecosystem file removes the manual substitution entirely.',
      },
      {
        type: 'paragraph',
        text: '`pm2 save` persists the process list so `pm2 resurrect` can restore it after a reboot. Forgetting it is how a server comes back from an instance restart running nothing at all, quietly, at whatever hour AWS decided to retire the underlying hardware.',
      },
      {
        type: 'paragraph',
        text: 'Last thing: the deploy runs as `root`. `HOST="root@…"`. Which means the deploy has unrestricted control of the machine. A dedicated `deploy` user owning the project directory, with a narrow sudoers entry if a service restart genuinely needs one, shrinks the blast radius of a leaked key from "the whole box" to "one app directory."',
      },
      {
        type: 'heading',
        text: 'Interesting implementation details',
      },
      {
        type: 'paragraph',
        text: 'The runner-as-control-plane thing is the design I\'d carry forward. No checkout, no build, no artifact, just an authenticated instruction and a wait. It makes the workflow fast regardless of repository size, and it draws a clean line around what each machine is responsible for.',
      },
      {
        type: 'paragraph',
        text: 'The branch-scoped secret naming, `EC2_SSH_KEY_LIVE` next to `EC2_SSH_KEY_PBE`, lets one file serve multiple environments while only ever materialising one environment\'s credentials per run. GitHub Environments do this properly, with approval gates and an audit trail. As a zero-infrastructure approximation it\'s sound.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'paragraph',
        text: 'Unquoted heredoc delimiters, where the expansion silently happens on the wrong machine and the failure mode escalates from "wrong value in a log line" to "code execution on the CI runner holding your production key."',
      },
      {
        type: 'paragraph',
        text: '`pm2 restart` where `reload` belongs.',
      },
      {
        type: 'paragraph',
        text: 'Forgetting `pm2 save`, which works until it very much doesn\'t.',
      },
      {
        type: 'paragraph',
        text: 'Running `ssh-keyscan` and then `StrictHostKeyChecking=no`, which is theatre. Pick one.',
      },
      {
        type: 'paragraph',
        text: '`git pull` on a server people have SSHed into.',
      },
      {
        type: 'paragraph',
        text: '`npm install` where `npm ci` belongs.',
      },
      {
        type: 'paragraph',
        text: 'Deploying as root because it was easiest on day one.',
      },
      {
        type: 'paragraph',
        text: 'Building on the production host, so your deploys degrade the service they\'re deploying.',
      },
      {
        type: 'paragraph',
        text: 'No concurrency group, and this is the one workflow where a race actually corrupts state rather than just confusing you. Two overlapping deploys running `git pull` and `npm install` in the same directory at the same time is genuinely destructive.',
      },
      {
        type: 'paragraph',
        text: 'And no timeout, so a hung SSH connection sits there for six hours.',
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'Know which machine your shell is running on. That\'s the sharpest lesson in this whole series for me. In a workflow spanning a runner and a server, every single line carries an implicit "where does this evaluate," and the syntax answering that question is one quote character that\'s easy to leave off and impossible to notice afterward. Quote the delimiter by default. Unquote only where you mean to inject something.',
      },
      {
        type: 'paragraph',
        text: 'Zero downtime turned out to be one word, decided once, and invisible until a deploy lands during real traffic.',
      },
      {
        type: 'paragraph',
        text: 'Convenience defaults compound. `root` because it was easiest. `StrictHostKeyChecking=no` because a fingerprint prompt blocked a run once and I was in a hurry. `install` because that\'s what I type. Each one individually defensible in the moment, and collectively a deploy path with full machine access, no host verification, and non-deterministic dependencies.',
      },
      {
        type: 'paragraph',
        text: 'And your deploy model sets a ceiling on your reliability. Pull-and-build-on-server can\'t give you atomic deploys, instant rollback, or artifact immutability. Not because I implemented it badly, but because there\'s no artifact to roll back to. Recognising a ceiling is more useful than polishing underneath it, and it took me a while to stop polishing.',
      },
      {
        type: 'heading',
        text: 'Production considerations',
      },
      {
        type: 'paragraph',
        text: 'Rollback is manual and slow. Recovery means SSHing in, `git reset --hard <previous-sha>`, reinstalling, reloading, all while the service is degraded and someone is asking for updates. The classic fix on this model is timestamped release directories with a `current` symlink and an atomic swap, which makes rollback a symlink change plus a reload. That\'s the Capistrano pattern and it\'s still the right answer for VM deploys twenty years later.',
      },
      {
        type: 'paragraph',
        text: 'One instance, one deploy target, no load balancer. The reload is the only availability mechanism there is.',
      },
      {
        type: 'paragraph',
        text: 'Migrations are unaddressed, same as ECS, but worse here because reload means old and new code genuinely overlap with no orchestrator managing the transition.',
      },
      {
        type: 'paragraph',
        text: 'Secret rotation is a real gap. A long-lived root SSH key in GitHub secrets has no expiry. On AWS specifically there\'s a strictly better answer: Systems Manager Session Manager removes the key entirely. The runner authenticates with IAM, ideally via OIDC, SSM brokers the session, and every session is logged in CloudTrail. No persistent credential exists.',
      },
      {
        type: 'paragraph',
        text: 'And there\'s no health check after the reload. pm2 reports that the process started. It doesn\'t report that the app is answering requests. A `curl -fsS localhost:PORT/health` with a retry loop would catch a process that boots successfully and then immediately fails on a bad config value, which is a thing that has happened to me.',
      },
      {
        type: 'heading',
        text: 'Improvements',
      },
      {
        type: 'paragraph',
        text: 'Quote the heredoc delimiter and pass variables explicitly. Highest value, smallest diff.',
      },
      {
        type: 'paragraph',
        text: 'Add concurrency, without cancellation:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'concurrency:\n' +
          '  group: ec2-deploy-${{ github.ref }}\n' +
          '  cancel-in-progress: false',
      },
      {
        type: 'paragraph',
        text: 'Never cancel a running deploy on this model. Queue it.',
      },
      {
        type: 'paragraph',
        text: 'Swap `git pull` for `git fetch` plus `git reset --hard`. Swap `npm install` for `npm ci`.',
      },
      {
        type: 'paragraph',
        text: 'Add a post-reload health check with retries and fail the job if it doesn\'t pass.',
      },
      {
        type: 'paragraph',
        text: 'Deploy as a non-root user. Pin the host key as a secret and drop `StrictHostKeyChecking=no`. Add `timeout-minutes: 15`.',
      },
      {
        type: 'paragraph',
        text: 'Delete the dead staging branch, or enable it properly with GitHub Environments rather than suffixed secret names.',
      },
      {
        type: 'paragraph',
        text: 'Move to release directories with an atomic symlink swap so rollback is instant and deploys stop mutating the live tree in place.',
      },
      {
        type: 'paragraph',
        text: 'And the bigger one, longer term: build the artifact in CI. Build on the runner, ship a tarball or a container, let the server only unpack and reload. That takes install-time load off production, makes deploys deterministic, and finally gives you something to roll back to. It closes most of the gap with the container workflows without having to leave the VM model behind, which for these services is the right trade.',
      },
      {
        type: 'paragraph',
        text: 'Next: `push-s3.yml`, and the uncomfortable question of what a backup is actually protecting you from.',
      },
    ],
  },
  {
    id: 13,
    slug: 'snapshot-source-to-s3-threat-model',
    ogImage: '/og/blog-snapshot-source-to-s3-threat-model.png',
    title: 'GitHub Actions in Production, Part 6: What Is This Backup Actually Protecting Me From?',
    excerpt:
      'A workflow that zips the repository to S3 on every push, and the uncomfortable question underneath it: git already backs up your code. On provider independence as the real threat model, why the cadence was wrong, and why a backup you have never restored from is a hypothesis.',
    metaTitle: 'S3 Backup Automation: What Are You Actually Protecting Against?',
    metaDescription:
      'Why source snapshots to S3 are about provider independence rather than disaster recovery, why excluding .env leaves a documented restore gap, and why Object Lock matters for backup buckets.',
    category: 'Cloud & DevOps',
    date: '2026-08-01',
    readTime: '11 min read',
    tags: ['AWS', 'Amazon S3', 'GitHub Actions', 'Backup', 'Disaster Recovery', 'DevOps', 'Cloud Security'],
    entities: [
      { name: 'Amazon S3', sameAs: ['https://en.wikipedia.org/wiki/Amazon_S3', 'https://aws.amazon.com/s3/'] },
      { name: 'Backup', sameAs: 'https://en.wikipedia.org/wiki/Backup' },
      { name: 'Git', sameAs: ['https://en.wikipedia.org/wiki/Git', 'https://git-scm.com'] },
    ],
    relatedSlugs: ['ec2-ssh-pm2-zero-downtime-deploy', 'nodejs-pino-s3-log-archiving-cron'],
    faq: [
      {
        question: 'Is zipping a git repository to S3 a useful backup?',
        answer:
          'Only against provider loss, not against data loss. Git already replicates your code, so the value is having a dated copy inside your own AWS account if a GitHub organisation is suspended, an owner account is compromised, or access disappears. It restores no database and no user uploads.',
      },
      {
        question: 'Should a source backup workflow run on every push?',
        answer:
          'No. Provider independence needs a recent copy, not one per commit, so twenty pushes a day produce twenty near-identical archives that mitigate nothing extra. A daily schedule with workflow_dispatch for manual pre-migration snapshots serves the same threat model at a fraction of the storage cost.',
      },
      {
        question: 'Why exclude .env files from a backup archive?',
        answer:
          'Environment files hold database credentials and API keys, and backup buckets are usually secured as though they contain "just code". Excluding them is correct, but it means the archive cannot restore a running service on its own, so the separate secrets path must be written into the restore runbook.',
      },
      {
        question: 'How do you stop a compromised CI credential from deleting your backups?',
        answer:
          'Scope the CI principal to s3:PutObject on a single prefix and deny s3:DeleteObject entirely, so it can write new objects and never remove old ones. S3 Object Lock in compliance mode makes that guarantee cryptographic, which is the standard defence against ransomware that targets backups.',
      },
      {
        question: 'How do you know a backup actually works?',
        answer:
          'Restore from it on a schedule. A monthly job that fetches the newest archive, unzips it, installs dependencies and builds proves the artifact is complete and usable. Until something does that, you have a hypothesis, and teams routinely discover empty backups during the incident itself.',
      },
    ],
    proficiencyLevel: 'Expert',
    dependencies: ['An AWS account', 'An S3 bucket'],
    blocks: [
      {
        type: 'paragraph',
        text: 'This workflow zips the repository on every push to `live` and uploads it to S3 under a timestamped key with the short SHA appended. Twenty-eight lines. It runs reliably and it has never failed.',
      },
      {
        type: 'paragraph',
        text: 'It\'s also the one where I had to argue with myself the hardest, because the obvious criticism is brutal and mostly correct: you already have a backup of your source code. It\'s called git, and it exists on every developer\'s machine and on GitHub\'s infrastructure. Zipping a git checkout and putting it in a bucket is, on the face of it, backing up the one thing that needs backing up least.',
      },
      {
        type: 'paragraph',
        text: 'I still think there\'s a real case for this. It\'s just narrower than "backups are good," and getting to it meant being honest about what I was actually afraid of.',
      },
      {
        type: 'heading',
        text: 'Introduction',
      },
      {
        type: 'paragraph',
        text: 'The YAML here is trivial and I\'ll walk through it quickly. The part worth reading is the reasoning, because the reasoning determines whether the YAML is worth running at all, and for a while mine wasn\'t.',
      },
      {
        type: 'heading',
        text: 'Why this workflow exists',
      },
      {
        type: 'paragraph',
        text: 'The naive framing is "back up the code." That framing is wrong and it produces a workflow that costs money and provides nothing.',
      },
      {
        type: 'paragraph',
        text: 'The framing I\'d defend is provider independence. Git protects you against losing a file, a branch, or a laptop. It does not protect you against losing your GitHub account, and that isn\'t hypothetical:',
      },
      {
        type: 'paragraph',
        text: 'An organisation gets suspended over a billing dispute or a suspected ToS violation, sometimes automatically, sometimes wrongly. An owner account gets compromised by someone with force-push rights and the ability to delete repositories. A sole maintainer leaves, their account is deactivated, and the repos go with it. Or there\'s a prolonged provider outage during an incident where you need to deploy right now.',
      },
      {
        type: 'paragraph',
        text: 'In every one of those, a dated archive in a bucket inside your own AWS account, inside your own security boundary, turns a catastrophe into an annoyance. That\'s a real threat model and it\'s the one this addresses.',
      },
      {
        type: 'paragraph',
        text: 'Two things fall out of stating it that plainly, and I didn\'t see either until I wrote it down.',
      },
      {
        type: 'paragraph',
        text: 'Push-triggered is the wrong cadence for that threat. Provider independence needs a recent copy, not a copy per commit. Twenty pushes on a busy day produce twenty near-identical archives, and the difference between them is worth nothing against the risk being mitigated. A daily schedule serves the same purpose at a fraction of the cost. I built it push-triggered because push-triggered is the reflex, not because it followed from anything.',
      },
      {
        type: 'paragraph',
        text: 'The bigger one: this is not a disaster recovery backup and I shouldn\'t describe it as one. There\'s no database in it. No user uploads. No environment configuration. If the server burns down tomorrow, this archive restores your code, which you could also have gotten from git, and not one byte of the state your users actually care about. Everything irreplaceable is outside this workflow\'s scope.',
      },
      {
        type: 'paragraph',
        text: 'That distinction is the whole point of the article. A workflow called "backup" that people believe covers disaster recovery is worse than no workflow, because it manufactures confidence, and manufactured confidence only gets discovered during an actual disaster.',
      },
      {
        type: 'heading',
        text: 'Architecture',
      },
      {
        type: 'code',
        language: 'text',
        code:
          '  push: live\n' +
          '      │\n' +
          '      ▼\n' +
          '  actions/checkout            (shallow, depth 1 — no history)\n' +
          '      │\n' +
          '      ▼\n' +
          '  zip -r <name> . --exclude …\n' +
          '      │  name = <project>-YYYYMMDD-HHMMSS-<sha7>.zip\n' +
          '      │  export via $GITHUB_ENV\n' +
          '      ▼\n' +
          '  aws s3 cp → s3://<bucket>/backups/<project>/<name>.zip',
      },
      {
        type: 'paragraph',
        text: 'Linear, stateless, no dependencies beyond the preinstalled AWS CLI. All the interesting decisions are in naming and exclusion.',
      },
      {
        type: 'paragraph',
        text: 'The key naming scheme is the part I\'d keep unchanged:',
      },
      {
        type: 'code',
        language: 'text',
        code:
          '<project>-20260801-142317-a3f9c21.zip',
      },
      {
        type: 'paragraph',
        text: 'Sortable by name, because `YYYYMMDD-HHMMSS` sorts lexicographically. Readable by a human. Traceable to an exact commit via the short SHA. When you\'re restoring under pressure, "which archive do I want" has to be answerable from an `aws s3 ls` listing alone, with no metadata lookup and no guessing, and this gets you that.',
      },
      {
        type: 'paragraph',
        text: 'Prefixing with `backups/<project>/` means one bucket can serve many projects with clean per-project lifecycle rules.',
      },
      {
        type: 'heading',
        text: 'Step-by-step explanation',
      },
      {
        type: 'paragraph',
        text: 'Checkout runs at the default `fetch-depth: 1`, so it\'s a shallow clone with no history. Combined with the `.git/*` exclusion below, what you get is a point-in-time snapshot rather than a repository. You can restore the code as it was. You cannot restore the project\'s history, branches, or tags.',
      },
      {
        type: 'paragraph',
        text: 'For the "GitHub is gone" scenario that\'s a meaningful hole. You\'d recover a working codebase and lose every commit message, every blame trail, every tag. If provider independence is genuinely the goal then a mirror clone preserves all of it and is barely more work, which I\'ll come back to.',
      },
      {
        type: 'paragraph',
        text: 'Building the archive:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'ZIP_NAME="${{project_name}}-$(date +\'%Y%m%d-%H%M%S\')-${GITHUB_SHA::7}.zip"\n' +
          'echo "ZIP_NAME=$ZIP_NAME" >> $GITHUB_ENV',
      },
      {
        type: 'paragraph',
        text: '`${GITHUB_SHA::7}` is bash substring expansion, first seven characters, matching git\'s conventional short SHA without spawning a subprocess.',
      },
      {
        type: 'paragraph',
        text: 'Writing to `$GITHUB_ENV` is how you pass a value between steps. Plain `export` doesn\'t survive, because each `run:` block is a separate shell process, which is one of those things that\'s obvious in retrospect and confusing the first time. `$GITHUB_OUTPUT` with a step `id` is the more modern idiom and scopes better, but this is fine.',
      },
      {
        type: 'paragraph',
        text: '`${{project_name}}` is the same invalid Actions named-value that shows up across this library. `github.event.repository.name` removes the substitution step entirely.',
      },
      {
        type: 'paragraph',
        text: 'Then the exclusions:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'zip -r "$ZIP_NAME" . \\\n' +
          '  --exclude "node_modules/*" ".git/*" ".env" ".env.dev" ".env.test" \\\n' +
          '            "logs/*" "*.log" "coverage/*" ".nyc_output/*" ".cache/*"',
      },
      {
        type: 'paragraph',
        text: 'The thinking here is right and I\'d keep it in principle.',
      },
      {
        type: 'paragraph',
        text: '`node_modules` is regenerable from the lockfile and routinely ten to a hundred times the size of the source, so including it makes the archive expensive and slow without adding anything you could actually recover from. Same reasoning for coverage output, `.nyc_output`, `.cache`, and logs.',
      },
      {
        type: 'paragraph',
        text: 'Excluding `.env*` is the one that matters for a different reason. Environment files hold database credentials, API keys, signing secrets. An archive containing them turns your backup bucket into a credential store, and backup buckets tend to be under-secured relative to their contents precisely because everyone thinks of them as holding "just code."',
      },
      {
        type: 'paragraph',
        text: 'But that creates a tension the workflow doesn\'t resolve, and I want to name it rather than gloss over it: the archive is deliberately not sufficient to restore a running service. You get the code and no configuration. That\'s the correct security call and it means the restore procedure has a gap that has to be filled by a separate secrets path, Secrets Manager or SSM Parameter Store or 1Password. If that isn\'t written down somewhere, it becomes a very unpleasant discovery halfway through an incident.',
      },
      {
        type: 'paragraph',
        text: 'One practical warning. `zip`\'s `--exclude` patterns match against paths as they\'re stored in the archive, and getting them subtly wrong (`node_modules/*` versus `./node_modules/*`) fails silently. You get a bigger archive and no warning. The only way to know your exclusions work is to open the result and look, which is a specific instance of the general rule further down.',
      },
      {
        type: 'paragraph',
        text: 'Upload:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'env:\n' +
          '  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}\n' +
          '  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n' +
          '  AWS_DEFAULT_REGION: ${{ secrets.AWS_REGION }}\n' +
          'run: aws s3 cp "$ZIP_NAME" "s3://${{ secrets.AWS_S3_BACKUP_BUCKET }}/backups/…"',
      },
      {
        type: 'paragraph',
        text: 'Passing credentials through `env:` rather than interpolating them into the command body is exactly right. The AWS CLI reads them from the environment natively and the values never appear in the shell command text.',
      },
      {
        type: 'paragraph',
        text: 'Two issues. These are long-lived IAM keys again, and they\'re a different set from the ECS workflow\'s: `AWS_ACCESS_KEY_ID` here versus `AWS_IAM_ACCESS_KEY` there. Two IAM identities, two rotation obligations, two things to forget about. Consolidating both onto OIDC role assumption gets rid of both.',
      },
      {
        type: 'paragraph',
        text: 'And there\'s no `permissions:` block at all, so the job\'s `GITHUB_TOKEN` inherits the repository default, which on older repos is read/write across the board. A job that reads code and uploads a file wants `contents: read`.',
      },
      {
        type: 'heading',
        text: 'Interesting implementation details',
      },
      {
        type: 'paragraph',
        text: 'Sortable keys are an incident response feature, which sounds grandiose for a date format but I stand by it. Lexicographic sorting means `aws s3 ls` gives you chronological order for free, and at 3am you want zero cognitive overhead between you and the right file.',
      },
      {
        type: 'paragraph',
        text: 'The workflow is cheap by construction. No Docker, no dependency install, no build. Checkout, zip, upload, done in seconds. Which is exactly why the wrong cadence survived as long as it did. Cheap wrong things last much longer than expensive wrong things, because nothing ever forces you to look at them.',
      },
      {
        type: 'paragraph',
        text: 'And the exclusion list is doing two completely different jobs in identical syntax. `node_modules` is about size. `.env` is about not creating a second credential store. Same line format, entirely different stakes, and nothing in the file distinguishes them. That deserves a comment, because the next person tidying up the list has no way to tell which entries are load-bearing.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'paragraph',
        text: 'Calling it a backup when it\'s a source snapshot. The dangerous part isn\'t the workflow, it\'s the belief it creates about what\'s covered.',
      },
      {
        type: 'paragraph',
        text: 'Including `.env` files, which converts a backup bucket into a credential leak with a very long half-life.',
      },
      {
        type: 'paragraph',
        text: 'Never testing a restore. I mean this seriously: if you\'ve never restored from it, you don\'t know whether it works. You have a hypothesis. The number of teams that discover their backups were empty during the incident is not small, and it\'s not a beginner mistake either.',
      },
      {
        type: 'paragraph',
        text: 'No lifecycle policy, so objects accumulate in Standard storage forever. A per-push cadence on an active repo produces thousands of near-identical multi-megabyte archives and the bill grows linearly until someone questions a line item.',
      },
      {
        type: 'paragraph',
        text: 'Trusting silent exclusions.',
      },
      {
        type: 'paragraph',
        text: 'Push cadence for a threat model that needs daily.',
      },
      {
        type: 'paragraph',
        text: 'Long-lived IAM keys where OIDC works.',
      },
      {
        type: 'paragraph',
        text: 'And no integrity verification anywhere. Nothing checks that the upload arrived intact or that the archive is even readable.',
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'Name the threat before you build the mitigation. I built this before articulating what it defended against, and the wrong cadence is the direct result. Push-triggered was the instinct; it doesn\'t follow from the actual risk at all. Writing the threat model first would have produced `schedule:` on the first attempt and saved a lot of S3 objects.',
      },
      {
        type: 'paragraph',
        text: '"Backup" is an overloaded word and the ambiguity is genuinely dangerous. Source snapshot, database backup, disaster recovery, and archival retention are four different things with four different RPO and RTO profiles. Calling all of them "backup" is how a team ends up confident that the important one exists. This file should be called `snapshot-source-to-s3.yml`.',
      },
      {
        type: 'paragraph',
        text: 'A backup you haven\'t restored from isn\'t a backup. The highest-value addition here is a scheduled job that pulls the newest archive, unzips it, installs, and builds, proving the thing is complete and usable. Everything short of that is faith.',
      },
      {
        type: 'paragraph',
        text: 'And security decisions and optimisation decisions look identical in a config file. Without a comment, nobody can tell them apart, and the person cleaning up your exclusion list six months from now is going to make a judgement call with no information.',
      },
      {
        type: 'heading',
        text: 'Production considerations',
      },
      {
        type: 'paragraph',
        text: 'A lifecycle policy isn\'t optional, it\'s the difference between this workflow costing nothing and costing something. Transition to Infrequent Access after 30 days, Glacier after 90, expire at whatever your retention period is. Without it the cost climbs monotonically and nobody notices until it\'s large enough to be a question in a meeting.',
      },
      {
        type: 'paragraph',
        text: 'On bucket security: Block Public Access on, encryption enabled (S3 encrypts by default with SSE-S3 now, but SSE-KMS with a dedicated key gives you separate access control and an audit trail), versioning on, and a bucket policy denying deletes from the CI principal.',
      },
      {
        type: 'paragraph',
        text: 'That last one matters more than it looks. The CI identity should be able to write new objects and never remove old ones, so a compromised pipeline credential can\'t destroy your history on its way out. Object Lock in compliance mode makes that guarantee cryptographic rather than policy-based, which is the standard defence against ransomware that specifically hunts for backups. Which it does.',
      },
      {
        type: 'paragraph',
        text: 'IAM scope: `s3:PutObject` on `arn:aws:s3:::bucket/backups/<project>/*`. Not `s3:*`, not bucket-wide, and specifically not `s3:DeleteObject`.',
      },
      {
        type: 'paragraph',
        text: 'Cross-account is the version of this that actually delivers on the premise. If provider independence is the goal, a backup sitting in the same AWS account as your production infrastructure shares a failure domain with it, and an account compromise takes both. A separate account with cross-account replication is the meaningful control.',
      },
      {
        type: 'paragraph',
        text: 'And write the restore runbook. Which archive, how to fetch it, where the environment configuration comes from given it\'s deliberately absent, and what recovery time to expect. Undocumented restores take hours longer than they need to, and those hours land at the worst possible moment.',
      },
      {
        type: 'heading',
        text: 'Improvements',
      },
      {
        type: 'paragraph',
        text: 'Rename it to `snapshot-source-to-s3.yml` so it stops implying something it doesn\'t do.',
      },
      {
        type: 'paragraph',
        text: 'Move to a schedule:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'on:\n' +
          '  schedule:\n' +
          '    - cron: \'0 3 * * *\'\n' +
          '  workflow_dispatch:',
      },
      {
        type: 'paragraph',
        text: 'Matches the threat model, cuts object count by an order of magnitude, and `workflow_dispatch` keeps the manual pre-migration snapshot available for when you want one.',
      },
      {
        type: 'paragraph',
        text: 'Add the lifecycle policy. Best cost control available here by a distance.',
      },
      {
        type: 'paragraph',
        text: 'Migrate to OIDC and consolidate with the ECS credentials. Add `permissions: contents: read` and `timeout-minutes: 15`.',
      },
      {
        type: 'paragraph',
        text: 'Mirror the repository rather than the working tree:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          'git clone --mirror "https://github.com/${{ github.repository }}.git" repo.git\n' +
          'tar czf repo-mirror.tar.gz repo.git',
      },
      {
        type: 'paragraph',
        text: 'Full history, branches, tags. That\'s what actually delivers provider independence rather than approximating it.',
      },
      {
        type: 'paragraph',
        text: 'Verify the upload with `aws s3api head-object`, compare the size, fail on mismatch. Ten seconds of runtime for a real integrity signal instead of an assumed one.',
      },
      {
        type: 'paragraph',
        text: 'And add a scheduled restore test. Monthly: fetch the newest archive, unzip, `pnpm install --frozen-lockfile`, `pnpm build`. If it fails, the backup was already broken and you found out on a Tuesday afternoon instead of during an outage. That\'s the improvement that moves this from faith to evidence, and it\'s the one I\'d actually prioritise.',
      },
      {
        type: 'paragraph',
        text: 'Then comment the security-critical exclusions so the `.env` lines never get mistaken for size optimisation.',
      },
      {
        type: 'paragraph',
        text: 'And finally, deal with the real gap: back up the data. Database dumps and user uploads are the irreplaceable assets. This workflow doesn\'t touch either, and until something does, "we have backups" isn\'t a true statement about the system as a whole. It\'s a true statement about the least important part of it.',
      },
      {
        type: 'paragraph',
        text: 'Next: `notify.discord.yml`. Twelve lines, more day-to-day value than anything else in the library, and a security bug I wrote without noticing.',
      },
    ],
  },
  {
    id: 14,
    slug: 'github-actions-script-injection',
    ogImage: '/og/blog-github-actions-script-injection.png',
    title: 'GitHub Actions in Production, Part 7: Twelve Lines and a Script Injection',
    excerpt:
      'The smallest workflow I have written posts deploy notifications to Discord, and it contains a real script injection. Why ${{ }} in a run block is templating rather than variable expansion, why merge commit messages are untrusted input, and why the file nobody reviewed had the bug.',
    metaTitle: 'GitHub Actions Script Injection: The Bug in My 12-Line Workflow',
    metaDescription:
      'How github.event.head_commit.message becomes executable code inside a run block, why merge commits carry attacker-authored text, and the env plus jq pattern that closes it.',
    category: 'Backend Security',
    date: '2026-08-01',
    readTime: '11 min read',
    tags: ['GitHub Actions', 'Application Security', 'CI/CD', 'Shell', 'DevSecOps', 'Discord', 'Supply Chain Security'],
    entities: [
      { name: 'GitHub Actions', sameAs: ['https://en.wikipedia.org/wiki/GitHub', 'https://github.com/features/actions'] },
      { name: 'Code injection', sameAs: 'https://en.wikipedia.org/wiki/Code_injection' },
      { name: 'jq', sameAs: ['https://en.wikipedia.org/wiki/Jq_(programming_language)', 'https://jqlang.github.io/jq/'] },
      { name: 'Discord', sameAs: ['https://en.wikipedia.org/wiki/Discord', 'https://discord.com'] },
    ],
    relatedSlugs: ['github-actions-build-gate-trigger', 'ecs-deployment-github-actions', 'jwt-vs-paseto-tokens'],
    faq: [
      {
        question: 'What is GitHub Actions script injection?',
        answer:
          'The runner substitutes ${{ }} expressions into a run block as text before the shell parses it, so event data becomes part of the script\'s source rather than arriving as data. A commit message or PR title containing shell command substitution then executes on the runner alongside your secrets.',
      },
      {
        question: 'Is head_commit.message untrusted if only maintainers can push?',
        answer:
          'Yes. On a merge commit the message contains the pull request title and source branch name, both chosen by whoever opened the PR, including fork contributors with no repository access. The maintainer performs the push; the text inside the message is still attacker-controlled.',
      },
      {
        question: 'How do you safely use event data in a GitHub Actions run block?',
        answer:
          'Pass it through an env: mapping so the runner sets a variable and the shell reads it as data, then quote the reference. For JSON payloads, build the body with jq --arg rather than string concatenation so quotes, newlines and backslashes are escaped correctly.',
      },
      {
        question: 'Should deploy notifications trigger on push or on workflow completion?',
        answer:
          'On completion. A push trigger only announces that a deploy started and can never report whether it worked. Using workflow_run with types: [completed] lets the message carry the real conclusion, which is the signal people actually want when something breaks.',
      },
      {
        question: 'Is a Discord webhook URL a secret?',
        answer:
          'Yes. The URL is the credential: anyone holding it can post anything to that channel as anyone, since webhooks let the caller override username and avatar per message. They never expire, so a leaked URL stays usable until someone manually regenerates it.',
      },
    ],
    proficiencyLevel: 'Expert',
    dependencies: ['A GitHub repository', 'A Discord webhook URL'],
    blocks: [
      {
        type: 'paragraph',
        text: 'The smallest workflow in this library posts a message to Discord whenever someone pushes to `live`. Who pushed, which branch, what the commit said, with the person\'s GitHub avatar attached. It took about ten minutes to write.',
      },
      {
        type: 'paragraph',
        text: 'It has answered "when did this change?" more times than any dashboard I\'ve ever built.',
      },
      {
        type: 'paragraph',
        text: 'It also contains a real security bug. The GitHub Actions script injection pattern, where untrusted event data gets interpolated straight into a shell command. It\'s the most common vulnerability class in Actions, it\'s called out in GitHub\'s own hardening docs, and I wrote it anyway, in twelve lines, without noticing.',
      },
      {
        type: 'heading',
        text: 'Introduction',
      },
      {
        type: 'paragraph',
        text: 'That combination is why this one gets a full article. The value is real and I\'d write it again tomorrow. The bug is real too, and it\'s about one character of syntax away from not existing.',
      },
      {
        type: 'heading',
        text: 'Why this workflow exists',
      },
      {
        type: 'paragraph',
        text: 'Automating deployment had a side effect I didn\'t anticipate: it made deploys invisible.',
      },
      {
        type: 'paragraph',
        text: 'When deploying meant somebody SSHing into a server, the deploy was a social event. Someone said "pushing the fix now" in chat. Everyone knew. Once the pipeline does it automatically on merge, code reaches production with no human announcement at all, and the team quietly loses a signal it had been depending on without ever noticing it was a signal.',
      },
      {
        type: 'paragraph',
        text: 'The failure mode this creates is specific. Something breaks. Someone asks whether anything changed. Nobody knows. You open the Actions tab, cross-reference run timestamps against the error spike, find the commit, read the diff. Ten minutes minimum, every time, and those ten minutes land at the very front of an incident where latency is most expensive.',
      },
      {
        type: 'paragraph',
        text: 'A chat message collapses that into a scroll. "When did this change?" stops being an investigation and becomes a lookup.',
      },
      {
        type: 'paragraph',
        text: 'Two decisions came out of framing it that way.',
      },
      {
        type: 'paragraph',
        text: 'It targets a team chat channel, not a monitoring system. Nothing pages anyone, there\'s no threshold, no acknowledgement. It\'s ambient awareness in a place people already have open. Every time I\'ve seen someone try to make a notification like this into proper alerting, it turned into noise and then got muted.',
      },
      {
        type: 'paragraph',
        text: 'And it posts as the developer rather than as a bot. The webhook overrides `username` and `avatar_url` with the pushing actor\'s GitHub identity, so the channel shows a face instead of a generic integration icon. That was deliberate. It makes deploys feel attributable, and more practically, you recognise a colleague\'s face far faster than you read a username when you\'re scrolling back through a channel.',
      },
      {
        type: 'heading',
        text: 'Architecture',
      },
      {
        type: 'code',
        language: 'text',
        code:
          '  push: live\n' +
          '      │\n' +
          '      ▼\n' +
          '  ubuntu-latest\n' +
          '      │  (no checkout — nothing to check out)\n' +
          '      ▼\n' +
          '  curl -X POST  ──────►  Discord webhook endpoint\n' +
          '      │                        │\n' +
          '      │  JSON body:            ▼\n' +
          '      │   avatar_url      ┌──────────────┐\n' +
          '      │   username        │  #deploys    │\n' +
          '      │   content ────────│  channel     │\n' +
          '      │                   └──────────────┘',
      },
      {
        type: 'paragraph',
        text: 'One job, one step, nothing else.',
      },
      {
        type: 'paragraph',
        text: 'The property worth pointing at is the decoupling. This subscribes to the same `push` event as the deploy workflows rather than being a step inside them. If the webhook gets rotated, or rate-limited, or Discord goes down, the deploy is completely unaffected. Notification failures can\'t break deployment.',
      },
      {
        type: 'paragraph',
        text: 'That\'s right, and it comes with a cost I\'ll get to: because it\'s triggered by the push rather than by the deploy outcome, it announces that a deploy started. It can\'t tell you whether it worked.',
      },
      {
        type: 'heading',
        text: 'Step-by-step explanation',
      },
      {
        type: 'paragraph',
        text: 'There\'s one step, so here\'s the whole thing:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- run: |\n' +
          '    curl -H "Content-Type: application/json" \\\n' +
          '         -X POST \\\n' +
          '         -d "{\n' +
          '              \\"avatar_url\\": \\" https://github.com/${{ github.actor }}.png \\",\n' +
          '              \\"username\\": \\" ${{ github.actor }} \\",\n' +
          '              \\"content\\": \\" Admin: @elrefai99 \\nServer: **0Gosha Server*** \\nNew push in branch: **${{ github.ref_name }}** \\nCommit: **${{ github.event.head_commit.message }}**\\"\n' +
          '            }" \\\n' +
          '         ${{ secrets.DISCORD_WEBHOOK_0GOSHA }}',
      },
      {
        type: 'paragraph',
        text: '`https://github.com/<user>.png` is a nice trick that I use constantly now. GitHub serves any user\'s avatar at that URL, with `?size=64` if you want it smaller. No API call, no token, no storage, and Discord fetches it directly.',
      },
      {
        type: 'paragraph',
        text: 'The webhook URL is stored as a secret, correctly. A Discord webhook URL is the credential. Anyone holding it can post anything to that channel as anyone. It should be quoted in the command for safety, but keeping it out of the YAML is the important part.',
      },
      {
        type: 'paragraph',
        text: 'Then there are the string problems, which are minor and visible in every message this thing has ever sent.',
      },
      {
        type: 'paragraph',
        text: 'The avatar URL has leading and trailing spaces inside the string: `\\" https://github.com/… .png \\"`. Discord may reject the malformed URL and fall back to a default avatar, which defeats the entire point of the avatar trick. The username has the same padding, so the display name renders with visible whitespace. `**0Gosha Server***` has three closing asterisks against two opening ones, so it renders with a stray `*` hanging off the end. And `Admin: @elrefai99` is a plain string; Discord mentions need `<@USER_ID>` with a numeric snowflake, so `@username` renders as literal text and pings precisely nobody.',
      },
      {
        type: 'paragraph',
        text: 'None of that breaks anything. All of it has been in every message for months, which is its own small lesson about output nobody re-reads after the first test.',
      },
      {
        type: 'heading',
        text: 'The injection',
      },
      {
        type: 'paragraph',
        text: 'Here\'s the line that matters:',
      },
      {
        type: 'code',
        language: 'bash',
        code:
          '\\"content\\": \\"… Commit: **${{ github.event.head_commit.message }}**\\"',
      },
      {
        type: 'paragraph',
        text: '`${{ … }}` inside a `run:` block is not shell variable expansion. The runner does textual substitution into the script before the shell parses it. So the commit message doesn\'t arrive as data. It becomes part of the source code of the script.',
      },
      {
        type: 'paragraph',
        text: 'Which means the shell parses whatever the commit message happens to contain.',
      },
      {
        type: 'paragraph',
        text: 'The mild version: a commit message with a double quote in it terminates the JSON string early and the request goes out malformed. The notification silently fails or posts garbage.',
      },
      {
        type: 'paragraph',
        text: 'The serious version: a commit message containing shell command substitution syntax gets executed on the runner. And the runner, at that moment, has `secrets.DISCORD_WEBHOOK_0GOSHA` in its environment and `curl` sitting right there. Anything the job can reach, injected code can reach.',
      },
      {
        type: 'paragraph',
        text: 'The obvious objection is that only people with write access can push to `live`, so an attacker would need commit rights already. That\'s true, and it does limit the risk here substantially. But it doesn\'t eliminate it, and the reason is easy to miss:',
      },
      {
        type: 'paragraph',
        text: 'On a merge commit, `head_commit.message` contains text written by whoever opened the pull request. Merge a fork PR and the resulting commit message includes the PR title and the source branch name, both chosen entirely by someone with no access to your repository. The push to `live` is performed by a trusted maintainer. The content of the message is not trusted. That\'s exactly the boundary GitHub\'s hardening guide warns about, and `github.event.head_commit.message` is named in its list of untrusted inputs alongside PR titles, branch names, and issue bodies.',
      },
      {
        type: 'paragraph',
        text: 'Branch names deserve their own mention, because they flow into merge commit messages, they\'re attacker-chosen on fork PRs, and git permits a surprising range of characters in them.',
      },
      {
        type: 'paragraph',
        text: 'The fix is to stop letting the value be code. Pass it through the environment so the runner sets a variable and the shell reads it as data:',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          '- env:\n' +
          '    COMMIT_MSG: ${{ github.event.head_commit.message }}\n' +
          '    ACTOR: ${{ github.actor }}\n' +
          '    BRANCH: ${{ github.ref_name }}\n' +
          '    WEBHOOK: ${{ secrets.DISCORD_WEBHOOK_0GOSHA }}\n' +
          '  run: |\n' +
          '    jq -n \\\n' +
          '      --arg actor "$ACTOR" \\\n' +
          '      --arg branch "$BRANCH" \\\n' +
          '      --arg msg "$COMMIT_MSG" \\\n' +
          '      \'{\n' +
          '        username: $actor,\n' +
          '        avatar_url: "https://github.com/\\($actor).png",\n' +
          '        content: "**\\($branch)** — \\($msg)"\n' +
          '      }\' \\\n' +
          '    | curl -sS -X POST -H "Content-Type: application/json" -d @- "$WEBHOOK"',
      },
      {
        type: 'paragraph',
        text: 'Two independent protections there. `env:` keeps the value out of the script text entirely, so the shell sees `$COMMIT_MSG`, a variable reference, and quoting it prevents word splitting. And `jq -n --arg` builds the JSON with correct escaping for quotes, newlines and backslashes, so malformed payloads become impossible rather than just unlikely. `jq` is preinstalled on GitHub-hosted runners.',
      },
      {
        type: 'paragraph',
        text: 'That\'s the whole fix. It isn\'t more code. It\'s arguably cleaner code, and it closes the hole completely.',
      },
      {
        type: 'heading',
        text: 'Interesting implementation details',
      },
      {
        type: 'paragraph',
        text: 'No checkout, no setup, no actions. A workflow that only makes an HTTP call needs none of it, and adding `actions/checkout` out of habit would roughly double the runtime for nothing. Worth noticing when the boilerplate genuinely isn\'t required.',
      },
      {
        type: 'paragraph',
        text: 'The identity spoofing is a UX feature and a security consideration at the same time. Discord webhooks let the caller override the display name and avatar per message, which is what makes the channel scannable. It\'s also exactly why a leaked webhook URL is bad: whoever has it can impersonate anyone in that channel.',
      },
      {
        type: 'paragraph',
        text: 'The `\\n` handling works, though more by luck than design. `\\n` inside a double-quoted shell string passed to `-d` gets sent literally, and Discord\'s JSON parser interprets `\\n` in a string value as a newline. Correct outcome, not a correct reason.',
      },
      {
        type: 'paragraph',
        text: 'And it\'s cheap enough that nobody\'s ever been tempted to remove it. A few seconds of runner time per push. This is the good version of what I said in the S3 article about cheap things surviving. Cheap wrong things last too long, but cheap right things also last, and low cost is exactly why this one never came up in a cleanup.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'paragraph',
        text: 'Interpolating `${{ }}` event data into `run:` blocks. That\'s the vulnerability. `github.event.head_commit.message`, `github.event.pull_request.title`, `github.head_ref`, issue bodies, review comments — all attacker-influenceable, all routinely pasted straight into shell.',
      },
      {
        type: 'paragraph',
        text: 'Hand-building JSON in shell, where any user-supplied string with a quote or backslash or newline in it breaks the payload.',
      },
      {
        type: 'paragraph',
        text: 'Notifying on the trigger instead of the outcome. This announces that a push happened and says nothing about whether the deploy succeeded, which is the thing people actually want to know.',
      },
      {
        type: 'paragraph',
        text: 'Treating webhook URLs as configuration when they\'re credentials.',
      },
      {
        type: 'paragraph',
        text: 'Assuming write access bounds the threat, when merge commit messages carry text authored by untrusted contributors.',
      },
      {
        type: 'paragraph',
        text: 'And never re-reading your own output. Four separate formatting defects shipped in every message this system has sent, because nobody looked at the rendered result after the first successful test.',
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'Notification is infrastructure, not decoration. Highest return per line of anything I\'ve written. Deploy visibility is a real operational capability and the fact that it\'s trivial to build makes it easy to undervalue, right up until the week you don\'t have it.',
      },
      {
        type: 'paragraph',
        text: 'Automation removes social signals and you have to replace them deliberately. The old manual deploy broadcast itself as a side effect of being manual. Automating it silently deleted that broadcast, and nobody could articulate what was missing for a while. Any time you automate a human process, it\'s worth asking what implicit communication just disappeared with it.',
      },
      {
        type: 'paragraph',
        text: '`${{ }}` in `run:` is templating, not variable expansion. Internalising that one distinction prevents an entire vulnerability class, and the rule is mechanical enough to apply without thinking: event data goes through `env:`, never into script text.',
      },
      {
        type: 'paragraph',
        text: 'Small workflows get no review. This is twelve lines that nobody read carefully, me included, because it\'s "just a curl." The Docker and ECS workflows got scrutiny proportional to how complicated they looked. The injection bug is sitting in the file everyone assumed wasn\'t worth reviewing, and that\'s not a coincidence. Review effort should track what a workflow can touch, not how complex it appears.',
      },
      {
        type: 'paragraph',
        text: 'And look at what you shipped. Padded strings, stray asterisks, a mention that mentions nobody, all visible on the very first render.',
      },
      {
        type: 'heading',
        text: 'Production considerations',
      },
      {
        type: 'paragraph',
        text: 'Discord webhook URLs don\'t expire. If one leaks in a log, a screenshot, or a fork, anyone can post to that channel as anyone, indefinitely, until a human manually regenerates it. It belongs on the same rotation schedule as any other credential and it almost certainly isn\'t on one.',
      },
      {
        type: 'paragraph',
        text: 'Rate limits are worth knowing about. Discord limits webhooks to roughly 5 requests per 2 seconds, with per-channel limits behind that. A burst of pushes gets 429s, and this workflow doesn\'t check the response at all. `curl` without `-f` exits 0 on an HTTP error, so a dropped notification looks exactly like a successful one. For ambient signalling that\'s arguably acceptable, but it should be a choice rather than an assumption, and mine was an assumption.',
      },
      {
        type: 'paragraph',
        text: 'Information disclosure is the one I\'d think hardest about before copying this pattern. Commit messages go to a chat channel. If that channel has broader membership than the repository, contractors, a community server, people who joined for something unrelated, you\'re publishing commit messages to that audience. Commit messages reference internal systems, customer names, and security fixes all the time.',
      },
      {
        type: 'paragraph',
        text: 'There\'s no failure path anywhere. Nothing notifies when a deploy fails. That\'s the biggest functional gap here: the system is chattier about routine success than about failure, which is backwards for anything operational.',
      },
      {
        type: 'paragraph',
        text: 'And it\'s coupled to one channel. The channel name is baked into a secret name and the message body hardcodes a server name, which is fine for one project and awkward the moment you reuse the template, which is supposedly the entire premise of the repository it lives in.',
      },
      {
        type: 'heading',
        text: 'Improvements',
      },
      {
        type: 'paragraph',
        text: 'Fix the injection with `env:` plus `jq`. Non-negotiable, and it\'s what makes everything below worth doing.',
      },
      {
        type: 'paragraph',
        text: 'Then the structural change: notify on the deploy outcome instead of the push.',
      },
      {
        type: 'code',
        language: 'yaml',
        code:
          'on:\n' +
          '  workflow_run:\n' +
          '    workflows: ["Deploy to AWS", "Deploy to EC2"]\n' +
          '    types: [completed]',
      },
      {
        type: 'paragraph',
        text: 'Now the message can carry the actual result, and `${{ github.event.workflow_run.conclusion }}` lets you colour it green or red. That\'s what turns this from "someone pushed" into "production changed, and here\'s how it went."',
      },
      {
        type: 'paragraph',
        text: 'Always notify on failure, and consider throttling success. Failures are the high-value signal. A team receiving twenty green messages a day stops reading the channel, and then misses the red one, which is the worst possible outcome.',
      },
      {
        type: 'paragraph',
        text: 'Use Discord embeds instead of plain content. Structured fields, a colour bar keyed to success or failure, a clickable link to the run and the commit. Scannable at a glance and it\'s not more code than the current string concatenation.',
      },
      {
        type: 'paragraph',
        text: 'Add a link to the run: `${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}`. One line, and every notification becomes a starting point for triage instead of a dead end.',
      },
      {
        type: 'paragraph',
        text: 'Fix the formatting. Strip the padding, balance the asterisks, use `<@USER_ID>` if the mention is meant to actually ping someone.',
      },
      {
        type: 'paragraph',
        text: 'Check the response with `curl -fsS` so an HTTP error fails the step, plus `continue-on-error: true` on the job so a notification failure is visible without being mistaken for a deployment failure.',
      },
      {
        type: 'paragraph',
        text: 'Truncate long commit messages, since Discord\'s `content` field caps at 2000 characters and a long message body silently fails the request.',
      },
      {
        type: 'paragraph',
        text: 'And parameterise it for reuse. As a `workflow_call` workflow taking `status`, `environment`, and a `secrets.WEBHOOK_URL`, one notification implementation serves every repository, which is what this template library was supposed to deliver in the first place.',
      },
      {
        type: 'paragraph',
        text: 'That\'s the series. Seven workflows: a compile gate in the wrong place, a release automation that\'s nearly perfect, two container pipelines that don\'t agree with each other, a VM deploy with a shell trap in it, a snapshot job with an unstated threat model, and twelve lines of chat notification that turned out to be carrying the most important lesson of the lot.',
      },
    ],
  },
  {
    id: 7,
    slug: 'gen-import-typescript-barrel-generator-deep-dive',
    ogImage: '/og/blog-gen-import-typescript-barrel-generator-deep-dive.png',
    title: 'gen-import: Everything I Learned Building a Barrel Generator That Understands Your Module Graph',
    excerpt:
      'A full tour of gen-import: how it classifies every import edge as eager or deferred, models the generated barrel as a real node in the module graph, runs Tarjan\'s SCC to tell a broken cycle from a merely fragile one, and picks between four barrel-emission strategies depending on what it finds.',
    metaTitle: 'Inside gen-import: A Graph-Aware TypeScript Barrel Generator',
    metaDescription:
      'How gen-import uses the TypeScript compiler API to classify import edges, model the barrel as a graph node, and catch unsafe cycles with Tarjan\'s SCC.',
    category: 'Developer Tooling',
    date: '2026-07-29',
    readTime: '18 min read',
    tags: ['TypeScript', 'Node.js', 'Static Analysis', 'Compiler API', 'AST', 'Barrel Files', 'CLI Tooling', 'CommonJS', 'Graph Theory'],
    entities: [
      { name: 'TypeScript', sameAs: ['https://en.wikipedia.org/wiki/TypeScript', 'https://www.typescriptlang.org'] },
      { name: 'Node.js', sameAs: ['https://en.wikipedia.org/wiki/Node.js', 'https://nodejs.org'] },
      { name: 'npm', sameAs: 'https://en.wikipedia.org/wiki/Npm' },
      { name: 'Circular dependency', sameAs: 'https://en.wikipedia.org/wiki/Circular_dependency' },
      { name: 'Tarjan\'s strongly connected components algorithm', sameAs: 'https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm' },
      { name: 'CommonJS', sameAs: 'https://en.wikipedia.org/wiki/CommonJS' },
    ],
    relatedSlugs: ['nodejs-pino-s3-log-archiving-cron'],
    faq: [
      {
        question: 'What is gen-import?',
        answer:
          'gen-import is an MIT-licensed npm CLI that generates a barrel file for a TypeScript or JavaScript project. It reads the module graph with the TypeScript compiler API, classifies every export as a type or a value, detects unsafe import cycles, and picks an emission strategy: static re-exports, lazy CommonJS getters, or globals mode.',
      },
      {
        question: 'Why can\'t a regex-based barrel generator tell types from values?',
        answer:
          'Because that distinction lives in the type system, not the syntax. An interface and a class can look identical as text, but only one exists at runtime. Re-exporting a type as a value under isolatedModules or verbatimModuleSyntax produces a real import of something that no longer exists after compilation, which throws at import time.',
      },
      {
        question: 'Is every circular import a bug?',
        answer:
          'No. A cycle only breaks when something reads a binding while a module body is still executing — a class heritage clause, a decorator argument, a static field. If every reference inside the cycle is deferred into a function body, both modules finish initialising fine and the cycle never gets a chance to matter.',
      },
      {
        question: 'What does the --safe-barrels flag do?',
        answer:
          'It refuses to include an export in the generated barrel if doing so would put the barrel inside an unsafe cycle. Files that export types get demoted to type-only re-exports; files with only values get dropped entirely, with the direct-import line printed as a replacement. The barrel is then re-analysed to confirm the result is actually safe.',
      },
      {
        question: 'When should you not use a barrel file?',
        answer:
          'When cold-start time or test isolation matters. Importing one symbol from a barrel evaluates every module it touches, so a single import in a Lambda handler or a unit test can boot an entire application\'s worth of unrelated modules. The pattern that scales is barrels at package boundaries, direct imports inside a package.',
      },
      {
        question: 'Why do the generated CommonJS getters use module.exports instead of exports?',
        answer:
          'Because esbuild-based loaders such as tsx and bun reassign module.exports for any file containing export syntax. Getters installed on the original exports object end up attached to an object nothing points at anymore, so property access silently returns undefined instead of throwing.',
      },
    ],
    howTo: {
      name: 'Adopt gen-import safely in an existing TypeScript project',
      totalTime: 'PT10M',
      tool: ['Node.js', 'TypeScript'],
      steps: [
        {
          name: 'Look at the graph before generating anything',
          text: 'Run `npx gen-import --map` to see every export, every import edge, and the barrel each file would feed into — before any file gets written.',
          anchor: 'map',
        },
        {
          name: 'Generate with unsafe exports withheld',
          text: 'Run `npx gen-import --safe-barrels` so any export that would put the barrel inside a cycle is demoted to a type-only re-export or dropped, with the direct-import line to use instead.',
          anchor: 'safe-barrels-refusing-to-generate-the-broken-thing',
        },
        {
          name: 'Gate cycles and collisions in CI',
          text: 'Add `npx gen-import --strict` to CI so an init-time cycle, an unsafe barrel, or an export-name collision fails the build instead of shipping.',
          anchor: 'stage-5-diagnostics',
        },
      ],
    },
    proficiencyLevel: 'Expert',
    dependencies: ['Node.js 16+', 'TypeScript'],
    blocks: [
      {
        type: 'paragraph',
        text: 'This is the long one — how gen-import reads your code, how it builds the graph, why it emits four different kinds of barrel depending on what it finds, every diagnostic it can produce, and — honestly — when you should not use it at all.',
      },
      {
        type: 'paragraph',
        text: '`gen-import` is on npm, MIT, and currently at v1.10.11. Node 16+. Three runtime dependencies: `typescript`, `boxen`, `chalk`.',
      },
      {
        type: 'code',
        language: 'bash',
        filename: 'terminal',
        code:
          'npm i -D gen-import\n' +
          'npx gen-import',
      },
      {
        type: 'heading',
        text: 'The 30-second version',
      },
      {
        type: 'paragraph',
        text: 'You have this in every file:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'src/user.controller.ts',
        code:
          'import { UserService } from \'../user/user.service\'\n' +
          'import { UserDto } from \'../user/user.dto\'\n' +
          'import { authMiddleware } from \'../middleware/auth.middleware\'\n' +
          'import { PORT } from \'../config/env\'',
      },
      {
        type: 'paragraph',
        text: 'You run `npx gen-import` and you get this:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'src/user.controller.ts',
        code: 'import { UserService, UserDto, authMiddleware, PORT } from \'./gen-import\'',
      },
      {
        type: 'paragraph',
        text: 'That part is easy. Any tool can do that with a regex and twenty lines. Everything else in this post exists because the easy version breaks real projects, and once I understood why, the tool stopped being a code generator and became a static analyser that happens to write a file at the end.',
      },
      {
        type: 'heading',
        text: 'The pipeline',
      },
      {
        type: 'paragraph',
        text: 'Here\'s the whole thing, top to bottom. Every run does all of this.',
      },
      {
        type: 'code',
        language: 'mermaid',
        filename: 'gen-import-pipeline.mmd',
        code:
          'flowchart TD\n' +
          '  A["walk(srcDir)"] --> B["filter: .d.ts, skipPatterns,<br/>pureReexports, generated files"]\n' +
          '  B --> C["split: regular files | module files<br/>(.module.ts .router.ts .routes.ts .route.ts)"]\n' +
          '  C --> D["createTsProgram — ONE ts.Program per run"]\n' +
          '  D --> E["analyzeFiles<br/>TypeChecker.getExportsOfModule<br/>→ type | value | default"]\n' +
          '  D --> F["scanFile → classify every import edge<br/>kind + eager? + eagerVia + line"]\n' +
          '  F --> G["buildModuleGraph<br/>+ contract the barrel as a real node"]\n' +
          '  G --> H["tarjanScc → SCCs → condensation → topoOrder"]\n' +
          '  H --> I["analyzeBarrel<br/>safe | type-safe | ordered | unsafe"]\n' +
          '  E --> I\n' +
          '  I --> J{"--safe-barrels?"}\n' +
          '  J -->|yes| K["selectSafeExports<br/>demote to types / drop values"]\n' +
          '  J -->|no| L["keep everything"]\n' +
          '  K --> M["diagnostics GI001–GI009"]\n' +
          '  L --> M\n' +
          '  M --> N{"emit strategy"}\n' +
          '  N --> O["static re-export (ESM)"]\n' +
          '  N --> P["lazy require getters (CJS)"]\n' +
          '  N --> Q["globals mode"]\n' +
          '  N --> R[".js + .d.ts pair (JS projects)"]\n' +
          '  M --> S{"--strict?"}\n' +
          '  S -->|blocking finding| T["exit 1"]\n' +
          '  S -->|clean| U["summary box + graph box"]',
      },
      {
        type: 'paragraph',
        text: 'Six stages that matter: read → classify → graph → analyse → decide → emit. I\'ll take them in order.',
      },
      {
        type: 'heading',
        text: 'Stage 1 — Reading your code (and why not regex)',
      },
      {
        type: 'paragraph',
        text: 'Everything goes through the TypeScript compiler API. One `ts.Program` is created per run and shared by both the export analyser and the graph builder, so files are parsed once, not twice.',
      },
      {
        type: 'paragraph',
        text: 'The reason it\'s the compiler and not a fast hand-rolled parser is a single question I can\'t answer any other way: is `UserDto` a type or a value?',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'the type-vs-value question',
        code:
          'export interface UserDto { id: string }   // type — erased at compile time\n' +
          'export class UserService {}                // value — exists at runtime\n' +
          'export const PORT = 3000                   // value\n' +
          'export type Role = \'admin\' | \'user\'        // type\n' +
          'export default router                      // value, needs an alias',
      },
      {
        type: 'paragraph',
        text: 'The classification comes from `TypeChecker.getExportsOfModule` and the symbol flags: something carrying `Interface` or `TypeAlias` without the `Value` flag is type-only. Everything else is a value.',
      },
      {
        type: 'paragraph',
        text: 'Get this wrong and you emit:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'gen-import.ts',
        code: 'export { UserDto } from \'./user/user.dto\'',
      },
      {
        type: 'paragraph',
        text: '…which under `isolatedModules`, `verbatimModuleSyntax`, or literally any transpile-only loader becomes a real runtime import of a thing that doesn\'t exist after compilation. Crash, at import time, with a stack trace pointing at a generated file.',
      },
      {
        type: 'paragraph',
        text: 'So types go out as `export type { ... }`, values as `export { ... }`, and default exports get an alias derived from the filename. A regex cannot tell you which bucket a name belongs in, because the answer lives in the type system, not the syntax.',
      },
      {
        type: 'paragraph',
        text: 'Default exclusions, always on: `.d.ts` files, `__tests__`, `.test.`, `.spec.`, plus the generated files themselves (`gen-import`, `gen-app-config`, `gen-package`) — otherwise the barrel re-exports itself and you get an infinite loop of a very stupid kind.',
      },
      {
        type: 'heading',
        text: 'Stage 2 — Classifying edges (the important part)',
      },
      {
        type: 'paragraph',
        text: 'This is the idea the whole tool is built on, and it took me embarrassingly long to arrive at.',
      },
      {
        type: 'paragraph',
        text: 'A circular dependency is only a bug if something reads a binding while a module body is still executing.',
      },
      {
        type: 'paragraph',
        text: 'If `a.ts` and `b.ts` import each other but only touch each other\'s exports inside function bodies, the cycle is completely harmless. Both modules finish initialising, and by the time anything is called, everything is defined. That\'s not a warning-worthy event — that\'s just how a lot of well-factored code looks.',
      },
      {
        type: 'paragraph',
        text: 'So instead of a boolean "is there a cycle", every import edge gets classified: what kind of edge, is the binding read eagerly, and if so, via what.',
      },
      {
        type: 'code',
        language: 'mermaid',
        filename: 'edge-classification.mmd',
        code:
          'flowchart TD\n' +
          '  A["import binding found"] --> B{"where is it read?"}\n\n' +
          '  B -->|"class X extends Y"| C1["EAGER · heritage"]\n' +
          '  B -->|"decorator argument"| C2["EAGER · decorator"]\n' +
          '  B -->|"static field / static block"| C3["EAGER · static"]\n' +
          '  B -->|"export * from \'./x\'"| C4["EAGER · star-reexport"]\n' +
          '  B -->|"import \'./x\' — side effect only"| C5["EAGER · side-effect"]\n' +
          '  B -->|"any other top-level statement"| C6["EAGER · module body"]\n' +
          '  B -->|"inside a function / method body"| D["DEFERRED — resolved at call time"]\n' +
          '  B -->|"type position only"| E["ERASED — not a runtime edge at all"]\n\n' +
          '  C1 --> F["counts toward INIT_EDGE_KINDS"]\n' +
          '  C2 --> F\n' +
          '  C3 --> F\n' +
          '  C4 --> F\n' +
          '  C5 --> F\n' +
          '  C6 --> F\n' +
          '  D --> G["in the graph, but harmless for init order"]\n' +
          '  E --> H["type graph only"]',
      },
      {
        type: 'paragraph',
        text: '`INIT_EDGE_KINDS` is the set of edge kinds that actually participate in module initialisation. Cycle analysis runs over that subgraph, not over the naive "file A mentions file B" graph. Dynamic `import()` and `require()` calls anywhere in the file are also tracked, but as deferred edges.',
      },
      {
        type: 'paragraph',
        text: 'The payoff is that the tool can say things like: "Breaks at `src/user/user.service.ts:14` — class heritage clause (`class X extends Y`)." instead of "Warning: circular dependency detected." One of those you fix. The other you learn to ignore, and then the tool has failed.',
      },
      {
        type: 'heading',
        text: 'Stage 3 — The graph layer',
      },
      {
        type: 'paragraph',
        text: 'Once every edge is classified, the graph work is textbook, and I\'m glad it is, because this is the part where being clever gets you subtle bugs.',
      },
      {
        type: 'list',
        items: [
          '`tarjanScc` — strongly connected components in one pass. Every SCC with more than one member (or a self-loop) is a cycle.',
          '`condensation` — collapse each SCC into a single node, giving you a DAG.',
          '`topoOrder` — topological order over that DAG. This is what determines the order of re-export lines in the barrel, so that for CommonJS the initialisation order is at least plausible. `--no-topo-sort` falls back to alphabetical if you want the legacy behaviour.',
          '`shortestCycle` — when reporting, don\'t dump the whole SCC. Find the shortest actual cycle through it and print that path. A 40-file SCC printed in full is not a bug report, it\'s a wall.',
          '`cycleEdges` — the edges internal to a cycle, so you can filter them to the eager ones and name the exact line that will break.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The non-obvious piece: the barrel is modelled as a node in the graph. `contractBarrel` and `withBarrelExports` insert the generated file into the graph with edges to everything it re-exports, then re-run the analysis. That\'s how the tool can answer "does adding this barrel create a cycle that didn\'t exist before" — which is the actual question, and one you cannot answer by analysing the source alone.',
      },
      {
        type: 'heading',
        text: 'Stage 4 — The barrel safety model',
      },
      {
        type: 'paragraph',
        text: 'Running `analyzeBarrel` gives one of four states. This is basically the tool\'s worldview:',
      },
      {
        type: 'code',
        language: 'text',
        filename: 'barrel safety states',
        code:
          'safe        not part of any cycle                     nothing to do\n' +
          'type-safe   cycle only through type positions          erased at compile time; becomes real if someone drops an import type, or verbatimModuleSyntax turns on\n' +
          'ordered     runtime cycle, every read is deferred      works today — one eager read away from unsafe\n' +
          'unsafe      cycle with an init-time read               fails at runtime, not "might"',
      },
      {
        type: 'paragraph',
        text: 'The `ordered` state is the one I\'m most glad exists. It\'s the state most large Express and Nest codebases are actually in, and neither "you\'re fine" nor "you have a circular dependency" is a true description of it. It\'s a loaded gun with the safety on.',
      },
      {
        type: 'heading',
        text: 'Stage 5 — Diagnostics',
      },
      {
        type: 'paragraph',
        text: 'Nine codes. Each one carries a severity, the files involved, the shortest cycle path, and advice that\'s specific to that cycle rather than generic.',
      },
      {
        type: 'code',
        language: 'text',
        filename: 'diagnostic codes',
        code:
          'GI001  error  Cycle with an init-time read — will break at runtime\n' +
          'GI002  error  The barrel is inside a cycle with an init-time read\n' +
          'GI003  warn   Cycle exists, all reads deferred — resolves at call time\n' +
          'GI004  warn   Barrel inside a cycle, all reads deferred — fragile, not broken\n' +
          'GI005  info   Type-only cycle — erased before runtime\n' +
          'GI006  warn   Export name collision — two files export the same name\n' +
          'GI007  info   Exports withheld by --safe-barrels to keep the barrel acyclic\n' +
          'GI008  info   Direct or dynamic import recommended for this edge\n' +
          'GI009  info   NestJS forwardRef recommended — decorator-time read between framework files',
      },
      {
        type: 'paragraph',
        text: 'Two of those deserve a note.',
      },
      {
        type: 'paragraph',
        text: '`GI006` (collisions) — if `user.service.ts` and `admin.service.ts` both export `createUser`, the barrel physically cannot re-export both. First one wins, the second is silently dropped, and you spend an hour wondering why you\'re calling the wrong function. So it\'s reported, with both file paths, and the advice is: rename one, or exclude the losing file with `--skip`.',
      },
      {
        type: 'paragraph',
        text: '`GI009` — when a decorator-time read appears in a cycle and the files match the NestJS naming convention (`.module.ts`, `.service.ts`, `.controller.ts`, `.guard.ts`, `.resolver.ts`, `.interceptor.ts`, `.pipe.ts`, `.filter.ts`), the fix is almost always `forwardRef`, so the tool says that specifically instead of giving general advice about module graphs.',
      },
      {
        type: 'paragraph',
        text: 'For CI, `--strict` turns findings into exit code 1, and you can scope it:',
      },
      {
        type: 'code',
        language: 'bash',
        filename: 'terminal',
        code:
          'npx gen-import --strict=cycles       # GI001 only\n' +
          'npx gen-import --strict=barrels      # GI002 / GI004\n' +
          'npx gen-import --strict=collisions   # GI006\n' +
          'npx gen-import --strict              # everything (default)',
      },
      {
        type: 'paragraph',
        text: '`--strict-cycles` still works as a deprecated alias for `--strict=cycles`.',
      },
      {
        type: 'heading',
        text: 'Stage 6 — Emission: four different barrels',
      },
      {
        type: 'paragraph',
        text: 'This is where I stopped believing there\'s one correct output. What gets written depends on module system, language, and what the analysis found.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Static re-exports (ESM default)',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'gen-import.ts',
        code:
          'export type { UserDto } from \'./user/user.dto\'\n' +
          'export { UserService } from \'./user/user.service\'',
      },
      {
        type: 'paragraph',
        text: 'Clean, standard, tree-shakeable by any bundler. Also the one that can genuinely deadlock on a cycle, because ESM live bindings resolve during evaluation and there is no escape hatch.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Lazy getters (CJS default)',
      },
      {
        type: 'paragraph',
        text: 'For CommonJS, the barrel doesn\'t resolve anything until you touch it:',
      },
      {
        type: 'code',
        language: 'js',
        filename: 'gen-import.js',
        code:
          'Object.defineProperty(module.exports, \'UserService\', {\n' +
          '  get() { return require(\'./user/user.service\').UserService },\n' +
          '  enumerable: true,\n' +
          '  configurable: true,\n' +
          '})',
      },
      {
        type: 'paragraph',
        text: 'Paired with a `declare` line so TypeScript still knows the type:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'gen-import.d.ts',
        code: 'export declare const UserService: typeof import(\'./user/user.service\').UserService',
      },
      {
        type: 'paragraph',
        text: 'Nothing is required until first property access, so the cycle never gets a chance to bite. `--lazy` is on by default for CJS, `--no-lazy` forces static, and if your `package.json` says `"type": "module"` the tool warns and falls back to static — because you genuinely cannot do this in ESM.',
      },
      {
        type: 'paragraph',
        text: 'The bug that cost me a night: I originally installed the getters on `exports`, not `module.exports`. Works in plain `node`. Returns `undefined` in `tsx`. The reason is that esbuild-based loaders (tsx, and bun does it too) reassign `module.exports` for any file containing `export` syntax — so my getters were sitting on an object nothing pointed at anymore. One word. No stack trace. That explanation is now hard-coded into the header of every generated file so I never rediscover it.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Globals mode',
      },
      {
        type: 'code',
        language: 'bash',
        filename: 'terminal',
        code: 'npx gen-import --globals',
      },
      {
        type: 'paragraph',
        text: 'Registers every value export on Node\'s `global`, plus a `declare global` block so the IDE still type-checks. Import the barrel once in your entry point and no other file needs an import statement at all:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'src/main.ts',
        code:
          '// src/main.ts\n' +
          'import \'./gen-import\'\n\n' +
          '// anywhere else — no import needed\n' +
          'const svc = new UserService()',
      },
      {
        type: 'paragraph',
        text: 'Only values get registered, obviously. A type on `global` is an undefined property with a confident name.',
      },
      {
        type: 'paragraph',
        text: 'This is the most "magic" mode and I\'d only use it in an app you own end to end. It kills tree-shaking completely and makes every symbol look like it came from nowhere.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'JS projects',
      },
      {
        type: 'paragraph',
        text: 'If there\'s no `tsconfig.json` and no `.ts` files, you get `gen-import.js` (runtime) plus `gen-import.d.ts` (types) as a pair, so JS projects keep IDE completion. TS projects get a single `.ts` file, and `--no-js` / `generateJs` controls whether a `.js` companion is emitted alongside.',
      },
      {
        type: 'heading',
        text: '--safe-barrels: refusing to generate the broken thing',
      },
      {
        type: 'paragraph',
        text: 'The most opinionated flag. If including an export would put the barrel inside a cycle, don\'t include it.',
      },
      {
        type: 'paragraph',
        text: 'Two outcomes per file:',
      },
      {
        type: 'list',
        items: [
          'Demoted — the file has types, so the types are re-exported and the values are stripped. Types are erased before runtime, so they can\'t create a runtime cycle. You lose nothing.',
          'Dropped — the file has only values, so it\'s excluded entirely. The tool prints the exact direct-import line to use instead, plus why it was withheld: either it reads through the barrel while its own module body runs, or it shares the barrel\'s cycle and withholding it is what breaks the loop.',
        ],
      },
      {
        type: 'paragraph',
        text: 'After withholding, the barrel is re-analysed to confirm the result is actually `safe` or `type-safe`, and if it is, `GI007` reports what it cost you. The summary box shows the transition, struck-through:',
      },
      {
        type: 'code',
        language: 'text',
        filename: 'summary box excerpt',
        code:
          'Barrel        unsafe → safe\n' +
          'Safe barrels  on · 2 demoted, 1 dropped',
      },
      {
        type: 'paragraph',
        text: 'I like this flag because it\'s the tool admitting the limits of its own approach. A generator that will happily write a file it knows will crash is not a good tool.',
      },
      {
        type: 'heading',
        text: 'Everything else',
      },
      {
        type: 'heading',
        level: 3,
        text: '--app-config',
      },
      {
        type: 'paragraph',
        text: 'Generates `gen-app-config.ts`, an aggregator that re-exports from `gen-import` (and `gen-package` if present). The point is a single stable import surface for your app: downstream code imports only from `gen-app-config` and never from an individual source path or from a barrel directly.',
      },
      {
        type: 'paragraph',
        text: 'By default it auto-updates — it rescans, diffs against the names already present, and appends only the new ones. `--no-auto-update` turns that off.',
      },
      {
        type: 'heading',
        level: 3,
        text: '--map',
      },
      {
        type: 'paragraph',
        text: 'Export map visualisation, three formats:',
      },
      {
        type: 'code',
        language: 'bash',
        filename: 'terminal',
        code:
          'npx gen-import --map                      # tree in the terminal\n' +
          'npx gen-import --map --map-format json\n' +
          'npx gen-import --map --map-format mermaid --map-out docs/graph.md',
      },
      {
        type: 'paragraph',
        text: 'Console gives you a tree per file — values, types, defaults, and who imports it. JSON gives you the raw structure for other tooling. Mermaid gives you a `flowchart LR` you can paste straight into a README or dev.to post (labels truncate at 50 characters so the diagram stays readable).',
      },
      {
        type: 'paragraph',
        text: 'Regardless of format, every `--map` run also writes `docs/export-map.json`, so you can commit it and diff your public surface between branches. On this repo it currently reports 15 files, 303 exports, 18 internal import edges.',
      },
      {
        type: 'paragraph',
        text: '`--no-imports` skips the import-relationship pass if you only want the export inventory and want it fast.',
      },
      {
        type: 'heading',
        level: 3,
        text: '--watch',
      },
      {
        type: 'paragraph',
        text: 'Recursive `fs.watch` on `srcDir` with a 150ms debounce, filtered to `.ts` / `.js`, with a re-entrancy guard so a slow regeneration can\'t overlap itself, and a `SIGINT` handler that closes the watcher cleanly. Regenerates every barrel you asked for on every change.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Module file deferral',
      },
      {
        type: 'paragraph',
        text: 'Files matching `.module.ts`, `.routes.ts`, `.router.ts`, `.route.ts` are always appended last in the barrel. These files reference services and repositories, so if they\'re initialised before their dependencies you get a circular-require at startup — the classic NestJS and Express-router failure. `-m` / `--module-pattern` (repeatable) lets you add your own patterns.',
      },
      {
        type: 'paragraph',
        text: 'This is a heuristic, and I\'d rather it eventually be replaced by pure graph ordering. But it\'s a heuristic that has never once been wrong on a real project, which is more than I can say for some of my principled solutions.',
      },
      {
        type: 'heading',
        level: 3,
        text: '--skip and --pure-reexport',
      },
      {
        type: 'paragraph',
        text: '`--skip <substring>` excludes anything whose path contains it. `--pure-reexport <path>` marks a file that is already re-exported by another barrel — an `index.ts` you wrote by hand — so it doesn\'t get double-exported. Note that `pureReexports` paths are relative to `rootDir`, not `srcDir`, which has bitten more than one person, including me.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Config file',
      },
      {
        type: 'paragraph',
        text: '`gen-import.config.js` (or `.cjs` on ESM projects) in the project root: `srcDir`, `outFileName`, `moduleFilePattern`, `skipPatterns`, `pureReexports`, `generateJs`. CLI flags always win over config values.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'The console output',
      },
      {
        type: 'paragraph',
        text: 'Two boxes on every run: a summary (files, exports, language, module type, globals/lazy/toposort state, import edge count, cycle count split into total vs init-time, barrel safety, collisions, and a diff of newly added exports) and an import/export graph showing every file, its exports tagged `[T]` / `[V]` / `[D]`, and the barrel they feed into.',
      },
      {
        type: 'paragraph',
        text: 'The "new exports" diff is the feature I use most day to day. It reads the previous barrel before overwriting it and tells you exactly what appeared — a quiet, free review of what you added since the last run.',
      },
      {
        type: 'heading',
        text: 'Programmatic API',
      },
      {
        type: 'paragraph',
        text: 'Everything the CLI does is exported: `genImport`, `genAppConfig`, `genExportMap`, `watchSrc`, and `genPackage`.',
      },
      {
        type: 'paragraph',
        text: '`genPackage` is deliberately not in the CLI. It reads `dependencies` (optionally `devDependencies`) from `package.json` and generates a `gen-package.ts` of `export * from \'<pkg>\'` lines. It\'s useful, but it has a sharp edge: packages using `export =` (Express is the obvious one) are fundamentally incompatible with `export * from`, so they have to be excluded and imported directly. That\'s too much footgun for a flag people will discover by reading `--help`, so it stays API-only until I have a better answer.',
      },
      {
        type: 'paragraph',
        text: 'The graph utilities are exported too — `buildModuleGraph`, `tarjanScc`, `topoOrder`, `cyclicSccs`, `shortestCycle`, `cycleEdges`, `condensation`, `analyzeBarrel`, `selectSafeExports`, `detectCycles`, `buildDepGraph`, `createTsProgram`. If you want the analyser and none of the code generation, take it. That\'s what it\'s there for.',
      },
      {
        type: 'heading',
        text: 'Design decisions, and what they cost',
      },
      {
        type: 'list',
        items: [
          'One `ts.Program` per run. Created once, passed to both the export analyser and the graph builder. Creating two would roughly double the slowest part of the run.',
          'Compiler API over regex. Slower — noticeably so on big projects, and this is the tool\'s main performance ceiling. Also the only way to get type-vs-value classification right, which is non-negotiable.',
          'Manual `process.argv` parsing, no CLI parser dependency. Three runtime deps total (`typescript`, `boxen`, `chalk`), and I\'d like to keep it that way. A dev tool that installs 40 transitive packages to print a box is not a dev tool I want to maintain.',
          'The barrel is analysed as part of the graph, not separately. More code, but it\'s the only way to answer the question that actually matters.',
          'No test script, `tsc` is the CI gate. That\'s a real gap, not a design decision, and it\'s the next thing I\'m fixing. Being honest about it here so I actually do it.',
        ],
      },
      {
        type: 'heading',
        text: 'When you should not use this',
      },
      {
        type: 'paragraph',
        text: 'I\'d rather say this than have someone find out the hard way.',
      },
      {
        type: 'paragraph',
        text: 'A barrel means importing one symbol evaluates everything the barrel touches. On a 400-file Express app, one import from `./gen-import` initialises all 400 modules. You feel that immediately as:',
      },
      {
        type: 'list',
        items: [
          'Serverless cold starts. If you deploy to Lambda or Cloud Run, don\'t route production code through a full-project barrel. Measure it.',
          'Test startup. A unit test that needs one pure function now boots your DB config, your Redis client, and your queue.',
          'Tree-shaking. Bundlers can shake barrels, but re-export chains defeat it more often than anyone admits, and side effects in any barrel member kill it outright.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The pattern that holds up in large repos: barrels at package boundaries, direct imports inside a package. `gen-import` is at its best generating that boundary barrel, or being used purely as an analyser via `--map` and `--strict`.',
      },
      {
        type: 'paragraph',
        text: 'That\'s also why `--safe-barrels` and the whole diagnostic layer exist. I\'d rather ship a barrel generator that tells you when not to use a barrel than one that pretends the tradeoff isn\'t there.',
      },
      {
        type: 'heading',
        text: 'Where it\'s going',
      },
      {
        type: 'paragraph',
        text: 'Three things, in order:',
      },
      {
        type: 'list',
        items: [
          'Types-only as the primary artifact. A `.d.ts` with `declare global` gives you the IDE experience with zero runtime edges — which means zero cycles, structurally. The physical barrel becomes opt-in rather than the default.',
          'A resolver API. Right now the tool only knows your `src`. A resolver would let `z`, `Router`, `Queue`, `PrismaClient` resolve from your dependencies too, with shipped presets for Express, Prisma, Zod, BullMQ and `node:*`. This is the `unplugin-vue-components` idea properly applied to a backend.',
          'Transform-time injection. Skip the barrel entirely where the build allows it and inject the direct import per file. Best runtime characteristics, worst configuration surface — so it comes last, and it starts with exactly one adapter.',
        ],
      },
      {
        type: 'heading',
        text: 'Try it',
      },
      {
        type: 'code',
        language: 'bash',
        filename: 'terminal',
        code:
          'npm i -D gen-import\n' +
          'npx gen-import --map           # look before you generate\n' +
          'npx gen-import --safe-barrels  # then generate\n' +
          'npx gen-import --strict        # then gate it in CI',
      },
      {
        type: 'paragraph',
        text: '[github.com/elrefai99/Gen-Import](https://github.com/elrefai99/Gen-Import) · MIT · the repo dogfoods itself, so `src/gen-import.ts` in there is generated output you can read.',
      },
      {
        type: 'paragraph',
        text: 'If it breaks on your repo, open an issue. Most of what\'s in this post exists because it broke on someone\'s repo first — usually mine.',
      },
    ],
  },
  {
    id: 6,
    slug: 'nodejs-pino-s3-log-archiving-cron',
    ogImage: '/og/blog-nodejs-pino-s3-log-archiving-cron.png',
    title: 'Automated Log Archiving in Node.js: Pino, Cron Rotation, and AWS S3',
    excerpt:
      'A deliberately boring production log pipeline: Pino writes NDJSON to disk, a UTC cron job rotates the file and reopens the descriptor, a gzipped archive goes to S3 with checksum verification, and the local copy is deleted only after the object is confirmed — with S3 Lifecycle enforcing retention.',
    metaTitle: 'Node.js Log Archiving with Pino, Cron Rotation & AWS S3',
    metaDescription:
      'Build a Node.js log pipeline with Pino: daily cron rotation, file descriptor reopen, verified gzip upload to S3, and 90-day Lifecycle retention.',
    category: 'Cloud & DevOps',
    date: '2026-07-27',
    readTime: '17 min read',
    tags: ['Node.js', 'Pino', 'Logging', 'AWS', 'S3', 'Cron', 'Observability', 'Security', 'TypeScript', 'DevOps'],
    entities: [
      { name: 'Node.js', sameAs: ['https://en.wikipedia.org/wiki/Node.js', 'https://nodejs.org'] },
      { name: 'Pino', sameAs: 'https://getpino.io' },
      { name: 'Amazon S3', sameAs: 'https://en.wikipedia.org/wiki/Amazon_S3' },
      { name: 'Amazon Web Services', sameAs: ['https://en.wikipedia.org/wiki/Amazon_Web_Services', 'https://aws.amazon.com'] },
      { name: 'cron', sameAs: 'https://en.wikipedia.org/wiki/Cron' },
      { name: 'OpenTelemetry', sameAs: ['https://en.wikipedia.org/wiki/OpenTelemetry', 'https://opentelemetry.io'] },
    ],
    relatedSlugs: ['aws-ec2-s3-kubernetes-production-deployments', 'server-sent-events-real-time-notifications-srvj'],
    faq: [
      {
        question: 'Why use Pino instead of Winston for Node.js logging?',
        answer:
          'Pino writes newline-delimited JSON with very little per-log overhead, and structured JSON is what makes logs queryable later. The output format is also the archive format, so no reprocessing step sits between writing a log and searching it months afterwards.',
      },
      {
        question: 'How do you rotate a log file without losing writes?',
        answer:
          'Rename the current file and have the logger reopen its file descriptor. Renaming is atomic and the already-open descriptor keeps pointing at the renamed inode, so in-flight writes land safely; the reopen then starts a fresh file. Deleting or truncating a file the logger still holds loses data.',
      },
      {
        question: 'How do you verify a log archive actually reached S3?',
        answer:
          'Compare the checksum of the uploaded object against the local gzip before deleting anything. Delete the local copy only after S3 confirms the object, so a failed or truncated upload leaves the only remaining copy on disk instead of nowhere.',
      },
      {
        question: 'How do you enforce log retention on S3?',
        answer:
          'Use an S3 Lifecycle rule rather than application code. Lifecycle expiry runs inside S3 whether or not your service is healthy, which is exactly the property you want from the mechanism that stops you paying to store logs forever.',
      },
      {
        question: 'What should never be written to application logs?',
        answer:
          'Credentials, tokens, full payment payloads, and personal data. Redaction has to happen at the logger, not downstream, because once a secret is written to disk it is also in every archive, every backup, and every copy anyone has pulled since.',
      },
    ],
    howTo: {
      name: 'Set up automated Node.js log archiving with Pino, cron, and AWS S3',
      totalTime: 'PT90M',
      tool: ['Node.js', 'Pino', 'AWS S3', 'cron'],
      steps: [
        {
          name: 'Configure the logging module',
          text:
            'Set up Pino to write newline-delimited JSON to a file on disk, with redaction configured at the logger so secrets never reach the archive.',
          anchor: 'the-logging-module',
        },
        {
          name: 'Rotate the log file daily',
          text:
            'Run a UTC cron job that renames the current log file and has the logger reopen its file descriptor, so in-flight writes are never lost.',
          anchor: 'daily-log-rotation',
        },
        {
          name: 'Upload the archive to S3',
          text:
            'Gzip the rotated file, upload it to S3, verify the stored object against the local checksum, and only then delete the local copy.',
          anchor: 'uploading-archives-to-s3',
        },
        {
          name: 'Enforce retention with S3 Lifecycle',
          text:
            'Add an S3 Lifecycle rule so archives expire inside S3 on a fixed schedule, independently of whether the application is running.',
          anchor: 'automatic-retention-with-s3-lifecycle',
        },
      ],
    },
    blocks: [
      {
        type: 'paragraph',
        text: 'Most teams treat logging as a solved problem until the night they need it. Then they discover the disk filled up three weeks ago, the logs that mattered were rotated into oblivion, or worse — the logs exist but contain a customer\'s `Authorization` header in plaintext.',
      },
      {
        type: 'paragraph',
        text: 'This article walks through a production log archiving pipeline that is deliberately boring: Pino writes structured JSON to a local file, a daily cron job rotates that file, uploads it to S3, and deletes the local copy only after the upload is verified. S3 Lifecycle rules expire objects after 90 days. No log shipping agents, no vendor, no per-GB ingestion bill.',
      },
      {
        type: 'paragraph',
        text: 'It is not the right architecture for every system, and I will be explicit about where it breaks down. But for a single-VM or small-fleet Node.js service, it gives you searchable, durable, cost-bounded logs with roughly 150 lines of code and one IAM policy.',
      },
      {
        type: 'heading',
        text: 'Architecture at a glance',
      },
      {
        type: 'paragraph',
        text: 'The pipeline end to end, with the failure paths and the detail that most implementations get wrong — the file descriptor reopen:',
      },
      {
        type: 'code',
        language: 'mermaid',
        filename: 'log-archive.mmd',
        code:
          'flowchart TD\n' +
          '    A[HTTP Request / Domain Event] --> B[Pino Logger]\n' +
          '    B --> C{redact paths}\n' +
          '    C --> D[SonicBoom destination]\n' +
          '    D --> E[(logs/app.log)]\n\n' +
          '    F[Cron 00:00 UTC] --> G[Acquire rotation lock]\n' +
          '    G --> H[fs.rename app.log to YYYY-MM-DD.log]\n' +
          '    H --> I[Signal process: destination.reopen]\n' +
          '    I --> J[New empty app.log created]\n' +
          '    J --> K[gzip archive]\n' +
          '    K --> L[PutObject to S3 with checksum]\n' +
          '    L --> M{HTTP 200 and checksum verified?}\n' +
          '    M -- yes --> N[unlink local archive]\n' +
          '    M -- no --> O[Keep file, alert, retry tomorrow]\n' +
          '    N --> P[(S3 bucket: logs/YYYY/MM/DD/)]\n' +
          '    P --> Q[S3 Lifecycle: Expiration 90 days]\n' +
          '    Q --> R[Object deleted by AWS, no request cost]',
      },
      {
        type: 'paragraph',
        text: 'Two things in that diagram deserve early attention, because they are the difference between a working system and a silent data-loss bug:',
      },
      {
        type: 'list',
        items: [
          'The reopen step — on Linux, renaming a file the process has open does not detach the process from it. Without an explicit reopen, your application keeps writing into the archived file.',
          'The verified delete — local deletion is conditional on a confirmed upload, never on the upload call returning without throwing.',
        ],
      },
      {
        type: 'heading',
        text: 'Why application logging matters',
      },
      {
        type: 'paragraph',
        text: 'Metrics tell you that something is wrong. Traces tell you where. Logs tell you what actually happened — the specific user, the specific payload shape, the specific branch of the specific conditional.',
      },
      {
        type: 'paragraph',
        text: 'In practice, logs earn their keep in four situations:',
      },
      {
        type: 'list',
        items: [
          'Incident forensics — a payment webhook was processed twice. Was it a duplicate delivery from the provider, or did your idempotency key generation collide? Only the log line carrying the provider\'s event ID and your computed key answers that.',
          'Non-reproducible bugs — the class of bug that only occurs for one merchant, on one locale, with one malformed field. You cannot reproduce it locally; you can read what happened.',
          'Audit and dispute resolution — "the customer says they never cancelled." A timestamped, immutable record of the state transition ends the conversation.',
          'Behavioural archaeology — understanding how a feature is actually used before you refactor it.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The common failure is not "we do not log." It is "we log, but the logs are unqueryable, unretained, or unsafe."',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Why JSON logs beat plain text',
      },
      {
        type: 'paragraph',
        text: 'A plain-text line like `[2026-07-26 11:04:22] user 8123 failed login from 41.x.x.x` is human-readable and machine-hostile. To answer "how many failed logins per IP in the last hour," you write a regex. When someone adds a field, the regex breaks. Structured JSON gives you:',
      },
      {
        type: 'list',
        items: [
          'Queryability without parsing — `jq \'select(.level >= 50 and .route == "/checkout")\'` works today; the same file loads into Athena, OpenSearch, or DuckDB tomorrow with no ETL.',
          'Type preservation — `durationMs: 412` stays a number. In text logs everything is a string until you regex it back.',
          'Stable contracts — adding `tenantId` to every line breaks nothing downstream. Adding a column to a text format breaks every consumer.',
          'Injection safety — a user submitting a username containing `\\n level=fatal` cannot forge a log line, because JSON encoding escapes the newline. Text formats are genuinely vulnerable to log forging.',
          'Correlation — carrying `requestId` / `traceId` on every line lets you reconstruct a full request across dozens of emissions.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The tradeoff: JSON is verbose and unpleasant to read raw. That is solved at read time with `pino-pretty` in development, not by degrading the production format. Never let developer ergonomics dictate your production log format.',
      },
      {
        type: 'heading',
        text: 'Why Pino was chosen',
      },
      {
        type: 'paragraph',
        text: 'Pino is a JSON-first logger built around a simple principle: serialize as little as possible on the main thread, and get bytes out of the process fast. What that buys, concretely:',
      },
      {
        type: 'list',
        items: [
          'Low overhead in the hot path — Pino writes newline-delimited JSON through SonicBoom, a buffered write stream that batches syscalls instead of issuing one `write()` per log line.',
          'Built-in redaction — the `redact` option compiles a set of paths into a fast censoring function. Security becomes a config concern, not something each developer must remember at each call site.',
          'Child loggers — `logger.child({ requestId })` gives you per-request context propagation at almost no cost.',
          'Transports run off-thread — `pino.transport()` moves formatting and shipping into a worker thread, keeping the event loop free.',
          'It writes to a file cleanly — which is exactly what this architecture requires.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The problem it solves is the two classic logging taxes — CPU spent formatting strings, and event-loop blocking on synchronous stdout writes — while producing a format that is machine-consumable by default. That matters in any Node.js service where log volume is non-trivial and logs will be consumed by tooling rather than only by human eyes. The drawbacks are real too:',
      },
      {
        type: 'list',
        items: [
          'Asynchronous, buffered writes mean that on a hard crash (`SIGKILL`, an OOM kill) the last buffered lines can be lost — the exact opposite of what you want when debugging a crash. Mitigation: `sync: true` for fatal-level paths, or a `process.on(\'exit\')` handler calling `logger.flush()`. There is no free lunch; you are trading durability for throughput.',
          'Redaction only protects paths you declared. An unknown nested object leaks.',
          'Raw output is unreadable without a formatter.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Compared with the alternatives:',
      },
      {
        type: 'list',
        items: [
          'Winston — far more flexible transport ecosystem and formatting layers, at a meaningfully higher per-line cost. Choose it if you need many heterogeneous sinks configured in-process.',
          'Bunyan — the original JSON logger; conceptually similar, effectively unmaintained relative to Pino.',
          '`console.log` — unstructured, synchronous to a pipe on some platforms, no levels, no redaction. Acceptable only in scripts.',
          'OpenTelemetry Logs SDK — the correct long-term answer if you are unifying logs, metrics, and traces under one vendor-neutral pipeline. Heavier to adopt; Pino can feed it.',
        ],
      },
      {
        type: 'heading',
        text: 'Folder structure',
      },
      {
        type: 'code',
        language: 'text',
        filename: 'project layout',
        code:
          'src/\n' +
          '├── config/\n' +
          '│   ├── env.ts                  # validated environment (zod/envalid)\n' +
          '│   └── s3.ts                   # S3Client singleton\n' +
          '├── lib/\n' +
          '│   └── logger/\n' +
          '│       ├── index.ts            # pino instance + destination\n' +
          '│       ├── redact.ts           # redaction path list\n' +
          '│       └── serializers.ts      # req/res/err serializers\n' +
          '├── middlewares/\n' +
          '│   └── request-logger.ts       # pino-http wiring + requestId\n' +
          '├── jobs/\n' +
          '│   └── log-archive/\n' +
          '│       ├── index.ts            # cron registration\n' +
          '│       ├── rotate.ts           # rename + reopen\n' +
          '│       ├── upload.ts           # gzip + S3 put + verify\n' +
          '│       └── cleanup.ts          # verified local delete\n' +
          '└── server.ts\n' +
          'logs/\n' +
          '├── app.log                     # current, always open\n' +
          '└── 2026-07-25.log              # rotated, pending upload',
      },
      {
        type: 'paragraph',
        text: 'Two structural decisions worth naming:',
      },
      {
        type: 'list',
        items: [
          '`logs/` sits outside `src/`, is gitignored, and in containers it is a mounted volume. If it lives on the container\'s writable layer, rotation still "works" and every archive dies with the container.',
          'Rotation, upload, and cleanup are three separate modules because they are three distinct failure domains: a filesystem failure, a network/IAM failure, and a cleanup failure. Collapsing them into one function makes the failure states impossible to reason about and impossible to unit test.',
        ],
      },
      {
        type: 'heading',
        text: 'The logging module',
      },
      {
        type: 'paragraph',
        text: 'The logger is a single module-level singleton. Everything else derives child loggers from it.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'src/lib/logger/index.ts',
        code:
          'import pino from \'pino\';\n\n' +
          'const destination = pino.destination({\n' +
          '  dest: \'logs/app.log\',\n' +
          '  sync: false,        // buffered writes\n' +
          '  mkdir: true,\n' +
          '});\n\n' +
          'export const logger = pino(\n' +
          '  {\n' +
          '    level: process.env.LOG_LEVEL ?? \'info\',\n' +
          '    base: {\n' +
          '      service: \'api\',\n' +
          '      env: process.env.NODE_ENV,\n' +
          '      version: process.env.APP_VERSION,\n' +
          '    },\n' +
          '    timestamp: pino.stdTimeFunctions.isoTime,\n' +
          '    redact: {\n' +
          '      paths: [\n' +
          '        \'req.headers.authorization\',\n' +
          '        \'req.headers.cookie\',\n' +
          '        \'req.headers["x-api-key"]\',\n' +
          '        \'res.headers["set-cookie"]\',\n' +
          '        \'password\',\n' +
          '        \'*.password\',\n' +
          '        \'body.token\',\n' +
          '        \'body.cardNumber\',\n' +
          '        \'user.email\',\n' +
          '      ],\n' +
          '      censor: \'[REDACTED]\',\n' +
          '    },\n' +
          '  },\n' +
          '  destination,\n' +
          ');\n\n' +
          '// Critical: lets the rotation job detach from the renamed inode.\n' +
          'process.on(\'SIGHUP\', () => destination.reopen());\n\n' +
          'process.on(\'exit\', () => logger.flush());',
      },
      {
        type: 'paragraph',
        text: 'Why each of those lines is there:',
      },
      {
        type: 'list',
        items: [
          '`base` stamps `service`, `env`, and `version` on every line. Without `version`, you cannot correlate an error spike to a deploy.',
          '`isoTime` costs slightly more than Pino\'s default epoch milliseconds, but it makes archived files readable and makes Athena / `jq` date filtering trivial. For a file-archived pipeline that trade is worth it; in an ultra-high-throughput service, keep epoch and convert at read time.',
          '`redact` is declarative and centralized. The tradeoff: wildcard paths (`*.password`) are slower than exact paths and still only cover the shapes you anticipated. Redaction is a safety net, not a policy — the policy is "do not pass secrets to the logger."',
          '`SIGHUP` → `reopen()` is the hinge of the entire rotation design. More on that next.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Request logging attaches a correlation ID and a child logger per request:',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'src/middlewares/request-logger.ts',
        code:
          'import pinoHttp from \'pino-http\';\n' +
          'import { randomUUID } from \'node:crypto\';\n\n' +
          'export const requestLogger = pinoHttp({\n' +
          '  logger,\n' +
          '  genReqId: (req) => (req.headers[\'x-request-id\'] as string) ?? randomUUID(),\n' +
          '  customLogLevel: (_req, res, err) => {\n' +
          '    if (err || res.statusCode >= 500) return \'error\';\n' +
          '    if (res.statusCode >= 400) return \'warn\';\n' +
          '    return \'info\';\n' +
          '  },\n' +
          '  serializers: {\n' +
          '    req: (req) => ({ method: req.method, url: req.url, id: req.id }),\n' +
          '    res: (res) => ({ statusCode: res.statusCode }),\n' +
          '  },\n' +
          '});',
      },
      {
        type: 'paragraph',
        text: 'Note the custom `req` serializer. Pino\'s default serializer includes headers; an explicit allow-list is safer than relying on redaction to subtract fields. Allow-list what you log; do not deny-list what you do not.',
      },
      {
        type: 'heading',
        text: 'Daily log rotation',
      },
      {
        type: 'paragraph',
        text: 'An unrotated log file has four failure modes, and all four are experienced eventually:',
      },
      {
        type: 'list',
        items: [
          'Unbounded disk growth. A full disk does not degrade a Node service gracefully — writes fail, the process may crash, and on a shared volume the database goes down with it. This is one of the most common self-inflicted production outages.',
          'Unreadable file sizes. `grep` on a 40 GB file is a minutes-long operation that saturates disk I/O on a live server.',
          'No natural archive unit. "Upload yesterday\'s logs" is only meaningful if a file is yesterday\'s logs.',
          'No retention boundary. You cannot expire what you cannot address.',
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'The inode problem',
      },
      {
        type: 'paragraph',
        text: 'This is the single most important implementation detail in the whole pipeline. On Linux, `fs.rename(\'logs/app.log\', \'logs/2026-07-25.log\')` changes a directory entry. It does not touch the open file descriptor — the process holds a reference to the inode, not the path. So after the rename, your application happily continues appending to `2026-07-25.log`, and the new empty `app.log` you created sits at zero bytes forever.',
      },
      {
        type: 'paragraph',
        text: 'The symptom is delightful: rotation appears to work, uploads succeed, and one day you notice yesterday\'s archive contains today\'s traffic. The fix is a two-phase rotation:',
      },
      {
        type: 'code',
        language: 'text',
        filename: 'two-phase rotation',
        code:
          'Phase 1: fs.rename(app.log → 2026-07-25.log)\n' +
          '           app process still writing to old inode\n' +
          'Phase 2: signal SIGHUP\n' +
          '           SonicBoom closes fd, opens logs/app.log fresh\n' +
          '           new inode created, writes resume with zero downtime',
      },
      {
        type: 'paragraph',
        text: '`destination.reopen()` closes the current descriptor and opens the configured path again, creating a new file. Because SonicBoom buffers, the reopen flushes pending bytes into the archived file first — which is correct, since those bytes belong to yesterday. The gap between rename and reopen is sub-millisecond, and the lines written in that window land in the archive rather than in a void. There is no downtime and no dropped line, which is precisely why this pattern is preferable to stopping the process.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Comparing rotation strategies',
      },
      {
        type: 'list',
        items: [
          'rename + reopen (this design) — the app owns rotation via an explicit signal. Requires an in-process signal handler; in exchange you get zero data loss, full control, and a testable seam.',
          '`logrotate` with `copytruncate` — copies the file, then truncates the original in place. No app cooperation needed, but there is a real race window between copy and truncate where lines are lost, and it doubles disk I/O for the copy.',
          '`logrotate` with a `postrotate` `kill -HUP` — the same signal mechanism, orchestrated by the OS. Solid on VMs; adds an OS-level dependency that does not exist inside a minimal container image.',
          '`pino-roll` — a Pino transport that rotates by size or interval internally. Least code, but less control over the exact filename boundary and the handoff to the upload step.',
          'Size-based rotation — rotate at N MB. Bounds disk usage under traffic spikes, but produces non-date-aligned files that are awkward to partition in S3.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Time-based rotation was chosen because the archive unit and the retention unit should be the same unit. A 90-day retention policy is trivially expressible over daily files and awkward over 500 MB chunks.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Scheduling',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'src/jobs/log-archive/index.ts',
        code:
          'import cron from \'node-cron\';\n\n' +
          'cron.schedule(\'0 0 * * *\', () => void runArchiveJob(), {\n' +
          '  timezone: \'UTC\',\n' +
          '  name: \'log-archive\',\n' +
          '});',
      },
      {
        type: 'paragraph',
        text: 'Use UTC. Local-time midnight in a DST-observing zone is either skipped or executed twice once a year. A duplicated rotation is survivable if the job is idempotent; a skipped one silently merges two days of logs into one file. Log timestamps should be UTC for the same reason. On where the schedule lives:',
      },
      {
        type: 'list',
        items: [
          '`node-cron` (chosen) — the job runs inside the process that owns the file descriptor, so `reopen()` is a direct function call rather than a signal. Simplest correct option for a single instance. Drawback: it dies with the process, and it fires on every instance if you scale horizontally.',
          'System crontab or a systemd timer — survives app restarts, but must signal the app externally and cannot easily report failures into your logging pipeline.',
          'A BullMQ repeatable job — the right answer at multi-instance scale: Redis gives you a single winner per scheduled tick, retries with backoff, and observability. Drawback: the worker that wins the tick may not be on the host holding the file. That is the point at which local-file logging stops being the right architecture at all.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For multiple instances today, the pragmatic fix is to include the instance identity in the filename and S3 key: `2026-07-25.api-7f3c9.log.gz`. Never let two processes rotate the same file. Guard against overlap with a lock — an in-memory boolean for a single instance, a Redis `SET NX` with a TTL otherwise. If yesterday\'s upload is still retrying when tonight\'s rotation fires, you want the second run to skip, not to interleave.',
      },
      {
        type: 'heading',
        text: 'Uploading archives to S3',
      },
      {
        type: 'paragraph',
        text: 'The upload step has one hard requirement: the local file may only be deleted after the object is provably in S3. Everything else is optimization.',
      },
      {
        type: 'code',
        language: 'ts',
        filename: 'src/jobs/log-archive/upload.ts',
        code:
          'import { S3Client, PutObjectCommand, HeadObjectCommand } from \'@aws-sdk/client-s3\';\n' +
          'import { createReadStream, createWriteStream, promises as fs } from \'node:fs\';\n' +
          'import { createGzip } from \'node:zlib\';\n' +
          'import { pipeline } from \'node:stream/promises\';\n\n' +
          'export async function archive(localPath: string, date: string) {\n' +
          '  const gzPath = `${localPath}.gz`;\n' +
          '  await pipeline(createReadStream(localPath), createGzip(), createWriteStream(gzPath));\n\n' +
          '  const [year, month, day] = date.split(\'-\');\n' +
          '  const key = `logs/service=api/year=${year}/month=${month}/day=${day}/${date}.log.gz`;\n\n' +
          '  await s3.send(new PutObjectCommand({\n' +
          '    Bucket: process.env.LOG_BUCKET,\n' +
          '    Key: key,\n' +
          '    Body: createReadStream(gzPath),\n' +
          '    ContentType: \'application/x-ndjson\',\n' +
          '    ContentEncoding: \'gzip\',\n' +
          '    ChecksumAlgorithm: \'SHA256\',\n' +
          '    ServerSideEncryption: \'aws:kms\',\n' +
          '    SSEKMSKeyId: process.env.LOG_KMS_KEY_ID,\n' +
          '  }));\n\n' +
          '  // Verify independently before destroying the only other copy.\n' +
          '  const head = await s3.send(new HeadObjectCommand({ Bucket: process.env.LOG_BUCKET, Key: key }));\n' +
          '  const local = await fs.stat(gzPath);\n' +
          '  if (head.ContentLength !== local.size) throw new Error(\'size mismatch, aborting delete\');\n\n' +
          '  await fs.unlink(gzPath);\n' +
          '  await fs.unlink(localPath);\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'The decisions inside that function, and why:',
      },
      {
        type: 'list',
        items: [
          'Gzip before upload — NDJSON is extremely repetitive (the same keys on every line), so it compresses very well. You pay a little CPU once, at midnight, and cut both storage cost and upload time. Tradeoff: the object is no longer directly readable without decompression, though Athena and most log tools read gzip natively.',
          'Date-partitioned key prefixes — `year=/month=/day=` is Hive partition syntax. It costs nothing now and means partition pruning works immediately if you ever point Athena or Glue at the bucket: a query for one day scans one day. A flat `logs/2026-07-25.log.gz` layout forces full-bucket scans. (The old advice about randomizing prefixes for performance is obsolete; S3 scales per prefix automatically.)',
          '`ChecksumAlgorithm: \'SHA256\'` — S3 validates the payload server-side and rejects a corrupted upload. Do not rely on comparing `ETag` to a local MD5: with multipart uploads or SSE-KMS the ETag is not the object\'s MD5, and that assumption fails silently exactly when you scale up.',
          'Explicit `HeadObject` verification — a `PutObject` that resolves is strong evidence, but not proof of what you think it is (wrong bucket, wrong key, a retry that raced). Since the next operation is an irreversible delete, verify independently.',
          'Failure keeps the file — if the upload fails, the archive stays on disk and the job exits with an error that itself gets logged and alerted. Tomorrow\'s run should sweep any `YYYY-MM-DD.log` files it finds, not just yesterday\'s, which makes the job self-healing across transient S3 or IAM failures.',
        ],
      },
      {
        type: 'paragraph',
        text: '`PutObject` handles up to 5 GB. If daily volume approaches that, switch to `@aws-sdk/lib-storage`\'s `Upload`, which handles multipart and retries per part. Always configure `AbortIncompleteMultipartUpload` in the lifecycle policy — orphaned parts are invisible in the console and billed forever.',
      },
      {
        type: 'paragraph',
        text: 'The alternatives, weighed honestly:',
      },
      {
        type: 'list',
        items: [
          'Batch upload of a rotated file (this design) — simple, cheap, one PUT per day. Tradeoff: up to 24 hours of logs exist only on one disk.',
          'Streaming each line to S3 or CloudWatch in real time — near-zero data loss window and immediate searchability. Costs per request or per GB ingested, adds a network dependency to the hot path, and needs buffering for outages.',
          'A sidecar agent (Fluent Bit, Vector, the CloudWatch agent) — the standard answer for container fleets. Handles multi-instance, buffering, and backpressure properly. Tradeoff: another component to operate and configure.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Be honest about which you need. If losing up to a day of logs from a lost instance is unacceptable, this architecture is wrong for you and an agent is right.',
      },
      {
        type: 'heading',
        text: 'Automatic retention with S3 Lifecycle',
      },
      {
        type: 'code',
        language: 'json',
        filename: 'lifecycle.json',
        code:
          '{\n' +
          '  "Rules": [\n' +
          '    {\n' +
          '      "ID": "expire-app-logs-90d",\n' +
          '      "Status": "Enabled",\n' +
          '      "Filter": { "Prefix": "logs/" },\n' +
          '      "Expiration": { "Days": 90 }\n' +
          '    },\n' +
          '    {\n' +
          '      "ID": "abort-incomplete-multipart",\n' +
          '      "Status": "Enabled",\n' +
          '      "Filter": { "Prefix": "" },\n' +
          '      "AbortIncompleteMultipartUpload": { "DaysAfterInitiation": 7 }\n' +
          '    }\n' +
          '  ]\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'Logs must never live forever, for three reasons:',
      },
      {
        type: 'list',
        items: [
          'Cost compounds silently. Log storage grows monotonically, and it is never urgent enough to fix until it is a line item someone notices.',
          'Liability grows with the data. Every log line you keep is a line an attacker can exfiltrate and a line you may have to produce in discovery. Under data-minimisation principles in regimes like GDPR, keeping personal data indefinitely without justification is itself the violation.',
          'Old logs have near-zero value. Debugging value decays sharply after days; compliance value is defined by a fixed window, not by "forever."',
        ],
      },
      {
        type: 'paragraph',
        text: 'Pick the window deliberately: 90 days is a common operational default, but regulated workloads (PCI DSS, for example, has explicit audit-log retention requirements measured in months) may require longer. The number should come from a policy, not from a developer\'s guess.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Why S3 Lifecycle beats a manual delete job',
      },
      {
        type: 'paragraph',
        text: 'Lifecycle makes deletion a declarative property of the bucket rather than an imperative task in your codebase, which kills the "cleanup cron that quietly died" class of failure — where retention appears to be enforced for eleven months and then is not. Against a `DeleteObjects` cron job it wins on every dimension:',
      },
      {
        type: 'list',
        items: [
          'Reliability — it runs as an AWS-managed service, with no compute of yours to crash. A delete job depends on your process, your scheduler, your credentials, and your error handling.',
          'Cost — expiration deletes incur no request charges, and you stop paying for storage as soon as an object becomes eligible, even if physical deletion lags. A job costs LIST + DELETE requests plus the compute running them.',
          'Blast radius — the rule is scoped to a prefix and reviewed as infrastructure code. A bug in a date comparison deletes 90 days of logs in one call.',
          'Security posture — the application role needs no `s3:DeleteObject` permission at all. With a job, the app (or something holding app credentials) must hold delete rights on your audit trail.',
          'Coverage and auditability — lifecycle applies to existing and future objects automatically and is visible in bucket config, enforceable via SCP or AWS Config. Job logic is buried in application code and must be maintained as prefixes and naming change.',
        ],
      },
      {
        type: 'paragraph',
        text: 'That fourth point is the strongest argument and the one most often missed. If your application can delete its own logs, an attacker who compromises your application can erase the evidence. Lifecycle rules let you build a bucket where the app can `PutObject` and nothing else, and where retention is enforced by a principal your app cannot reach.',
      },
      {
        type: 'paragraph',
        text: 'The drawbacks, stated plainly:',
      },
      {
        type: 'list',
        items: [
          'Lifecycle is asynchronous. Objects are deleted after the threshold, not exactly at it — usually within a day or so. Billing stops at eligibility, so this costs nothing, but do not build a compliance claim on "deleted at exactly 90 days."',
          'Bucket policies cannot prevent lifecycle actions. A misconfigured rule with a broad prefix will delete data regardless of a `Deny` policy. Review rules like you review IAM.',
          'With versioning enabled, `Expiration` on a current object only creates a delete marker; you also need `NoncurrentVersionExpiration` and `ExpiredObjectDeleteMarker` or storage grows forever behind the scenes.',
        ],
      },
      {
        type: 'heading',
        text: 'Security considerations',
      },
      {
        type: 'paragraph',
        text: 'Redact at the source, allow-list at the serializer. The `redact` config handles known-sensitive paths — `authorization`, `cookie`, `set-cookie`, `password`, tokens, card data — but redaction is subtractive and only removes what you predicted. Custom serializers that build an explicit object of permitted fields are additive and fail closed. Use both.',
      },
      {
        type: 'paragraph',
        text: 'Never log full request bodies or full user objects. The moment someone writes `logger.info({ user })`, the password hash, email, phone, and national ID are in your archive forever — and now in S3, in a bucket with a different access model than your database.',
      },
      {
        type: 'paragraph',
        text: 'Least privilege at the IAM layer means the instance or task role gets exactly one S3 action:',
      },
      {
        type: 'code',
        language: 'json',
        filename: 'log-writer-policy.json',
        code:
          '{\n' +
          '  "Effect": "Allow",\n' +
          '  "Action": "s3:PutObject",\n' +
          '  "Resource": "arn:aws:s3:::my-app-logs/logs/*"\n' +
          '}',
      },
      {
        type: 'paragraph',
        text: 'No `s3:DeleteObject`. No `s3:GetObject` — the app writes logs, it does not read them back; reading is a human or analytics role. That turns the log bucket into an append-only sink from the application\'s perspective. The rest of the checklist:',
      },
      {
        type: 'list',
        items: [
          'Encryption — enable SSE-KMS with a customer-managed key. SSE-S3 is free and adequate for many cases, but a CMK gives you an independent access boundary and a CloudTrail record of every decryption. Tradeoff: KMS charges per request and adds a dependency; for very high object counts, enable S3 Bucket Keys to cut KMS calls substantially.',
          'Block Public Access at the account level, plus an `aws:SecureTransport` deny in the bucket policy. A public log bucket is one of the most reliably damaging misconfigurations in cloud security.',
          'Consider Object Lock in governance mode if these logs have audit value — it makes objects immutable for a retention period even against an administrator, which is the point of an audit log. Tradeoff: it requires versioning, complicates lifecycle, and mistakes are genuinely unfixable.',
          'Filesystem permissions — `logs/` should be `0750`, owned by the service user. Logs on disk are as sensitive as the data in them.',
        ],
      },
      {
        type: 'heading',
        text: 'Cost optimisation',
      },
      {
        type: 'paragraph',
        text: 'The pipeline is cheap by construction, but a few decisions matter:',
      },
      {
        type: 'list',
        items: [
          'Compress. Gzipping NDJSON reduces both stored bytes and transfer time. This is the single highest-leverage cost decision, and it costs one CPU-second a day.',
          'One object per day, not per hour or per request. S3 bills per request: a batch design makes request costs effectively zero, while a per-event upload design makes them the dominant cost line.',
          'Think carefully before adding storage-class transitions — this is where teams lose money trying to save it. S3 Standard-IA has a 30-day minimum billable duration and a 128 KB minimum billable object size; Glacier Instant Retrieval has a 90-day minimum duration and the same size floor; Glacier Flexible Retrieval has a 90-day minimum, and Deep Archive 180 days. Transitioning to Glacier at day 60 under a 90-day expiration means paying a full 90-day minimum for objects you delete at 90, plus a per-1,000 transition request charge. For a 90-day window with daily objects, S3 Standard plus gzip is usually the cheapest and simplest answer.',
          'Skip Intelligent-Tiering here. It charges a per-object monitoring fee and is designed for unpredictable access patterns; log access is entirely predictable — read soon after write, then never.',
          '`AbortIncompleteMultipartUpload`. Orphaned multipart parts are billed and do not appear in a normal object listing. One lifecycle rule eliminates the category.',
          'Data transfer in is free. Uploading from EC2 to S3 in the same region costs nothing in transfer; avoid cross-region log buckets unless you have a specific durability requirement.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The payoff on the server side is that disk usage becomes bounded by one day of logs plus the retry backlog, rather than growing without limit. That converts an eventual, certain outage — disk full — into a fixed capacity requirement you provision for once. Reliability improves along three axes: the rotation is non-disruptive (no restart, no dropped lines); durability jumps from a single EBS volume to S3\'s multi-AZ storage, so an instance loss no longer means log loss for anything older than the current day; and every failure mode keeps the data — upload fails, file stays; verification fails, file stays; process restarts, the next run sweeps the backlog. The only irreversible action in the pipeline is gated on a verified success.',
      },
      {
        type: 'heading',
        text: 'Common mistakes',
      },
      {
        type: 'list',
        items: [
          'Deleting the local file before confirming the upload — the most expensive one-line bug in this design.',
          'Forgetting the file descriptor reopen. Rotation appears to work; archives silently contain the wrong day.',
          'Using `copytruncate` and accepting the race. Fine for access logs nobody reads, unacceptable for audit trails.',
          'Scheduling in local time. DST will corrupt exactly two days a year, and only in production.',
          'Assuming a single instance. Two processes writing one file and both rotating it produces interleaved, truncated garbage.',
          'Logging secrets and hoping redaction catches them. It only catches declared paths.',
          '`logger.info(JSON.stringify(obj))` — this defeats the entire structured pipeline. You get a JSON string inside a JSON string, unqueryable by field.',
          'Logging at `info` inside a hot loop. Log volume that scales with request work rather than request count is how a 200 MB/day service becomes a 40 GB/day service overnight.',
          'No `requestId`. Without correlation, a 500 MB archive is a haystack.',
          'Never testing the read path. If you have never once pulled an archive from S3 and answered a real question with it, you do not have a logging system — you have a backup of files nobody can use. Test it before the incident.',
          'Storing logs "just in case," forever. That is a growing bill and a growing liability, not a strategy.',
        ],
      },
      {
        type: 'heading',
        text: 'Practices worth keeping',
      },
      {
        type: 'list',
        items: [
          'Emit NDJSON, always. Pretty-print only in development.',
          'Stamp `service`, `env`, `version`, and `requestId` on every line via `base` and child loggers.',
          'Propagate a correlation ID with `AsyncLocalStorage` so any code path can log with context without threading a logger parameter through every function.',
          'Use log levels with discipline: `error` for things a human must act on, `warn` for degraded-but-handled, `info` for state transitions, `debug` for development. If everything is `error`, nothing is.',
          'Sample high-volume, low-value routes (health checks, static assets) rather than dropping the level globally.',
          'Log the decision, not just the event: not "payment failed", but "payment failed" with the provider code, idempotency key, attempt number, and correlation ID.',
          'Keep logs immutable and append-only. Never edit an archive.',
          'Alert on metrics, not on log volume. Logs are for investigation; metrics are for detection.',
          'Encrypt at rest, restrict at the IAM layer, and enforce retention in infrastructure rather than in application code.',
        ],
      },
      {
        type: 'heading',
        text: 'Where this goes next',
      },
      {
        type: 'list',
        items: [
          'Hourly rotation with an hourly key prefix — reduces the worst-case data-loss window from 24 hours to 1 and produces smaller, faster-to-scan objects, at 24× the PUT requests (still negligible).',
          'Query in place with Athena — the date-partitioned prefix layout means adding a Glue table over `s3://bucket/logs/` gives you SQL over the whole archive, paying only per byte scanned. Partition pruning makes single-day queries cheap. This is the highest-value next step for most teams.',
          'Ship to OpenSearch or a vendor for the hot window while keeping S3 as the cold, cheap, long-term tier: hot search for 7 days, archive for 90.',
          'Replace the file + cron pipeline with a sidecar (Fluent Bit or Vector) once you run more than a couple of instances — log to stdout and let the collector handle buffering, batching, and multi-destination fanout. That is the natural evolution path, and this architecture is explicitly the pre-scale version of it.',
          'Adopt OpenTelemetry to unify `traceId` across logs, metrics, and traces, so one ID in a log line jumps straight to a distributed trace.',
          'Emit metrics from the archive job itself — last successful upload timestamp, archive size, backlog file count — then alert when the last successful upload is older than 26 hours. A silent archiving job is indistinguishable from a working one until you need the data.',
          'Object Lock plus a separate audit account for logs with genuine compliance value.',
        ],
      },
      {
        type: 'heading',
        text: 'Lessons learned',
      },
      {
        type: 'paragraph',
        text: 'The reopen step is the whole game. Everything else in this pipeline is mechanical. The rename/reopen interaction is the one place where the intuitive implementation is silently wrong, and the failure only surfaces when you go looking for a specific day\'s logs — which is always during an incident.',
      },
      {
        type: 'paragraph',
        text: 'Make the irreversible step the last step, and gate it on verification. Ordering operations by reversibility is a general principle worth internalizing: compress (reversible), upload (reversible), verify (read-only), delete (irreversible). Any failure before the last step is a no-op you can retry.',
      },
      {
        type: 'paragraph',
        text: 'Push retention into infrastructure. Every retention job written in application code eventually breaks, and no one notices because success is silent. Lifecycle rules do not have that failure mode, and they let you remove delete permissions from the application entirely — a security win disguised as an ops convenience.',
      },
      {
        type: 'paragraph',
        text: 'Design the read path before the write path. Partitioned prefixes and structured JSON cost nothing on day one and determine whether the archive is queryable on day 400. Most log pipelines are optimized entirely for writing and are miserable to read.',
      },
      {
        type: 'paragraph',
        text: 'And know when to stop using this. The architecture is correct for a single VM or a small fleet with per-instance keys. The moment you run ephemeral containers, autoscale, or need sub-minute searchability, local files stop making sense and a collector agent becomes the right answer — the same threshold logic that took [SRVJ from one EC2 box to Kubernetes](/blogs/aws-ec2-s3-kubernetes-production-deployments). Recognizing that boundary early is more valuable than making the file-based approach survive one more scaling step.',
      },
      {
        type: 'paragraph',
        text: 'The best log pipeline is the one that is still working — and still affordable — eighteen months after the person who built it stopped thinking about it. Boring, verified, and declaratively bounded wins.',
      },
    ],
  },
  {
    id: 5,
    slug: 'aws-ec2-s3-kubernetes-production-deployments',
    ogImage: '/og/blog-aws-ec2-s3-kubernetes-production-deployments.png',
    title: 'From One EC2 Box to Kubernetes: Migrating a Node.js App on AWS',
    excerpt:
      'How SRVJ\'s deployment grew up in three acts — a single EC2 box with NGINX and pm2, Docker Compose, and finally a Kubernetes cluster with kustomize, an NGINX ingress, and an HPA. Plus the S3 patterns that outlived every stage.',
    metaTitle: 'Migrate a Node.js App from EC2 + pm2 to Kubernetes on AWS',
    metaDescription:
      'How to migrate a Node.js app from EC2 + pm2 to Kubernetes on AWS — Docker Compose, EKS, kustomize, NGINX ingress, HPA, and S3 presigned uploads.',
    category: 'Cloud & DevOps',
    date: '2026-07-09',
    updated: '2026-07-16',
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
    relatedSlugs: ['nodejs-pino-s3-log-archiving-cron', 'crdts-yjs-collaborative-editing-srvj', 'server-sent-events-real-time-notifications-srvj'],
    faq: [
      {
        question: 'Should a queue worker use RollingUpdate or Recreate?',
        answer:
          'Recreate. During an API rollout you want old and new pods overlapping so requests keep being served. During a worker rollout that overlap means two workers competing for the same queue jobs mid-deploy, which is how you get duplicated work at exactly the moment you are changing code.',
      },
      {
        question: 'How much termination grace does a Node.js queue worker need?',
        answer:
          'More than an API pod. Finishing the HTTP request you are serving takes a moment; finishing the job you are holding can take much longer. In this deployment the API gets 30 seconds and the worker gets 60.',
      },
      {
        question: 'Should the API and the worker autoscale on the same metric?',
        answer:
          'No, because they are driven by different pressure. The API scales on CPU and memory as traffic rises. A worker\'s load is queue depth, not request rate, so scaling it on CPU adds replicas at the wrong moments and leaves a deep backlog untouched.',
      },
      {
        question: 'Is Kubernetes worth it for a single Node.js application?',
        answer:
          'Only once you are paying for what it gives you: real rollouts, per-workload scaling, and separate lifecycles for API and worker processes. Before that, one EC2 box with NGINX and a process manager is less machinery and less to be woken up by.',
      },
      {
        question: 'How should file uploads be handled on AWS?',
        answer:
          'Presign the upload so the client sends bytes straight to S3 and your application never proxies the file. The server\'s job is to authorise the upload and record the resulting object key, which keeps large transfers off your request path entirely.',
      },
    ],
    howTo: {
      name: 'Migrate a Node.js application from EC2 to Kubernetes on AWS',
      totalTime: 'PT8H',
      tool: ['Node.js', 'Docker', 'Kubernetes', 'kustomize', 'AWS EC2', 'AWS S3'],
      steps: [
        {
          name: 'Start from the single EC2 box',
          text:
            'Establish the baseline deployment: NGINX in front, the Node.js process under a process manager, on one EC2 instance.',
          anchor: 'act-one-one-ec2-box-nginx-and-pm2',
        },
        {
          name: 'Containerise the application',
          text:
            'Move the same workload into Docker on the same box, so the runtime is reproducible before the orchestration changes.',
          anchor: 'act-two-same-box-but-docker',
        },
        {
          name: 'Move uploads to presigned S3',
          text:
            'Have clients upload directly to S3 with presigned URLs so large transfers never pass through the application.',
          anchor: 'the-s3-pattern-that-never-changed-presigned-uploads',
        },
        {
          name: 'Split API and worker workloads',
          text:
            'Deploy the API and the queue worker as separate Kubernetes workloads with their own update strategies, grace periods, and scaling rules.',
          anchor: 'act-three-srvjs-shape-and-the-case-for-kubernetes',
        },
        {
          name: 'Apply the manifests',
          text:
            'Deploy with kustomize overlays, ingress, and an HPA on the API, and confirm the rollout behaves as intended.',
          anchor: 'the-deploy-one-apply-and-an-honest-gap',
        },
      ],
    },
    blocks: [
      {
        type: 'paragraph',
        text: 'SRVJ — the [collaborative diagram tool](/projects/srvj) I keep writing about — is a Node.js app running on AWS, but it didn\'t start on Kubernetes, and it shouldn\'t have. This post is its migration story in three acts: a single EC2 box with NGINX and pm2, then Docker Compose, then a Kubernetes cluster — plus the S3 patterns that survived every stage untouched.',
      },
      {
        type: 'paragraph',
        text: 'I\'m writing it this way because most AWS content starts at the end. You get the EKS tutorial with the Terraform modules and the service mesh, and nobody tells you that a $10 EC2 instance with a well-configured NGINX serves real production traffic just fine — or when, exactly, it stops being fine.',
      },
      {
        type: 'heading',
        text: 'Act one: one EC2 box, NGINX, and pm2',
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
    title: 'CRDTs & Yjs in Production: The Day I Stopped Writing Conflict-Resolution Code',
    excerpt:
      'Why I stopped writing conflict-resolution code for SRVJ\'s collaborative diagrams — CRDTs from first principles (G-Counter, LWW-Register, OR-Set, sequence types), then Yjs and the authenticated WebSocket relay that keeps every editor converged.',
    metaTitle: 'Production Yjs WebSocket Server: CRDTs & Authenticated Sync',
    metaDescription:
      'Running a Yjs WebSocket server in production for real-time collaboration — CRDTs (G-Counter, LWW-Register, OR-Set) and an authenticated sync relay in Node.js.',
    category: 'Distributed Systems',
    date: '2026-07-06',
    updated: '2026-07-16',
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
    faq: [
      {
        question: 'What is a CRDT?',
        answer:
          'A conflict-free replicated data type is a data structure whose merge operation is commutative, associative, and idempotent. Replicas that receive the same set of updates in any order converge on the same state, which means merging never needs a central arbiter or hand-written conflict resolution.',
      },
      {
        question: 'Do CRDTs need a server?',
        answer:
          'Not for correctness, only for delivery and persistence. The merge is peer-to-peer by nature, but a production deployment still wants a server to relay updates between clients that are never online at the same time, to authenticate them, and to store the authoritative state.',
      },
      {
        question: 'Is Yjs better than operational transformation?',
        answer:
          'Yjs shifts the complexity from the server to the data structure. Operational transformation needs a central server to transform operations against each other correctly, whereas a CRDT merges anywhere. The trade-off is metadata: CRDTs carry per-character bookkeeping that OT does not.',
      },
      {
        question: 'How do you authenticate a Yjs WebSocket connection?',
        answer:
          'Authenticate during the upgrade handshake, before any sync message is processed, and bind the resulting identity to the room the socket joins. In SRVJ that is a PASETO v4 token checked at connection time, with project-level role checks deciding which documents the socket may sync.',
      },
      {
        question: 'How should Yjs documents be persisted?',
        answer:
          'Store the authoritative Yjs binary update as the source of truth, because it is the only lossless representation. A denormalised JSON projection alongside it makes ordinary API reads and queries cheap without ever being the thing you restore from.',
      },
    ],
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
        text: 'Then I found CRDTs, and the whole problem class just... dissolved. This post is what I wish someone had handed me at the start — the theory from first principles, then Yjs and the production WebSocket server that keeps SRVJ\'s editors in sync.',
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
        level: 3,
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
        level: 3,
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
        level: 3,
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
        text: 'Yjs in production: SRVJ\'s WebSocket server',
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
    title: 'Scaling Server-Sent Events with Redis Pub/Sub: SRVJ\'s Notifications',
    excerpt:
      'How SRVJ delivers real-time notifications with Server-Sent Events, BullMQ, Redis Pub/Sub, and PostgreSQL — a persist-then-fan-out pipeline that scales horizontally without sticky sessions.',
    metaTitle: 'Scale SSE Notifications with Redis Pub/Sub in Node.js',
    metaDescription:
      'Scaling Server-Sent Events across Node.js instances with Redis Pub/Sub fan-out and BullMQ — real-time notifications without sticky sessions.',
    category: 'Backend Architecture',
    date: '2026-06-27',
    updated: '2026-07-16',
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
    faq: [
      {
        question: 'Should I use SSE or WebSockets for notifications?',
        answer:
          'Use SSE when the data flows one way, from server to client, which is what notifications are. SSE runs over plain HTTP, reconnects automatically, and needs no separate protocol upgrade. Reach for WebSockets when the client also needs to push, as in chat or collaborative editing.',
      },
      {
        question: 'How do you scale SSE across multiple server processes?',
        answer:
          'An SSE connection is pinned to the single process holding it, so a notification created on another process has to be routed there. Redis pub/sub does that fan-out: every process subscribes, the publishing process broadcasts, and whichever process holds that user\'s connection writes to the stream.',
      },
      {
        question: 'Does SSE work behind NGINX?',
        answer:
          'Only once proxy buffering is disabled and the read timeout is raised. With default settings NGINX buffers the response and holds events back until the buffer fills, which makes a working SSE endpoint look broken, then closes the idle connection.',
      },
      {
        question: 'Redis pub/sub or Redis Streams for SSE fan-out?',
        answer:
          'Pub/sub is fire-and-forget: a message published while a process is disconnected is gone. That is acceptable when the durable copy of the notification already lives in your database and the stream is only a delivery accelerator. Choose Streams when the transport itself must not lose messages.',
      },
      {
        question: 'How do you avoid duplicate notifications after a reconnect?',
        answer:
          'Make the worker that writes notifications idempotent, keyed on the event that caused it, so a retried job updates the existing row instead of inserting a second one. The client then re-reads from the database on reconnect rather than replaying the stream.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'SRVJ is a collaborative diagram tool I\'ve been building — think Miro, but as a playground for backend architecture. The collaborative canvas itself runs over WebSockets ([that story gets its own post](/blogs/crdts-yjs-collaborative-editing-srvj)), but notifications — board invitations, chat messages, mentions — needed a delivery path of their own.',
      },
      {
        type: 'paragraph',
        text: 'This post is about that path: why it\'s Server-Sent Events rather than another WebSocket, and the Node.js pipeline behind it — BullMQ, PostgreSQL, and Redis Pub/Sub, arranged so notifications survive crashes, reach every open tab, and keep working when the app scales past one instance.',
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
        text: 'Redis Pub/Sub as the Distribution Layer',
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
        level: 3,
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
        level: 3,
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
        level: 3,
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
    title: 'PayMob Webhooks in Node.js: HMAC, Idempotency & What the Docs Don\'t Cover',
    excerpt:
      'Months of integrating PayMob and Amazon Payment Services (PayFort) into a production marketplace, distilled — the provider adapter, the payment state machine, the verify-then-enqueue webhook pipeline, and the reconciliation job that catches everything else.',
    metaTitle: 'PayMob Webhooks in Node.js: HMAC Verification & Idempotency',
    metaDescription:
      'Integrate PayMob and Amazon Payment Services (PayFort) in Node.js — HMAC webhook verification, idempotency, a payment state machine, and reconciliation.',
    category: 'Payment Integration',
    date: '2026-06-12',
    updated: '2026-07-16',
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
    faq: [
      {
        question: 'How do you verify a Paymob webhook signature?',
        answer:
          'Compute an HMAC over the specific fields Paymob concatenates, in the documented order, using your HMAC secret, then compare it against the signature on the request in constant time. Do this before any parsing, database work, or business logic, and reject the request outright if it does not match.',
      },
      {
        question: 'Why do payment webhooks fire more than once?',
        answer:
          'Because delivery is at-least-once by design. The provider retries whenever it does not receive a timely success response, including when your handler actually succeeded but the acknowledgement was lost. Any handler a payment provider can reach will eventually be called twice.',
      },
      {
        question: 'How do you make a payment webhook idempotent?',
        answer:
          'Key the effect on something the provider guarantees is stable, such as the transaction id, and enforce uniqueness in the database rather than in application code. A second delivery then collides with the existing record and becomes a no-op instead of a duplicate charge or a double credit.',
      },
      {
        question: 'Should payment state live in a status column?',
        answer:
          'Treat payments as an explicit state machine with defined transitions rather than a free-form status string. A state machine makes illegal transitions impossible to represent, which matters because webhooks arrive out of order and a later event can reach you before an earlier one.',
      },
      {
        question: 'Why do you still need reconciliation if webhooks work?',
        answer:
          'Because webhooks are a notification channel, not a source of truth. Deliveries get dropped, providers have outages, and your own handler can fail after the money moved. A scheduled reconciliation job compares your ledger against the provider\'s record and catches everything the webhook path missed.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'I\'ve spent the last few months integrating two payment providers into a production Node.js marketplace: PayMob and Amazon Payment Services (the thing everyone still calls PayFort). The docs got me to my first sandbox transaction in an afternoon. Everything after that, I had to figure out the hard way.',
      },
      {
        type: 'paragraph',
        text: 'So this post is the writeup I wish existed when I started. It\'s not "how to call the PayMob API" — there are ten of those already and they all stop right before the parts that hurt: HMAC webhook verification, idempotent processing, reconciliation. This is about the architecture that sits between your Express app and two providers that disagree on basically everything.',
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
        text: 'Webhook HMAC verification: do almost nothing, fast',
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
    title: 'PASETO vs JWT in Node.js: Choosing the Right Token for the Job',
    excerpt:
      'I shipped JWT in production, got burned, and switched to PASETO for auth and payments — but the real lesson is token taxonomy: signed vs encrypted vs opaque, and which job each one actually belongs to.',
    metaTitle: 'PASETO vs JWT for Node.js Auth & Payments',
    metaDescription:
      'PASETO vs JWT in Node.js for auth and payments — signed vs encrypted vs opaque tokens, algorithm safety, revocation, and choosing the right token per job.',
    category: 'Backend Security',
    date: '2026-05-12',
    updated: '2026-07-16',
    readTime: '14 min read',
    tags: ['Security', 'JWT', 'PASETO', 'Auth', 'Tokens', 'Node.js', 'TypeScript'],
    entities: [
      { name: 'JSON Web Token', sameAs: ['https://en.wikipedia.org/wiki/JSON_Web_Token', 'https://datatracker.ietf.org/doc/html/rfc7519'] },
      { name: 'PASETO', sameAs: ['https://paseto.io', 'https://github.com/paseto-standard/paseto-spec'] },
      { name: 'EdDSA', sameAs: 'https://en.wikipedia.org/wiki/EdDSA' },
      { name: 'Authenticated encryption', sameAs: 'https://en.wikipedia.org/wiki/Authenticated_encryption' },
    ],
    relatedSlugs: ['paymob-amazon-payment-services-integration'],
    faq: [
      {
        question: 'Is PASETO more secure than JWT?',
        answer:
          'PASETO is safer by construction rather than by discipline. It removes the algorithm header entirely, so the alg:none and RS256-to-HS256 confusion attacks that plague JWT are not merely discouraged, they are unrepresentable. JWT can be made equally safe, but only if every verifier pins the algorithm itself.',
      },
      {
        question: 'Should I use a JWT as a payment token?',
        answer:
          'No. A JWT is signed, not encrypted, so anyone holding it can read every claim inside. Payment-related tokens should be encrypted, which means PASETO v4.local or an opaque random identifier that carries no meaning outside your own database.',
      },
      {
        question: 'Can you revoke a JWT?',
        answer:
          'Not by the token format alone. Neither JWT nor PASETO solves revocation: both are self-contained and valid until they expire. Revocation requires server-side state, such as a denylist keyed by token id or a short expiry paired with an opaque refresh token you can delete.',
      },
      {
        question: 'What is the alg:none attack?',
        answer:
          'The JWT header declares which algorithm signed the token, and a verifier that trusts that field will accept a token claiming alg:none with an empty signature. The fix is to pin the expected algorithm in the verifier and ignore the header\'s claim entirely.',
      },
      {
        question: 'Should refresh tokens be JWTs?',
        answer:
          'No. Refresh tokens should be opaque random strings stored server-side. They are long-lived and must be revocable on demand, which is exactly what a self-contained token format cannot give you. The same applies to API keys, email verification, and password reset tokens.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Let me be upfront about something: the way I handle tokens in my own Node.js backends is not what most teams do. I use PASETO for both auth and payment tokens. Most of the industry uses JWT for everything. This post is my honest take on why I made that switch, what the real tradeoffs are, and — more importantly — what token format you choose matters far less than whether you are using the right type of token for the job at all.',
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
        level: 3,
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
        level: 3,
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
        level: 3,
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
        level: 3,
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
        level: 3,
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

/** Archive page size for /blogs — keep in sync with nuxt.config.ts's prerender route list. */
export const BLOGS_PER_PAGE = 5
export const blogsPageCount = Math.max(1, Math.ceil(blogs.length / BLOGS_PER_PAGE))
export const getBlogsPage = (page: number) =>
  blogs.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE)

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
