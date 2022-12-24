import { styled } from "../../config"
import { getSemanticLayoutPrimitive } from "../../config"

export const Column = getSemanticLayoutPrimitive(
  styled(
    "section",
    {
      display: "flex",
      flexDirection: "column",
    },
    "Column"
  )
)
