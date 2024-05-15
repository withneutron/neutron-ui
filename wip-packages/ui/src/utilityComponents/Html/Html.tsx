import type { DetailedHTMLProps, HtmlHTMLAttributes, ReactElement, ReactNode } from "react"
import { useLocale } from "@react-aria/i18n"
import { useTheme } from "../../hooks"
import { themeClass } from "@withneutron/quarks"

interface HtmlProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> {
  children: ReactNode
}

export function Html({ children, className = "", ...props }: HtmlProps): ReactElement {
  const { activeTheme } = useTheme()
  const { locale, direction } = useLocale()

  className = `${className} ${String(activeTheme)} ${themeClass}`

  return (
    <html lang={locale} dir={direction} id="html" {...props} className={className}>
      <>{children}</>
    </html>
  )
}
Html.displayName = "Html"
