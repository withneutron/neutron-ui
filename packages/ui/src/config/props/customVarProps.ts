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
  animationIterationCount: true,

  transition: true,

  opacity: true,
} as const
