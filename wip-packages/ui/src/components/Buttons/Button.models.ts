import type { ReactNode } from "react"
import { AriaButtonProps } from "@react-types/button"
import { CSS } from "../../config/stitches.config"
import {
  DisabledComponentProps,
  i18nIconName,
  IconType,
  PolyUIComponent,
} from "../../shared/models"

type LoadingIconProps = (Labelled | TooltippedProps) & {
  hideTextWhenLoading: true
}

type NonLoadingIconProps = {
  hideTextWhenLoading?: never
}

export type IconProps = (Labelled | TooltippedProps) & {
  children?: never
  iconName: i18nIconName
  iconType?: IconType
  prefixIconName?: never
  prefixIconType?: never
  suffixIconName?: never
  suffixIconType?: never
}

export interface TooltippedProps {
  longPressDescription?: string
  tooltip: string
  "aria-label"?: string
  "aria-labelledby"?: never
}

export interface Labelled {
  tooltip?: string
  "aria-label": string
  "aria-labelledby"?: never
}

export interface TooltipProps {
  longPressDescription?: string
  tooltip: string
}

export interface NonTooltipProps {
  longPressDescription?: never
  tooltip?: never
}

type SideIconProps = {
  children: ReactNode
  prefixIconName?: i18nIconName
  prefixIconType?: IconType
  suffixIconName?: i18nIconName
  suffixIconType?: IconType
}

export type ButtonType = "submit" | "reset" | "button"

export interface NeutronButtonProps extends Omit<AriaButtonProps, "isDisabled"> {
  "aria-label"?: string
  "aria-labelledby"?: string
  active?: boolean
  tooltip?: string
  submit?: boolean
  disabled?: boolean
  loading?: boolean
  excludeFromTabOrder?: boolean
  /** WARNING: This should NOT be used, in most cases. Hides the tooltip hint on touch devices. Use an InfoModeProvider instead! */
  dangerouslyHideTooltipHint?: boolean
  /** WARNING: This should NOT be used, in most cases. Avoids Typescript errors when disabled and missing info props. */
  dangerouslySkipDisabledInfo?: boolean
  type?: ButtonType
}

export type CommonButtonProps<T = unknown> = (TooltipProps | NonTooltipProps) &
  DisabledComponentProps &
  PolyUIComponent<T> &
  NeutronButtonProps

export type ButtonProps<T = unknown> = (LoadingIconProps | NonLoadingIconProps) &
  SideIconProps &
  CommonButtonProps<T>

export type IconButtonProps<T = unknown> = IconProps & CommonButtonProps<T>

export interface ButtonOverrides {
  Button?: CSS
  FocusRing?: CSS
  Pseudo?: CSS
}

export interface GetButtonOptions {
  tooltipHintX?: "side" | "center"
  tooltipHintY?: "top" | "bottom"
}

export type ButtonStylesWithVariants = {
  defaultVariants?: Record<string, unknown> & { variant: string }
}
