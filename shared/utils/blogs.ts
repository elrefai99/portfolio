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

/**
 * Question/answer pairs rendered visibly at the foot of the post and emitted as
 * FAQPage JSON-LD.
 *
 * People Also Ask boxes and AI Overviews are assembled from question → concise
 * answer pairs, and extraction is far more reliable when the answer is
 * self-contained: no "as described above", no pronoun whose referent lives three
 * paragraphs up. Keep answers under ~60 words and restate the subject noun.
 *
 * The markup is only ever emitted alongside the visible list — FAQ structured
 * data describing content that is not on the page is a policy violation.
 */
export type BlogFaq = {
  question: string
  answer: string
}

export type BlogHowToStep = {
  name: string
  text: string
  /** Fragment id of the heading this step maps to; defaults to a slug of `name`. */
  anchor?: string
}

export type BlogHowTo = {
  name: string
  /** ISO 8601 duration, e.g. 'PT45M'. */
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
  /** TechArticle audience hint: how much background a reader needs. */
  proficiencyLevel?: 'Beginner' | 'Expert'
  /** TechArticle prerequisites, e.g. ['Node.js 20+', 'Redis 7', 'An AWS account']. */
  dependencies?: string[]
}

export const blogs: BlogPost[] = [
  {
    id: 8,
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
  // {
  //   id: 7,
  //   slug: 'tsc-passes-import-cycles-break-at-runtime',
  //   ogImage: '/og/blog-tsc-passes-import-cycles-break-at-runtime.png',
  //   title: 'tsc Says Fine, Node Says TypeError: Import Cycles Type-Checkers Cannot See',
  //   excerpt:
  //     'A two-file cycle that compiles cleanly and throws `Class extends value undefined` the moment you run it — and how gen-import models module evaluation (edge kinds, eager reads, barrel contraction, Tarjan SCCs) to catch it before Node does.',
  //   metaTitle: 'Why tsc Passing Says Nothing About Import-Cycle Safety',
  //   metaDescription:
  //     'A TypeScript cycle that passes tsc and throws at runtime, and how a static analyzer models eager vs deferred reads, barrel contraction, and Tarjan SCCs to catch it.',
  //   category: 'Developer Tooling',
  //   date: '2026-07-27',
  //   readTime: '8 min read',
  //   tags: ['TypeScript', 'Node.js', 'Static Analysis', 'Tooling', 'AST', 'CommonJS', 'Barrel Files', 'Compiler API'],
  //   entities: [
  //     { name: 'TypeScript', sameAs: ['https://en.wikipedia.org/wiki/TypeScript', 'https://www.typescriptlang.org'] },
  //     { name: 'Node.js', sameAs: ['https://en.wikipedia.org/wiki/Node.js', 'https://nodejs.org'] },
  //     { name: 'Circular dependency', sameAs: 'https://en.wikipedia.org/wiki/Circular_dependency' },
  //     { name: 'Tarjan\'s strongly connected components algorithm', sameAs: 'https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm' },
  //   ],
  //   relatedSlugs: ['nodejs-pino-s3-log-archiving-cron', 'jwt-vs-paseto-tokens'],
  //   faq: [
  //     {
  //       question: 'Does a passing tsc build mean my imports are safe?',
  //       answer:
  //         'No. The type checker resolves names across the whole module graph and does not care what order modules execute in, because types do not run. Module evaluation is a linear order, and a cycle can leave a binding undefined at the moment another module needs it.',
  //     },
  //     {
  //       question: 'What causes \'Class extends value undefined is not a constructor or null\'?',
  //       answer:
  //         'A circular import evaluated in the wrong order. In CommonJS a module caught mid-cycle returns whatever it has exported so far, which can be an empty object, so the base class is undefined at exactly the instant the extends clause needs a constructor.',
  //     },
  //     {
  //       question: 'Are barrel files the cause of import cycles?',
  //       answer:
  //         'Barrels do not create the cycle, they hide it. Routing every import through one re-export file makes two modules that never reference each other directly look like neighbours, so a cycle that would be obvious in the direct-import graph becomes invisible.',
  //     },
  //     {
  //       question: 'Is every circular import a bug?',
  //       answer:
  //         'No, which is why a yes-or-no answer is not useful. A cycle only breaks when a binding is read eagerly during module evaluation, such as in an extends clause or a top-level call. A cycle whose references are all deferred inside function bodies runs fine.',
  //     },
  //     {
  //       question: 'How do you detect unsafe import cycles automatically?',
  //       answer:
  //         'Model the graph the way the runtime does: distinguish eager reads from deferred ones, contract barrel re-exports back to their real sources, then find strongly connected components with Tarjan\'s algorithm and report only the cycles containing an eager edge.',
  //     },
  //   ],
  //   blocks: [
  //     {
  //       type: 'paragraph',
  //       text: 'Here are two files. Both import through a generated barrel, the way most of my projects do. Nothing about them looks dangerous.',
  //     },
  //     {
  //       type: 'code',
  //       language: 'ts',
  //       filename: 'src/audit.entity.ts · src/entity.base.ts',
  //       code:
  //         '// src/audit.entity.ts\n' +
  //         'import { BaseEntity } from \'./gen-import\'\n\n' +
  //         'export class AuditEntity extends BaseEntity {\n' +
  //         '  tag(): string {\n' +
  //         '    return \'audit/\' + super.tag()\n' +
  //         '  }\n' +
  //         '}\n\n' +
  //         'export const formatTag = (s: string): string => `[${s}]`\n\n' +
  //         '// src/entity.base.ts\n' +
  //         'import { formatTag } from \'./gen-import\'\n\n' +
  //         'export class BaseEntity {\n' +
  //         '  tag(): string {\n' +
  //         '    return formatTag(\'base\')\n' +
  //         '  }\n' +
  //         '}',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'The compiler is happy. The process is not.',
  //     },
  //     {
  //       type: 'code',
  //       language: 'text',
  //       filename: 'terminal',
  //       code:
  //         '$ npx tsc -p tsconfig.json\n' +
  //         '$ echo $?\n' +
  //         '0\n\n' +
  //         '$ node dist/main.js\n' +
  //         'dist/audit.entity.js:5\n' +
  //         'class AuditEntity extends gen_import_1.BaseEntity {\n' +
  //         '                                       ^\n\n' +
  //         'TypeError: Class extends value undefined is not a constructor or null\n' +
  //         '    at Object.<anonymous> (dist/audit.entity.js:5:40)',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'That is the whole problem with treating a green `tsc` as a safety signal for cycles. The type checker resolves names across a graph — it does not care what order the files run in, because types do not run. Module evaluation is a linear order, and in CommonJS a module caught mid-cycle hands back whatever it has exported so far, which here is an empty object. `BaseEntity` is `undefined` at exactly the instant the `extends` clause needs a constructor.',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'And it is order-dependent, which is the nasty part. I built the same cycle twice, changing nothing but the filenames. In one spelling the barrel happened to re-export the base first and the program printed `PROBE:user/[base]` like nothing was wrong. Rename the files so the subclass sorts first, and it throws. Same code, same compiler result, different luck.',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'I wrote [gen-import](https://github.com/elrefai99/Gen-Import) to generate those barrels, so this is my bug to catch. What follows is what the analyzer actually does about it.',
  //     },
  //     {
  //       type: 'code',
  //       language: 'mermaid',
  //       filename: 'analysis-pipeline.mmd',
  //       code:
  //         'flowchart TD\n' +
  //         '    A[Source files] --> B[scanFile: walk the AST]\n' +
  //         '    B --> C[classifyReference per identifier]\n' +
  //         '    C --> D{position}\n' +
  //         '    D -- extends / decorator / static --> E[eager read]\n' +
  //         '    D -- inside a function body --> F[deferred read]\n' +
  //         '    D -- type position --> G[type-only, erased]\n' +
  //         '    E --> H[buildModuleGraph: edges carry kind + eager]\n' +
  //         '    F --> H\n' +
  //         '    G --> H\n' +
  //         '    H --> I[contractBarrel: rewrite barrel edges to owner files]\n' +
  //         '    I --> J[tarjanScc over INIT_EDGE_KINDS only]\n' +
  //         '    J --> K{cyclic SCC?}\n' +
  //         '    K -- no --> L[verdict: safe]\n' +
  //         '    K -- yes, no eager edge --> M[GI003 / GI004 warn: ordered]\n' +
  //         '    K -- yes, eager edge --> N[GI001 / GI002 error: unsafe]',
  //     },
  //     {
  //       type: 'heading',
  //       text: 'Not every import is an edge',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'The first thing that has to go is the idea that an import statement is a dependency. `src/@types/index.d.ts` splits `EdgeKind` five ways — `value-static`, `type-only`, `dynamic`, `require`, `side-effect` — and only three of those can ever break initialisation. `graph.ts` names that set explicitly:',
  //     },
  //     {
  //       type: 'code',
  //       language: 'ts',
  //       filename: 'src/analysis/graph.ts',
  //       code:
  //         'export const INIT_EDGE_KINDS: ReadonlySet<EdgeKind> = new Set<EdgeKind>([\n' +
  //         '    \'value-static\',\n' +
  //         '    \'side-effect\',\n' +
  //         '    \'require\',\n' +
  //         '])',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: '`type-only` is gone before the code runs, so it cannot participate in a runtime cycle. `dynamic` — an `import()` call — resolves later by definition. `scan.ts` decides `require` versus `dynamic` by asking whether the call sits at the top level: a `require()` in the module body is eager, the same call inside a function is not. Getting this wrong in either direction is how a cycle checker becomes noise: count type imports and you flag cycles that do not exist, ignore `export *` and you miss ones that do.',
  //     },
  //     {
  //       type: 'heading',
  //       text: 'Where the identifier sits decides everything',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'A cycle only breaks when someone reads a binding while the other module is still evaluating. So `classifyReference` in `scan.ts` walks up from each identifier and classifies the position it was used in — `eager-heritage` for an `extends` clause, `eager-decorator` for anything inside a decorator argument, `eager-static` for a static field or static block, `deferred` once it hits a function, `type` for type nodes and import specifiers. `scanFile` then marks the edge that introduced the binding as eager, keeping the strongest reason it saw.',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'That distinction is the entire verdict. A cycle where every read happens inside a function body still initialises — both modules finish loading, then somebody calls something. A cycle with one `extends` in it does not, and a base class is the one case with no escape: you cannot lazily resolve it, which is why the tool tells you to import it from its source file rather than offering a workaround.',
  //     },
  //     {
  //       type: 'heading',
  //       text: 'The barrel is not a real node',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'In the failing example neither file imports the other — both import `./gen-import`. Left alone, the graph would report a cycle through the barrel and blame the generated file, which is useless advice. `contractBarrel` rewrites it: for every edge into the barrel it looks the imported bindings up in an owner map, redirects the edge to the file that actually exports each name, and tags it `viaBarrel`. The barrel drops out and the cycle appears between the two modules that genuinely depend on each other. The diagnostic still mentions the routing, because knowing your import goes through a barrel is useful — believing the barrel caused the cycle is not.',
  //     },
  //     {
  //       type: 'heading',
  //       text: 'Tarjan, not a boolean',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: '`scc.ts` runs an iterative Tarjan pass over the restricted edge set and returns strongly connected components. Marking a component cyclic is the easy part — `members.length > 1`, or a single node with a self-loop. What matters more is what comes next: `cycleEdges` collects the edges inside the component and `shortestCycle` does a BFS back to the entry node to recover an actual path. A boolean tells you that you have a problem somewhere; the path plus the eager edge tells you the line to open. The topological order falls out of the same pass and is what the emitter uses to sort the barrel, so dependencies get re-exported before their dependents.',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'Here is the run on the same two files:',
  //     },
  //     {
  //       type: 'code',
  //       language: 'text',
  //       filename: 'npx gen-import',
  //       code:
  //         'error GI001  Circular dependency read during module evaluation — class heritage clause (`class X extends Y`)\n' +
  //         '    src/audit.entity.ts → src/entity.base.ts → src/audit.entity.ts\n' +
  //         '    fix: `BaseEntity` is read to build a class at src/audit.entity.ts:3. A base class cannot be lazily resolved — import it directly from its source file.\n\n' +
  //         'error GI002  src/gen-import.ts is inside a cycle with an init-time read — this fails at runtime\n' +
  //         '    src/audit.entity.ts → src/entity.base.ts → src/audit.entity.ts\n' +
  //         '    fix: Breaks at src/audit.entity.ts:3 — class heritage clause (`class X extends Y`). Run with --safe-barrels to withhold the offending exports and print direct-import lines.\n\n' +
  //         '╭────────────────────  gen-import  ─────────────────────╮\n' +
  //         '│ Source files   2                                      │\n' +
  //         '│ Total exports  3                                      │\n' +
  //         '│ Language       TypeScript                             │\n' +
  //         '│ Output file    src/gen-import.ts                      │\n' +
  //         '│ Module         cjs                                    │\n' +
  //         '│ Globals        off                                    │\n' +
  //         '│ Lazy           off                                    │\n' +
  //         '│ Topo sort      on                                     │\n' +
  //         '│ Import edges   7                                      │\n' +
  //         '│ Cycles         1 (1 init-time ✖)                     │\n' +
  //         '│ Barrel         unsafe ✖                              │\n' +
  //         '│ Collisions     none                                   │\n' +
  //         '│ New exports    +3: AuditEntity, formatTag, BaseEntity │\n' +
  //         '╰───────────────────────────────────────────────────────╯',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'Two codes, because they answer different questions. GI001 is about your modules: this cycle contains a read that happens during evaluation. GI002 is about the generated barrel: it sits inside that cycle, so importing from it is what triggers the failure. Both are errors in `SEVERITY_BY_CODE`. When every read on a cycle is deferred, the same situation downgrades to GI003 / GI004 at warn level, and the barrel verdict is `ordered` rather than `unsafe` — it works today, and one `extends` added through the barrel turns it into the output above.',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'There is a fourth verdict I like more than I expected to. If the barrel is acyclic over runtime edges but cyclic once `type-only` edges are added back, that is `type-safe` — GI005, info severity, with advice that says it becomes real the moment an `import type` annotation is dropped or `verbatimModuleSyntax` is switched on. It is not a problem. It is a problem with a specific trigger, and I would rather know where those are.',
  //     },
  //     {
  //       type: 'heading',
  //       text: 'Checking the checker',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'A static analyzer that is confidently wrong is worse than no analyzer, and emit-shape assertions cannot catch that — a barrel can look perfectly well-formed and still hand back `undefined`. So `test/integration/runtime-oracle.test.ts` generates each scenario, runs the CLI, parses the `Barrel` row straight out of the summary box, and then actually executes the result under both `tsc` + node and `tsx`, in lazy and static emit modes, asserting an exact `PROBE:` line. The genuine-cycle scenario expects `BROKEN` rather than a fixed string, because the same cycle corrupts differently per loader: tsc yields a silent `undefined`, esbuild throws. Pinning one spelling would make the test loader-specific; asserting "this must not produce a clean result" is the real invariant.',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'The property that matters is the other direction. If the tool says a barrel is safe, importing from it has to work everywhere — under every loader, in both emit modes. That is the claim worth testing, and it is the claim `tsc` was never making.',
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'In CI I want the run to fail, not to print something nobody reads. `--strict=cycles` blocks on GI001 only; `--strict=barrels` on GI002 and GI004; `--strict` on its own blocks on all of them plus export-name collisions, and exits 1:',
  //     },
  //     {
  //       type: 'code',
  //       language: 'text',
  //       filename: 'terminal',
  //       code: 'npx gen-import --strict=cycles',
  //     },
  //   ],
  // },
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
