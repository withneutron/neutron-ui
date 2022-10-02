import { styled } from "../../config"
import { Flex } from "../Flex/Flex"
import { getSemanticLayoutPrimitive } from "../../config"

export const Column = getSemanticLayoutPrimitive(
  styled(
    Flex,
    {
      flexDirection: "column",
    },
    "Column"
  )
)
