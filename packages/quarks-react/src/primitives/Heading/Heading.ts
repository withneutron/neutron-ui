import { styledPrimitive } from "../../config"
import { getSemanticHeadingPrimitive } from "../../config"

export const Heading = getSemanticHeadingPrimitive(
  styledPrimitive(
    "h1",
    {
      color: "$defaultHeading",
      fontSize: "$h1",
      fontWeight: "$h1",
      lineHeight: "$heading",
      my: "$20",
    },
    "Heading"
  )
)
