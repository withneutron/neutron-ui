import { styled } from "../../config"
import { getSemanticTextPrimitive } from "../../config"

const TEXT_STYLES = {
  fontSize: "$p",
  fontWeight: "$400",
  lineHeight: "$body",
} as const

export const getTextStyles = () => TEXT_STYLES

export const Text = getSemanticTextPrimitive(styled("p", getTextStyles(), "Text"))
