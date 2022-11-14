import { styledPrimitive } from "../../config"
import { getSemanticLayoutPrimitive } from "../../config"

export const Column = getSemanticLayoutPrimitive(
  styledPrimitive(
    "section",
    {
      display: "flex",
      flexDirection: "column",
    },
    "Column"
  )
)
