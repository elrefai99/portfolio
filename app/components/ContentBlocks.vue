<script setup lang="ts">
import type { BlogBlock } from "~~/shared/utils/blogs";
import { headingIds } from "~~/shared/utils/headingIds";

// Shared renderer for the block content model (paragraph / heading / list / code /
// mermaid) used by both blog posts and project case studies. Headings render as
// <h2> so pages keep a single <h1> above this component.
const props = defineProps<{
  blocks: BlogBlock[];
}>();

// Fragment ids so each section is separately addressable — see headingIds.ts
// for why. Indexed by block position; TableOfContents.vue derives the same ids
// from the same helper.
const ids = computed(() => headingIds(props.blocks));

const anchorClass =
  "ml-2 align-middle text-[0.7em] font-normal opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-60";

const inlineCodeClass =
  "mx-0.5 rounded-md border border-[var(--bp-line-soft)] bg-[rgba(var(--bp-line-rgb),0.08)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--bp-blue-dim)]";
const codeShellClass =
  "overflow-hidden rounded-lg border border-[#2a241f] bg-[#191917] text-[#e5e4e0ee] shadow-[0_18px_48px_rgba(0,0,0,0.42)]";
const codeHeaderClass =
  "flex items-center justify-between gap-4 border-b border-[#221d19] bg-[#100e0c] px-4 py-2 text-xs text-[#a89e93]";
const codeBadgeClass =
  "rounded-full bg-[#221d19] px-2 py-1 font-mono uppercase text-[#d7ba7d]";
const codePreClass =
  "vitesse-code min-h-36 overflow-x-auto bg-[#191917] p-4 text-[13px] leading-6";

const keywords = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "of",
  "return",
  "switch",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "yield",
]);

const typeKeywords = new Set([
  "boolean",
  "interface",
  "number",
  "private",
  "protected",
  "public",
  "readonly",
  "string",
  "type",
]);

const constants = new Set(["false", "Infinity", "NaN", "null", "true", "undefined"]);

type InlinePart = { text: string; code?: boolean; href?: string };

// Splits text on `backtick` spans (inline-code chips) and [label](url)
// spans (links — internal paths or absolute URLs) inside the plain segments.
const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;

const parseInline = (text: string): InlinePart[] => {
  const parts: InlinePart[] = [];
  text.split("`").forEach((segment, index) => {
    if (index % 2 === 1) {
      parts.push({ text: segment, code: true });
      return;
    }
    let lastIndex = 0;
    for (const match of segment.matchAll(linkPattern)) {
      if (match.index! > lastIndex)
        parts.push({ text: segment.slice(lastIndex, match.index) });
      parts.push({ text: match[1], href: match[2] });
      lastIndex = match.index! + match[0].length;
    }
    if (lastIndex < segment.length) parts.push({ text: segment.slice(lastIndex) });
  });
  return parts;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const inlineLinkClass =
  "font-medium text-[var(--bp-blue)] underline underline-offset-3 decoration-[rgba(var(--bp-accent-rgb),0.3)] hover:decoration-[rgba(var(--bp-accent-rgb),0.8)]";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

const wrapToken = (value: string, tokenClass: string) =>
  `<span class="${tokenClass}">${escapeHtml(value)}</span>`;

const highlightPlainCode = (code: string) => {
  const tokenPattern = /=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}()[\].,;:?]|[+\-*\/%=<>!&|]/g;
  let html = "";
  let lastIndex = 0;

  code.replace(tokenPattern, (value, offset: number) => {
    html += escapeHtml(code.slice(lastIndex, offset));

    const before = code.slice(0, offset);
    const after = code.slice(offset + value.length);
    const previousNonSpace = before.match(/\S\s*$/)?.[0].trim();
    const isIdentifier = /^[A-Za-z_$][\w$]*$/.test(value);

    if (keywords.has(value)) {
      html += wrapToken(value, "v-token-keyword");
    } else if (typeKeywords.has(value)) {
      html += wrapToken(value, "v-token-type");
    } else if (constants.has(value)) {
      html += wrapToken(value, "v-token-constant");
    } else if (/^\d/.test(value)) {
      html += wrapToken(value, "v-token-number");
    } else if (isIdentifier && /^\s*\(/.test(after)) {
      html += wrapToken(value, "v-token-function");
    } else if (isIdentifier && previousNonSpace === ".") {
      html += wrapToken(value, "v-token-property");
    } else if (/^[{}()[\].,;:?]$/.test(value)) {
      html += wrapToken(value, "v-token-punctuation");
    } else if (/^(=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||[+\-*\/%=<>!&|])$/.test(value)) {
      html += wrapToken(value, "v-token-operator");
    } else {
      html += escapeHtml(value);
    }

    lastIndex = offset + value.length;
    return value;
  });

  return html + escapeHtml(code.slice(lastIndex));
};

const highlightCode = (code: string) => {
  const stringOrCommentPattern = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|`(?:\\[\s\S]|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g;
  let html = "";
  let lastIndex = 0;

  code.replace(stringOrCommentPattern, (value, offset: number) => {
    html += highlightPlainCode(code.slice(lastIndex, offset));
    html += wrapToken(
      value,
      value.startsWith("//") || value.startsWith("/*")
        ? "v-token-comment"
        : "v-token-string"
    );
    lastIndex = offset + value.length;
    return value;
  });

  return html + highlightPlainCode(code.slice(lastIndex));
};

const isMermaidCode = (block: BlogBlock) =>
  block.type === "code" && block.language.toLowerCase() === "mermaid";
</script>

<template>
  <div class="blog-content space-y-6">
    <template v-for="(block, index) in blocks" :key="index">
      <p
        v-if="block.type === 'paragraph'"
        class="text-base leading-8 text-[var(--bp-blue-dim)]"
      >
        <template v-for="(part, partIndex) in parseInline(block.text)" :key="partIndex"
          ><code v-if="part.code" :class="inlineCodeClass">{{ part.text }}</code
          ><a
            v-else-if="part.href"
            :href="part.href"
            :class="inlineLinkClass"
            :target="isExternal(part.href) ? '_blank' : undefined"
            :rel="isExternal(part.href) ? 'noopener noreferrer' : undefined"
            >{{ part.text }}</a
          ><template v-else>{{ part.text }}</template></template
        >
      </p>

      <component
        :is="block.level === 3 ? 'h3' : 'h2'"
        v-else-if="block.type === 'heading'"
        :id="ids[index]"
        class="group scroll-mt-24"
        :class="
          block.level === 3
            ? 'pt-1 text-xl font-semibold text-[var(--bp-blue)]'
            : 'pt-2 text-2xl font-semibold text-[var(--bp-blue)]'
        "
      >
        {{ block.text
        }}<a
          :href="`#${ids[index]}`"
          :class="anchorClass"
          :aria-label="`Link to section: ${block.text}`"
          >#</a
        >
      </component>

      <ul
        v-else-if="block.type === 'list'"
        class="list-disc space-y-2 pl-5 text-base leading-7 text-[var(--bp-blue-dim)]"
      >
        <li v-for="item in block.items" :key="item">
          <template v-for="(part, partIndex) in parseInline(item)" :key="partIndex"
            ><code v-if="part.code" :class="inlineCodeClass">{{ part.text }}</code
            ><a
              v-else-if="part.href"
              :href="part.href"
              :class="inlineLinkClass"
              :target="isExternal(part.href) ? '_blank' : undefined"
              :rel="isExternal(part.href) ? 'noopener noreferrer' : undefined"
              >{{ part.text }}</a
            ><template v-else>{{ part.text }}</template></template
          >
        </li>
      </ul>

      <MermaidDiagram
        v-else-if="isMermaidCode(block)"
        :code="block.code"
        :filename="block.filename"
      />

      <div v-else-if="block.type === 'code'" :class="codeShellClass">
        <div :class="codeHeaderClass">
          <span class="font-mono">{{ block.filename || "snippet" }}</span>
          <span :class="codeBadgeClass">{{ block.language }}</span>
        </div>
        <pre :class="codePreClass"><code v-html="highlightCode(block.code)" /></pre>
      </div>
    </template>
  </div>
</template>

<style scoped>
.vitesse-code {
  color: #e5e4e0ee;
  font-family: "Fira Code", "Cascadia Code", "JetBrains Mono", "SFMono-Regular", Consolas,
    "Liberation Mono", Menlo, monospace;
  font-feature-settings: "liga" 1, "calt" 1;
  tab-size: 2;
}

.vitesse-code :deep(.v-token-keyword) {
  color: #cb7676;
}

.vitesse-code :deep(.v-token-type) {
  color: #5da994;
}

.vitesse-code :deep(.v-token-constant) {
  color: #4d9375;
}

.vitesse-code :deep(.v-token-number) {
  color: #b8a965;
}

.vitesse-code :deep(.v-token-function) {
  color: #80a665;
}

.vitesse-code :deep(.v-token-property) {
  color: #d7ba7d;
}

.vitesse-code :deep(.v-token-punctuation),
.vitesse-code :deep(.v-token-operator) {
  color: #666;
}

.vitesse-code :deep(.v-token-string) {
  color: #c98a7d;
}

.vitesse-code :deep(.v-token-comment) {
  color: #8fa38f;
  font-style: italic;
}
</style>
