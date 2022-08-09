// Only these props should have interactive state classes/vars generated for them
// 20
export const interactiveClassProps = {
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

  textDecoration: true,

  transform: true,

  transition: true,

  opacity: true,

  // Disabled to optimize bundle size
  // fill: true,
  // stroke: true,
  // caretColor: true,
  // columnRuleColor: true,
  // textShadow: true,
  // transformOrigin: true,
} as const

// Only these props should have structural pseudo-classes
// + 41
export const structuralClassProps = {
  ...interactiveClassProps,
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

export const interactivePseudoClasses = {
  // NOTE: We don't include :disabled, because logic for that exists in JS anyway
  ":hover": interactiveClassProps,
  // ":focus": interactiveClassProps, // REMOVED because :focus-visible is just better
  ":focus-visible": interactiveClassProps,
  ":active": interactiveClassProps,
} as const

export const bonusInteractivePseudoClasses = {
  ":focus-within": interactiveClassProps,
} as const

export const structuralPseudoClasses = {
  ":nth-child(odd)": structuralClassProps,
  ":first-child": structuralClassProps,
  ":last-child": structuralClassProps,
  ":first-of-type": structuralClassProps,
  ":last-of-type": structuralClassProps,
  // MAYBE nth-child(even) (can treat default as even, and override ONLY odds)
  // MAYBE: only-child, only-of-type (achievable with first + last combined)
  // MAYBE: empty (probably best handled in JS)
  // MAYBE: nth-child, nth-last-child, nth-of-type, nth-last-of-type (API??)
  // MAYBE: target, target-within, visited
} as const

export const pseudoClassAliases = {
  ":focus": [":focus-visible"],
  ":hover, :focus": [":hover", ":focus-visible"],
  ":hover, :focus-visible": [":hover", ":focus-visible"],
  ":interactive": [":hover", ":focus-visible"],
  ":odd": [":nth-child(odd)"],
  ":first": [":first-child"],
  ":last": [":last-child"],
} as const

export const pseudoClasses = {
  ...interactivePseudoClasses,
  ...bonusInteractivePseudoClasses,
  ...structuralPseudoClasses,
} as const
