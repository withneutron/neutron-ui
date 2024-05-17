import type { Reducer } from "react"
import { useReducer, useState } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import {
  ColorMode,
  mapConditions,
  queryConditionsMap,
  BreakpointOverrides,
  Direction,
  observerConditionsMap,
} from "@withneutron/quarks"
import { useMutationObserver } from "../hooks/useMutationObserver"
import { isSSR } from "../shared/utils"
import { useResizeObserver } from "../hooks/useResizeObserver"

const DEFAULT_RESPONSIVE_CONDITIONS = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
}

type ResponsiveConditionsState = {
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
}

type ResponsiveConditionAction = {
  width: number
  overrides?: BreakpointOverrides | Record<string, any>
}

function responsiveConditionsReducer<S extends ResponsiveConditionsState, A extends ResponsiveConditionAction>(
  state: S,
  action: A
) {
  const { overrides = {}, width } = action
  const xs = width <= (Number.isFinite(overrides.xs) ? overrides.xs : observerConditionsMap.xs)
  const sm = width <= (Number.isFinite(overrides.sm) ? overrides.sm : observerConditionsMap.sm)
  const md = width <= (Number.isFinite(overrides.md) ? overrides.md : observerConditionsMap.md)
  const lg = width <= (Number.isFinite(overrides.lg) ? overrides.lg : observerConditionsMap.lg)
  const xl = width <= (Number.isFinite(overrides.xl) ? overrides.xl : observerConditionsMap.xl)
  const newState = {
    xs: state.xs,
    sm: state.sm,
    md: state.md,
    lg: state.lg,
    xl: state.xl,
  }
  let hasChanged = false

  if (xs !== state.xs) {
    newState.xs = xs
    hasChanged = true
  }
  if (sm !== state.sm) {
    newState.sm = sm
    hasChanged = true
  }
  if (md !== state.md) {
    newState.md = md
    hasChanged = true
  }
  if (lg !== state.lg) {
    newState.lg = lg
    hasChanged = true
  }
  if (xl !== state.xl) {
    newState.xl = xl
    hasChanged = true
  }

  return hasChanged ? newState : state
}

export function useContextConditions(
  colorMode: ColorMode,
  isMobile = false,
  isDebugMode = false,
  overrides: BreakpointOverrides | Record<string, unknown> = {}
) {
  overrides = overrides ?? {}

  // Track responsive conditions
  const [responsiveConditions, setResponsiveConditions] = useReducer<
    Reducer<ResponsiveConditionsState, ResponsiveConditionAction>
  >(responsiveConditionsReducer, DEFAULT_RESPONSIVE_CONDITIONS)

  useResizeObserver(isSSR ? null : document.documentElement, ([{ width }]) => {
    setResponsiveConditions({ overrides, width })
  })

  // Track media queries
  const hightContrast = useMediaQuery(queryConditionsMap.hightContrast, false)
  const lowMotion = useMediaQuery(queryConditionsMap.lowMotion, false)
  const lowData = useMediaQuery(queryConditionsMap.lowData, false)
  const touch = useMediaQuery(queryConditionsMap.touch, isMobile)
  const pointer = useMediaQuery(queryConditionsMap.pointer, false)
  const tv = useMediaQuery(queryConditionsMap.tv, false)

  // Calculate locale (writing) direction
  const [direction, setDirection] = useState<Direction>(
    isSSR ? "ltr" : document.documentElement.dir === "rtl" ? "rtl" : "ltr"
  )
  useMutationObserver(
    isSSR ? null : document.documentElement,
    mutations => {
      mutations.forEach(mutation => {
        const dir = ((mutation.target as HTMLElement).dir ?? "ltr") as Direction
        setDirection(dir)
      })
    },
    {
      attributes: true,
      attributeFilter: ["dir"],
    }
  )

  return mapConditions(
    {
      xs: responsiveConditions.xs,
      sm: responsiveConditions.sm,
      md: responsiveConditions.md,
      lg: responsiveConditions.lg,
      xl: responsiveConditions.xl,
      hightContrast,
      lowMotion,
      lowData,
      touch,
      pointer,
      tv,
    },
    colorMode,
    isDebugMode,
    direction
  )
}
