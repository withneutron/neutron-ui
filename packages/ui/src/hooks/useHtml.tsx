import { useLocale } from "@react-aria/i18n"
import { isSSR } from "../shared/utils"
import { useTheme } from "./"

export function useHtml() {
  const { isDark, theme, darkTheme } = useTheme()
  const { locale, direction } = useLocale()

  const activeTheme = isDark ? darkTheme : theme
  const inactiveTheme = isDark ? theme : darkTheme

  const output = {
    lang: locale,
    dir: direction,
    id: "html",
    className: String(activeTheme),
  }

  if (!isSSR && document?.documentElement) {
    document.documentElement.setAttribute("lang", output.lang)
    document.documentElement.setAttribute("dir", output.dir)
    document.documentElement.setAttribute("id", output.id)
    document.documentElement.classList.remove(String(inactiveTheme))
    document.documentElement.classList.add(output.className)
  }

  return output
}
