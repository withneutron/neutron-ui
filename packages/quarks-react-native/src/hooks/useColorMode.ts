import { useContext } from "react"
import { QuarksContext } from "../providers/QuarksProvider"

export function useColorMode() {
  const ctx = useContext(QuarksContext)
  return {
    colorMode: ctx.colorMode,
    isDark: ctx.isDark,
    setColorMode: ctx.setColorMode,
    toggleColorMode: ctx.toggleColorMode,
  }
}
