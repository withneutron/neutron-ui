import { AriaTextFieldOptions } from "@react-aria/textfield"
import { AriaNumberFieldProps } from "@react-types/numberfield"
import { AriaSearchFieldProps } from "@react-types/searchfield"
import { CSS } from "../../config/stitches.config"
import { DisabledComponentProps, UIComponent } from "../../shared/models"

interface BaseInputFieldProps {
  label: string
  error?: string
  errorOnEmpty?: string
  tooltip?: string
  description?: string
  disabled?: boolean
  required?: boolean
  loading?: boolean
  autoFocus?: boolean
  longPressDescription?: string
}

export type InputFieldProps = DisabledComponentProps & BaseInputFieldProps & UIComponent

export type CombinedInputProps = InputFieldProps &
  (
    | Omit<AriaTextFieldOptions<"input">, "isDisabled">
    | Omit<AriaNumberFieldProps, "isDisabled">
    | Omit<AriaSearchFieldProps, "isDisabled">
  )

export interface InputFieldOverrides {
  Field?: CSS
  Wrapper?: CSS
  Label?: CSS
  Description?: CSS
  Error?: CSS
}
