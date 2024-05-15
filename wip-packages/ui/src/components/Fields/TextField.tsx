import type { FormEvent, ReactElement } from "react"
import { forwardRef, useState, useRef, useCallback, useEffect } from "react"
import { AriaTextFieldOptions, useTextField } from "@react-aria/textfield"
import { mergeProps } from "@react-aria/utils"
import { styled, VariantProps, CSS } from "../../config/stitches.config"
import { Column, Text } from "../../primitives"
import {
  descriptionStyles,
  errorStyles,
  labelStyles,
  textFieldStyles,
  wrapperStyles,
} from "./TextField.styles"
import { omitProps } from "../../shared/utils"
import { InputFieldOverrides, InputFieldProps } from "./TextField.models"
import { useField } from "./shared/useField"

/** Returns a TextField component, with style overrides applied at mount time */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getTextField(styleOverrides?: CSS | InputFieldOverrides, name = "TextField") {
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
  const StyledTextField = styled("input", textFieldStyles, ovr.Field, name)
  const Wrapper = styled(Column, wrapperStyles, ovr.Wrapper, name)
  const Label = styled("label", labelStyles, ovr.Label, `${name}_Label`)
  const Description = styled(Text, descriptionStyles, ovr.Description, `${name}_Description`)
  const Error = styled(Text, errorStyles, ovr.Error, `${name}_Error`)

  // DEFINE THE COMPONENT /////////////////////////////////////////////////////
  /** Basic text field (input) component */
  const TextField = forwardRef<
    HTMLInputElement,
    InputFieldProps &
      Omit<AriaTextFieldOptions<"input">, "isDisabled"> &
      VariantProps<typeof StyledTextField>
  >((props, ref): ReactElement => {
    const { label, description, defaultValue, ...textFieldProps } = props
    const innerFieldProps = omitProps(
      props,
      ...([
        "loading",
        "error",
        "errorOnEmpty",
        "disabled",
        "required",
        "autoFocus",
        "longPressDescription",
        "dangerouslySkipDisabledInfo",
      ] as const)
    )

    const [hasValue, setHasValue] = useState<boolean>(!!defaultValue)
    const innerRef = useRef<HTMLInputElement | null>(null)
    const onChange = useCallback((event: FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement
      const value = String(target.value)
      setHasValue(value.length > 0)
    }, [])
    const getFieldHookProps = () => ({
      ...textFieldProps,
      onInput: onChange,
    })

    // Relies on our `useField` hook to avoid code duplication
    const {
      errorIcon,
      fieldProps,
      fieldRef,
      fieldIcon,
      tooltip,
      wrapperProps,
      fieldHookProps,
      hasError,
      errorMessage,
      hasDescription,
    } = useField(
      props,
      {
        getFieldHookProps,
        hasValue,
        innerRef,
        current: innerRef.current,
        isStacked: props.variant === "stacked",
      },
      ref
    )

    // React Aria
    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      fieldHookProps,
      innerRef
    )

    // Variant forwarding
    const colorScheme = hasError ? "error" : props.colorScheme
    const { variant, size, contrast } = props

    // Effects
    useEffect(() => {
      const handleReset = () => setHasValue(false)
      innerRef.current?.addEventListener("reset", handleReset)
      return () => innerRef.current?.removeEventListener("reset", handleReset)
    }, [innerRef.current])

    // Render output
    return (
      <>
        <Wrapper className="fieldWrapper" variant={variant}>
          <Column as="div" position="relative" {...wrapperProps}>
            <Label {...mergeProps(labelProps, { colorScheme, contrast, variant, size })}>
              {label}
            </Label>

            <StyledTextField
              {...mergeProps(innerFieldProps, inputProps, fieldProps, {
                colorScheme,
              })}
              ref={fieldRef}
            />
            {fieldIcon}
          </Column>

          <Column alignItems="end" justifyContent="start" minHeight="5">
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
  TextField.displayName = "TextField"
  return TextField
}

// Also export a ready-made TextField, for consumers who don't want to customize it
/** Basic text field (input) component */
export const TextField = getTextField()
