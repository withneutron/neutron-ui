import { styled } from "../../config"
import { getSemanticHeadingPrimitive } from "../../config"

export const SubHeading = getSemanticHeadingPrimitive(
  styled(
    "h2",
    {
      color: "$defaultHeading",
      typo: "$subHeading",
      my: "$16",
    },
    "SubHeading"
  )
)
