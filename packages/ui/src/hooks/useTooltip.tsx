import type { HTMLAttributes } from "react"
import { useState, useRef, useContext, useMemo, useEffect } from "react"
import { useFocus, useHover, useLongPress, usePress } from "@react-aria/interactions"
import { mergeProps } from "@react-aria/utils"
import { useLocale } from "@react-aria/i18n"
import type { RefCallback } from "react-laag/dist/types"
import { useLayer, DisappearType, UseLayerProps } from "react-laag"
import { UIContext } from "../providers/UIProvider"

type TriggerProps = HTMLAttributes<HTMLElement>
type Alignment = "start" | "center" | "end"

interface UseTooltipProps {
  isTargetActive?: boolean
  hasTooltip: boolean
  delay?: number
  description?: string
  direction?: "top" | "bottom" | "left" | "right"
  alignment?: Alignment
  showOnTouch?: boolean
}

interface UseTooltip {
  isOpen: boolean
  isTouchDevice: boolean
  triggerProps: TriggerProps
  layerProps: UseLayerProps
  triggerRef: RefCallback
}

/** Hook for managing tooltip state, in an accessible manner */
export function useTooltip({
  isTargetActive = false,
  hasTooltip,
  delay,
  description,
  direction = "top",
  alignment = "center",
  showOnTouch = false,
}: UseTooltipProps): UseTooltip {
  const {
    isTouchDevice,
    translations: { tooltipLongPressDescription, tooltipPressDescription },
    constants: { notificationRevealDelay },
  } = useContext(UIContext)
  const isPressable = showOnTouch && isTouchDevice
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const translated = isPressable ? tooltipPressDescription : tooltipLongPressDescription
  const debounce = useRef<NodeJS.Timeout>()

  const revealDelay = delay ?? notificationRevealDelay

  // FOCUS //
  const { focusProps } = useFocus({
    onFocus: () => {
      if (!isTouchDevice) {
        setIsEnabled(true)
      }
    },
    onBlur: () => setIsEnabled(false),
  })

  // HOVER //
  const { hoverProps, isHovered } = useHover({
    onHoverStart: () => {
      if (!isTouchDevice) {
        setIsEnabled(true)
      }
    },
    onHoverEnd: () => setIsEnabled(false),
  })

  // LONG PRESS //
  const accessibilityDescription = useMemo(() => {
    const fallbackDescription = `${
      isPressable ? "Press" : "Long press"
    } on this control for additional information`
    return !hasTooltip ? undefined : description || translated || fallbackDescription
  }, [hasTooltip, isPressable, description, translated])
  const { longPressProps } = useLongPress({
    accessibilityDescription,
    onLongPress: () => {
      setIsEnabled(true)
      setIsPressed(true)
    },
  })

  // PRESS //
  const { pressProps } = usePress({
    onPress: () => {
      if (isPressable) {
        setIsPressed(currentlyPressed => !currentlyPressed)
      }
    },
    onPressUp: () => {
      if (!isPressable) {
        setIsEnabled(false)
        setIsPressed(false)
      }
    },
  })

  // Allow for delayed opening
  useEffect(() => {
    const newState = (isEnabled || isHovered || isPressed || isTargetActive) && hasTooltip
    if (revealDelay <= 0 || !newState) {
      debounce.current && clearTimeout(debounce.current)
      setIsOpen(newState)
    } else {
      debounce.current = setTimeout(() => {
        setIsOpen((isEnabled || isHovered || isPressed || isTargetActive) && hasTooltip)
      }, revealDelay)
    }
    return () => {
      debounce.current && clearTimeout(debounce.current)
    }
  }, [isEnabled, isHovered, isPressed, isTargetActive, hasTooltip, revealDelay])

  // Close when the component unmounts
  useEffect(() => {
    setIsOpen(false)
  }, [])

  // Setup tooltip layer
  const { direction: dir } = useLocale()
  const isLTR = dir === "ltr"
  const alignRtl: Record<string, Alignment> = { start: "end", center: "center", end: "start" }
  const horizontal = isLTR ? alignment : alignRtl[alignment]
  const layerProps = useLayer({
    isOpen,
    auto: true,
    containerOffset: 20,
    triggerOffset: 9,
    overflowContainer: false,
    placement: `${direction}-${horizontal}`,
    possiblePlacements: [
      "bottom-start",
      "bottom-end",
      "bottom-center",
      "top-start",
      "top-center",
      "top-end",
      "left-center",
      "right-center",
    ],
    onDisappear: (disappearType: DisappearType) => {
      if (disappearType === "full") {
        setIsEnabled(false)
        if (isPressable) {
          setIsPressed(false)
        }
      }
    },
    onOutsideClick: () => {
      setIsEnabled(false)
      if (isPressable) {
        setIsPressed(false)
      }
    },
  })

  useEffect(() => {
    setIsPressed(false)
  }, [isPressable])

  return {
    isOpen,
    isTouchDevice,
    triggerProps: mergeProps(focusProps, hoverProps, longPressProps, pressProps),
    triggerRef: layerProps.triggerProps.ref,
    layerProps,
  }
}
