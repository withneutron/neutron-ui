import { CustomVarPropValue, PseudoClassKeys, PseudoClassKeysWithAliases } from "./props"

type CoreStaticKeys = "initial" | "inherit" | "unset" | "revert" | "revert-layer"

// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
export type CustomString = string & { trim?: () => string }

type MapObject = {
  [key: string]: { [k: string | number]: unknown }
}
type ConditionalMapObject = {
  [key in PseudoClassKeys]?: MapObject
}
type CustomVarObject = {
  [key: string]: CustomVarPropValue
}
type ConditionalCustomVarObject = {
  [key in PseudoClassKeys]?: CustomVarObject
}

export type CssFromMap<M extends MapObject> = {
  [key in keyof M]?: keyof M[key]
}
export type CssFromConditionalMap<M extends ConditionalMapObject> = {
  [key in keyof M]?: {
    [innerKey in keyof M[key]]?: keyof M[key][innerKey]
  }
}
export type CssFromCustomVars<M extends CustomVarObject> = {
  [key in keyof M]?: CustomString | CoreStaticKeys
}
export type CssFromConditionalCustomVars<M extends ConditionalCustomVarObject> = {
  [key in keyof M]?: {
    [innerKey in keyof M[key]]?: CustomString | CoreStaticKeys
  }
}

// Merge CSS //
type MapProps = {
  [key: string]: any
}
type ConditionalMapProps = {
  [key in PseudoClassKeysWithAliases]?: MapProps
}
export type NestedMapKey<M extends MapProps> = M[keyof M]
export type NestedConditionalMapKey<M extends ConditionalMapProps> = M[keyof M][keyof M[keyof M]]

type Shared<A extends Record<string, unknown>, B extends Record<string, unknown>> = Extract<keyof A, keyof B>
type NotShared<A extends Record<string, unknown>, B extends Record<string, unknown>> = Exclude<keyof A, keyof B>

export type NestedShared<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>,
  C extends Record<string, unknown>
> = Shared<A, Record<Shared<B, C>, unknown>>

export type ExclusivelyShared<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>,
  C extends Record<string, unknown>
> = Shared<A, Record<NotShared<B, C>, unknown>>

export type Exclusive<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>,
  C extends Record<string, unknown>
> = Extract<NotShared<A, B>, NotShared<A, C>>

export type MergeCssProps<A extends MapProps, B extends MapProps, C extends MapProps> =
  & { [prop in NestedShared<A, C, B>]?: A[prop] | C[prop] | B[prop] }
  & { [prop in NestedShared<C, A, B>]?: A[prop] | C[prop] | B[prop] }
  & { [prop in NestedShared<B, A, C>]?: A[prop] | C[prop] | B[prop] }
  & { [prop in NestedShared<A, B, C>]?: A[prop] | C[prop] | B[prop] }
  & { [prop in NestedShared<C, B, A>]?: A[prop] | C[prop] | B[prop] }
  & { [prop in NestedShared<B, C, A>]?: A[prop] | C[prop] | B[prop] }
  //
  & { [prop in ExclusivelyShared<A, C, B>]?: A[prop] | C[prop] }
  & { [prop in ExclusivelyShared<A, B, C>]?: A[prop] | B[prop] }
  & { [prop in ExclusivelyShared<C, A, B>]?: A[prop] | C[prop] }
  & { [prop in ExclusivelyShared<C, B, A>]?: B[prop] | C[prop] }
  & { [prop in ExclusivelyShared<B, C, A>]?: B[prop] | C[prop] }
  & { [prop in ExclusivelyShared<B, A, C>]?: A[prop] | B[prop] }
  //
  & { [prop in Exclusive<A, C, B>]?: A[prop] }
  & { [prop in Exclusive<A, B, C>]?: A[prop] }
  & { [prop in Exclusive<C, A, B>]?: C[prop] }
  & { [prop in Exclusive<C, B, A>]?: C[prop] }
  & { [prop in Exclusive<B, C, A>]?: B[prop] }
  & { [prop in Exclusive<B, A, C>]?: B[prop] }

export type MergeCssPropsPair<A extends MapProps, B extends MapProps> =
  & { [prop in Shared<A, B>]?: A[prop] | B[prop] }
  & { [prop in Shared<B, A>]?: A[prop] | B[prop] }
  //
  & { [prop in NotShared<A, B>]?: A[prop] }
  & { [prop in NotShared<B, A>]?: B[prop] }
