import {
  styled,
  generateVariantSequence,
  SizeVariantsFull,
  SizeVariantsHalf,
} from "../../config/stitches.config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

type BasisVariant = Omit<SizeVariantsFull, "0">
type GrowVariant = Omit<SizeVariantsHalf, "0" | "9" | "10" | "11" | "12">

const FLEX_ITEM_STYLES = {
  variants: {
    align: {
      baseline: { alignSelf: "baseline" },
      center: { alignSelf: "center" },
      end: { alignSelf: "end" },
      start: { alignSelf: "start" },
      stretch: { alignSelf: "stretch" },
    },
    basis: {
      fill: { flexBasis: "fill" },
      maxContent: { flexBasis: "max-content" },
      minContent: { flexBasis: "min-content" },
      fitContent: { flexBasis: "fit-content" },
      "0": { flexBasis: 0 },
      ...generateVariantSequence<BasisVariant>(21, (n: number) => ({
        flexBasis: `$sizes$${n}`,
      })),
      quarter: { flexBasis: "$sizes$quarter" },
      third: { flexBasis: "$sizes$third" },
      half: { flexBasis: "$sizes$half" },
      twoThirds: { flexBasis: "$sizes$twoThirds" },
      threeQuarters: { flexBasis: "$sizes$threeQuarters" },
      full: { flexBasis: "$sizes$full" },
    },
    grow: generateVariantSequence<GrowVariant>(8, (n: number) => ({
      flexGrow: n,
    })),
    shrink: generateVariantSequence<GrowVariant>(8, (n: number) => ({ flexShrink: n })),
  },
}
export const getFlexItemStyles = (): typeof FLEX_ITEM_STYLES => FLEX_ITEM_STYLES
const StyledFlexItem = styled(Box, getFlexItemStyles(), "FlexItem")

export const FlexItem = getSemanticLayoutPrimitive(StyledFlexItem)
