/**
 * NOTES:
 * Use `InlineStart` as left, and `InlineEnd` as right, instead of RTL "magic"
 * Use `border-start-start-radius` (etc) for radii
 *
 * Create a global style for `[dir]` that sets the `direction: ___;` css property
 *
 * Convert padding, marging, and other 4-directional props (border, etc) to their
 * 4 directional counterparts, in the resolver, to reduce number of classes we generate.
 *
 * Make sure `unset`, `initial`, `revert`, and `inherit` values are available to any props that
 * can use them; they could be used to emulate inverted breakpoints.
 */

// These props have CSS vars for allowing infinite possible values
export const customVarProps = {
  background: true, // Scaled color values get routed to `backgroundColor` instead
  backgroundColor: true,
  backgroundBlendMode: true,

  borderBlockStartImage: true,
  borderBlockEndImage: true,
  borderInlineStartImage: true,
  borderInlineEndImage: true,

  borderSpacing: true,

  color: true,
  fill: true,
  stroke: true,

  caretColor: true,
  columnRuleColor: true,

  font: true,
  textDecoration: true,
  textShadow: true,

  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,

  gridTemplate: true,
  gridTemplateRows: true,
  gridTemplateColumns: true,
  gridTemplateAreas: true,
  gridArea: true,
  gridRow: true,
  gridColumn: true,
  gridAutoRows: true,
  gridAutoColumns: true,

  transform: true,
  transformOrigin: true,

  transition: true,

  animation: true,

  opacity: true,
} as const

// These props use predefined scales
export const scaledProps = {
  outline: true, // outline (combos)
  outlineWidth: true, // outline (widths)
  outlineColor: true, // outline (colors)
  outlineOffset: true, // outline (offsets)

  borderBlockStart: true, // border (combos)
  borderBlockEnd: true, // border (combos)
  borderInlineStart: true, // border (combos)
  borderInlineEnd: true, // border (combos)

  borderBlockStartColor: true, // border (colors)
  borderBlockEndColor: true, // border (colors)
  borderInlineStartColor: true, // border (colors)
  borderInlineEndColor: true, // border (colors)

  borderBlockStartWidth: true, // border (widths)
  borderBlockEndWidth: true, // border (widths)
  borderInlineStartWidth: true, // border (widths)
  borderInlineEndWidth: true, // border (widths)

  flexBasis: true, // size

  inlineSize: true, // size // WIDTH
  minInlineSize: true, // size
  maxInlineSize: true, // size
  blockSize: true, // size // HEIGHT
  minBlockSize: true, // size
  maxBlockSize: true, // size

  // gridTemplateRows: true, // Probably not useful enough. Instead, use...
  gridAutoRows: true, // row // UTIL: rows
  gridTemplateColumns: true, // column // UTIL: cols

  columnGap: true, // space
  rowGap: true, // space

  marginBlockStart: true, // space // TOP
  marginBlockEnd: true, // space // BOTTOM
  marginInlineStart: true, // space // LEFT
  marginInlineEnd: true, // space // RIGHT

  paddingBlockStart: true, // space // TOP
  paddingBlockEnd: true, // space // BOTTOM
  paddingInlineStart: true, // space // LEFT
  paddingInlineEnd: true, // space // RIGHT

  scrollMarginBlockStart: true, // space // TOP
  scrollMarginBlockEnd: true, // space // BOTTOM
  scrollMarginInlineStart: true, // space // LEFT
  scrollMarginInlineEnd: true, // space // RIGHT

  scrollPaddingBlockStart: true, // space // TOP
  scrollPaddingBlockEnd: true, // space // BOTTOM
  scrollPaddingInlineStart: true, // space // LEFT
  scrollPaddingInlineEnd: true, // space // RIGHT

  insetBlockStart: true, // space // TOP
  insetBlockEnd: true, // space // BOTTOM
  insetInlineStart: true, // space // LEFT
  insetInlineEnd: true, // space // RIGHT

  borderStartStartRadius: true, // radius // TOP_LEFT
  borderStartEndRadius: true, // radius // TOP_RIGHT
  borderEndEndRadius: true, // radius // BOTTOM_RIGHT
  borderEndStartRadius: true, // radius // BOTTOM_LEFT

  backgroundColor: true, // (core) color // Scaled color values from `background` get routed to this instead

  color: true, // (core) color
  fill: true, // (core) color
  stroke: true, // (core) color

  caretColor: true, // (core) color
  columnRuleColor: true, // (core) color

  font: true, // font
  fontFamily: true, // fontFamily
  fontSize: true, // fontSize
  fontWeight: true, // fontWeight

  textDecoration: true, // textDecoration

  lineHeight: true, // lineHeight
  letterSpacing: true, // typeSpace
  wordSpacing: true, // typeSpace
  textUnderlineOffset: true, // typeSpace

  zIndex: true, // zIndex

  boxShadow: true, // shadow
} as const

export const staticProps = {
  all: true,

  opacity: true, // 2 common values: [0, 1]

  outlineStyle: true,

  borderBlockStartStyle: true,
  borderBlockEndStyle: true,
  borderInlineStartStyle: true,
  borderInlineEndStyle: true,

  borderCollapse: true,

  flexGrow: true, // Static low values (0 – 6)
  flexShrink: true, // Static low values (0 – 6)

  gridAutoFlow: true,

  alignContent: true, // Strip `flex-`.
  alignItems: true, // Strip `flex-`.
  alignSelf: true, // Strip `flex-`.
  justifyContent: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  justifyItems: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  justifySelf: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.

  writingMode: true,

  fontStyle: true,

  textOverflow: true,
  textTransform: true,

  overflow: true,
  overflowY: true,
  overflowX: true,

  whiteSpace: true,

  wordBreak: true,
  overflowWrap: true,
}

// Only these props should have interactive state classes/vars generated for them
// :hover         // hover
// :focus         // focus
// :focusWithin   // focus-within
// :focusVisible  // focus-visible
// :active        // active/.active,
// 26
export const actionStateProps = {
  animation: true,

  boxShadow: true,

  outline: true,
  outlineColor: true,

  borderBlockStart: true,
  borderBlockEnd: true,
  borderInlineStart: true,
  borderInlineEnd: true,

  borderBlockStartColor: true,
  borderBlockEndColor: true,
  borderInlineStartColor: true,
  borderInlineEndColor: true,

  background: true,
  backgroundColor: true,
  backgroundBlendMode: true,

  color: true,
  fill: true,
  stroke: true,

  caretColor: true,
  columnRuleColor: true,

  textDecoration: true,
  textShadow: true,

  transform: true,
  transformOrigin: true,

  transition: true,

  opacity: true,
}

// Only these props should have disabled state classes/vars generated for them
// :disabled  //.disabled/[disabled]
// +1
export const disabledStateProps = {
  ...actionStateProps,
  pointerEvents: true,
}

// Only these props should have structural pseudo-classes
// :odd     // nth-child(odd),
// :first   // first-of-type,
// :last    // last-of-type,
// MABYE: first-child, (can probably just do "of-type" in most cases)
// MABYE: last-child, (can probably just do "of-type" in most cases)
// MAYBE nth-child(even) (can treat default as even, and override ONLY odds)
// MAYBE: only-child, only-of-type (achievable with first + last combined)
// MAYBE: empty (probably best handled in JS)
// MAYBE: nth-child, nth-last-child, nth-of-type, nth-last-of-type (API??)
// MAYBE: target, target-within, visited
// + 38
export const structuralClassProps = {
  ...actionStateProps,
  borderStartStartRadius: true,
  borderStartEndRadius: true,
  borderEndEndRadius: true,
  borderEndStartRadius: true,

  borderBlockStartWidth: true,
  borderBlockEndWidth: true,
  borderInlineStartWidth: true,
  borderInlineEndWidth: true,

  outlineWidth: true,

  marginBlockStart: true,
  marginBlockEnd: true,
  marginInlineStart: true,
  marginInlineEnd: true,

  paddingBlockStart: true,
  paddingBlockEnd: true,
  paddingInlineStart: true,
  paddingInlineEnd: true,

  insetBlockStart: true,
  insetBlockEnd: true,
  insetInlineStart: true,
  insetInlineEnd: true,

  inlineSize: true,
  minInlineSize: true,
  maxInlineSize: true,
  blockSize: true,
  minBlockSize: true,
  maxBlockSize: true,

  alignContent: true,
  alignItems: true,
  alignSelf: true,
  justifyContent: true,
  justifyItems: true,
  justifySelf: true,

  overflow: true,
  overflowY: true,
  overflowX: true,

  textAlign: true,
  textOverflow: true,
}

// NOTE: If you add a prop here, remember to add it to `directionalProps` too, if it's LTR/RTL directional
// NOTE: Ignore defauts?? Maybe not: the issue would be if someone globally changes the default, and wants to override it in specific cases.
export const props = [
  // ORDERED //
  "display",

  "height",
  "width",

  "margin",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "margin-top",

  "padding",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "padding-top",

  "position",

  "background-color",
  "background",

  "min-height",
  "min-width",
  "max-height",
  "max-width",

  "bottom",
  "top",
  "left",
  "right",

  "color",

  "font",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",

  "border",
  "border-color",
  "border-style",
  "border-width",

  "border-block",
  "border-block-color",
  "border-block-style",
  "border-block-width",
  "border-inline",
  "border-inline-color",
  "border-inline-style",
  "border-inline-width",

  "border-top",
  "border-top-color",
  "border-top-style",
  "border-top-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",

  "border-bottom",
  "border-bottom-color",
  "border-bottom-style",
  "border-bottom-width",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",

  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",

  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",

  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-start-start-radius",
  "border-start-end-radius",
  "border-end-end-radius",
  "border-end-start-radius",

  "opacity",
  "visibility",

  "overflow",
  "overflow-x",
  "overflow-y",

  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",

  "z-index",

  "transition",

  "transform",

  "text-align",
  "vertical-align",

  "align-items",
  "justify-content",

  "box-shadow",

  "cursor",

  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",

  "gap", // SPREAD into row gap & column gap
  "row-gap",
  "column-gap",

  "grid-area",
  "grid-auto-rows",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-row",
  "grid-column",
  "grid-template", // UTIL: gt // Check for line-breaks; throw error if they're found (only row/col syntax supported)
  // NOTE: Only join if BOTH are set, below, because it's inefficient to set `none/{COLS}` for just columns
  "grid-template-rows", // UTIL: gtRows // If BOTH rows + cols are set, then JOIN into gt
  "grid-template-columns", // UTIL: gtColumns // If BOTH rows + cols are set, then JOIN into gt
  "grid-template-areas", // UTIL: gtAreas

  "white-space",

  "pointer-events",

  "animation",

  "line-height",

  "align-self",
  "justify-self",
  "align-content",
  "justify-items",

  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",

  "resize",

  "text-overflow",
  "text-transform",
  "text-decoration",
  "text-underline-offset",

  "letter-spacing",
  "word-spacing",
  "word-break",
  "overflow-wrap",
  "word-wrap", // Alias for "overflow-wrap"

  "transform-origin",

  "border-collapse",
  "border-spacing",

  "filter",

  "text-shadow",

  "all",

  "background-blend-mode",

  "box-sizing",

  // "quotes",

  // "transition-delay",
  // "transition-duration",
  // "transition-property",
  // "transition-timing-function",

  // "transform-style",

  // "text-decoration-color",
  // "text-decoration-line",
  // "text-decoration-style",
  // "text-decoration-thickness",
  // "text-emphasis",
  // "text-indent",
  // "text-orientation",

  // "grid", // UNSUPPORTED
  // "grid-column-end", // Skip
  // "grid-column-start", // Skip
  // "grid-row-end", // Skip
  // "grid-row-start", // Skip

  // "offset", // NICE-TO-HAVE
  // "offset-anchor", // EXPERIMENTAL
  // "offset-position", // EXPERIMENTAL
  // "text-justify",
  // "text-underline-position",
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
  "justify-content": true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  "justify-items": true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  "justify-self": true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  "text-align": true, // Don't include `left`/`right` in type def; convert to `start`/`end`.

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
