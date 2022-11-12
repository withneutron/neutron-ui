import { styledPrimitive } from "../../config"
import { Flex } from "../Flex/Flex"
import { getSemanticLayoutPrimitive } from "../../config"

export const Row = getSemanticLayoutPrimitive(
  styledPrimitive(
    Flex,
    {
      flexDirection: "row",
    },
    "Row"
  )
)
