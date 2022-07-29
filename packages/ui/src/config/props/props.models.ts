// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
export type CustomString = string & { trim?: () => string }

type Scale = { [k: string | number]: string | Record<string | number, unknown> }
export type KeysFromScale<T extends Scale> = `$${keyof Omit<T, symbol>}` | CustomString
