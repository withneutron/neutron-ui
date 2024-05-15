import type { HTMLAttributes } from "react"

/** Get the keys of an enum */
export function enumKeys<O extends Record<string, string>, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[]
}

/** Get the values of an enum */
export function enumValues<O extends Record<string, string>, K extends keyof O = keyof O>(
  obj: O
): O[K][] {
  return Object.values(obj) as O[K][]
}

/** Capitalize the first letter of a string */
export function capitalizeFirstLetter(source: string): string {
  return source.charAt(0).toUpperCase() + source.slice(1)
}

/** Shallow equality check of two objects, including arrays */
export function areObjectsEqual<
  T extends Record<string, unknown> | unknown[] = Record<string, unknown>
>(source: T, comparand: T): boolean {
  if (source !== comparand) {
    // ARRAYS //
    const isSourceArray = Array.isArray(source)
    const isComparandArray = Array.isArray(comparand)
    if (isSourceArray || isComparandArray) {
      if (isSourceArray !== isComparandArray) {
        return false
      }
      if (source.length !== comparand.length) {
        return false
      }
      for (let i = 0; i < (source as unknown[]).length; i++) {
        if (source[i as keyof typeof source] !== comparand[i as keyof typeof comparand]) {
          return false
        }
      }
    }

    // NON-ARRAYS //
    const sourceKeys = Object.keys(source)
    const comparandKeys = Object.keys(comparand)
    if (sourceKeys.length !== comparandKeys.length) {
      return false
    }
    for (const key of sourceKeys) {
      if (source[key as keyof typeof source] !== comparand[key as keyof typeof comparand]) {
        return false
      }
    }
  }
  return true
}

/** Omit properties from an object */
export function omitProps<
  T extends string,
  O = Record<string, unknown> | HTMLAttributes<HTMLElement>
>(source: O, ...props: T[]): Omit<O, T> {
  return props.reduce(
    (output: O, prop: T) => {
      delete output[prop as unknown as keyof O]
      return output as O
    },
    { ...source } as O
  ) as Omit<O, T>
}
