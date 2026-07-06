<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { getBlogBySlug, getRelatedBlogs, type BlogBlock } from '../utils/blogs'
import { createBlogPostSEO, notFoundSEO } from '../utils/tags'

const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const blog = computed(() => getBlogBySlug(slug.value))
const relatedBlogs = computed(() => (blog.value ? getRelatedBlogs(blog.value) : []))

useHead(computed(() => (blog.value ? createBlogPostSEO(blog.value) : notFoundSEO)))

const panelClass = 'bp-card'
const tagClass = 'bp-chip'
const inlineCodeClass = 'mx-0.5 rounded-md border border-red-500/25 bg-red-500/8 px-1.5 py-0.5 font-mono text-[0.85em] text-red-600 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-400'
const codeShellClass = 'overflow-hidden rounded-lg border border-[#202020] bg-[#121212] text-[#dbd7caee] shadow-[0_18px_48px_rgba(0,0,0,0.42)]'
const codeHeaderClass = 'flex items-center justify-between gap-4 border-b border-[#181818] bg-[#0e0e0e] px-4 py-2 text-xs text-[#a6a59d]'
const codeBadgeClass = 'rounded-full bg-[#181818] px-2 py-1 font-mono uppercase text-[#d7ba7d]'
const codePreClass = 'vitesse-code min-h-36 overflow-x-auto bg-[#121212] p-4 text-[13px] leading-6'

const keywords = new Set([
  'as',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'default',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'let',
  'new',
  'of',
  'return',
  'switch',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'yield',
])

const typeKeywords = new Set([
  'boolean',
  'interface',
  'number',
  'private',
  'protected',
  'public',
  'readonly',
  'string',
  'type',
])

const constants = new Set(['false', 'Infinity', 'NaN', 'null', 'true', 'undefined'])

// Splits text on `backtick` spans so inline code renders as highlighted chips.
const parseInline = (text: string) =>
  text.split('`').map((part, index) => ({ text: part, code: index % 2 === 1 }))

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[char]
  })

const wrapToken = (value: string, tokenClass: string) =>
  `<span class="${tokenClass}">${escapeHtml(value)}</span>`

const highlightPlainCode = (code: string) => {
  const tokenPattern = /=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}()[\].,;:?]|[+\-*\/%=<>!&|]/g
  let html = ''
  let lastIndex = 0

  code.replace(tokenPattern, (value, offset: number) => {
    html += escapeHtml(code.slice(lastIndex, offset))

    const before = code.slice(0, offset)
    const after = code.slice(offset + value.length)
    const previousNonSpace = before.match(/\S\s*$/)?.[0].trim()
    const isIdentifier = /^[A-Za-z_$][\w$]*$/.test(value)

    if (keywords.has(value)) {
      html += wrapToken(value, 'v-token-keyword')
    } else if (typeKeywords.has(value)) {
      html += wrapToken(value, 'v-token-type')
    } else if (constants.has(value)) {
      html += wrapToken(value, 'v-token-constant')
    } else if (/^\d/.test(value)) {
      html += wrapToken(value, 'v-token-number')
    } else if (isIdentifier && /^\s*\(/.test(after)) {
      html += wrapToken(value, 'v-token-function')
    } else if (isIdentifier && previousNonSpace === '.') {
      html += wrapToken(value, 'v-token-property')
    } else if (/^[{}()[\].,;:?]$/.test(value)) {
      html += wrapToken(value, 'v-token-punctuation')
    } else if (/^(=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||[+\-*\/%=<>!&|])$/.test(value)) {
      html += wrapToken(value, 'v-token-operator')
    } else {
      html += escapeHtml(value)
    }

    lastIndex = offset + value.length
    return value
  })

  return html + escapeHtml(code.slice(lastIndex))
}

const highlightCode = (code: string) => {
  const stringOrCommentPattern = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|`(?:\\[\s\S]|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g
  let html = ''
  let lastIndex = 0

  code.replace(stringOrCommentPattern, (value, offset: number) => {
    html += highlightPlainCode(code.slice(lastIndex, offset))
    html += wrapToken(value, value.startsWith('//') || value.startsWith('/*') ? 'v-token-comment' : 'v-token-string')
    lastIndex = offset + value.length
    return value
  })

  return html + highlightPlainCode(code.slice(lastIndex))
}

const isMermaidCode = (block: BlogBlock) =>
  block.type === 'code' && block.language.toLowerCase() === 'mermaid'
</script>

<template>
  <FloorSection level="L-04" name="Journal / Article" elevation="+0.00 m" :top-slab="false">
  <div max-w-4xl mx-auto min-h-screen text-black dark:text-white flex justify-center items-start>
    <main w-full max-w-4xl p-4 md:p-10>
      <article v-if="blog" class="space-y-6">
        <router-link to="/blogs" class="bp-tab inline-flex items-center gap-2">
          <i class="i-carbon:arrow-left w-4 h-4" />
          Blogs
        </router-link>

        <header :class="`${panelClass} overflow-hidden p-6 md:p-8`">
          <div class="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <span>{{ blog.category }}</span>
            <span aria-hidden="true">/</span>
            <time :datetime="blog.date">{{ blog.date }}</time>
            <span aria-hidden="true">/</span>
            <span>{{ blog.readTime }}</span>
          </div>

          <h1 class="text-4xl font-bold leading-tight text-black dark:text-gray-300 md:text-5xl">{{ blog.title }}</h1>
          <p class="mt-4 max-w-3xl text-base leading-7 text-black dark:text-gray-400 md:text-lg">
            {{ blog.excerpt }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in blog.tags" :key="tag" :class="tagClass">{{ tag }}</span>
          </div>
        </header>

        <section :class="`${panelClass} p-6 md:p-8`">
          <div class="blog-content space-y-6">
            <template v-for="(block, index) in blog.blocks" :key="index">
              <p
                v-if="block.type === 'paragraph'"
                class="text-base leading-8 text-black dark:text-gray-400"
              >
                <template v-for="(part, partIndex) in parseInline(block.text)" :key="partIndex"><code v-if="part.code" :class="inlineCodeClass">{{ part.text }}</code><template v-else>{{ part.text }}</template></template>
              </p>

              <h2
                v-else-if="block.type === 'heading'"
                class="pt-2 text-2xl font-semibold text-black dark:text-gray-300"
              >
                {{ block.text }}
              </h2>

              <ul
                v-else-if="block.type === 'list'"
                class="list-disc space-y-2 pl-5 text-base leading-7 text-black dark:text-gray-400"
              >
                <li v-for="item in block.items" :key="item">
                  <template v-for="(part, partIndex) in parseInline(item)" :key="partIndex"><code v-if="part.code" :class="inlineCodeClass">{{ part.text }}</code><template v-else>{{ part.text }}</template></template>
                </li>
              </ul>

              <MermaidDiagram
                v-else-if="isMermaidCode(block)"
                :code="block.code"
                :filename="block.filename"
              />

              <div
                v-else-if="block.type === 'code'"
                :class="codeShellClass"
              >
                <div :class="codeHeaderClass">
                  <span class="font-mono">{{ block.filename || 'snippet' }}</span>
                  <span :class="codeBadgeClass">{{ block.language }}</span>
                </div>
                <pre :class="codePreClass"><code v-html="highlightCode(block.code)" /></pre>
              </div>
            </template>
          </div>
        </section>

        <nav
          v-if="relatedBlogs.length"
          :class="`${panelClass} p-6 md:p-8`"
          aria-label="Related articles"
        >
          <h2 class="text-xl font-semibold text-black dark:text-gray-300">Related reading</h2>
          <ul class="mt-4 space-y-3">
            <li v-for="related in relatedBlogs" :key="related.slug">
              <router-link
                :to="`/blogs/${related.slug}`"
                class="group flex items-start justify-between gap-4 rounded-lg border border-transparent p-3 transition hover:border-gray-300 dark:hover:border-gray-700"
              >
                <span>
                  <span class="block font-semibold text-black dark:text-gray-300">{{ related.title }}</span>
                  <span class="mt-1 block text-sm text-gray-600 dark:text-gray-400">{{ related.excerpt }}</span>
                </span>
                <i class="i-carbon:arrow-up-right mt-1 shrink-0 opacity-60 transition group-hover:opacity-100" />
              </router-link>
            </li>
          </ul>
        </nav>
      </article>

      <section v-else :class="`${panelClass} p-6 text-center md:p-8`">
        <h1 class="text-3xl font-semibold text-black dark:text-white">Blog not found</h1>
        <p class="mt-3 text-gray-700 dark:text-gray-300">This post does not exist or was moved.</p>
        <router-link to="/blogs" class="bp-tab is-active mt-6 inline-flex items-center gap-2">
          <i class="i-carbon:arrow-left w-4 h-4" />
          Back to blogs
        </router-link>
      </section>
    </main>
  </div>
  </FloorSection>
</template>

<style scoped>
.vitesse-code {
  color: #dbd7caee;
  font-family:
    'Fira Code',
    'Cascadia Code',
    'JetBrains Mono',
    'SFMono-Regular',
    Consolas,
    'Liberation Mono',
    Menlo,
    monospace;
  font-feature-settings: 'liga' 1, 'calt' 1;
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
  color: #758575dd;
  font-style: italic;
}
</style>
