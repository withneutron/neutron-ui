import { CharHash } from "./CharHash"

/** Our theme object/token prefix */
export const THEME_PREFIX = "$"

/** Adds a theme prefix to a string */
export function addPrefix(value: string) {
  return `${THEME_PREFIX}${value}`
}

export const varHash = new CharHash()
export const keyframeHash = new CharHash()
export const classHash = new CharHash()
