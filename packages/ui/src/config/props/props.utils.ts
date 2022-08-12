import { FilterKeys } from "./props.models"

export function omitKeys<P extends Record<string | number, unknown>, K extends FilterKeys>(props: P, keys: K) {
  type PickKeys = Extract<keyof P, keyof K>
  const output: Pick<P, PickKeys> = { ...props }
  Object.keys(props).forEach(prop => {
    if (!keys[prop as keyof K]) {
      delete output[prop as keyof typeof output]
    }
  })
  return output
}
