import type { ReactElement, ReactNode } from "react"
import { Arrow, UseLayerProps } from "react-laag"
import { animate, BorderWidths, CSS, styled } from "../../config/stitches.config"
import { Text } from "../../primitives"
import { useTheme } from "../../hooks"
import { BGWithTextColorNameKeys } from "../../shared/models"
import { capitalizeFirstLetter } from "../../shared/utils"
import { tooltipStyles, tooltipArrowStyles } from "./Tooltip.styles"

interface TooltipProps {
  layerProps: UseLayerProps
  content?: ReactNode
  isOpen?: boolean
}

interface GetTooltipOptions {
  backgroundColorKey?: BGWithTextColorNameKeys
  borderColorKey?: BGWithTextColorNameKeys
  borderWidthKey?: BorderWidths
  arrowAngle?: 40 | 45 | 50 | 55 | 60
  arrowSize?: 4 | 6 | 8 | 10
  arrowRoundness?: 0 | 0.25 | 0.5 | 0.75 | 1
}

/** Returns a Tooltip component, with style overrides applied at mount time */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getTooltip(
  styleOverrides: CSS = {},
  name = "Tooltip",
  options?: GetTooltipOptions
) {
  const {
    backgroundColorKey = "neutral11",
    borderColorKey,
    borderWidthKey,
    arrowAngle = 50,
    arrowSize = 6,
    arrowRoundness = 1,
  } = options || {}
  // GENERATE STYLES //////////////////////////////////////////////////////////
  const StyledTooltip = styled(
    Text,
    tooltipStyles,
    {
      bg: `$${backgroundColorKey}`,
      color: `$text${capitalizeFirstLetter(backgroundColorKey)}`,
    },
    styleOverrides,
    name
  )
  const StyledArrow = styled(Arrow, tooltipArrowStyles, `${name}_Arrow`)
  const StyledAnimation = styled("div", {
    ...animate({
      "0%": {
        opacity: "0",
        transform: "translate3d(0, 100%, 0)",
      },
      "100%": {
        opacity: "1",
        transform: "translate3d(0, 0, 0)",
      },
    }),
  })

  // DEFINE THE COMPONENT /////////////////////////////////////////////////////
  /** Info popup component; MUST only contain NON-INTERACTIVE text elements */
  function Tooltip({ layerProps, content, isOpen = false }: TooltipProps): ReactElement | null {
    const { activeTheme } = useTheme()
    const arrowBg = activeTheme.colors[backgroundColorKey]?.value
    const arrowBorder = borderColorKey ? activeTheme.colors[borderColorKey]?.value : undefined
    const arrowBorderWidth = borderWidthKey
      ? activeTheme.borderWidths[String(borderWidthKey) as keyof typeof activeTheme.borderWidths]
          ?.value ?? "0"
      : "0"

    const { layerProps: innerLayerProps, arrowProps, renderLayer } = layerProps
    return isOpen && !!content
      ? renderLayer(
          <StyledAnimation>
            <StyledTooltip
              as="span"
              borderWidth={borderColorKey ? "2" : "none"}
              borderColor={borderColorKey}
              {...innerLayerProps}
            >
              <>
                {content}
                <StyledArrow
                  backgroundColor={arrowBg}
                  borderColor={arrowBorder}
                  borderWidth={parseInt(arrowBorderWidth)}
                  size={arrowSize}
                  roundness={arrowRoundness}
                  angle={arrowAngle}
                  {...arrowProps}
                />
              </>
            </StyledTooltip>
          </StyledAnimation>
        )
      : null
  }
  Tooltip.displayName = "Tooltip"
  return Tooltip
}

// Also export a ready-made Tooltip, for consumers who don't want to customize it
/** Info popup component; MUST only contain NON-INTERACTIVE text elements. */
export const Tooltip = getTooltip()
