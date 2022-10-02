import { styled } from "../../config"
import { Flex } from "../Flex/Flex"
import { getSemanticLayoutPrimitive } from "../../config"

export const Row = getSemanticLayoutPrimitive(
  styled(
    Flex,
    {
      flexDirection: "row",
    },
    "Row"
  )
)
