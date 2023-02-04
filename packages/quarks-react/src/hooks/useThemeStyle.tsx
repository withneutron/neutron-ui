import { useEffect } from "react"
import { ColorMode, getThemeOverrides, SemanticColorOverrides, ThemeOverrides } from "@withneutron/quarks"

export function useThemeStyle(
  colorMode: ColorMode = "light",
  userOverrides?: ThemeOverrides,
  semanticColorOverrides?: SemanticColorOverrides
) {
  useEffect(() => {
    const style = getThemeOverrides(colorMode, userOverrides, semanticColorOverrides)
    const styleString = Object.entries(style)
      .map(([k, v]) => `${k}: ${v}`)
      .join(";")
    if (document) {
      document.getElementsByTagName("html")[0].setAttribute("style", styleString)
    }
  }, [colorMode, userOverrides, semanticColorOverrides])
}
