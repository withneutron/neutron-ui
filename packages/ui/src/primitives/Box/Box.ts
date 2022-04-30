import { styled, BASE_VARIANTS, COLOR_VARIANTS } from "../../config/stitches.config"
import { getSemanticLayoutPrimitive } from "../../config"

const StyledBox = styled(
  "section",
  {
    boxSizing: "border-box",
    variants: {
      ...BASE_VARIANTS,
      ...COLOR_VARIANTS,
    },
  },
  "Box"
)

export const Box = getSemanticLayoutPrimitive(StyledBox)
