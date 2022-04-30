import type { ReactElement } from "react"
import { useEffect, useContext, forwardRef, useRef } from "react"
import { AriaNumberFieldProps } from "@react-types/numberfield"
import { useNumberFieldState } from "@react-stately/numberfield"
import { useLocale } from "@react-aria/i18n"
import { useNumberField } from "@react-aria/numberfield"
import { mergeProps } from "@react-aria/utils"
import { styled, VariantProps, CSS } from "../../config/stitches.config"
import { IconName, IconType } from "../../shared/models"
import { Column, Text } from "../../primitives"
import {
  descriptionStyles,
  errorStyles,
  labelStyles,
  textFieldStyles,
  wrapperStyles,
} from "./TextField.styles"
import {
  decrementButtonStyles,
  incrementButtonStyles,
  numberFieldStyles,
} from "./NumberField.styles"
import { useField } from "./shared/useField"
import { getIconButton } from ".."
import { PressEvent } from "@react-types/shared"
import { omitProps } from "../../shared/utils"
import { InputFieldOverrides, InputFieldProps } from "./TextField.models"
import { UIContext } from "../../providers/UIProvider"

/** Returns a NumberField component, with style overrides applied at mount time */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getNumberField(styleOverrides?: CSS | InputFieldOverrides, name = "NumberField") {
  // GET STYLE OVERRIDES //////////////////////////////////////////////////////
  const styleKeys = styleOverrides ? Object.keys(styleOverrides) : []
  const ovrKeys = ["Field", "Wrapper", "Label", "Description", "Error"]
  const isCss = styleKeys.some((key: string) => !ovrKeys.includes(key))
  const ovr: Required<InputFieldOverrides> = isCss
    ? {
        Field: styleOverrides as CSS,
        Wrapper: {} as CSS,
        Label: {} as CSS,
        Description: {} as CSS,
        Error: {} as CSS,
      }
    : {
        Field: styleOverrides?.Field || ({} as CSS),
        Wrapper: styleOverrides?.Wrapper || ({} as CSS),
        Label: styleOverrides?.Label || ({} as CSS),
        Description: styleOverrides?.Description || ({} as CSS),
        Error: styleOverrides?.Error || ({} as CSS),
      }

  // GENERATE STYLES //////////////////////////////////////////////////////////
  const StyledNumberField = styled("input", textFieldStyles, numberFieldStyles, ovr.Field, name)
  const Wrapper = styled(Column, wrapperStyles, ovr.Wrapper, name)
  const Label = styled("label", labelStyles, ovr.Label, `${name}_Label`)
  const Increment = getIconButton(incrementButtonStyles, `${name}_Increment`)
  const Decrement = getIconButton(decrementButtonStyles, `${name}_Decrement`)
  const Description = styled(Text, descriptionStyles, ovr.Description, `${name}_Description`)
  const Error = styled(Text, errorStyles, ovr.Error, `${name}_Error`)

  // DEFINE THE COMPONENT /////////////////////////////////////////////////////
  /** Numerical field (input) component */
  const NumberField = forwardRef<
    HTMLInputElement,
    InputFieldProps &
      Omit<AriaNumberFieldProps, "isDisabled"> &
      VariantProps<typeof StyledNumberField>
  >((props, ref): ReactElement => {
    const { label, description, formatOptions, minValue, maxValue, step, ...numberFieldProps } =
      props
    const innerFieldProps = omitProps(
      props,
      ...([
        "label",
        "description",
        "error",
        "errorOnEmpty",
        "disabled",
        "required",
        "loading",
        "tooltip",
        "autoFocus",
        "longPressDescription",
        "formatOptions",
        "defaultValue",
        "minValue",
        "maxValue",
        "step",
        "dangerouslySkipDisabledInfo",
      ] as const)
    )

    const innerRef = useRef<HTMLInputElement | null>(null)
    const getFieldHookProps = () => ({
      ...numberFieldProps,
      formatOptions,
      minValue,
      maxValue,
      step,
      description,
    })

    // Relies on our `useField` hook to avoid code duplication
    const {
      errorIcon,
      isDisabled,
      fieldProps,
      fieldRef,
      fieldIcon,
      tooltip,
      wrapperProps,
      fieldHookProps,
      hasError,
      errorMessage,
      hasDescription,
      messageWrapperProps,
    } = useField(
      props,
      {
        getFieldHookProps,
        iconRight: "9",
        innerRef,
        current: innerRef.current,
        isStacked: props.variant === "stacked",
      },
      ref
    )

    // React Aria
    const { locale } = useLocale()
    const state = useNumberFieldState({ ...fieldHookProps, locale })
    const {
      labelProps,
      incrementButtonProps,
      decrementButtonProps,
      inputProps,
      descriptionProps,
      errorMessageProps,
    } = useNumberField(fieldHookProps, state, innerRef)

    // Translations
    const {
      translations: { incrementNumberField, decrementNumberField, maximumReached, minimumReached },
    } = useContext(UIContext)
    const incrementPrefix = incrementNumberField || "Increment"
    const decrementPrefix = decrementNumberField || "Decrement"
    const maximumMessage = maximumReached || "Maximum value reached"
    const minimumMessage = minimumReached || "Minimum value reached"
    const incrementTooltip =
      state.numberValue === state.maxValue ? maximumMessage : `${incrementPrefix} ${label}`
    const decrementTooltip =
      state.numberValue === state.minValue ? minimumMessage : `${decrementPrefix} ${label}`

    // Variant forwarding
    const colorScheme = hasError ? "error" : numberFieldProps.colorScheme
    const buttonColor = colorScheme === "secondary" ? colorScheme : "primary"
    const { variant, size, contrast } = numberFieldProps

    // Number shifters
    function getShifterProps(props: typeof incrementButtonProps, tip: string) {
      return {
        disabled: !!props.isDisabled || isDisabled,
        excludeFromTabOrder: true,
        onPress: (event: PressEvent) => {
          props.onPressStart?.(event)
          props.onPressEnd?.(event)
          props.onPress?.(event)
        },
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        className: numberFieldProps.borderless ? "borderless" : "hasBorder",
        tooltip: tip,
        dangerouslySkipDisabledInfo: isDisabled,
      }
    }
    const plusProps = getShifterProps(incrementButtonProps, incrementTooltip)
    const minusProps = getShifterProps(decrementButtonProps, decrementTooltip)

    // Derived state
    const inputValue = String(state.inputValue)
    const hasValue = inputValue.length > 0

    // Effects
    useEffect(() => {
      const handleReset = () => {
        state.setInputValue(String(props.minValue || 0))
        state.commit()
      }
      innerRef.current?.addEventListener("reset", handleReset)
      return () => innerRef.current?.removeEventListener("reset", handleReset)
    }, [innerRef.current, props.minValue, state.commit, state.setInputValue])

    // Render output
    return (
      <>
        <Wrapper className="fieldWrapper" variant={variant}>
          <Column
            as="div"
            position="relative"
            {...mergeProps(wrapperProps, { className: hasValue ? "hasValue" : "" })}
          >
            <Label {...mergeProps(labelProps, { colorScheme, contrast, variant, size })}>
              {label}
            </Label>

            <StyledNumberField
              {...mergeProps(innerFieldProps, inputProps, fieldProps, {
                colorScheme,
              })}
              ref={fieldRef}
            />
            {fieldIcon}
            <Increment
              {...plusProps}
              iconName={IconName.arrowUpS}
              size={size}
              variant="ghost"
              colorScheme={buttonColor}
              iconType={IconType.line}
              dangerouslyHideTooltipHint
            />
            <Decrement
              {...minusProps}
              iconName={IconName.arrowDownS}
              size={size}
              variant="ghost"
              colorScheme={buttonColor}
              iconType={IconType.line}
              dangerouslyHideTooltipHint
            />
          </Column>

          <Column {...messageWrapperProps}>
            {hasError && (
              <Error
                as="strong"
                size={size}
                {...omitProps(errorMessageProps, ...(["color"] as const))}
              >
                <>
                  {errorIcon}
                  <span>{errorMessage}</span>
                </>
              </Error>
            )}

            {hasDescription && (
              <Description
                as="em"
                size={size}
                {...omitProps(descriptionProps, ...(["color"] as const))}
              >
                {description}
              </Description>
            )}
          </Column>
        </Wrapper>
        {tooltip}
      </>
    )
  })
  NumberField.displayName = "NumberField"
  return NumberField
}

// Also export a ready-made NumberField, for consumers who don't want to customize it
/** Numerical field (input) component */
export const NumberField = getNumberField()
