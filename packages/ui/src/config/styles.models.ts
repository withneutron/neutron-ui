import { CustomVarPropHints, CustomVarPropValue } from "./props"

type CustomVarHint = "__Enter any valid CSS__"
type CoreStaticKeys = "initial" | "inherit" | "unset" | "revert" | "revert-layer"

// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
type CustomString = string & { trim?: () => string }

type Shared<A extends Record<string, any>, B extends Record<string, any>> = Extract<keyof A, keyof B>
type NotShared<A extends Record<string, any>, B extends Record<string, any>> = Exclude<keyof A, keyof B>

type MapObject = {
  [key: string]: { [k: string | number]: unknown }
}
type CustomVarObject = {
  [key: string]: CustomVarPropValue
}

export type CssFromMap<M extends MapObject> = {
  [key in keyof M]?: keyof M[key]
}
export type CssFromCustomVars<M extends CustomVarObject> = 
  & { [key in Shared<M, CustomVarPropHints>]?: CustomVarHint | CoreStaticKeys | CustomVarPropHints[key] | CustomString }
  & { [key in NotShared<M, CustomVarPropHints>]?: CustomVarHint | CoreStaticKeys | CustomString }

// Merge CSS //
type MapProps = {
  [key: string]: any
}

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

export type MergedCssProps<A extends MapProps, B extends MapProps, C extends MapProps> =
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
