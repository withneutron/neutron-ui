import type { ForwardedRef, ReactElement } from "react"
import { forwardRef } from "react"
import { VariantProps } from "@stitches/react"
import { CSS, styled } from "../../config/stitches.config"
import { useButton } from "./shared/useButton"
import { LOADER_ICON_NAME } from "../../shared/models"
import { Icon } from "../Icon/Icon"
import { ringStyles, offsetStyles, buttonStyles } from "./Button.styles"
import { Box } from "../../primitives"
import { ButtonOverrides, GetButtonOptions, ButtonProps } from "./Button.models"

/** Returns a Button component, with style overrides applied at mount time */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getButton<ButtonVariants extends Record<string, unknown>>(
  styleOverrides?: CSS | ButtonOverrides,
  name = "Button",
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
  const StyledButton = styled("button", buttonStyles, ovr.Button, name)

  // DEFINE THE COMPONENT /////////////////////////////////////////////////////
  function Button<T = unknown>(
    props: ButtonProps<T> & VariantProps<typeof StyledButton> & ButtonVariants,
    outerRef?: ForwardedRef<HTMLButtonElement | null>
  ): ReactElement {
    const {
      hideTextWhenLoading = false,
      prefixIconName,
      prefixIconType,
      suffixIconName,
      suffixIconType,
      ...outerProps
    } = props
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
    const ringVariants = Object.keys(props).reduce(
      (output: Record<string, unknown>, key: string) => {
        if (ringVariantsKeys.includes(key)) {
          output[key] = props[key]
        }
        return output
      },
      {}
    )

    // Get Pseudo variants (props)
    const offsetVariants = !hasPseudoStyles
      ? {}
      : Object.keys(props).reduce((output: Record<string, unknown>, key: string) => {
          if (offsetVariantsKeys.includes(key)) {
            output[key] = props[key]
          }
          return output
        }, {})

    // Prep icons
    const startIconName = isLoading ? LOADER_ICON_NAME : prefixIconName
    const endIconName = isLoading ? LOADER_ICON_NAME : suffixIconName
    const prefixIcon = !startIconName ? null : (
      <Icon
        name={startIconName}
        type={prefixIconType}
        aria-hidden
        spin={isLoading ? "slower" : undefined}
      />
    )
    const suffixIcon = !endIconName ? null : (
      <Icon
        name={endIconName}
        type={suffixIconType}
        aria-hidden
        spin={isLoading ? "slower" : undefined}
      />
    )
    const showLeftIcon = typeof prefixIconName === "object" || (!suffixIcon && prefixIcon)
    const showRightIcon = typeof suffixIconName === "object" || (!prefixIcon && suffixIcon)
    const showLoadingIcon = isLoading && !showLeftIcon && !showRightIcon

    return (
      <>
        <StyledButton {...buttonProps} ref={buttonRef} type={buttonType}>
          <>
            {hasPseudoStyles && <Pseudo {...offsetVariants} />}
            {isFocusVisible && <FocusRing {...ringVariants} />}

            {/* Left Icon */}
            {showLeftIcon && prefixIcon}

            {/* Main content */}
            {!(hideTextWhenLoading && showLoadingIcon) && (
              <Box as="span" w="full" mx="3">
                <>{props.children}</>
              </Box>
            )}
            {showLoadingIcon && (
              <Icon
                name={LOADER_ICON_NAME}
                aria-hidden
                spin="slower"
                mx={hideTextWhenLoading ? "half" : undefined}
                noPointerEvents
              />
            )}

            {/* Right Icon */}
            {showRightIcon && suffixIcon}

            {longPressHint}
          </>
        </StyledButton>
        {tooltip}
      </>
    )
  }
  Button.displayName = "Button"

  // eslint-disable-next-line
  return forwardRef<HTMLButtonElement, any>(Button) as <T = unknown>(
    props: ButtonProps<T> &
      VariantProps<typeof StyledButton> &
      ButtonVariants & { outerRef?: ForwardedRef<HTMLButtonElement | null> }
  ) => ReactElement
}

// Also export a ready-made Button, for consumers who don't want to customize it
export const Button = getButton()
