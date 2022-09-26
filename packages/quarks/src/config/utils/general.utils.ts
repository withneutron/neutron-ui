/** Our theme object/token prefix */
export const THEME_PREFIX = "$"

/** Adds a theme prefix to a string */
export function addPrefix(value: string) {
  return `${THEME_PREFIX}${value}`
}
