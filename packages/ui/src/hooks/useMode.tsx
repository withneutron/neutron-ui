import { useContext } from "react"
import { UIContext } from "../providers/UIProvider"

export function useMode<T extends string>(lightOption: T, darkOption: T): T {
  const { isDark } = useContext(UIContext)
  return isDark ? darkOption : lightOption
}
