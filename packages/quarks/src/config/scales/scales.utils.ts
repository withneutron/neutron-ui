import { addPrefix } from "../utils"
import { ThemePropValue, ScaleEntry, BaseVars, CssValueMap, PrefixedKey, CssValueMapProps } from "./scales.models"

/** Converts a set of vars to CSS values (i.e., using the var set's `ref` as a value) */
export function getCssMapFromVars<T extends BaseVars>(vars: T) {
  const entries: [keyof T, ScaleEntry][] = Object.entries(vars)
  return entries.reduce((out: Record<keyof T, string>, [key, entry]: [keyof T, ScaleEntry]) => {
    out[key] = entry.ref
    return out
  }, {} as Record<keyof T, string>)
}

/** Converts a CSS map to theme tokens */
export function getThemePropsFromCssMap<T extends CssValueMap>(vars: T) {
  const keys = Object.keys(vars)
  return keys.reduce((out, key) => {
    key = addPrefix(String(key))
    out[key as keyof typeof out] = key
    return out
  }, {} as Record<PrefixedKey<T>, ThemePropValue>)
}

/** Extracts CSS prop names from a CSS map */
export function getPropsFromCssMap<T extends CssValueMap>(vars: T) {
  // return vars as any
  const keys = Object.keys(vars)
  return keys.reduce((out, key) => {
    const source = vars[key]
    key = addPrefix(String(key))
    out[key as keyof typeof out] = typeof source === "string" ? null : Object.entries(source)
    return out
  }, {} as CssValueMapProps<T>)
}
