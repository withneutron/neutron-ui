import { styledPrimitive } from "../../config"
import { getSemanticTextPrimitive } from "../../config"

const TEXT_STYLES = {
  fontSize: "$p",
  fontWeight: "$400",
  lineHeight: "$body",
  mb: "$20",
  mt: "$0",
} as const

export const getTextStyles = () => TEXT_STYLES

export const Text = getSemanticTextPrimitive(styledPrimitive("p", getTextStyles(), "Text"))
