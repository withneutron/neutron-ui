import type { VarData } from "./CharHash"
import { CharHash } from "./CharHash"

export type CssValue = string | Record<string, string>

export type ScaleEntry = VarData & {
  /** Can be a single, or key-value pairs of CSS props + values */
  value: CssValue
}

export type CssValueMap<T extends string | number | symbol = string> = Record<T, CssValue>

export type BaseScale = Record<string, ScaleEntry>

export interface ThemeScale<T extends BaseScale, S extends CssValueMap> {
  /** Used for theme definition and customization */
  scale: T
  /** Used to generate static CSS classes, and the prop values that reference them */
  cssValueMap: S
}

// THEME VALUES ///////////////////////////////////////////////////////////////
// SIZE SCALE /////////////////////////////////////////////////////////////////
/** Generator function for `size` theme scale */
export function getSize(hash: CharHash) {
  const base = { ...hash.var, value: "4rem" } as const

  const sharedScale = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "1rem" },
    2: { ...hash.var, value: `calc(${base.ref} / 2)` },
    4: { ...hash.var, value: base.ref },
    8: { ...hash.var, value: `calc(${base.ref} * 2)` },
    12: { ...hash.var, value: `calc(${base.ref} * 3)` },
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    20: { ...hash.var, value: `calc(${base.ref} * 5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    48: { ...hash.var, value: `calc(${base.ref} * 12)` },
    64: { ...hash.var, value: `calc(${base.ref} * 16)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    120: { ...hash.var, value: `calc(${base.ref} * 30)` },
    200: { ...hash.var, value: `calc(${base.ref} * 50)` },
    320: { ...hash.var, value: `calc(${base.ref} * 80)` },
    480: { ...hash.var, value: `calc(${base.ref} * 120)` },
    640: { ...hash.var, value: `calc(${base.ref} * 160)` },
  } as const

  const scale = { ...sharedScale, base } as const
  const cssValueMap = getCssMapFromScale(sharedScale)

  return {
    scale,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof cssValueMap>
}

// SPACE SCALE ////////////////////////////////////////////////////////////////
/** Generator function for `space` theme scale */
export function getSpace<T extends BaseScale>(hash: CharHash, size: T) {
  const base = { ...hash.var, value: size.base.ref } as const

  const sharedScale = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "1rem" },
    2: { ...hash.var, value: `calc(${base.ref} / 2)` },
    4: { ...hash.var, value: base.ref },
    8: { ...hash.var, value: `calc(${base.ref} * 2)` },
    12: { ...hash.var, value: `calc(${base.ref} * 3)` },
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    20: { ...hash.var, value: `calc(${base.ref} * 5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    48: { ...hash.var, value: `calc(${base.ref} * 12)` },
    64: { ...hash.var, value: `calc(${base.ref} * 16)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
  } as const

  const scale = { ...sharedScale, base } as const
  const cssValueMap = getCssMapFromScale(sharedScale)

  return {
    scale,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof cssValueMap>
}

// BORDER SCALE ///////////////////////////////////////////////////////////////
/** Generator function for `border` theme scale */
export function getBorder<T extends BaseScale>(hash: CharHash, color: T) {
  const width = { ...hash.var, value: "2rem" } as const
  const thickWidth = { ...hash.var, value: `calc(${width.ref} + 2)` } as const
  const primaryColor = { ...hash.var, value: color.primary9.ref } as const
  const primarySubtleColor = { ...hash.var, value: color.primary7.ref } as const
  const secondaryColor = { ...hash.var, value: color.secondary9.ref } as const
  const secondarySubtleColor = { ...hash.var, value: color.secondary7.ref } as const
  const neutralColor = { ...hash.var, value: color.neutral9.ref } as const
  const neutralSubtleColor = { ...hash.var, value: color.neutral7.ref } as const
  const style = { ...hash.var, value: "solid" } as const

  const scale = {
    width,
    thickWidth,
    primaryColor,
    primarySubtleColor,
    secondaryColor,
    secondarySubtleColor,
    neutralColor,
    neutralSubtleColor,
    style,
  } as const

  const cssValueMap = {
    // Composition Combos (NOT configurable directly)
    primary: `${width.ref} ${style.ref} ${primaryColor.ref}`,
    primaryThick: `${thickWidth.ref} ${style.ref} ${primaryColor.ref}`,
    primarySubtle: `${width.ref} ${style.ref} ${primarySubtleColor.ref}`,
    primaryThickSubtle: `${thickWidth.ref} ${style.ref} ${primarySubtleColor.ref}`,
    secondary: `${width.ref} ${style.ref} ${secondaryColor.ref}`,
    secondaryThick: `${thickWidth.ref} ${style.ref} ${secondaryColor.ref}`,
    secondarySubtle: `${width.ref} ${style.ref} ${secondarySubtleColor.ref}`,
    secondaryThickSubtle: `${thickWidth.ref} ${style.ref} ${secondarySubtleColor.ref}`,
    neutral: `${width.ref} ${style.ref} ${neutralColor.ref}`,
    neutralThick: `${thickWidth.ref} ${style.ref} ${neutralColor.ref}`,
    neutralSubtle: `${width.ref} ${style.ref} ${neutralSubtleColor.ref}`,
    neutralThickSubtle: `${thickWidth.ref} ${style.ref} ${neutralSubtleColor.ref}`,
  } as const

  return {
    scale,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof cssValueMap>
}

// OUTLINE SCALE //////////////////////////////////////////////////////////////
/** Generator function for `outline` theme scale */
export function getOutline<T extends BaseScale>(hash: CharHash, color: T) {
  const width = { ...hash.var, value: "2rem" } as const
  const thickWidth = { ...hash.var, value: `calc(${width.ref} + 2)` } as const
  const primaryColor = { ...hash.var, value: color.primary9.ref } as const
  const primarySubtleColor = { ...hash.var, value: color.primary7.ref } as const
  const secondaryColor = { ...hash.var, value: color.secondary9.ref } as const
  const secondarySubtleColor = { ...hash.var, value: color.secondary7.ref } as const
  const neutralColor = { ...hash.var, value: color.neutral9.ref } as const
  const neutralSubtleColor = { ...hash.var, value: color.neutral7.ref } as const
  const style = { ...hash.var, value: "solid" } as const
  const offset = { ...hash.var, value: "0" } as const
  const wideOffset = { ...hash.var, value: "2rem" } as const

  const scale = {
    width,
    thickWidth,
    primaryColor,
    primarySubtleColor,
    secondaryColor,
    secondarySubtleColor,
    neutralColor,
    neutralSubtleColor,
    style,
    offset,
    wideOffset,
  } as const

  const primaryOutline = `${width.ref} ${style.ref} ${primaryColor.ref}`
  const secondaryOutline = `${width.ref} ${style.ref} ${secondaryColor.ref}`
  const neutralOutline = `${width.ref} ${style.ref} ${neutralColor.ref}`
  const primaryThickOutline = `${thickWidth.ref} ${style.ref} ${primaryColor.ref}`
  const primarySubtleOutline = `${width.ref} ${style.ref} ${primarySubtleColor.ref}`
  const primaryThickSubtleOutline = `${thickWidth.ref} ${style.ref} ${primarySubtleColor.ref}`
  const secondaryThickOutline = `${thickWidth.ref} ${style.ref} ${secondaryColor.ref}`
  const secondarySubtleOutline = `${width.ref} ${style.ref} ${secondarySubtleColor.ref}`
  const secondaryThickSubtleOutline = `${thickWidth.ref} ${style.ref} ${secondarySubtleColor.ref}`
  const neutralThickOutline = `${thickWidth.ref} ${style.ref} ${neutralColor.ref}`
  const neutralSubtleOutline = `${width.ref} ${style.ref} ${neutralSubtleColor.ref}`
  const neutralThickSubtleOutline = `${thickWidth.ref} ${style.ref} ${neutralSubtleColor.ref}`

  const cssValueMap = {
    // Composition Combos (NOT configurable directly)
    // BASE COMBOS
    primary: { outline: primaryOutline, "outline-offset": offset.ref },
    primaryThick: { outline: primaryThickOutline, "outline-offset": offset.ref },
    primarySubtle: { outline: primarySubtleOutline, "outline-offset": offset.ref },
    primaryThickSubtle: { outline: primaryThickSubtleOutline, "outline-offset": offset.ref },
    secondary: { outline: secondaryOutline, "outline-offset": offset.ref },
    secondaryThick: { outline: secondaryThickOutline, "outline-offset": offset.ref },
    secondarySubtle: { outline: secondarySubtleOutline, "outline-offset": offset.ref },
    secondaryThickSubtle: { outline: secondaryThickSubtleOutline, "outline-offset": offset.ref },
    neutral: { outline: neutralOutline, "outline-offset": offset.ref },
    neutralThick: { outline: neutralThickOutline, "outline-offset": offset.ref },
    neutralSubtle: { outline: neutralSubtleOutline, "outline-offset": offset.ref },
    neutralThickSubtle: { outline: neutralThickSubtleOutline, "outline-offset": offset.ref },
    // WIDE COMBOS
    primaryOffset: { outline: primaryThickOutline, "outline-offset": wideOffset.ref },
    primaryThickOffset: { outline: primaryThickOutline, "outline-offset": wideOffset.ref },
    primarySubtleOffset: { outline: primarySubtleOutline, "outline-offset": wideOffset.ref },
    primaryThickSubtleOffset: { outline: primaryThickSubtleOutline, "outline-offset": wideOffset.ref },
    secondaryOffset: { outline: secondaryThickOutline, "outline-offset": wideOffset.ref },
    secondaryThickOffset: { outline: secondaryThickOutline, "outline-offset": wideOffset.ref },
    secondarySubtleOffset: { outline: secondarySubtleOutline, "outline-offset": wideOffset.ref },
    secondaryThickSubtleOffset: { outline: secondaryThickSubtleOutline, "outline-offset": wideOffset.ref },
    neutralOffset: { outline: neutralThickOutline, "outline-offset": wideOffset.ref },
    neutralThickOffset: { outline: neutralThickOutline, "outline-offset": wideOffset.ref },
    neutralSubtleOffset: { outline: neutralSubtleOutline, "outline-offset": wideOffset.ref },
    neutralThickSubtleOffset: { outline: neutralThickSubtleOutline, "outline-offset": wideOffset.ref },
  } as const

  return {
    scale,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof cssValueMap>
}

// HELPERS ////////////////////////////////////////////////////////////////////
function getCssMapFromScale<T extends BaseScale>(scale: T) {
  return Object.entries(scale).reduce((out: CssValueMap<keyof T>, [key, entry]: [keyof T, ScaleEntry]) => {
    out[key as keyof CssValueMap<keyof T>] = entry.ref
    return out
  }, {} as CssValueMap<keyof T>)
}
