import { ColorMode } from "../shared/models"
import { darkColorMap } from "./styles.css"

export function getTheme(colorMode?: ColorMode, userOverrides?: Record<string, string>) {
  const overrides = {
    ...(colorMode === "dark" ? darkColorMap : {}),
    ...userOverrides,
  }
  return overrides
}
