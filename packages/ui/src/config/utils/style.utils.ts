export const THEME_PREFIX = "$"

export function addPrefix(value: string) {
  return `${THEME_PREFIX}${value}`
}
