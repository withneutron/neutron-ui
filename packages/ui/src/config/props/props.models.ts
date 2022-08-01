import { sourceProps } from "./sourceProps"
import { CssValue } from "../scales"
import { THEME_PREFIX } from "../utils/style.utils"

// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
export type CustomString = string & { trim?: () => string }

export type PseudoClass = Record<string, string | string[]>

type Scale = { [key: string | number]: string | Record<string | number, CssValue> }
export type KeysFromScale<T extends Scale> = `${typeof THEME_PREFIX}${keyof Omit<T, symbol>}` | CustomString

export type CssRule = Record<string, string | number>
export type CssClassDef = {
  [classHash: string]: CssRule
}

export type CssValueRules<S extends Record<string | number, CssValue>> = Record<keyof S, CssClassDef>

export type CssPropKey = keyof typeof sourceProps

/** SCALE KEY EXAMPLE **
const size = {
  1: "var(--1)",
  2: "var(--2)",
  4: "var(--4)",
  8: "var(--8)",
  12: "var(--12)",
} as const

type Padding = KeysFromScale<typeof size>

const p: Padding = "$12"
/* */
