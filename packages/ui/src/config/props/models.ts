// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
export type CustomCssString = string & { trim?: () => string }
