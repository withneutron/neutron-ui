import { styledPrimitive } from "../../config"
import { getTextStyles } from "../Text/Text"

export const ListItem = styledPrimitive(
  "li",
  {
    ...getTextStyles(),
    lineHeight: "$listItem",
  },
  "ListItem"
)
