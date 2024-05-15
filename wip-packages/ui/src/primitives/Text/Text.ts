import {
  styled,
  generateVariantSequence,
  BASE_VARIANTS,
  COLOR_VARIANTS,
  TYPOGRAPHY_VARIANTS,
  SizeVariantsHalf,
  CSS,
} from "../../config/stitches.config"
import { getSemanticTextPrimitive } from "../../config"

type Spaced = SizeVariantsHalf & { [k: string]: CSS }

const TEXT_VARIANTS = {
  ...BASE_VARIANTS,
  ...COLOR_VARIANTS,
  ...TYPOGRAPHY_VARIANTS,
  align: {
    center: { textAlign: "center" },
    left: { textAlign: "left" },
    right: { textAlign: "right" },
  },
  truncate: {
    true: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  flat: {
    true: { my: "$none" },
  },
  spaced: generateVariantSequence<Spaced>(
    13,
    (n: number) => ({
      my: `$${n}`,
    }),
    0
  ),
  italic: {
    true: { fontStyle: "italic" },
  },
  oblique: {
    true: { fontStyle: "oblique" },
  },
  capitalize: {
    true: { textTransform: "capitalize" },
  },
  lowercase: {
    true: { textTransform: "lowercase" },
  },
  uppercase: {
    true: { textTransform: "uppercase" },
  },
}
export const getTextVariants = (): typeof TEXT_VARIANTS => TEXT_VARIANTS

const TEXT_STYLES = {
  boxSizing: "border-box",
  fontSize: "$p",
  fontWeight: "$4",
  lineHeight: "$body",
  mb: "$6",
  mt: "$none",
  "blockquote&": {
    fontSize: "$quote",
  },
  "&:last-child": {
    mb: "0",
  },
  variants: getTextVariants(),
}
export const getTextStyles = (): typeof TEXT_STYLES => TEXT_STYLES
const StyledText = styled("p", getTextStyles(), "Text")

export const Text = getSemanticTextPrimitive(StyledText)
