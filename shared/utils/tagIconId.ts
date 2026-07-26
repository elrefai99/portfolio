/** Stable DOM id for a tag icon's <symbol> — must agree between the sprite and the <use>. */
export const tagIconSymbolId = (iconId: string) => `ti-${iconId.replace(/[^a-z0-9]+/gi, '-')}`
