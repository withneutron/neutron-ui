export const staticProps = {
  appearance: true,

  animationIterationCount: true, // [infinite, 1, 2]

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
