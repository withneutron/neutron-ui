import { FilterKeys, PickKeys } from "./props.models"

// Only these props should have interactive state classes/vars generated for them
// 20
export const pseudoClassProps = {
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
  backgroundPosition: true,

  linearGradient: true,
  radialGradient: true,
  conicGradient: true,

  mask: true,
  borderImage: true,
  borderSpacing: true,

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
  // listStyle: true,
  // listStyleImage: true,
  // filter: true,
} as const

export const pointerClassProps = {
  ...pseudoClassProps,
  cursor: true,
} as const

export function generatePseudoClassCss<O extends Record<string, unknown>>(
  generateClass: <K extends FilterKeys>(pseudoClass: string, keys: K) => O
) {
  const focusVisibleProps = generateClass(":focus-visible", pseudoClassProps)
  const hoverProps = generateClass(":hover", pointerClassProps)
  const activeProps = generateClass(":active", pseudoClassProps)
  type FilteredProps = PickKeys<O, typeof pseudoClassProps>
  type FilteredPointerProps = PickKeys<O, typeof pointerClassProps>
  return {
    // NOTE: We don't include :disabled, because logic for that exists in JS anyway
    // ":focus": pseudoClassProps, // REMOVED because :focus-visible is just better
    ":focus-visible": focusVisibleProps as FilteredProps,
    ":hover": hoverProps as FilteredPointerProps,
    ":active": activeProps as FilteredProps,
  } as const
}

// PSEUDO CLASS OBJECTS ///////////////////////////////////////////////////////////////////////////
// NOTE: IF YOU ADD A PROP HERE, YOU MUST ALSO ADD IT IN `classDict` IN `styleGenerators.ts`
export const pseudoClasses = {
  // NOTE: We don't include :disabled, because logic for that exists in JS anyway
  ":focus-visible": pseudoClassProps,
  ":hover": pointerClassProps,
  ":active": pseudoClassProps,
} as const

// ALIASES ////////////////////////////////////////////////////////////////////////////////////////
export const pseudoClassAliases = {
  ":focus": [":focus-visible"],
  ":hover, :focus": [":hover", ":focus-visible"],
  ":hover, :focus-visible": [":hover", ":focus-visible"],
  ":interactive": [":hover", ":focus-visible"],
} as const

export const combinedPseudoClasses = {
  ...pseudoClasses,
  ...pseudoClassAliases,
} as const

// TYPES //////////////////////////////////////////////////////////////////////////////////////////
export type PseudoClassKeys = keyof ReturnType<typeof generatePseudoClassCss>

export type PseudoClassAliasKeys = keyof typeof pseudoClassAliases
export type PseudoClassKeysWithAliases = PseudoClassKeys | PseudoClassAliasKeys

type PseudoClassObject = { readonly [k in PseudoClassKeys]?: Record<string, unknown> }

export type PseudoClassesWithAliases<T extends PseudoClassObject> = 
  & T
  & { ":focus"?: T[":focus-visible"] } 
  & { ":hover, :focus"?: T[":hover"] & T[":focus-visible"] } 
  & { ":hover, :focus-visible"?: T[":hover"] & T[":focus-visible"] } 
  & { ":interactive"?: T[":hover"] & T[":focus-visible"] }
