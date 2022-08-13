import { PseudoClassKeys } from "./props"

type MapObject = {
  [key: string]: { [k: string | number]: unknown }
}
type ConditionalMapObject = {
  [key in PseudoClassKeys]?: MapObject
}
export type CssFromMap<M extends MapObject> = {
  [key in keyof M]?: keyof M[key]
}
export type CssFromConditionalMap<M extends ConditionalMapObject> = {
  [key in keyof M]?: {
    [innerKey in keyof M[key]]?: keyof M[key][innerKey]
  }
}
