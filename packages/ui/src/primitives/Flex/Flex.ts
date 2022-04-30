import { styled, generateVariantSequence, SizeVariantsHalf } from "../../config/stitches.config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

const FLEX_STYLES = {
  display: "flex",
  variants: {
    wrap: {
      true: { flexWrap: "wrap" },
    },
    noWrap: {
      true: { flexWrap: "nowrap" },
    },
    wrapReverse: {
      true: { flexWrap: "wrap-reverse" },
    },
    alignContent: {
      center: { alignContent: "center" },
      end: { alignContent: "flex-end" },
      spaceAround: { alignContent: "space-around" },
      spaceBetween: { alignContent: "space-between" },
      start: { alignContent: "flex-start" },
      stretch: { alignContent: "stretch" },
    },
    justifyContent: {
      left: { justifyContent: "left" },
      right: { justifyContent: "right" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      spaceAround: { justifyContent: "space-around" },
      spaceBetween: { justifyContent: "space-between" },
      spaceEvenly: { justifyContent: "space-evenly" },
      start: { justifyContent: "flex-start" },
      stretch: { justifyContent: "stretch" },
    },
    alignItems: {
      baseline: { alignItems: "basline" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      start: { alignItems: "flex-start" },
      stretch: { alignItems: "stretch" },
    },
    gap: {
      ...generateVariantSequence<SizeVariantsHalf>(13, (n: number) => ({ gap: `$${n}` }), 0),
      px: { gap: "$px" },
      rem: { gap: "$rem" },
      quarter: { gap: "$quarter" },
      third: { gap: "$third" },
      half: { gap: "$half" },
    },
    columnGap: {
      ...generateVariantSequence<SizeVariantsHalf>(13, (n: number) => ({ columnGap: `$${n}` }), 0),
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
  },
}
export const getFlexStyles = (): typeof FLEX_STYLES => FLEX_STYLES
const StyledFlex = styled(Box, getFlexStyles(), "Flex")

export const Flex = getSemanticLayoutPrimitive(StyledFlex)
