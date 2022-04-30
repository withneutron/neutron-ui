import type { ReactNode, ReactElement } from "react"
import { ColorMode, DEFAULT_COLOR_MODE } from "../../shared/models"
import { useColors, useTheme } from "../../hooks"

interface ThemedProps {
  children: ReactNode
  mode?: ColorMode | "inverted"
}

export function Themed({ children, mode = DEFAULT_COLOR_MODE }: ThemedProps): ReactElement {
  const { theme, darkTheme } = useTheme()
  const { isDark } = useColors()
  const dark = darkTheme ? darkTheme : theme
  const light = theme
  const inverted = isDark ? light : dark
  const isInverted = mode === "inverted"
  const colorTheme = mode === "dark" ? dark : light
  const className = isInverted ? inverted.className : colorTheme.className
  return (
    <section className={className}>
      <>{children}</>
    </section>
  )
}
Themed.displayName = "Themed"
