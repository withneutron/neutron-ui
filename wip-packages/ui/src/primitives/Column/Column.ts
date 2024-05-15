import { styled } from "../../config/stitches.config"
import { Flex } from "../Flex/Flex"
import { getSemanticLayoutPrimitive } from "../../config"

const StyledColumn = styled(
  Flex,
  {
    flexDirection: "column",
  },
  "Column"
)

export const Column = getSemanticLayoutPrimitive(StyledColumn)
