import { styled } from "../../config"
import { getSemanticHeadingPrimitive } from "../../config"

export const Heading = getSemanticHeadingPrimitive(
  styled(
    "h1",
    {
      color: "$defaultHeading",
      type: "$heading",
      my: "$20",
    },
    "Heading"
  )
)
