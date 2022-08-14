const sm = "395.9987654321px"
const md = "659.9987654321px"
const lg = "999.9987654321px"
const xl = "1299.9987654321px"

export const conditions = {
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
  "@sm": `screen and (max-width: ${sm})`,
  "@md": `screen and (max-width: ${md})`,
  "@lg": `screen and (max-width: ${lg})`,
  "@xl": `screen and (max-width: ${xl})`,

  "!sm": `screen and (min-width: ${sm})`,
  "!md": `screen and (min-width: ${md})`,
  "!lg": `screen and (min-width: ${lg})`,
  "!xl": `screen and (min-width: ${xl})`,

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

/**
 * GLOBAL STYLES
 * - For `html` and `body` styles, just treat those as any other component,
 *   based on what the framework in question would allow.
 * - For other kinds of global styles (e.g., `:root`), users can rely on plain
 *   CSS, vanilla-extract, etc. This also applies for `html`/`body`.
 */
