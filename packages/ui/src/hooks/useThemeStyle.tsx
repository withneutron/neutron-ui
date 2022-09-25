import { useMemo } from "react"
import { getTheme } from "@withneutron/quarks"
import { useColors } from "./useColors"

export function useThemeStyle() {
  const { isDark } = useColors()

  const style = useMemo(() => getTheme(isDark ? "dark" : "light"), [isDark])
  const stringified = useMemo(
    () =>
      Object.entries(style)
        .map(([k, v]) => `${k}: ${v}`)
        .join(";"),
    [style]
  )

  return {
    style,
    styleString: `:root.nui{${stringified}}`,
  }
}
