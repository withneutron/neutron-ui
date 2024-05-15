import { useContext } from "react"
import { UIContext } from "../providers/UIProvider"
import { BGColorNameKeys, TextColorNameKeys } from "../shared/models"

export function useColor<T extends TextColorNameKeys | BGColorNameKeys>(
  lightColor: T,
  darkColor: T
): T {
  const { isDark } = useContext(UIContext)
  return isDark ? darkColor : lightColor
}
