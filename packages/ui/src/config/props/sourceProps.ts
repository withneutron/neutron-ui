/**
 * NOTE: If you add a prop here, remember to add it to `directionalProps` too,
 * if it needs special LTR/RTL (directional) processing.
 *
 * These props are ORDERED by how commonly used they are, to ensure that common
 * props (and the classes we generate for them) get shorter hashes.
 */

/** Full list of supported CSS props (186 props + 35 utility props) */
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

  gt: true,
  gtAreas: true,
  gtColumns: true,
  gtRows: true,

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

  gap: true, // SPREAD into `rowGap` & `columnGap`

  wordWrap: true, // Alias for "overflowWrap"

  ///////////////////
  // Classed Props //
  ///////////////////
  display: true,

  inlineSize: true,
  minInlineSize: true,
  maxInlineSize: true,
  blockSize: true,
  minBlockSize: true,
  maxBlockSize: true,

  marginBlockStart: true,
  marginBlockEnd: true,
  marginInlineStart: true,
  marginInlineEnd: true,

  paddingBlockStart: true,
  paddingBlockEnd: true,
  paddingInlineStart: true,
  paddingInlineEnd: true,

  position: true,

  backgroundColor: true,
  background: true,
  backgroundImage: true,

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

  borderBlockStart: true,
  borderBlockStartColor: true,
  borderBlockStartStyle: true,
  borderBlockStartWidth: true,
  borderBlockEnd: true,
  borderBlockEndColor: true,
  borderBlockEndStyle: true,
  borderBlockEndWidth: true,

  borderInlineStart: true,
  borderInlineStartColor: true,
  borderInlineStartStyle: true,
  borderInlineStartWidth: true,

  borderInlineEnd: true,
  borderInlineEndColor: true,
  borderInlineEndStyle: true,
  borderInlineEndWidth: true,

  borderStartStartRadius: true,
  borderStartEndRadius: true,
  borderEndStartRadius: true,
  borderEndEndRadius: true,

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
  animationDuration: true,
  animationIterationCount: true,

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

  borderImage: true,

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
