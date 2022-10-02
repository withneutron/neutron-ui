import { useContext } from "react"
import { QuarksContext, QuarksContextProps } from "../providers/QuarksProvider"

interface UseColors extends Pick<QuarksContextProps, "colorMode" | "setColorMode" | "toggleColorMode"> {
  isDark: boolean
}

export function useColors(): UseColors {
  const { colorMode, setColorMode, toggleColorMode, isDark } = useContext(QuarksContext)
  return {
    colorMode,
    isDark,
    setColorMode,
    toggleColorMode,
  }
}
