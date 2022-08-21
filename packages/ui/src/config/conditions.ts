import { BASE } from "./styles.models"

const sm = "395.9987654321"
const md = "659.9987654321"
const lg = "999.9987654321"
const xl = "1299.9987654321"
const unit = "px"

export const responsiveConditionsMap = {
  sm: `screen and (max-width: ${sm}${unit})`,
  md: `screen and (max-width: ${md}${unit})`,
  lg: `screen and (max-width: ${lg}${unit})`,
  xl: `screen and (max-width: ${xl}${unit})`,
} as const

export type ResponsiveCondition = keyof typeof responsiveConditionsMap
export const responsiveConditionsPriority = {
  sm: 0,
  md: 1,
  lg: 2,
  xl: 3,
  [BASE]: 4,
} as const

export const conditionsMap = {
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
  ...responsiveConditionsMap,

  contrast: "(prefers-contrast: more)",
  motion: "(prefers-reduced-motion)",
  data: "(prefers-reduced-data)",
  touch: "(hover: none)",
  pointer: "(hover: hover) and (pointer: fine)",
  tv: "(hover: hover) and (pointer: coarse)",

  "!contrast": !"(prefers-contrast: more)",
  "!motion": !"(prefers-reduced-motion)",
  "!data": !"(prefers-reduced-data)",
  "!touch": !"(hover: none)",
  "!pointer": !"(hover: hover) and (pointer: fine)",
  "!tv": !"(hover: hover) and (pointer: coarse)",

  light: "COLOR_MODE === light",
  dark: "COLOR_MODE === dark",

  debug: "debugmode",
} as const

export const conditionKeys = Object.keys(conditionsMap) as Array<keyof typeof conditionsMap>

/**
 * GLOBAL STYLES
 * - For `html` and `body` styles, just treat those as any other component,
 *   based on what the framework in question would allow.
 * - For other kinds of global styles (e.g., `:root`), users can rely on plain
 *   CSS, vanilla-extract, etc. This also applies for `html`/`body`.
 */
