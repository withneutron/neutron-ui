import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react"
export { Locale } from "locale-enum"

export interface UIComponent {
  hasError?: boolean
  hasGuide?: boolean
  isBusy?: boolean
}

export type PolyUIComponent<T = unknown> = HTMLAttributes<HTMLElement> & {
  as?: ForwardRefExoticComponent<T & RefAttributes<any>>
  to?: string
  hasError?: boolean
  hasGuide?: boolean
  isBusy?: boolean
}

export interface DisabledLabelled {
  "aria-label": string
  longPressDescription?: string
  tooltip?: never
}

export interface DisabledTipped {
  "aria-label"?: never
  longPressDescription?: string
  tooltip: string
}

export type DisabledProps = (DisabledLabelled | DisabledTipped) &
  (
    | {
        disabled: boolean
        "aria-disabled"?: never
      }
    | {
        loading: boolean
        "aria-disabled"?: never
      }
  )

export type AriaDisabledProps = (DisabledLabelled | DisabledTipped) & {
  disabled?: never
  "aria-disabled": boolean
}

export type SkippedDisabledInfoProps = {
  loading?: boolean
  disabled?: boolean
  "aria-disabled"?: boolean
  dangerouslySkipDisabledInfo: boolean
  "aria-label"?: never
  longPressDescription?: never
  tooltip?: never
}

export interface NotDisabledProps {
  loading?: never
  disabled?: never
  "aria-disabled"?: never
}

export type DisabledComponentProps =
  | DisabledProps
  | AriaDisabledProps
  | NotDisabledProps
  | SkippedDisabledInfoProps

export type AllOrNone<T> = T | { [K in keyof T]?: never }

export type ClientElement =
  | HTMLElement
  | HTMLBaseElement
  | HTMLBodyElement
  | HTMLDivElement
  | HTMLFormElement
  | HTMLHtmlElement
  | HTMLUListElement
  | HTMLOListElement
  | null
