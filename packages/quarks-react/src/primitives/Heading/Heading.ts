import { styled } from "../../config"
import { getSemanticHeadingPrimitive } from "../../config"

export const Heading = getSemanticHeadingPrimitive(
  styled(
    "h1",
    {
      color: "$defaultHeading",
      typo: "$heading",
      my: "$20",
    },
    "Heading"
  )
)
