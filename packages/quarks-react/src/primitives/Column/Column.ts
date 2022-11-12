import { styledPrimitive } from "../../config"
import { Flex } from "../Flex/Flex"
import { getSemanticLayoutPrimitive } from "../../config"

export const Column = getSemanticLayoutPrimitive(
  styledPrimitive(
    Flex,
    {
      flexDirection: "column",
    },
    "Column"
  )
)
