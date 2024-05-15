import { FormEvent, ForwardedRef, ReactElement } from "react"
import { useCallback, useEffect, useState } from "react"
import { mergeProps } from "@react-aria/utils"
import { useFocusRing } from "@react-aria/focus"
import { useHover, usePress } from "@react-aria/interactions"
import { PressEvent } from "@react-types/shared"
import { SignedPositionVariant, VariantProps } from "../../../config/stitches.config"
import { DISABLED_ICON_NAME, IconName, IconType, LOADER_ICON_NAME } from "../../../shared/models"
import { isSSR, mergeRefs, omitProps } from "../../../shared/utils"
import { useTooltip } from "../../../hooks"
import { CombinedInputProps } from "../TextField.models"
import { Column } from "../../../primitives"
import { Icon } from "../../Icon/Icon"
import { Tooltip } from "../../Tooltip/Tooltip"

interface FieldProps {
  getFieldHookProps: () => Record<string, unknown>
  innerRef: ForwardedRef<HTMLInputElement | null>
  current: HTMLInputElement | null
  hasValue?: boolean
  iconRight?: keyof SignedPositionVariant
  isStacked?: boolean
}

interface UseInput {
  isDisabled: boolean
  hasIcon: boolean
  errorIcon: ReactElement
  // eslint-disable-next-line
  fieldProps: any
  fieldRef: ForwardedRef<HTMLInputElement>
  fieldIcon: ReactElement
  tooltip: ReactElement
  // eslint-disable-next-line
  wrapperProps: any
  // eslint-disable-next-line
  fieldHookProps: any
  hasError: boolean
  errorMessage?: string
  hasDescription: boolean
  isTouchDevice: boolean
  messageWrapperProps: VariantProps<typeof Column>
}

export function useField<
  // eslint-disable-next-line
  T extends CombinedInputProps,
  F extends FieldProps = FieldProps
>(props: T, fieldProps: F, ref?: ForwardedRef<HTMLInputElement | null>): UseInput {
  const {
    label,
    description,
    error,
    errorOnEmpty,
    disabled = false,
    required = false,
    loading = false,
    tooltip,
    autoFocus,
    longPressDescription,
    defaultValue,
  } = props

  const {
    getFieldHookProps,
    innerRef,
    current,
    hasValue,
    iconRight = "4",
    isStacked = false,
  } = fieldProps

  const isDisabled = !!props["aria-disabled"] || disabled || loading
  const showDisabledIcon = !!props["aria-disabled"] || disabled
  const isLoading = loading && !props["aria-disabled"] && !disabled
  const showLoadingIcon = isLoading
  const ariaLabel =
    props["aria-label"] || (typeof tooltip === "string" && tooltip.length > 0) ? tooltip : undefined
  const tooltipContent = isLoading ? null : tooltip || props["aria-label"]
  const errorMessage = error || errorOnEmpty
  const hasTooltip = !!tooltipContent

  // React Aria
  const { isFocused, focusProps } = useFocusRing({ isTextInput: true, autoFocus })
  const { hoverProps, isHovered } = useHover({})

  // Tooltip
  const { isOpen, isTouchDevice, triggerProps, triggerRef, layerProps } = useTooltip({
    isTargetActive: isFocused || isHovered,
    hasTooltip,
    showOnTouch: true,
    description: longPressDescription,
    direction: "bottom",
    alignment: "start",
  })

  // Callbacks
  const onBeforeInput = useCallback(
    (event: FormEvent<HTMLInputElement>): void => {
      if (isDisabled) {
        event.preventDefault()
      }
    },
    [isDisabled]
  )
  const onPress = useCallback(
    ({ pointerType }: PressEvent): void => {
      const isMouse = pointerType === "mouse" || (!isTouchDevice && pointerType === "virtual")
      if (isDisabled && isMouse) {
        setTimeout(() => current?.blur())
      }
    },
    [isDisabled, isTouchDevice]
  )

  // React Aria (continued)
  const { pressProps } = usePress({ onPress })
  const [isAutoFocused, setIsAutoFocused] = useState<boolean>(false)
  const fieldHookProps = {
    ...getFieldHookProps(),
    autoFocus,
    defaultValue,
    label,
    isRequired: required,
    errorMessage,
    "aria-label": ariaLabel,
    onBeforeInput,
    onBlur: () => setIsAutoFocused(false),
  }

  // Derived state
  const hasFocus = isFocused || isAutoFocused
  const hasError = !!errorMessage && !isDisabled
  const hasDescription = !!description && !isDisabled && !hasError
  const hasIcon = showDisabledIcon || showLoadingIcon

  // Effects
  useEffect(() => {
    const focused = !isSSR && document.activeElement
    const hasFocus = current === focused
    if (autoFocus && hasFocus) {
      setIsAutoFocused(hasFocus)
    }
  }, [current, autoFocus])

  return {
    isDisabled,
    isTouchDevice,
    hasIcon,
    errorIcon: (
      <Icon
        name={IconName.alert}
        mr="2"
        mt="1"
        size="4"
        lineHeight="5"
        inline
        verticalAlign="top"
      />
    ),
    fieldProps: mergeProps(pressProps, focusProps, triggerProps),
    fieldRef: mergeRefs<HTMLInputElement | null>([ref, innerRef, triggerRef]),
    fieldIcon: (
      <>
        {showDisabledIcon && !showLoadingIcon && (
          <Icon
            name={DISABLED_ICON_NAME}
            type={IconType.line}
            forbidden
            size="5"
            position="absolute"
            right={iconRight}
            css={{
              bottom: isStacked
                ? "calc((($sizes$full - $sizes$7) / 2) - $sizes$5 / 2)"
                : "calc((($sizes$full - $sizes$4) / 2) - $sizes$5 / 2)",
            }}
          />
        )}
        {showLoadingIcon && (
          <Icon
            name={LOADER_ICON_NAME}
            forbidden
            size="5"
            position="absolute"
            right={iconRight}
            spin="slower"
            css={{
              bottom: isStacked
                ? "calc((($sizes$full - $sizes$7) / 2) - $sizes$5 / 2)"
                : "calc((($sizes$full - $sizes$4) / 2) - $sizes$5 / 2)",
            }}
          />
        )}
      </>
    ),
    tooltip: <Tooltip content={tooltipContent} isOpen={isOpen} layerProps={layerProps} />,
    wrapperProps: mergeProps(
      omitProps(triggerProps, ...(["color"] as const)),
      omitProps(hoverProps, ...(["color"] as const)),
      { className: hasFocus ? "focused" : isHovered ? "hovered" : "" },
      { className: isDisabled ? "disabled" : "" },
      { className: hasIcon ? "hasIcon" : "" },
      { className: hasValue ? "hasValue" : "" }
    ),
    fieldHookProps,
    hasError,
    errorMessage,
    hasDescription,
    messageWrapperProps: {
      alignItems: "end",
      justifyContent: "start",
      minHeight: "5",
    },
  }
}
