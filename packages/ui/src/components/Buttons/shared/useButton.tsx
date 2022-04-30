import type { ReactElement, ForwardedRef } from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import { useButton as useAriaButton } from "@react-aria/button"
import { useFocusRing } from "@react-aria/focus"
import { PressEvent } from "@react-types/shared"
import { mergeProps } from "@react-aria/utils"
import { useLocale } from "@react-aria/i18n"
import { useHover } from "@react-aria/interactions"
import { getRootValueFromTheme, VariantType, CSS } from "../../../config/stitches.config"
import { BGColorNameKeys } from "../../../shared/models"
import { mergeRefs } from "../../../shared/utils"
import { swapVariantValues } from "../../../config"
import { useColors, useTheme, useTooltip } from "../../../hooks"
import { Tooltip } from "../../Tooltip/Tooltip"
import { Box } from "../../../primitives"
import {
  GetButtonOptions,
  ButtonProps,
  IconButtonProps,
  ButtonOverrides,
  ButtonStylesWithVariants,
} from "../Button.models"
import { ButtonType } from "../Button.models"

interface VariantProps {
  colorScheme?: string | unknown
  variant?: string | unknown
  size?: string | unknown
  shape?: string | unknown
  propClass?: string | unknown
}

interface UseButton {
  isDisabled: boolean
  isLoading: boolean
  isFocusVisible: boolean
  buttonProps: unknown
  buttonRef: ForwardedRef<HTMLButtonElement>
  buttonType: ButtonType
  longPressHint: ReactElement
  tooltip: ReactElement
}

export function useButton<
  // eslint-disable-next-line
  T extends ButtonProps | IconButtonProps,
  V extends VariantProps = VariantProps
>(
  props: Partial<T>,
  variantProps: V,
  styleOverrides?: CSS | ButtonOverrides,
  defaultStyles?: CSS & ButtonStylesWithVariants,
  name = "Button",
  outerRef?: ForwardedRef<HTMLButtonElement | null>,
  options = {} as GetButtonOptions
): UseButton {
  const {
    active = false,
    disabled = false,
    loading = false,
    onPress = () => undefined,
    submit = false,
    type = "button",
    tooltip,
    longPressDescription,
    dangerouslyHideTooltipHint,
    dangerouslySkipDisabledInfo = false,
    excludeFromTabOrder = false,
    ...outerProps
  } = props

  const isDisabled = !!props["aria-disabled"] || disabled || loading
  const isLoading = loading && !props["aria-disabled"] && !disabled
  const ariaLabel =
    props["aria-label"] || (typeof tooltip === "string" && tooltip.length > 0) ? tooltip : undefined
  const tooltipContent =
    isLoading || dangerouslySkipDisabledInfo ? null : tooltip || props["aria-label"]
  const hasTooltip = !!tooltipContent
  const showOnTouch = isDisabled
  const ref = useRef<HTMLButtonElement | null>(null)
  const { direction } = useLocale()
  const isLTR = direction === "ltr"
  const { activeTheme, darkTheme } = useTheme()
  const darkClass = darkTheme?.className
  const { isDark } = useColors()
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    isDark || (!!darkClass && !!ref.current?.closest?.(`.${darkClass}`))
  )

  useEffect(() => {
    setIsDarkTheme(isDark || (!!darkClass && !!ref.current?.closest?.(`.${darkClass}`)))
  }, [isDark, ref.current, darkClass])

  // Custom event handler, to avoid "sticky" focus issues
  const pressHandler = useCallback(
    (event: PressEvent): void => {
      if (!isDisabled) {
        onPress(event)
      }
    },
    [onPress, isDisabled]
  )

  // Tooltip //
  const { isOpen, triggerProps, triggerRef, layerProps } = useTooltip({
    hasTooltip,
    showOnTouch,
    description: longPressDescription,
  })
  // Tooltip hint
  const { colorScheme, variant, size, shape, propClass } = variantProps
  const styles = styleOverrides ?? {}
  const buttonStyles: CSS & ButtonStylesWithVariants = styleOverrides?.Button
    ? styleOverrides?.Button
    : styles
  const isDefaultTactile =
    buttonStyles.defaultVariants?.["variant"] === "tactile" ||
    defaultStyles?.defaultVariants?.["variant"] === "tactile"
  const isDefaultSolid =
    buttonStyles.defaultVariants?.["variant"] === "solid" ||
    defaultStyles?.defaultVariants?.["variant"] === "solid"
  const isTactile = (isDefaultTactile && !variant) || variant === "tactile"
  const isSolid = (isDefaultSolid && !variant) || variant === "solid"
  const varShiftX = isTactile ? "2rem" : "0rem"
  const varShiftY = isTactile ? "4rem" : "0rem"
  const isActive = active || String(propClass).toLocaleLowerCase().includes("active")
  const isFilledBg = isTactile || isSolid
  const baseHintOpacity = isDarkTheme ? 0.8 : 0.5
  const pMod = isDarkTheme ? 0.065 : 0.08
  const nMod = isDarkTheme ? -0.6 : -0.25
  const activeMod = isFilledBg ? pMod * 5 : pMod * 3
  const hintMod = {
    active: isActive ? activeMod : 0,
    disabled: isDisabled ? nMod : 0,
    solid: isFilledBg && !isDisabled ? nMod / 1.5 : 0,
  }
  const hintColor = colorScheme === "secondary" ? `secondary9` : `primary9`
  const variantColor = isFilledBg && !isActive ? `neutralMin` : hintColor
  const tooltipHintBg = isDisabled ? `neutralMax` : variantColor
  const tooltipHintOpacity = Math.min(
    1,
    baseHintOpacity + hintMod.active + hintMod.disabled + hintMod.solid
  )
  const baseRadius = getRootValueFromTheme(activeTheme, "radii", "base")
    .replace("rem", "")
    .replace("px", "")
  const buttonRadius = getRootValueFromTheme(activeTheme, "radii", "button")
    .replace("rem", "")
    .replace("px", "")
  const isRounded = parseInt(buttonRadius) > 10 || parseInt(baseRadius) > 10
  const isHintCentered = options.tooltipHintX === "center" || shape === "pill" || isRounded
  const shiftSmall = isHintCentered ? "1.5rem" : "2rem"
  const shiftMedium = isHintCentered ? "2rem" : "3rem"
  const shiftSide = size === "small" || size === "tiny" ? shiftSmall : shiftMedium
  const hintShiftX = isHintCentered ? "calc(50% - ($$size / 2))" : shiftSide
  const isTopHint = options.tooltipHintY === "top"
  const hintShiftY = shiftSide

  // React Aria //
  const { isFocusVisible, focusProps } = useFocusRing()
  const { hoverProps, isHovered } = useHover({})
  const { buttonProps } = useAriaButton(
    {
      ...props,
      excludeFromTabOrder,
      onPress: pressHandler,
      "aria-label": ariaLabel,
      isDisabled: false,
    },
    ref
  )
  const activeClassName = active ? "active " : ""
  const disabledClassName = isDisabled ? "disabled " : ""
  const className = `${activeClassName}${disabledClassName}`

  // Derived state
  const darkVariant =
    isDefaultTactile && !variant
      ? "tactileDarkMode"
      : swapVariantValues(variant as VariantType, "tactile", "tactileDarkMode")
  const safeVariant = isDarkTheme
    ? darkVariant
    : swapVariantValues(variant as VariantType, "tactileDarkMode", "tactile")

  return {
    isDisabled,
    isLoading,
    isFocusVisible,
    buttonProps: mergeProps(
      outerProps,
      buttonProps,
      triggerProps,
      hoverProps,
      focusProps,
      { className, "aria-disabled": isDisabled, variant: safeVariant },
      { className: name },
      { className: isFocusVisible ? "focused" : "" },
      { className: isHovered ? "hovered" : "" }
    ),
    buttonRef: mergeRefs<HTMLButtonElement | null>([ref, outerRef, triggerRef]),
    buttonType: submit ? "submit" : type,
    longPressHint: (
      <Box
        className="tooltip-hint-wrapper"
        position="absolute"
        css={{
          left: "calc(($borderWidths$base / 2) * -1)",
          top: "calc(($borderWidths$base / 2) * -1)",
          h: "calc($full + $borderWidths$base)",
          w: "calc($full + $borderWidths$base)",
          opacity: 0.5,
          overflow: isHintCentered ? "hidden" : "visible",
          pointerEvents: "none",
        }}
      >
        <Box
          as="span"
          className="tooltip-hint"
          bg={tooltipHintBg as BGColorNameKeys}
          radius="round"
          position="absolute"
          css={{
            $$size: "4px",
            $$shiftX: `calc(${hintShiftX} + ${varShiftX})`,
            $$shiftY: `calc(${hintShiftY} + ${varShiftY})`,
            display: "none",
            h: "$$size",
            w: "$$size",
            left: isLTR ? "$$shiftX" : "unset",
            opacity: tooltipHintOpacity,
            right: isLTR ? "unset" : "$$shiftX",
            bottom: isTopHint ? "unset" : "$$shiftY",
            top: isTopHint ? "$$shiftY" : "unset",
            "@touch": {
              display: hasTooltip && !dangerouslyHideTooltipHint ? "block" : "none",
            },
          }}
        />
      </Box>
    ),
    tooltip: <Tooltip content={tooltipContent} isOpen={isOpen} layerProps={layerProps} />,
  }
}
