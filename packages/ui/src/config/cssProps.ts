/**
 * NOTES:
 * Use `InlineStart` as left, and `InlineEnd` as right, instead of RTL "magic"
 * Use `border-start-start-radius` (etc) for radii
 *
 * Create a global style for `[dir]` that sets the `direction: ___;` css property
 *
 * Convert padding, marging, and other shorthand props (border, etc) to their
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

  animation: true,

  transition: true,

  opacity: true,
} as const

// These props use predefined scales
export const scaledProps = {
  outline: true, // outline (combos) // Spreads into multiple CSS properties
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

  animation: true, // animation (combos) // Spreads into multiple CSS properties
} as const

export const staticProps = {
  all: true,

  position: true,
  display: true,
  visibility: true,
  opacity: true, // 2 common values: [0, 1]

  cursor: true,
  pointerEvents: true,

  boxSizing: true,

  resize: true,

  outlineStyle: true,

  borderBlockStartStyle: true,
  borderBlockEndStyle: true,
  borderInlineStartStyle: true,
  borderInlineEndStyle: true,

  borderCollapse: true,

  flexDirection: true,
  flexFlow: true,
  flexWrap: true,
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

  textAlign: true,
  verticalAlign: true,

  listStyle: true,
  listStyleImage: true,
  listStylePosition: true,
  listStyleType: true,

  filter: true,

  scrollSnapAlign: true,
  scrollSnapType: true,
} as const

export const mappedProps = {
  height: true,
  width: true,
  minHeight: true,
  minWidth: true,
  maxHeight: true,
  maxWidth: true,

  margin: true,
  marginBottom: true,
  marginLeft: true,
  marginRight: true,
  marginTop: true,

  padding: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,

  bottom: true,
  top: true,
  left: true,
  right: true,

  border: true,
  borderColor: true,
  borderStyle: true,
  borderWidth: true,

  borderBlock: true,
  borderBlockColor: true,
  borderBlockStyle: true,
  borderBlockWidth: true,

  borderInline: true,
  borderInlineColor: true,
  borderInlineStyle: true,
  borderInlineWidth: true,

  borderTop: true,
  borderTopColor: true,
  borderTopStyle: true,
  borderTopWidth: true,

  borderBottom: true,
  borderBottomColor: true,
  borderBottomStyle: true,
  borderBottomWidth: true,

  borderLeft: true,
  borderLeftColor: true,
  borderLeftStyle: true,
  borderLeftWidth: true,

  borderRight: true,
  borderRightColor: true,
  borderRightStyle: true,
  borderRightWidth: true,

  borderRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,

  gap: true,

  wordWrap: true,
}

// Only these props should have interactive state classes/vars generated for them
// :hover
// :focus
// :focus-within
// :focus-visible
// :active
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
// :odd           // nth-child(odd),
// :first         // first-child,
// :last          // last-child,
// :first-of-type // first-of-type,
// :last-of-type  // last-of-type,
// MAYBE nth-child(even) (can treat default as even, and override ONLY odds)
// MAYBE: only-child, only-of-type (achievable with first + last combined)
// MAYBE: empty (probably best handled in JS)
// MAYBE: nth-child, nth-last-child, nth-of-type, nth-last-of-type (API??)
// MAYBE: target, target-within, visited
// + 41
export const structuralClassProps = {
  ...actionStateProps,
  display: true,
  visibility: true,

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

  verticalAlign: true,
  textAlign: true,
  textOverflow: true,
}

// NOTE: If you add a prop here, remember to add it to `directionalProps` too, if it's LTR/RTL directional
export const props = [
  // ORDERED //
  "display",

  "height",
  "width",

  "inlineSize",
  "minInlineSize",
  "maxInlineSize",
  "blockSize",
  "minBlockSize",
  "maxBlockSize",

  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "marginBlockStart",
  "marginBlockEnd",
  "marginInlineStart",
  "marginInlineEnd",

  "padding",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBlockStart",
  "paddingBlockEnd",
  "paddingInlineStart",
  "paddingInlineEnd",

  "position",

  "backgroundColor",
  "background",

  "minHeight",
  "minWidth",
  "maxHeight",
  "maxWidth",

  "bottom",
  "top",
  "left",
  "right",
  "insetBlockStart",
  "insetBlockEnd",
  "insetInlineStart",
  "insetInlineEnd",

  "color",

  "font",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",

  "border",
  "borderColor",
  "borderStyle",
  "borderWidth",

  "borderBlock",
  "borderBlockColor",
  "borderBlockStyle",
  "borderBlockWidth",
  "borderInline",
  "borderInlineColor",
  "borderInlineStyle",
  "borderInlineWidth",

  "borderTop",
  "borderTopColor",
  "borderTopStyle",
  "borderTopWidth",
  "borderBlockStart",
  "borderBlockStartColor",
  "borderBlockStartStyle",
  "borderBlockStartWidth",

  "borderBottom",
  "borderBottomColor",
  "borderBottomStyle",
  "borderBottomWidth",
  "borderBlockEnd",
  "borderBlockEndColor",
  "borderBlockEndStyle",
  "borderBlockEndWidth",

  "borderLeft",
  "borderLeftColor",
  "borderLeftStyle",
  "borderLeftWidth",
  "borderInlineStart",
  "borderInlineStartColor",
  "borderInlineStartStyle",
  "borderInlineStartWidth",

  "borderRight",
  "borderRightColor",
  "borderRightStyle",
  "borderRightWidth",
  "borderInlineEnd",
  "borderInlineEndColor",
  "borderInlineEndStyle",
  "borderInlineEndWidth",

  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderStartStartRadius",
  "borderStartEndRadius",
  "borderEndEndRadius",
  "borderEndStartRadius",

  "opacity",
  "visibility",

  "overflow",
  "overflowX",
  "overflowY",

  "outline",
  "outlineColor",
  "outlineOffset",
  "outlineStyle",
  "outlineWidth",

  "zIndex",

  "transition",

  "transform",

  "textAlign",
  "verticalAlign",

  "alignItems",
  "justifyContent",

  "boxShadow",

  "cursor",

  "flex",
  "flexBasis",
  "flexDirection",
  "flexFlow",
  "flexGrow",
  "flexShrink",
  "flexWrap",

  "gap", // SPREAD into row gap & column gap
  "rowGap",
  "columnGap",

  "gridArea",
  "gridAutoRows",
  "gridAutoColumns",
  "gridAutoFlow",
  "gridRow",
  "gridColumn",
  "gridTemplate", // UTIL: gt // Check for line-breaks; throw error if they're found (only row/col syntax supported)
  // NOTE: Only join if BOTH are set, below, because it's inefficient to set `none/{COLS}` for just columns
  "gridTemplateRows", // UTIL: gtRows // If BOTH rows + cols are set, then JOIN into gt
  "gridTemplateColumns", // UTIL: gtColumns // If BOTH rows + cols are set, then JOIN into gt
  "gridTemplateAreas", // UTIL: gtAreas

  "whiteSpace",

  "pointerEvents",

  "animation",

  "lineHeight",

  "alignSelf",
  "justifySelf",
  "alignContent",
  "justifyItems",

  "listStyle",
  "listStyleImage",
  "listStylePosition",
  "listStyleType",

  "resize",

  "textOverflow",
  "textTransform",
  "textDecoration",
  "textUnderlineOffset",

  "letterSpacing",
  "wordSpacing",
  "wordBreak",
  "overflowWrap",
  "wordWrap", // Alias for "overflowWrap"

  "fill",
  "stroke",

  "transformOrigin",

  "borderCollapse",
  "borderSpacing",

  "filter",

  "textShadow",

  "all",

  "backgroundBlendMode",

  "boxSizing",

  "borderBlockStartImage",
  "borderBlockEndImage",
  "borderInlineStartImage",
  "borderInlineEndImage",

  "caretColor",
  "columnRuleColor",

  "scrollSnapAlign",
  "scrollSnapType",

  "writingMode",

  // FOR FUTURE CONSIDERATION
  // "quotes",

  // "transitionDelay",
  // "transitionDuration",
  // "transitionProperty",
  // "transitionTimingFunction",

  // "transformStyle",

  // "textDecorationColor",
  // "textDecorationLine",
  // "textDecorationStyle",
  // "textDecorationThickness",
  // "textEmphasis",
  // "textIndent",
  // "textOrientation",

  // "grid", // UNSUPPORTED
  // "gridColumnEnd", // Skip
  // "gridColumnStart", // Skip
  // "gridRowEnd", // Skip
  // "gridRowStart", // Skip

  // "offset", // NICE-TO-HAVE
  // "offsetAnchor", // EXPERIMENTAL
  // "offsetPosition", // EXPERIMENTAL
  // "textJustify",
  // "textUnderlinePosition",
]

// IDEA: When these directional values get processed, maybe cache values that have been processed already (per property), to avoid having to recalculate them. Those values should be the same universally, so no need for React-centric memo overhead: just store them in an object.
// NOTE: A lot of these should just get converted into INLINE (and BLOCK, for consistency)
// props instead; that way, we actually don't even need any additional RTL breakpoints for them.
export const directionalProps = {
  //// simpleDirectionalShorthands
  float: true,
  justifyContent: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  justifyItems: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  justifySelf: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  textAlign: true, // Don't include `left`/`right` in type def; convert to `start`/`end`.

  //// backgroundShorthand
  background: true,

  //// positionOffsetShorthands
  backgroundPosition: true,
  // offsetAnchor: true,
  // offsetPosition: true,

  // DEPRECATED //
  // marginLeft: true, // INLINE
  // marginRight: true, // INLINE
  // paddingLeft: true, // INLINE
  // paddingRight: true, // INLINE

  // borderBottomLeftRadius: true, // INLINE
  // borderBottomRightRadius: true, // INLINE
  // borderLeft: true, // INLINE
  // borderRight: true, // INLINE
  // borderLeftColor: true, // INLINE
  // borderRightColor: true, // INLINE
  // borderLeftStyle: true, // INLINE
  // borderRightStyle: true, // INLINE
  // borderLeftWidth: true, // INLINE
  // borderRightWidth: true, // INLINE
  // borderTopLeftRadius: true, // INLINE
  // borderTopRightRadius: true, // INLINE
  // left: true, // INLINE
  // right: true, // INLINE

  //// quadOrthogonalShorthands
  // padding: true, // INLINE
  // margin: true, // INLINE
  // borderStyle: true, // INLINE + SPREAD
  // borderWidth: true, // INLINE + SPREAD
  // borderColor: true, // INLINE + SPREAD
  //// quadDiagonalShorthands
  // borderRadius: true, // INLINE + SPREAD

  //// animationOffsetShorthands
  // offset: true, // NICE-TO-HAVE

  //// OTHER
  // gridTemplateColumns: true, // Browser auto converts this for RTL!
}

export const conditionNames = ["phone", "phablet", "<tablet", "tablet", "<laptop", "laptop", "desktop"]
