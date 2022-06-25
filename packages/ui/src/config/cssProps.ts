// Use `InlineStart` as left, and `InlineEnd` as right, instead of RTL "magic"
// Use `border-start-start-radius` (etc) for radii

// Create a global style for `[dir]` that sets the `direction: ___;` css property

// Convert padding, marging, and other 4-directional props (border, etc) to their
// 4 directional counterparts, in the resolver, to reduce number of classes we generate.

// Make sure `unset`, `initial`, and `inherit` values are available to any props that
// can use them; they could be used to emulate inverted breakpoints.

/**
 * IMPORTANT: There are way too many color values, so we should:
 *  * Have ALL color props use CSS vars — no predefined, static classes per-value!
 *  * Convert border colors to shorthand, using `transparent` or `unset` (fewer var injections in markup).
 *  * Same with `transition` props.
 */

// 23
export const customVarProps = {
  background: true, // CSS var // Static color values get converted to `backgroundColor`

  /** HOW TO HANDLE BORDERS PROPS:
   *  1. Shorthands get duplicated into their 4 directional values, using RTL-friendly props.
   *  2. All props get defined in CSS in order of specificity, starting with `border` as most generic; then `borderImage`, `borderColor` (etc) as more specific shorthands; then the directional props.
   *  3. Directional props from the user override values set via duplication of the shorthand. NOTE: this should be the case EVEN IF the shorthand gets passed AFTER the directional props.
   *  4. To help with cases like #3, we keep a `styledProps` object (`Record<string, boolean>`), to track which props have already been styled. So let's say the user passes `borderLeft`, then `border`: the value of `borderLeft` should remain unchanged (because of specificity), but the values of the other 3 directional props should be set based on `border`.
   */
  borderBlockStartImage: true, // CSS var
  borderBlockEndImage: true, // CSS var
  borderInlineStartImage: true, // CSS var
  borderInlineEndImage: true, // CSS var

  borderSpacing: true, // CSS var

  caretColor: true, // (core) color + CSS var
  color: true, // (core) color + CSS var
  columnRuleColor: true, // (core) color + CSS var

  outline: true, // outline (combos) + CSS var // Can't really spread if they use CSS vars

  fill: true, // CSS var
  stroke: true, // CSS var
  textDecorationColor: true, // CSS var

  gridTemplate: true, // CSS var            // CANNOT be set directly with our system. Instead...
  // gridTemplateRows: true, // CSS var     // Convert `gridTemplateRows`
  // gridTemplateColumns: true, // CSS var  //     and `gridTemplateColumns` into `gridTemplate`...
  gridTemplateAreas: true, // CSS var       // But keep `gridTemplateAreas` by itself.
  gridArea: true, // CSS var
  gridRow: true, // CSS var
  gridColumn: true, // CSS var
  gridAutoRows: true, // CSS var
  gridAutoColumns: true, // CSS var

  transform: true, // CSS var
  transformOrigin: true, // CSS var

  transition: true, // CSS var

  animation: true, // CSS var

  flexGrow: true, // Static low values (1-6) + CSS var
  flexShrink: true, // Static low values (1-6) + CSS var

  opacity: true,
} as const

// 47
export const scaledProps = {
  backgroundColor: true, // (core) color

  outlineWidth: true, // outline (sizes)
  outlineStyle: true, // Static keywords
  outlineColor: true, // outline (colors)
  outlineOffset: true, // outline (offsets)

  borderStartStartRadius: true, // radius // TOP_LEFT
  borderStartEndRadius: true, // radius // TOP_RIGHT
  borderEndEndRadius: true, // radius // BOTTOM_RIGHT
  borderEndStartRadius: true, // radius // BOTTOM_LEFT

  borderBlockStart: true, // border (combos)
  borderBlockEnd: true, // border (combos)
  borderInlineStart: true, // border (combos)
  borderInlineEnd: true, // border (combos)

  borderBlockStartColor: true, // border (colors)
  borderBlockEndColor: true, // border (colors)
  borderInlineStartColor: true, // border (colors)
  borderInlineEndColor: true, // border (colors)

  borderBlockStartStyle: true, // Static keywords
  borderBlockEndStyle: true, // Static keywords
  borderInlineStartStyle: true, // Static keywords
  borderInlineEndStyle: true, // Static keywords

  borderBlockStartWidth: true, // border (sizes)
  borderBlockEndWidth: true, // border (sizes)
  borderInlineStartWidth: true, // border (sizes)
  borderInlineEndWidth: true, // border (sizes)

  borderCollapse: true, // Static borderCollapse keywords

  columnGap: true, // space
  rowGap: true, // space

  marginBlockStart: true, // space // TOP
  marginBlockEnd: true, // space // BOTTOM
  marginInlineStart: true, // space // LEFT
  marginInlineEnd: true, // space // RIGHT

  scrollMarginBlockStart: true, // space // TOP
  scrollMarginBlockEnd: true, // space // BOTTOM
  scrollMarginInlineStart: true, // space // LEFT
  scrollMarginInlineEnd: true, // space // RIGHT

  paddingBlockStart: true, // space // TOP
  paddingBlockEnd: true, // space // BOTTOM
  paddingInlineStart: true, // space // LEFT
  paddingInlineEnd: true, // space // RIGHT

  scrollPaddingBlockStart: true, // space // TOP
  scrollPaddingBlockEnd: true, // space // BOTTOM
  scrollPaddingInlineStart: true, // space // LEFT
  scrollPaddingInlineEnd: true, // space // RIGHT

  insetBlockStart: true, // space // TOP
  insetBlockEnd: true, // space // BOTTOM
  insetInlineStart: true, // space // LEFT
  insetInlineEnd: true, // space // RIGHT

  font: true, // font (combos) + CSS var
  fontSize: true, // font (sizes)
  fontFamily: true, // font (families)
  fontWeight: true, // font (weights)
  fontStyle: true, // font (styles)

  lineHeight: true, // lineHeight
  letterSpacing: true, // letterSpacing ??
  wordSpacing: true, // ??

  inlineSize: true, // size // WIDTH
  minInlineSize: true, // size
  maxInlineSize: true, // size
  blockSize: true, // size // HEIGHT
  minBlockSize: true, // size
  maxBlockSize: true, // size

  flexBasis: true, // size

  alignContent: true, // Static keywords // Strip `flex-`.
  alignItems: true, // Static keywords // Strip `flex-`.
  alignSelf: true, // Static keywords // Strip `flex-`.
  justifyContent: true, // Static keywords // Don't type `left`/`right`; convert to `start`/`end; strip `flex-`.
  justifyItems: true, // Static keywords // Don't type `left`/`right`; convert to `start`/`end; strip `flex-`.
  justifySelf: true, // Static keywords // Don't type `left`/`right`; convert to `start`/`end; strip `flex-`.

  zIndex: true, // zIndex

  writingMode: true, // Static writingMode keywords

  overflow: true, // Static overflow keywords
  overflowY: true, // Static overflow keywords
  overflowX: true, // Static overflow keywords

  boxShadow: true, // shadow
} as const

// NOTE: If you add a prop here, remember to add it to `directionalProps` too, if it's LTR/RTL directional
// NOTE: Ignore defauts?? Maybe not: the issue would be if someone globally changes the default, and wants to override it in specific cases.
export const props = [
  "align-content",
  "align-items",
  "align-self",
  "all",
  "animation",
  // "animation-delay",
  // "animation-direction",
  // "animation-duration",
  // "animation-fill-mode",
  // "animation-iteration-count",
  // "animation-name",
  // "animation-play-state",
  // "animation-timing-function",
  "background",
  "background-color",
  // "background-attachment",
  // "background-blend-mode",
  // "background-clip",
  // "background-image",
  // "background-origin",
  // "background-position",
  // "background-repeat",
  // "background-size",
  "border",
  "border-color",
  "border-radius",
  "border-style",
  "border-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",

  "border-collapse",
  "border-spacing",

  "bottom",
  "top",
  "left",
  "right",

  "box-shadow",
  "box-sizing",
  "color",
  "cursor",
  "display",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "font",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  // "font-kerning",
  // "font-feature-settings",
  // "font-variant",
  // "font-variant-numeric",

  "gap", // Would get translated to row + column gap
  "row-gap",
  "column-gap",

  // "grid", // UNSUPPORTED
  "grid-area",
  "grid-auto-rows",
  "grid-auto-columns",
  "grid-auto-flow", // Static keywords
  "grid-row",
  "grid-column",
  // "grid-column-end", // Skip
  // "grid-column-start", // Skip
  // "grid-row-end", // Skip
  // "grid-row-start", // Skip

  // "grid-template", // UNSUPPORTED — Used for ROWS/COLUMNS behind the scenes, but can't be set directly
  "grid-template-rows", // UTIL: gtRows
  "grid-template-columns", // UTIL: gtColumns // Browser auto converts this for RTL!
  "grid-template-areas", // UTIL: gtAreas

  "height",
  "width",
  "max-height",
  "max-width",
  "min-height",
  "min-width",

  "justify-content",
  "justify-items",
  "justify-self",

  "letter-spacing",
  "line-height",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "margin-top",
  // "offset", // NICE-TO-HAVE
  // "offset-anchor", // EXPERIMENTAL
  // "offset-position", // EXPERIMENTAL
  "opacity",
  "order",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "padding",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "padding-top",
  "pointer-events",
  "position",
  "quotes",
  "resize",
  "text-align",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-shadow",
  "text-transform",
  "text-underline-position",

  "transform",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "vertical-align",
  "visibility",
  "white-space",
  "word-break",
  "word-spacing",
  "word-wrap",
  "z-index",
]

// IDEA: When these directional values get processed, maybe cache values that have been processed already (per property), to avoid having to recalculate them. Those values should be the same universally, so no need for React-centric memo overhead: just store them in an object.
// NOTE: A lot of these should just get converted into INLINE (and BLOCK, for consistency)
// props instead; that way, we actually don't even need any additional RTL breakpoints for them.
export const directionalProps = {
  // "margin-left": true, // INLINE
  // "margin-right": true, // INLINE
  // "padding-left": true, // INLINE
  // "padding-right": true, // INLINE

  // "border-bottom-left-radius": true, // INLINE
  // "border-bottom-right-radius": true, // INLINE
  // "border-left": true, // INLINE
  // "border-right": true, // INLINE
  // "border-left-color": true, // INLINE
  // "border-right-color": true, // INLINE
  // "border-left-style": true, // INLINE
  // "border-right-style": true, // INLINE
  // "border-left-width": true, // INLINE
  // "border-right-width": true, // INLINE
  // "border-top-left-radius": true, // INLINE
  // "border-top-right-radius": true, // INLINE
  // left: true, // INLINE
  // right: true, // INLINE

  //// quadOrthogonalShorthands
  // padding: true, // INLINE
  // margin: true, // INLINE
  // "border-style": true, // INLINE + SPREAD
  // "border-width": true, // INLINE + SPREAD
  // "border-color": true, // INLINE + SPREAD
  //// quadDiagonalShorthands
  // "border-radius": true, // INLINE + SPREAD

  //// simpleDirectionalShorthands
  float: true,
  "justify-content": true, // Don't type `left`/`right`; convert to `start`/`end; strip `flex-`.
  "justify-items": true, // Don't type `left`/`right`; convert to `start`/`end; strip `flex-`.
  "justify-self": true, // Don't type `left`/`right`; convert to `start`/`end; strip `flex-`.

  //// backgroundShorthand
  background: true,

  //// positionOffsetShorthands
  "background-position": true,
  // "offset-anchor": true,
  // "offset-position": true,

  //// animationOffsetShorthands
  // offset: true, // NICE-TO-HAVE

  //// OTHER
  // "grid-template-columns": true, // Browser auto converts this for RTL!
}

export const conditionNames = ["phone", "phablet", "<tablet", "tablet", "<laptop", "laptop", "desktop"]
