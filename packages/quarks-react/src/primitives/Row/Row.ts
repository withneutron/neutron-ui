import { styledPrimitive } from "../../config"
import { getSemanticLayoutPrimitive } from "../../config"

export const Row = getSemanticLayoutPrimitive(
  styledPrimitive(
    "section",
    {
      display: "flex",
      flexDirection: "row",
    },
    "Row"
  )
)
