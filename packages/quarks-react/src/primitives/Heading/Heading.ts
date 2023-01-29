import { styled } from "../../config"
import { getSemanticHeadingPrimitive } from "../../config"

export const Heading = getSemanticHeadingPrimitive(
  styled(
    "h1",
    {
      color: "$defaultHeading",
      typo: "$heading",
    },
    {
      flat: {
        true: {
          mb: "$0",
        },
      },
    },
    "Heading"
  )
)
