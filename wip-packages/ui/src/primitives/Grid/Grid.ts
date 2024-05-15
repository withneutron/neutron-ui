import {
  styled,
  generateVariantSequence,
  SizeVariantsFull,
  SizeVariantsHalf,
  CSS,
} from "../../config/stitches.config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

type RepeatVariant = Omit<SizeVariantsHalf, "0" | "1">
type FillVariant = Omit<
  SizeVariantsFull,
  "0" | "1" | "2" | "3" | "4" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30"
>
type HorizontalPanelNumber = 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25
type VerticalPanelNumber = 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25
type HorizontalPanelSide = "left" | "right"
type VerticalPanelSide = "top" | "bottom"
type HorizontalPanelKey = `${HorizontalPanelSide}-${HorizontalPanelNumber}`
type VerticalPanelKey = `${VerticalPanelSide}-${VerticalPanelNumber}`
type HorizontalPanel = {
  [key in HorizontalPanelKey]: CSS
}
type VerticalPanel = {
  [key in VerticalPanelKey]: CSS
}
type HorizontalPanelsKey = `${HorizontalPanelNumber}-${HorizontalPanelNumber}`
type VerticalPanelsKey = `${VerticalPanelNumber}-${VerticalPanelNumber}`
type HorizontalPanels = {
  [key in HorizontalPanelsKey]: CSS
}
type VerticalPanels = {
  [key in VerticalPanelsKey]: CSS
}

type HorizontalSplitSemanticKey =
  | "half-half"
  | "quarter-threeQuarters"
  | "threeQuarters-quarter"
  | "third-twoThirds"
  | "twoThirds-third"
type HorizontalSplitKey =
  | `${HorizontalPanelNumber}-${HorizontalPanelNumber}`
  | HorizontalSplitSemanticKey
type VerticalSplitKey = `${VerticalPanelNumber}-${VerticalPanelNumber}` | HorizontalSplitSemanticKey
type HorizontalSplit = {
  [key in HorizontalSplitKey]: CSS
}
type VerticalSplit = {
  [key in VerticalSplitKey]: CSS
}

const HORIZONTAL_ASIDE_NUMBERS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
const VERTICAL_ASIDE_NUMBERS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

// GET 2-PANEL VARIANTS
function getHorizontalPanel(): HorizontalPanel {
  return HORIZONTAL_ASIDE_NUMBERS.reduce((output: HorizontalPanel, panel: number) => {
    output[`left-${panel}` as keyof HorizontalPanel] = { gridTemplateColumns: `$${panel} 1fr` }
    output[`right-${panel}` as keyof HorizontalPanel] = { gridTemplateColumns: `1fr $${panel}` }
    return output
  }, {} as HorizontalPanel)
}
function getVerticalPanel(): VerticalPanel {
  return VERTICAL_ASIDE_NUMBERS.reduce((output: VerticalPanel, panel: number) => {
    output[`top-${panel}` as keyof VerticalPanel] = { gridTemplateRows: `$${panel} auto` }
    output[`bottom-${panel}` as keyof VerticalPanel] = { gridTemplateRows: `auto $${panel}` }
    return output
  }, {} as VerticalPanel)
}

// GET 3-PANEL VARIANTS
function getHorizontalPanels(): HorizontalPanels {
  return HORIZONTAL_ASIDE_NUMBERS.reduce((output: HorizontalPanels, firstPanel: number) => {
    HORIZONTAL_ASIDE_NUMBERS.forEach((lastPanel: number) => {
      output[`${firstPanel}-${lastPanel}` as keyof HorizontalPanels] = {
        gridTemplateColumns: `minmax(min($${firstPanel}, $quarter), $${firstPanel})
          minmax(min(max($${firstPanel}, $${lastPanel}), $half), 1fr)
          minmax(min($${lastPanel}, $quarter), $${lastPanel})`,
      }
    })
    return output
  }, {} as HorizontalPanels)
}
function getVerticalPanels(): VerticalPanels {
  return VERTICAL_ASIDE_NUMBERS.reduce((output: VerticalPanels, firstPanel: number) => {
    VERTICAL_ASIDE_NUMBERS.forEach((lastPanel: number) => {
      output[`${firstPanel}-${lastPanel}` as keyof VerticalPanels] = {
        gridTemplateRows: `$${firstPanel} auto $${lastPanel}`,
      }
    })
    return output
  }, {} as VerticalPanels)
}

// GET SPLIT VARIANTS
function getHorizontalSplit(): HorizontalSplit {
  return HORIZONTAL_ASIDE_NUMBERS.reduce((output: HorizontalSplit, firstPanel: number) => {
    HORIZONTAL_ASIDE_NUMBERS.forEach((lastPanel: number) => {
      output[`${firstPanel}-${lastPanel}` as keyof HorizontalSplit] = {
        gridTemplateColumns: `$${firstPanel} $${lastPanel}`,
      }
    })
    return output
  }, {} as HorizontalSplit)
}
function getVerticalSplit(): VerticalSplit {
  return VERTICAL_ASIDE_NUMBERS.reduce((output: VerticalSplit, firstPanel: number) => {
    VERTICAL_ASIDE_NUMBERS.forEach((lastPanel: number) => {
      output[`${firstPanel}-${lastPanel}` as keyof VerticalSplit] = {
        gridTemplateRows: `$${firstPanel} $${lastPanel}`,
      }
    })
    return output
  }, {} as VerticalSplit)
}

const StyledGrid = styled(
  Box,
  {
    display: "grid",
    variants: {
      justifyItems: {
        center: { justifyItems: "center" },
        end: { justifyItems: "end" },
        start: { justifyItems: "start" },
        stretch: { justifyItems: "stretch" },
      },
      alignItems: {
        center: { alignItems: "center" },
        end: { alignItems: "end" },
        start: { alignItems: "start" },
        stretch: { alignItems: "stretch" },
      },
      placeItems: {
        center: { placeItems: "center" },
        centerEnd: { placeItems: "center end" },
        centerStart: { placeItems: "center start" },
        centerStretch: { placeItems: "center stretch" },
        endCenter: { placeItems: "end center" },
        end: { placeItems: "end" },
        endStart: { placeItems: "end start" },
        endStretch: { placeItems: "end stretch" },
        startCenter: { placeItems: "start center" },
        startEnd: { placeItems: "start end" },
        start: { placeItems: "start" },
        startStretch: { placeItems: "start stretch" },
        stretchCenter: { placeItems: "stretch center" },
        stretchEnd: { placeItems: "stretch end" },
        stretchStart: { placeItems: "stretch start" },
        stretch: { placeItems: "stretch" },
      },
      justifyContent: {
        left: { justifyContent: "left" },
        right: { justifyContent: "right" },
        center: { justifyContent: "center" },
        end: { justifyContent: "end" },
        spaceAround: { justifyContent: "space-around" },
        spaceBetween: { justifyContent: "space-between" },
        spaceEvenly: { justifyContent: "space-evenly" },
        start: { justifyContent: "start" },
        stretch: { justifyContent: "stretch" },
      },
      alignContent: {
        center: { alignContent: "center" },
        end: { alignContent: "end" },
        spaceAround: { alignContent: "space-around" },
        spaceBetween: { alignContent: "space-between" },
        spaceEvenly: { alignContent: "space-evenly" },
        start: { alignContent: "start" },
        stretch: { alignContent: "stretch" },
      },
      placeContent: {
        center: { placeContent: "center" },
        end: { placeContent: "end" },
        spaceAround: { placeContent: "space-around" },
        spaceBetween: { placeContent: "space-between" },
        spaceEvenly: { placeContent: "space-evenly" },
        start: { placeContent: "start" },
        stretch: { placeContent: "stretch" },
      },
      flow: {
        column: { gridAutoFlow: "column" },
        dense: { gridAutoFlow: "dense" },
        row: { gridAutoFlow: "row" },
      },
      /** Repeater with dynamically-sized, static number of columns AND rows */
      repeat: generateVariantSequence<RepeatVariant>(
        11,
        (n: number) => ({ gridTemplate: `repeat(${n}, 1fr) / repeat(${n}, 1fr)` }),
        2
      ),
      /** Repeater with dynamically-sized, static number of columns */
      columnRepeat: generateVariantSequence<RepeatVariant>(
        11,
        (n: number) => ({ gridTemplateColumns: `repeat(${n}, 1fr)` }),
        2
      ),
      /** Repeater with dynamically-sized, static number of rows */
      rowRepeat: generateVariantSequence<RepeatVariant>(
        11,
        (n: number) => ({ gridTemplateRows: `repeat(${n}, 1fr)` }),
        2
      ),
      /** Repeater with statically-sized, automatic columns */
      columnFill: generateVariantSequence<FillVariant>(
        15,
        (n: number) => ({ gridTemplateColumns: `repeat(auto-fill, minmax($sizes$${n}, 1fr))` }),
        4
      ),
      /** Repeater with statically-sized, automatic rows */
      rowFill: generateVariantSequence<FillVariant>(
        15,
        (n: number) => ({ gridTemplateRows: `repeat(auto-fill, minmax($sizes$${n}, 1fr))` }),
        4
      ),
      /** Repeater with dynamically-sized, automatic columns */
      columnFit: generateVariantSequence<FillVariant>(
        15,
        (n: number) => ({ gridTemplateColumns: `repeat(auto-fit, minmax($sizes$${n}, 1fr))` }),
        4
      ),
      /** Repeater with dynamically-sized, automatic rows */
      rowFit: generateVariantSequence<FillVariant>(
        15,
        (n: number) => ({ gridTemplateRows: `repeat(auto-fit, minmax($sizes$${n}, 1fr))` }),
        4
      ),
      rowAuto: generateVariantSequence<FillVariant>(
        15,
        (n: number) => ({ gridAutoRows: `$sizes$${n}` }),
        4
      ),
      gap: {
        ...generateVariantSequence<SizeVariantsHalf>(13, (n: number) => ({ gap: `$${n}` }), 0),
        px: { gap: "$px" },
        rem: { gap: "$rem" },
        quarter: { gap: "$quarter" },
        third: { gap: "$third" },
        half: { gap: "$half" },
      },
      columnGap: {
        ...generateVariantSequence<SizeVariantsHalf>(
          13,
          (n: number) => ({ columnGap: `$${n}` }),
          0
        ),
        px: { columnGap: "$px" },
        rem: { columnGap: "$rem" },
        quarter: { columnGap: "$quarter" },
        third: { columnGap: "$third" },
        half: { columnGap: "$half" },
      },
      rowGap: {
        ...generateVariantSequence<SizeVariantsHalf>(13, (n: number) => ({ rowGap: `$${n}` }), 0),
        px: { rowGap: "$px" },
        rem: { rowGap: "$rem" },
        quarter: { rowGap: "$quarter" },
        third: { rowGap: "$third" },
        half: { rowGap: "$half" },
      },
      horizontalPanel: { ...getHorizontalPanel(), stacked: { gridTemplateColumns: "1fr" } },
      verticalPanel: getVerticalPanel(),
      horizontalPanels: { ...getHorizontalPanels(), stacked: { gridTemplateColumns: "1fr" } },
      verticalPanels: getVerticalPanels(),
      horizontalSplit: {
        ...getHorizontalSplit(),
        stacked: { gridTemplateColumns: "1fr" },
        "half-half": { gridTemplateColumns: "$half $half" },
        "quarter-threeQuarters": { gridTemplateColumns: "$quarter $threeQuarters" },
        "threeQuarters-quarter": { gridTemplateColumns: "$threeQuarters $quarter" },
        "third-twoThirds": { gridTemplateColumns: "$third $twoThirds" },
        "twoThirds-third": { gridTemplateColumns: "$twoThirds $third" },
      },
      verticalSplit: {
        ...getVerticalSplit(),
        "half-half": { gridTemplateRows: "$half $half" },
        "quarter-threeQuarters": { gridTemplateRows: "$quarter $threeQuarters" },
        "threeQuarters-quarter": { gridTemplateRows: "$threeQuarters $quarter" },
        "third-twoThirds": { gridTemplateRows: "$third $twoThirds" },
        "twoThirds-third": { gridTemplateRows: "$twoThirds $third" },
      },
    },
  },
  "Grid"
)

export const Grid = getSemanticLayoutPrimitive(StyledGrid)
