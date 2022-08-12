import { FilterKeys } from "./props.models"

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
  backgroundImage: true,

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

export const pointerClassProps = {
  ...interactiveClassProps,
  cursor: true,
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

  verticalAlign: true,
  textAlign: true,
  textOverflow: true,
} as const

export function generateInteractivePseudoClassCss<O extends Record<string, unknown>>(
  generateClass: (condition: string, keys: FilterKeys) => O
) {
  const focusVisibleProps = generateClass(":focus-visible", interactiveClassProps)
  const hoverProps = generateClass(":hover", pointerClassProps)
  const activeProps = generateClass(":active", interactiveClassProps)
  type FilteredProps = Pick<O, keyof typeof interactiveClassProps>
  type FilteredPointerProps = Pick<O, keyof typeof pointerClassProps>
  return {
    // NOTE: We don't include :disabled, because logic for that exists in JS anyway
    // ":focus": interactiveClassProps, // REMOVED because :focus-visible is just better
    ":focus-visible": focusVisibleProps as FilteredProps,
    ":hover": hoverProps as FilteredPointerProps,
    ":active": activeProps as FilteredProps,
  } as const
}

export function generateStructuralPseudoClassCss<O extends Record<string, unknown>>(
  generateClass: (condition: string, keys: FilterKeys) => O
) {
  const oddProps = generateClass(":nth-child(odd)", structuralClassProps)
  const firstChildProps = generateClass(":first-child", structuralClassProps)
  const lastChildProps = generateClass(":last-child", structuralClassProps)
  type FilteredProps = Pick<O, keyof typeof structuralClassProps>
  return {
    ":nth-child(odd)": oddProps as FilteredProps,
    ":first-child": firstChildProps as FilteredProps,
    ":last-child": lastChildProps as FilteredProps,
  } as const
}

// PSEUDO CLASS OBJECTS ///////////////////////////////////////////////////////
export const interactivePseudoClasses = {
  // NOTE: We don't include :disabled, because logic for that exists in JS anyway
  ":focus-visible": interactiveClassProps,
  ":hover": pointerClassProps,
  ":active": interactiveClassProps,
}

// TODO: Could we maybe create a JS helper for this instead??
export const structuralPseudoClasses = {
  ":nth-child(odd)": structuralClassProps,
  ":first-child": structuralClassProps,
  ":last-child": structuralClassProps,
  // MAYBE: ":first-of-type": structuralClassProps,
  // MAYBE: ":last-of-type": structuralClassProps,
  // MAYBE: nth-child(even) (can treat default as even, and override ONLY odds)
  // MAYBE: only-child, only-of-type (achievable with first + last combined)
  // MAYBE: nth-child, nth-last-child, nth-of-type, nth-last-of-type (API??)
  // MAYBE: target, target-within, visited
} as const

export const pseudoClasses = {
  ...interactivePseudoClasses,
  ...structuralPseudoClasses,
} as const

// ALIASES ////////////////////////////////////////////////////////////////////
export const pseudoClassAliases = {
  // Interactive Pseudo Classes
  ":focus": [":focus-visible"],
  ":hover, :focus": [":hover", ":focus-visible"],
  ":hover, :focus-visible": [":hover", ":focus-visible"],
  ":interactive": [":hover", ":focus-visible"],
  // Structural Pseudo Classes
  ":odd": [":nth-child(odd)"],
  ":first": [":first-child"],
  ":last": [":last-child"],
} as const

type PseudoClassKeys =
  | keyof ReturnType<typeof generateInteractivePseudoClassCss>
  | keyof ReturnType<typeof generateStructuralPseudoClassCss>

type ConditionalPseudoClassObject = { readonly [k in PseudoClassKeys]?: unknown }

export type InteractivePseudoClassesWithAliases<T extends ConditionalPseudoClassObject> = Partial<T> & {
  ":focus"?: T[":focus-visible"]
} & { ":hover, :focus"?: T[":hover"] & T[":focus-visible"] } & {
  ":hover, :focus-visible"?: T[":hover"] & T[":focus-visible"]
} & { ":interactive"?: T[":hover"] & T[":focus-visible"] }

export type AllPseudoClassesWithAliases<T extends ConditionalPseudoClassObject> =
  InteractivePseudoClassesWithAliases<T> & { ":odd"?: T[":nth-child(odd)"] } & { ":first"?: T[":first-child"] } & {
    ":last"?: T[":last-child"]
  }
