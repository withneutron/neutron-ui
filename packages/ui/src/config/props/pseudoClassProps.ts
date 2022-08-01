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

export const interactivePseudoClasses = {
  ":hover": ":hover",
  ":focus": ":focus",
  ":focus-within": ":focus-within",
  ":focus-visible": ":focus-visible",
  ":active": ":active",
  // Aliases //
  ":hover, :focus-visible": [":hover", ":focus-visible"],
  ":interactive": [":hover", ":focus-visible"],
} as const

export const structuralpseudoClasses = {
  ":nth-child(odd)": ":nth-child(odd)",
  ":first-child": ":first-child",
  ":last-child": ":last-child",
  ":first-of-type": ":first-of-type",
  ":last-of-type": ":last-of-type",
  // Aliases //
  ":odd": [":nth-child(odd)"],
  ":first": [":first-child"],
  ":last": [":last-child"],
} as const

export const pseudoClasses = {
  ...interactivePseudoClasses,
  ...structuralpseudoClasses,
} as const
