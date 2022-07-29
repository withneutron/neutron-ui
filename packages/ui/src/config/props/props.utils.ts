export function varKeysFromScale<T extends Record<string | number, string>>(scale: T) {
  return Object.entries(scale).reduce((output, [key, value]: [string | number, string]) => {
    output[value] = String(key)
    return output
  }, {} as Record<string, string>)
}
