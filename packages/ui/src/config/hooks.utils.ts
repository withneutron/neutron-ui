import { Theme } from "../../config/stitches.config"

const CSS_VAR_REGEX = /(?:var\(--)[a-zA-z0-9-]*(?:\))/g

export function getThemeValue(theme: Theme, value: string): string {
  if (!value.includes("var(")) {
    return value
  }
  const cssVars = value.match(CSS_VAR_REGEX) || []
  return cssVars.reduce((output: string, cssVar: string) => {
    const keys = cssVar.replace(`var(--`, "").replace(")", "").split("-") as [string, string]
    const base = theme[keys[0] as keyof typeof theme] as any
    const cssValue = base ? base[keys[1] as keyof typeof base].value || "" : ""
    return output.replace(cssVar, cssValue)
  }, value)
}
