import { ColorMode } from "../shared/models"
import { darkVarMap } from "./styles.css"

export function getTheme(colorMode?: ColorMode, userOverrides?: Record<string, string>) {
  const overrides = {
    ...(colorMode === "dark" ? darkVarMap : {}),
    ...userOverrides,
  }
  return overrides
}
