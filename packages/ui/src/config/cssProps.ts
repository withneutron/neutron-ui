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
  backgroundPosition: true,
  backgroundImage: true,
  // These are technically remapped, but we want the inline var assignment to only need to
  // include the actual gradient, not the type. This will keep those assignments shorter!
  linearGradient: true, // backgroundImage: `linear-gradient(${v})`
  radialGradient: true, // backgroundImage: `radial-gradient(${v})`
  conicGradient: true, // backgroundImage: `conic-gradient(${v})`

  mask: true,

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
  appearance: true,

  userSelect: true,

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

type PropValue = string | number

/** Map CSS value to one or more keys */
function mapValue(value: PropValue, keys: Array<keyof typeof sourceProps>) {
  return keys.reduce((output, key) => {
    output[key] = value
    return output
  }, {} as Record<string, PropValue>)
}

/** Maps a value to one or more CSS props, possibly changing the value as well */
function getPropMapper(keys: Array<keyof typeof sourceProps>, getValueTemplate: (v: PropValue) => PropValue = v => v) {
  return (value: PropValue) => mapValue(getValueTemplate(value), keys)
}

export const mappedProps = {
  // UTILS
  p: getPropMapper(["padding"]),
  pt: getPropMapper(["paddingTop"]),
  pr: getPropMapper(["paddingRight"]),
  pb: getPropMapper(["paddingBottom"]),
  pl: getPropMapper(["paddingLeft"]),
  px: getPropMapper(["paddingLeft", "paddingRight"]),
  paddingX: getPropMapper(["paddingLeft", "paddingRight"]),
  py: getPropMapper(["paddingTop", "paddingBottom"]),
  paddingY: getPropMapper(["paddingTop", "paddingBottom"]),

  m: getPropMapper(["margin"]),
  mt: getPropMapper(["marginTop"]),
  mr: getPropMapper(["marginRight"]),
  mb: getPropMapper(["marginBottom"]),
  ml: getPropMapper(["marginLeft"]),
  mx: getPropMapper(["marginLeft", "marginRight"]),
  marginX: getPropMapper(["marginLeft", "marginRight"]),
  my: getPropMapper(["marginTop", "marginBottom"]),
  marginY: getPropMapper(["marginTop", "marginBottom"]),

  bg: getPropMapper(["background"]),

  borderX: getPropMapper(["borderInline"]),
  borderY: getPropMapper(["borderBlock"]),

  radius: getPropMapper(["borderRadius"]),
  radiusTop: getPropMapper(["borderStartStartRadius", "borderStartEndRadius"]),
  radiusBottom: getPropMapper(["borderEndEndRadius", "borderEndStartRadius"]),
  radiusLeft: getPropMapper(["borderStartStartRadius", "borderEndStartRadius"]),
  radiusRight: getPropMapper(["borderStartEndRadius", "borderEndEndRadius"]),

  z: getPropMapper(["zIndex"]),

  h: getPropMapper(["height"]),
  w: getPropMapper(["width"]),
  size: getPropMapper(["height", "width"]),

  // These will have custom classes that use --var just like these string templates.
  // linearGradient: getPropMapper(["backgroundImage"], v => `linear-gradient(${v})`),
  // radialGradient: getPropMapper(["backgroundImage"], v => `radial-gradient(${v})`),
  // conicGradient: getPropMapper(["backgroundImage"], v => `conic-gradient(${v})`),

  // Remapped CSS Props
  height: getPropMapper(["blockSize"]),
  width: getPropMapper(["inlineSize"]),
  minHeight: getPropMapper(["minBlockSize"]),
  minWidth: getPropMapper(["minInlineSize"]),
  maxHeight: getPropMapper(["maxBlockSize"]),
  maxWidth: getPropMapper(["maxInlineSize"]),

  margin: getPropMapper(["marginBlockStart", "marginBlockEnd", "marginInlineStart", "marginInlineEnd"]),
  marginBottom: getPropMapper(["marginBlockEnd"]),
  marginLeft: getPropMapper(["marginInlineStart"]),
  marginRight: getPropMapper(["marginInlineEnd"]),
  marginTop: getPropMapper(["marginBlockStart"]),

  padding: getPropMapper(["paddingBlockStart", "paddingBlockEnd", "paddingInlineStart", "paddingInlineEnd"]),
  paddingBottom: getPropMapper(["paddingBlockEnd"]),
  paddingLeft: getPropMapper(["paddingInlineStart"]),
  paddingRight: getPropMapper(["paddingInlineEnd"]),
  paddingTop: getPropMapper(["paddingBlockStart"]),

  bottom: getPropMapper(["insetBlockEnd"]),
  top: getPropMapper(["insetBlockStart"]),
  left: getPropMapper(["insetInlineStart"]),
  right: getPropMapper(["insetInlineEnd"]),

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
} as const

// Only these props should have interactive state classes/vars generated for them
// NOTE: We don't include :disabled, because logic for that exists in JS anyway
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
} as const

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
} as const

/**
 * NOTE: If you add a prop here, remember to add it to `directionalProps` too,
 * if it needs special LTR/RTL (directional) processing.
 *
 * These props are ORDERED by how commonly used they are, to ensure that common
 * props (and the classes we generate for them) get shorter hashes.
 */
export const sourceProps = {
  ////////////////////
  // Remapped Props // (Skip class creation for these)
  ////////////////////
  // Utils
  p: true,
  pt: true,
  pr: true,
  pb: true,
  pl: true,
  px: true,
  paddingX: true,
  py: true,
  paddingY: true,

  m: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true,
  mx: true,
  marginX: true,
  my: true,
  marginY: true,

  bg: true,

  borderX: true,
  borderY: true,

  radius: true,
  radiusTop: true,
  radiusBottom: true,
  radiusLeft: true,
  radiusRight: true,

  z: true,

  h: true,
  w: true,
  size: true,

  // Standard Props
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

  ///////////////////
  // Classed Props //
  ///////////////////
  display: true,

  // height: true,
  // width: true,

  inlineSize: true,
  minInlineSize: true,
  maxInlineSize: true,
  blockSize: true,
  minBlockSize: true,
  maxBlockSize: true,

  // margin: true,
  // marginBottom: true,
  // marginLeft: true,
  // marginRight: true,
  // marginTop: true,
  marginBlockStart: true,
  marginBlockEnd: true,
  marginInlineStart: true,
  marginInlineEnd: true,

  // padding: true,
  // paddingBottom: true,
  // paddingLeft: true,
  // paddingRight: true,
  // paddingTop: true,
  paddingBlockStart: true,
  paddingBlockEnd: true,
  paddingInlineStart: true,
  paddingInlineEnd: true,

  position: true,

  backgroundColor: true,
  background: true,
  backgroundImage: true,

  // minHeight: true,
  // minWidth: true,
  // maxHeight: true,
  // maxWidth: true,

  // bottom: true,
  // top: true,
  // left: true,
  // right: true,
  insetBlockStart: true,
  insetBlockEnd: true,
  insetInlineStart: true,
  insetInlineEnd: true,

  color: true,

  font: true,
  fontFamily: true,
  fontSize: true,
  fontWeight: true,
  fontStyle: true,

  // border: true,
  // borderColor: true,
  // borderStyle: true,
  // borderWidth: true,

  // borderBlock: true,
  // borderBlockColor: true,
  // borderBlockStyle: true,
  // borderBlockWidth: true,
  // borderInline: true,
  // borderInlineColor: true,
  // borderInlineStyle: true,
  // borderInlineWidth: true,

  // borderTop: true,
  // borderTopColor: true,
  // borderTopStyle: true,
  // borderTopWidth: true,

  borderBlockStart: true,
  borderBlockStartColor: true,
  borderBlockStartStyle: true,
  borderBlockStartWidth: true,

  // borderBottom: true,
  // borderBottomColor: true,
  // borderBottomStyle: true,
  // borderBottomWidth: true,
  borderBlockEnd: true,
  borderBlockEndColor: true,
  borderBlockEndStyle: true,
  borderBlockEndWidth: true,

  // borderLeft: true,
  // borderLeftColor: true,
  // borderLeftStyle: true,
  // borderLeftWidth: true,
  borderInlineStart: true,
  borderInlineStartColor: true,
  borderInlineStartStyle: true,
  borderInlineStartWidth: true,

  // borderRight: true,
  // borderRightColor: true,
  // borderRightStyle: true,
  // borderRightWidth: true,
  borderInlineEnd: true,
  borderInlineEndColor: true,
  borderInlineEndStyle: true,
  borderInlineEndWidth: true,

  // borderRadius: true,
  // borderTopLeftRadius: true,
  // borderTopRightRadius: true,
  // borderBottomLeftRadius: true,
  // borderBottomRightRadius: true,
  borderStartStartRadius: true,
  borderStartEndRadius: true,
  borderEndEndRadius: true,
  borderEndStartRadius: true,

  opacity: true,
  visibility: true,

  overflow: true,
  overflowX: true,
  overflowY: true,

  outline: true,
  outlineColor: true,
  outlineOffset: true,
  outlineStyle: true,
  outlineWidth: true,

  backgroundPosition: true,

  zIndex: true,

  transition: true,

  transform: true,

  textAlign: true,
  verticalAlign: true,

  alignItems: true,
  justifyContent: true,

  boxShadow: true,

  cursor: true,

  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexFlow: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,

  // gap: true, // SPREAD into row gap & column gap
  rowGap: true,
  columnGap: true,

  gridArea: true,
  gridAutoRows: true,
  gridAutoColumns: true,
  gridAutoFlow: true,
  gridRow: true,
  gridColumn: true,
  gridTemplate: true, // UTIL: gt // Check for line-breaks; throw error if they're found (only row/col syntax supported)
  // NOTE: Only join if BOTH are set, below, because it's inefficient to set `none/{COLS}` for just columns
  gridTemplateRows: true, // UTIL: gtRows // If BOTH rows + cols are set, then JOIN into gt
  gridTemplateColumns: true, // UTIL: gtColumns // If BOTH rows + cols are set, then JOIN into gt
  gridTemplateAreas: true, // UTIL: gtAreas

  linearGradient: true,
  radialGradient: true,
  conicGradient: true,

  whiteSpace: true,

  pointerEvents: true,

  animation: true,

  lineHeight: true,

  alignSelf: true,
  justifySelf: true,
  alignContent: true,
  justifyItems: true,

  listStyle: true,
  listStyleImage: true,
  listStylePosition: true,
  listStyleType: true,

  resize: true,

  textOverflow: true,
  textTransform: true,
  textDecoration: true,
  textUnderlineOffset: true,

  letterSpacing: true,
  wordSpacing: true,
  wordBreak: true,
  overflowWrap: true,
  // wordWrap: true, // Alias for "overflowWrap"

  fill: true,
  stroke: true,

  mask: true,

  transformOrigin: true,

  borderCollapse: true,
  borderSpacing: true,

  appearance: true,

  userSelect: true,

  filter: true,

  textShadow: true,

  all: true,

  backgroundBlendMode: true,

  boxSizing: true,

  borderBlockStartImage: true,
  borderBlockEndImage: true,
  borderInlineStartImage: true,
  borderInlineEndImage: true,

  caretColor: true,
  columnRuleColor: true,

  scrollSnapAlign: true,
  scrollSnapType: true,

  writingMode: true,

  // FOR FUTURE CONSIDERATION
  // "quotes": true,

  // "transitionDelay": true,
  // "transitionDuration": true,
  // "transitionProperty": true,
  // "transitionTimingFunction": true,

  // "transformStyle": true,

  // "textDecorationColor": true,
  // "textDecorationLine": true,
  // "textDecorationStyle": true,
  // "textDecorationThickness": true,
  // "textEmphasis": true,
  // "textIndent": true,
  // "textOrientation": true,

  // "grid": true, // UNSUPPORTED
  // "gridColumnEnd": true, // Skip
  // "gridColumnStart": true, // Skip
  // "gridRowEnd": true, // Skip
  // "gridRowStart": true, // Skip

  // "offset": true, // NICE-TO-HAVE
  // "offsetAnchor": true, // EXPERIMENTAL
  // "offsetPosition": true, // EXPERIMENTAL
  // "textJustify": true,
  // "textUnderlinePosition": true,
} as const
export const sourcePropsList = Object.keys(sourceProps)

// IDEA: When these directional values get processed, maybe cache values that have been processed already (per property), to avoid having to recalculate them. Those values should be the same universally, so no need for React-centric memo overhead: just store them in an object.
// NOTE: A lot of these should just get converted into INLINE (and BLOCK, for consistency)
// props instead; that way, we actually don't even need any additional RTL breakpoints for them.
export const directionalProps = {
  //// simpleDirectionalShorthands // JUST REMAP
  float: true,
  justifyContent: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  justifyItems: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  justifySelf: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  textAlign: true, // Don't include `left`/`right` in type def; convert to `start`/`end`.

  //// backgroundShorthand // REQUIRES INTERPOLATION
  background: true,

  //// positionOffsetShorthands // REQUIRES INTERPOLATION
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
} as const

export const conditions = {
  ":hover": ":hover",
  ":focus": ":focus",
  ":focus-within": ":focus-within",
  ":focus-visible": ":focus-visible",
  ":active": ":active",
  ":odd": ":nth-child(odd)", // Should we also do aliases for the full names?
  ":first": ":first-child", //  Should we also do aliases for the full names?
  ":last": ":last-child", //    Should we also do aliases for the full names?
  ":first-of-type": ":first-of-type",
  ":last-of-type": ":last-of-type",

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

  ">s": !"@s",
  ">m": !"@m",
  ">l": !"@l",
  ">xl": !"@xl",

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
