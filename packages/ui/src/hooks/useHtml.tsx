import { useLocale } from "@react-aria/i18n"
import { isSSR } from "../shared/utils"
import { useTheme } from "./"
import { themeClass } from "@withneutron/quarks"

export function useHtml() {
  const { isDark, theme, darkTheme } = useTheme()
  const { locale, direction } = useLocale()

  const activeTheme = isDark ? darkTheme : theme
  const inactiveTheme = isDark ? theme : darkTheme

  const output = {
    lang: locale,
    dir: direction,
    className: String(activeTheme),
  }

  if (!isSSR && document?.documentElement) {
    document.documentElement.setAttribute("lang", output.lang)
    document.documentElement.setAttribute("dir", output.dir)
    document.documentElement.classList.remove(String(inactiveTheme))
    document.documentElement.classList.add(output.className)
    document.documentElement.classList.add(themeClass)
  }

  return output
}
