import { sitePaths, siteUrl } from '../../shared/utils/site'
import { blogs, type BlogBlock } from '../../shared/utils/blogs'

// Prerendered to .output/public/rss.xml (and served live in `nuxt dev`).
// Full-text RSS 2.0 feed, newest first. Reads only blog metadata, so new posts
// appear automatically.

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string,
  )

// Render the block content model to plain HTML for the feed's full-text
// content:encoded — same inline rules as ContentBlocks.vue (`code`, [label](url)).
const inlineHtml = (text: string) =>
  text
    .split('`')
    .map((segment, index) => {
      if (index % 2 === 1) return `<code>${escapeXml(segment)}</code>`
      return escapeXml(segment).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
        const abs = /^https?:\/\//.test(href) ? href : new URL(href, siteUrl).toString()
        return `<a href="${abs}">${label}</a>`
      })
    })
    .join('')

const blockToHtml = (block: BlogBlock): string => {
  switch (block.type) {
    case 'paragraph':
      return `<p>${inlineHtml(block.text)}</p>`
    case 'heading': {
      const level = block.level ?? 2
      return `<h${level}>${escapeXml(block.text)}</h${level}>`
    }
    case 'list':
      return `<ul>${block.items.map((item) => `<li>${inlineHtml(item)}</li>`).join('')}</ul>`
    case 'code':
      return `<pre><code>${escapeXml(block.code)}</code></pre>`
  }
}

const createRssXml = () => {
  const sorted = [...blogs].sort((a, b) => b.date.localeCompare(a.date))
  const lastBuildDate = new Date(
    sorted
      .map((post) => post.updated ?? post.date)
      .sort()
      .at(-1)!,
  ).toUTCString()
  const items = sorted
    .map((post) => {
      const url = new URL(`${sitePaths.blogs}/${post.slug}`, siteUrl).toString()
      const fullHtml = post.blocks.map(blockToHtml).join('').replaceAll(']]>', ']]&gt;')
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.metaDescription ?? post.excerpt)}</description>
      <content:encoded><![CDATA[${fullHtml}]]></content:encoded>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blogs • Mohammed Mostafa</title>
    <link>${new URL(sitePaths.blogs, siteUrl).toString()}</link>
    <atom:link href="${new URL('/rss.xml', siteUrl).toString()}" rel="self" type="application/rss+xml"/>
    <description>Backend engineering notes about Node.js, TypeScript, Express.js, APIs, queues, Redis, authentication, payment tokens, and production systems.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return createRssXml()
})
