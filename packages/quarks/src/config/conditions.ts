import { ColorMode } from "../shared/models"
import { BASE } from "./styles.models"

const sm = 495.9987654321
const md = 799.9987654321
const lg = 1359.9987654321
const xl = 1899.9987654321
const unit = "rem"
const unitModifier = 0.0625

export function getQueryFromBreakpoint(breakpoint: number) {
  return `screen and (max-width: ${breakpoint * unitModifier}${unit})`
}

export const responsiveConditionsMap = {
  sm: getQueryFromBreakpoint(sm),
  md: getQueryFromBreakpoint(md),
  lg: getQueryFromBreakpoint(lg),
  xl: getQueryFromBreakpoint(xl),
} as const

export type ResponsiveCondition = keyof typeof responsiveConditionsMap
export type BreakpointOverrides = { [k in ResponsiveCondition]?: number }

export const responsiveConditionsPriority = {
  sm: 0,
  md: 1,
  lg: 2,
  xl: 3,
  [BASE]: 4,
} as const

export const queryConditionsMap = {
  ...responsiveConditionsMap,

  hightContrast: "(prefers-contrast: more)",
  lowMotion: "(prefers-reduced-motion)",
  lowData: "(prefers-reduced-data)",
  touch: "(hover: none)",
  pointer: "(hover: hover) and (pointer: fine)",
  tv: "(hover: hover) and (pointer: coarse)",
} as const

export type QueryConditions = Record<keyof typeof queryConditionsMap, boolean>

export const directionalConditions = {
  ltr: true,
  rtl: true,
} as const

/** Internationalized reading direction */
export type Direction = keyof typeof directionalConditions

export const conditionsMap = {
  ...directionalConditions,

  light: "COLOR_MODE === light",
  dark: "COLOR_MODE === dark",

  debug: "debugmode",

  /**
   * For all conditions below, create a `ConditionsContext` at our base provider,
   * which tracks all these conditions centrally. That avoids us repeating queries
   * all over the place, at a component-level.
   *
   * Track via `window.matchMedia`, as it's much faster.
   *
   * We default to DESKTOP-FIRST, because mobile is commonly neglected in UI dev,
   * so devs will often be coming to this from desktop styles being done (without
   * conditions), and needing to style ONLY for smaller screens. This approach
   * facilitates that, by not forcing them to touch existing styles,
   * only add new ones.
   */
  ...queryConditionsMap,

  "!hightContrast": "(prefers-contrast: more)",
  "!lowMotion": "(prefers-reduced-motion)",
  "!lowData": "(prefers-reduced-data)",
  "!touch": "(hover: none)",
  "!pointer": "(hover: hover) and (pointer: fine)",
  "!tv": "(hover: hover) and (pointer: coarse)",
} as const

export type ConditionKeys = keyof typeof conditionsMap
export const conditionKeys = Object.keys(conditionsMap) as Array<ConditionKeys>

export function mapConditions(
  conditions: QueryConditions,
  colorMode: ColorMode,
  debug = false,
  direction: Direction = "ltr"
) {
  return {
    ...conditions,

    ltr: direction === "ltr",
    rtl: direction === "rtl",

    "!hightContrast": !conditions.hightContrast,
    "!lowMotion": !conditions.lowMotion,
    "!lowData": !conditions.lowData,
    "!touch": !conditions.touch,
    "!pointer": !conditions.pointer,
    "!tv": !conditions.tv,

    light: colorMode === "light",
    dark: colorMode === "dark",

    debug,
  } as const
}

export enum ConditionCategory {
  locale = "locale",
  responsive = "responsive",
  preference = "preference",
  device = "device",
  colorMode = "colorMode",
  debug = "debug",
}

export const ConditionCategories: { [k in ConditionKeys]: ConditionCategory } = {
  ltr: ConditionCategory.locale,
  rtl: ConditionCategory.locale,
  sm: ConditionCategory.responsive,
  md: ConditionCategory.responsive,
  lg: ConditionCategory.responsive,
  xl: ConditionCategory.responsive,
  hightContrast: ConditionCategory.preference,
  lowMotion: ConditionCategory.preference,
  lowData: ConditionCategory.preference,
  "!hightContrast": ConditionCategory.preference,
  "!lowMotion": ConditionCategory.preference,
  "!lowData": ConditionCategory.preference,
  touch: ConditionCategory.device,
  pointer: ConditionCategory.device,
  tv: ConditionCategory.device,
  "!touch": ConditionCategory.device,
  "!pointer": ConditionCategory.device,
  "!tv": ConditionCategory.device,
  light: ConditionCategory.colorMode,
  dark: ConditionCategory.colorMode,
  debug: ConditionCategory.debug,
}

/**
 * GLOBAL STYLES
 * - For `html` and `body` styles, just treat those as any other component,
 *   based on what the framework in question would allow.
 * - For other kinds of global styles (e.g., `:root`), users can rely on plain
 *   CSS, vanilla-extract, etc. This also applies for `html`/`body`.
 */
