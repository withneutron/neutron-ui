type DeepPartial<T> = {
  [P: string]: RecursivePartial<T>
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Function
    ? T[P]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

type NestedPartial<T> = RecursivePartial<T> & DeepPartial<T>

export const pick = (props: string[]) => <T extends object>(state: T): NestedPartial<T> =>
  props.reduce((out: NestedPartial<T>, prop: string) => {
    const keys = prop.split(".")
    const last = keys[keys.length - 1]
    out[last as keyof NestedPartial<T>] = keys.reduce((nest: any, key: string) => {
      nest = nest[key]
      return nest
    }, state)
    return out
  }, {} as NestedPartial<T>)
