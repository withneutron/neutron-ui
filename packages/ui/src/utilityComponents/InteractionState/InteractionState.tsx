import type {
  FocusEvent,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
} from "react"
import { useCallback, useState } from "react"
import { useFocus, useFocusWithin, useHover } from "@react-aria/interactions"
import { HoverEvent } from "@react-types/shared"

export interface ElementInteractionState {
  isFocused: boolean
  isHovered: boolean
  focusProps: HTMLAttributes<HTMLElement>
  hoverProps: HTMLAttributes<HTMLElement>
}

interface InteractionStateProps<T = unknown> {
  children: (state: ElementInteractionState) => ReactElement
  as?: ForwardRefExoticComponent<T & RefAttributes<any>>
  wrapperProps?: Record<string, unknown>
  focusWithin?: boolean
  forceTabIndex?: boolean
  onFocus?: (event: FocusEvent<Element>) => void
  onBlur?: (event: FocusEvent<Element>) => void
  onFocusChange?: (isFocused: boolean) => void
  onHoverStart?: (event: HoverEvent) => void
  onHoverEnd?: (event: HoverEvent) => void
  onHoverChange?: (isFocused: boolean) => void
}

export function InteractionState({
  as,
  children,
  wrapperProps = {},
  focusWithin = false,
  forceTabIndex = false,
  onFocus = () => undefined,
  onBlur = () => undefined,
  onFocusChange = () => undefined,
  onHoverStart = () => undefined,
  onHoverEnd = () => undefined,
  onHoverChange = () => undefined,
}: InteractionStateProps): ReactElement {
  const [isFocused, setisFocused] = useState<boolean>(false)

  const focusHandler = useCallback(
    (event: FocusEvent<Element>) => {
      onFocus(event)
      setisFocused(true)
    },
    [onFocus]
  )
  const blurHandler = useCallback(
    (event: FocusEvent<Element>) => {
      onBlur(event)
      setisFocused(false)
    },
    [onBlur]
  )
  const focusChangeHandler = useCallback(
    (isFocused: boolean) => {
      onFocusChange(isFocused)
      setisFocused(isFocused)
    },
    [onFocusChange]
  )

  const { focusProps: focusPropsBase } = useFocus({
    onFocus: focusHandler,
    onBlur: blurHandler,
    onFocusChange: focusChangeHandler,
  })
  const { focusWithinProps } = useFocusWithin({
    onFocusWithin: focusHandler,
    onBlurWithin: blurHandler,
    onFocusWithinChange: focusChangeHandler,
  })
  const { hoverProps, isHovered } = useHover({
    onHoverStart,
    onHoverEnd,
    onHoverChange,
  })
  const focusProps = focusWithin ? focusWithinProps : focusPropsBase

  if (forceTabIndex && focusProps.tabIndex === undefined) {
    focusProps.tabIndex = 1
  }

  const Wrapper = as || "div"
  const child = children({
    isFocused,
    isHovered,
    focusProps,
    hoverProps,
  })
  return as ? (
    <Wrapper {...wrapperProps} {...focusProps} {...hoverProps}>
      <>{child}</>
    </Wrapper>
  ) : (
    child
  )
}
InteractionState.displayName = "InteractionState"
