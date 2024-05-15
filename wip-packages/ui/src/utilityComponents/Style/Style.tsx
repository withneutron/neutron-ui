import { useThemeStyle } from "../../hooks"

export function Style() {
  const { styleString } = useThemeStyle()
  return <style id="nui-theme-overrides" dangerouslySetInnerHTML={{ __html: styleString }} />
}
