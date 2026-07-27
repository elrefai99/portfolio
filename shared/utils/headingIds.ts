import type { BlogBlock } from './blogs'

/**
 * Fragment ids for article headings.
 *
 * Article H2/H3 used to render with no `id` at all, which made every section
 * unaddressable: no `url#fragment` for Google's passage ranking to link to, no
 * "jump to" SERP links, and no way for an answer engine to cite a specific
 * section instead of the whole page. A ~3,000-word post is a dozen distinct
 * answers; without ids it is one opaque target.
 *
 * The slug has to be stable across builds (an id that changes on every deploy
 * breaks every inbound deep link), so it is a pure function of the heading text
 * — no counters seeded by render order, no hashes of surrounding content.
 *
 * Shared by ContentBlocks.vue (which emits the ids) and TableOfContents.vue
 * (which links to them); the two must agree or every TOC entry 404s in-page.
 */
export const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    // Strip apostrophes rather than turning them into separators, so
    // "docs don't cover" becomes "docs-dont-cover", not "docs-don-t-cover".
    .replace(/['’`"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export type TocEntry = {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Ids for every block, aligned by index with the input array. Non-heading
 * blocks map to an empty string so callers can index without a lookup table.
 *
 * Two headings with identical text would otherwise collide on one id and make
 * the second unreachable, so repeats get a `-2`, `-3` suffix in document order.
 */
export const headingIds = (blocks: BlogBlock[]): string[] => {
  const seen = new Map<string, number>()

  return blocks.map((block) => {
    if (block.type !== 'heading') return ''
    const base = slugifyHeading(block.text) || 'section'
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return count === 1 ? base : `${base}-${count}`
  })
}

export const tableOfContents = (blocks: BlogBlock[]): TocEntry[] => {
  const ids = headingIds(blocks)

  return blocks.flatMap((block, index) =>
    block.type === 'heading'
      ? [{ id: ids[index]!, text: block.text, level: (block.level ?? 2) as 2 | 3 }]
      : [],
  )
}
