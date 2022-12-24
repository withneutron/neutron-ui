import { styled } from "../../config"
import { getSemanticHeadingPrimitive } from "../../config"

export const SubHeading = getSemanticHeadingPrimitive(
  styled(
    "h2",
    {
      color: "$defaultHeading",
      fontSize: "$h2",
      fontWeight: "$h2",
      lineHeight: "$heading",
      my: "$16",
    },
    "SubHeading"
  )
)
