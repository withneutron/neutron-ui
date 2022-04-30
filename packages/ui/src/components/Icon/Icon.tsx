import type { ReactElement } from "react"
import { useMemo } from "react"
import * as Icons from "react-icons/ri"
import { useLocale } from "@react-aria/i18n"
import { styled, VariantProps, CSS } from "../../config/stitches.config"
import { i18nIconName, IconType, FillIcon, LineIcon, UIComponent } from "../../shared/models"
import { iconStyles } from "./Icon.styles"

interface BaseIconProps {
  "aria-label"?: string
  "aria-labelledby"?: string
  css?: CSS
}

interface InternalIconProps {
  name: i18nIconName
  type?: IconType
  element?: never
}

interface ExternalIconProps {
  element: ReactElement
  name?: never
  type?: never
}

type IconProps = BaseIconProps & UIComponent & (InternalIconProps | ExternalIconProps)

/** Returns a Icon component, with style overrides applied at mount time */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getIcon(styleOverrides: CSS = {}, name = "Icon") {
  // GENERATE STYLES //////////////////////////////////////////////////////////
  const StyledIcon = styled("span", iconStyles, styleOverrides, name)

  // DEFINE THE COMPONENT /////////////////////////////////////////////////////
  /** Basic icon component */
  function Icon({
    type,
    name,
    element,
    ...iconProps
  }: IconProps & VariantProps<typeof StyledIcon>): ReactElement | null {
    const { direction } = useLocale()

    const icon = useMemo(() => {
      if (name) {
        const i18nName = typeof name === "string" ? name : name[direction]
        if (!i18nName) {
          return null
        }
        const iconName =
          type === IconType.line
            ? LineIcon[i18nName as keyof typeof LineIcon]
            : FillIcon[i18nName as keyof typeof FillIcon]
        const Symbol = Icons[iconName as keyof typeof Icons]
        return <Symbol />
      }
      return element
    }, [type, name, element])

    return !icon ? null : <StyledIcon {...iconProps}>{icon}</StyledIcon>
  }
  Icon.displayName = "Icon"
  return Icon
}

// Also export a ready-made Icon, for consumers who don't want to customize it
/** Basic icon component */
export const Icon = getIcon()
