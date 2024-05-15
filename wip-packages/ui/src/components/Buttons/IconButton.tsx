import type { ForwardedRef, ReactElement } from "react"
import { useMemo, forwardRef } from "react"
import { VariantProps } from "@stitches/react"
import { CSS, styled } from "../../config/stitches.config"
import { useButton } from "./shared/useButton"
import { LOADER_ICON_NAME } from "../../shared/models"
import { Icon } from "../Icon/Icon"
import { ringStyles, offsetStyles, buttonStyles } from "./Button.styles"
import { ButtonOverrides, GetButtonOptions, IconButtonProps } from "./Button.models"

/** Returns a Button component, with style overrides applied at mount time */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getIconButton<IconButtonVariants extends Record<string, unknown>>(
  styleOverrides?: CSS | ButtonOverrides,
  name = "IconButton",
  options = {} as GetButtonOptions
) {
  // GET STYLE OVERRIDES //////////////////////////////////////////////////////
  const styleKeys = styleOverrides ? Object.keys(styleOverrides) : []
  const ovrKeys = ["Button", "FocusRing", "Pseudo"]
  const isCss = styleKeys.some((key: string) => !ovrKeys.includes(key))
  const ovr: Required<ButtonOverrides> = isCss
    ? {
        Button: styleOverrides as CSS,
        FocusRing: {} as CSS,
        Pseudo: {} as CSS,
      }
    : {
        Button: styleOverrides?.Button || ({} as CSS),
        FocusRing: styleOverrides?.FocusRing || ({} as CSS),
        Pseudo: styleOverrides?.Pseudo || ({} as CSS),
      }
  const hasPseudoStyles = !!styleOverrides?.Pseudo

  // GENERATE STYLES //////////////////////////////////////////////////////////
  // FOCUS RING //
  const ringVariantsKeys = Object.keys(ringStyles.variants || {}).concat(
    Object.keys(ovr.FocusRing.variants || {})
  )
  const FocusRing = styled("div", ringStyles, ovr.FocusRing, `${name}_FocusRing`)

  // PSEUDO //
  const offsetVariantsKeys = Object.keys(offsetStyles.variants || {}).concat(
    Object.keys(ovr.Pseudo.variants || {})
  )
  const Pseudo = styled("div", offsetStyles, ovr.Pseudo, `${name}_Pseudo`)

  // BUTTON //
  const StyledIconButton = styled("button", buttonStyles, ovr.Button, name)

  // DEFINE THE COMPONENT /////////////////////////////////////////////////////
  function IconButton<T = unknown>(
    props: IconButtonProps<T> & VariantProps<typeof StyledIconButton> & IconButtonVariants,
    outerRef?: ForwardedRef<HTMLButtonElement | null>
  ): ReactElement {
    const { iconName, iconType, ...outerProps } = props
    const { colorScheme, variant, size, shape, className: propClass } = outerProps

    const {
      isLoading,
      isFocusVisible,
      buttonProps,
      buttonRef,
      buttonType,
      longPressHint,
      tooltip,
    } = useButton(
      outerProps as typeof props,
      {
        colorScheme,
        variant,
        size,
        shape,
        propClass,
      },
      styleOverrides,
      buttonStyles,
      name,
      outerRef,
      options
    )

    // Get FocusRing variants (props)
    const ringVariants = Object.keys(outerProps).reduce(
      (output: Record<string, unknown>, key: string) => {
        if (ringVariantsKeys.includes(key)) {
          output[key] = outerProps[key]
        }
        return output
      },
      {}
    )

    // Get Pseudo variants (props)
    const offsetVariants = !hasPseudoStyles
      ? {}
      : Object.keys(outerProps).reduce((output: Record<string, unknown>, key: string) => {
          if (offsetVariantsKeys.includes(key)) {
            output[key] = outerProps[key]
          }
          return output
        }, {})

    // Prep icons
    const finalIconName = isLoading ? LOADER_ICON_NAME : iconName
    const icon = useMemo(
      () => <Icon name={finalIconName} type={iconType} spin={isLoading ? "slower" : undefined} />,
      [finalIconName, iconType, isLoading]
    )

    return (
      <>
        <StyledIconButton {...buttonProps} ref={buttonRef} type={buttonType}>
          <>
            {hasPseudoStyles && <Pseudo {...offsetVariants} />}
            {isFocusVisible && <FocusRing {...ringVariants} />}
            {icon}
            {longPressHint}
          </>
        </StyledIconButton>
        {tooltip}
      </>
    )
  }
  IconButton.displayName = "IconButton"

  // eslint-disable-next-line
  return forwardRef<HTMLButtonElement, any>(IconButton) as <T = unknown>(
    props: IconButtonProps<T> &
      VariantProps<typeof StyledIconButton> &
      IconButtonVariants & { outerRef?: ForwardedRef<HTMLButtonElement | null> }
  ) => ReactElement
}

// Also export a ready-made IconButton, for consumers who don't want to customize it
export const IconButton = getIconButton()
