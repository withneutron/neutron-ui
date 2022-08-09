import { pseudoClassAliases, pseudoClasses } from "./props/pseudoClassProps"

export const conditions = {
  ...pseudoClasses,
  ...pseudoClassAliases,
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
  "@s": "screen and (max-width: 395.9987654321px)",
  "@m": "screen and (max-width: 659.9987654321px)",
  "@l": "screen and (max-width: 899.9987654321px)",
  "@xl": "screen and (max-width: 1199.9987654321px)",

  "!s": "screen and (min-width: 395.9987654321px)",
  "!m": "screen and (min-width: 659.9987654321px)",
  "!l": "screen and (min-width: 899.9987654321px)",
  "!xl": "screen and (min-width: 1199.9987654321px)",

  "@highContrast": "(prefers-contrast: more)",
  "@reducedMotion": "(prefers-reduced-motion)",
  "@reducedData": "(prefers-reduced-data)",
  "@touch": "(hover: none)",
  "@pointer": "(hover: hover) and (pointer: fine)",
  "@tv": "(hover: hover) and (pointer: coarse)",

  "!highContrast": !"(prefers-contrast: more)",
  "!reducedMotion": !"(prefers-reduced-motion)",
  "!reducedData": !"(prefers-reduced-data)",
  "!touch": !"(hover: none)",
  "!pointer": !"(hover: hover) and (pointer: fine)",
  "!tv": !"(hover: hover) and (pointer: coarse)",

  "@light": "COLOR_MODE === light",
  "@dark": "COLOR_MODE === dark",
} as const

// Do we want to add a global condition? How can we allow styling of html and body elements?
// We could do it with predefined styles for all props in each of these, and use CSS vars to set those values.
// BUT... is assigning those vars inline in <html> any easier/more effective than just styling that with classes,
// like any other element? I.e., frameworks that make accessing <html> difficult will be problematic, either way.
