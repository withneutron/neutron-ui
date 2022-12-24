import { styled } from "../../config"
import { getSemanticLayoutPrimitive } from "../../config"

export const Row = getSemanticLayoutPrimitive(
  styled(
    "section",
    {
      display: "flex",
      flexDirection: "row",
    },
    "Row"
  )
)
