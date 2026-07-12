import { allCards, ensureFonts, renderOgPng } from '../../utils/og-image'
import { blogs } from '../../../shared/utils/blogs'

// Prerendered to .output/public/og/<name>.png (and served on demand in dev so
// social debuggers + local preview work). The route param captures the whole
// `<card>.png` segment. @resvg/resvg-js stays server-only — never in the
// browser bundle.
export default defineEventHandler((event) => {
  const fileName = getRouterParam(event, 'name') || ''
  const card = allCards(blogs).find((c) => c.fileName === fileName)
  if (!card) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
  ensureFonts()
  setResponseHeader(event, 'content-type', 'image/png')
  return renderOgPng(card)
})
