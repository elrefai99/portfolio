import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import type { BlogPost } from '../src/utils/blogs'
import { caseStudies, type CaseStudy } from '../src/utils/caseStudies'

const WIDTH = 1200
const HEIGHT = 630

const fontsDir = resolve(process.cwd(), 'build', 'fonts')
const fontFiles = [
  resolve(fontsDir, 'Inter-Regular.ttf'),
  resolve(fontsDir, 'Inter-SemiBold.ttf'),
  resolve(fontsDir, 'Inter-Bold.ttf'),
  resolve(fontsDir, 'InterDisplay-Bold.ttf'),
]

export type OgCard = {
  fileName: string
  eyebrow: string
  chip: string
  title: string
  subtitle: string
  footerLeft: string
  footerRight: string
}

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string,
  )

const wrapText = (text: string, fontSize: number, maxWidth: number, maxLines: number) => {
  const charWidth = fontSize * 0.52
  const maxChars = Math.max(1, Math.floor(maxWidth / charWidth))
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars) {
      current = candidate
    } else {
      if (current) lines.push(current)
      current = word
    }
    if (lines.length === maxLines) break
  }
  if (current && lines.length < maxLines) lines.push(current)

  if (lines.length === maxLines) {
    const consumed = lines.join(' ').length
    if (consumed < text.replace(/\s+/g, ' ').length) {
      let last = lines[maxLines - 1]
      while (last.length > 1 && last.length > maxChars - 1) last = last.slice(0, -1)
      lines[maxLines - 1] = `${last.replace(/[\s.,]+$/, '')}…`
    }
  }
  return lines
}

const tspans = (lines: string[], x: number, startY: number, lineHeight: number) =>
  lines
    .map((line, i) => `<tspan x="${x}" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('')

const buildSvg = (card: OgCard) => {
  const accent = '#6cb6ff'
  const titleLines = wrapText(card.title, 62, WIDTH - 160, 3)
  const subtitleLines = wrapText(card.subtitle, 28, WIDTH - 160, titleLines.length >= 3 ? 1 : 2)
  const titleY = 250
  const subtitleY = titleY + titleLines.length * 74 + 30

  let grid = ''
  for (let x = 48; x < WIDTH; x += 48) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" />`
  for (let y = 48; y < HEIGHT; y += 48) grid += `<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" />`

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0b0f17"/>
  <g stroke="${accent}" stroke-width="1" opacity="0.06">${grid}</g>
  <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1.5"/>
  <g stroke="${accent}" stroke-width="2">
    <path d="M24 60 V24 H60" fill="none"/>
    <path d="M${WIDTH - 60} 24 H${WIDTH - 24} V60" fill="none"/>
    <path d="M24 ${HEIGHT - 60} V${HEIGHT - 24} H60" fill="none"/>
    <path d="M${WIDTH - 60} ${HEIGHT - 24} H${WIDTH - 24} V${HEIGHT - 60}" fill="none"/>
  </g>
  <text x="80" y="96" font-family="Inter" font-weight="600" font-size="22" letter-spacing="4" fill="${accent}" fill-opacity="0.85">${escapeXml(card.eyebrow)}</text>
  <text x="${WIDTH - 80}" y="96" text-anchor="end" font-family="Inter" font-weight="600" font-size="22" letter-spacing="2" fill="#9fb2c7">elrefai.me</text>
  <rect x="80" y="140" width="${card.chip.length * 15 + 44}" height="44" rx="22" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.5"/>
  <text x="${80 + 22}" y="169" font-family="Inter" font-weight="600" font-size="22" letter-spacing="2" fill="${accent}">${escapeXml(card.chip.toUpperCase())}</text>
  <text font-family="Inter Display" font-weight="700" font-size="62" fill="#f4f7fb">${tspans(titleLines, 80, titleY, 74)}</text>
  <text font-family="Inter" font-weight="400" font-size="28" fill="#9fb2c7">${tspans(subtitleLines, 80, subtitleY, 40)}</text>
  <line x1="80" y1="${HEIGHT - 92}" x2="${WIDTH - 80}" y2="${HEIGHT - 92}" stroke="${accent}" stroke-opacity="0.25" stroke-width="1"/>
  <text x="80" y="${HEIGHT - 52}" font-family="Inter" font-weight="600" font-size="24" fill="#c7d4e3">${escapeXml(card.footerLeft)}</text>
  <text x="${WIDTH - 80}" y="${HEIGHT - 52}" text-anchor="end" font-family="Inter" font-weight="400" font-size="20" fill="#7d90a6">${escapeXml(card.footerRight)}</text>
</svg>`
}

export const renderOgPng = (card: OgCard): Buffer => {
  const resvg = new Resvg(buildSvg(card), {
    fitTo: { mode: 'width', value: WIDTH },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' },
    background: '#0b0f17',
  })
  return resvg.render().asPng()
}

const author = 'Mohammed Mostafa · Software Engineer'

export const blogCard = (blog: BlogPost): OgCard => ({
  fileName: `blog-${blog.slug}.png`,
  eyebrow: 'L-04 · JOURNAL / ARTICLE',
  chip: blog.category,
  title: blog.title,
  subtitle: blog.excerpt,
  footerLeft: `Mohammed Mostafa · ${blog.readTime}`,
  footerRight: blog.tags.slice(0, 5).join('   ·   '),
})

export const projectCard = (cs: CaseStudy): OgCard => ({
  fileName: `project-${cs.slug}.png`,
  eyebrow: 'L-03 · PROJECT / DEEP DIVE',
  chip: cs.category,
  title: cs.name,
  subtitle: cs.summary,
  footerLeft: author,
  footerRight: cs.stack.slice(0, 4).join('   ·   '),
})

export const staticCards: OgCard[] = [
  {
    fileName: 'page-home.png',
    eyebrow: 'L-01 · PORTFOLIO / HOME',
    chip: 'Software Engineer',
    title: 'Mohammed Mostafa',
    subtitle: 'Backend engineer in Cairo, Egypt — APIs, payment integrations, and cloud systems with Node.js, TypeScript, and AWS.',
    footerLeft: author,
    footerRight: 'Node.js · TypeScript · AWS · Backend',
  },
  {
    fileName: 'page-projects.png',
    eyebrow: 'L-02 · PROJECTS / INDEX',
    chip: 'Selected Work',
    title: 'Projects & Open-Source Work',
    subtitle: 'Lesoll, EGYStay, 0Gosha, Gen-Import, Doc-Station, Smart Parser, Elrecord — backend, API, payment, cloud, and developer tooling.',
    footerLeft: author,
    footerRight: 'Backend · APIs · Payments · Tooling',
  },
  {
    fileName: 'page-blogs.png',
    eyebrow: 'L-04 · JOURNAL / INDEX',
    chip: 'Field Notes',
    title: 'Backend Engineering Notes',
    subtitle: 'Node.js, TypeScript, Express.js, API architecture, queues, Redis, authentication, payment tokens, and production systems.',
    footerLeft: author,
    footerRight: 'Node.js · TypeScript · Queues · APIs',
  },
  {
    fileName: 'page-resume.png',
    eyebrow: 'L-03 · RESUME / CV',
    chip: 'Curriculum Vitae',
    title: 'Resume — Backend Engineer',
    subtitle: 'Node.js, TypeScript, scalable APIs, payment integrations, MongoDB, PostgreSQL, Redis, Docker, and AWS.',
    footerLeft: author,
    footerRight: 'Node.js · TypeScript · Cloud · Databases',
  },
]

export const allCards = (blogs: BlogPost[]): OgCard[] => [
  ...staticCards,
  ...caseStudies.map(projectCard),
  ...blogs.map(blogCard),
]

let cachedFontCheck = false
export const ensureFonts = () => {
  if (cachedFontCheck) return
  for (const file of fontFiles) readFileSync(file)
  cachedFontCheck = true
}
