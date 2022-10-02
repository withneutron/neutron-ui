// IDEA: When these directional values get processed, maybe cache values that have been processed already (per property), to avoid having to recalculate them. Those values should be the same universally, so no need for React-centric memo overhead: just store them in an object.
// NOTE: A lot of these should just get converted into INLINE (and BLOCK, for consistency)
// props instead; that way, we actually don't even need any additional RTL breakpoints for them.
export const directionalProps = {
  //// simpleDirectionalShorthands // JUST REMAP
  float: true, // Instead of anyting fancy, just generate class in 2 different conditions, one being LTR the other RTL

  // Just don't support "bad" values 🤷🏻‍♂️
  // justifyContent: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  // justifyItems: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  // justifySelf: true, // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
  // textAlign: true, // Don't include `left`/`right` in type def; convert to `start`/`end`.

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
