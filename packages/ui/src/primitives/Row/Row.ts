import { styled } from "../../config/stitches.config"
import { Flex } from "../Flex/Flex"
import { getSemanticLayoutPrimitive } from "../../config"

const StyledRow = styled(
  Flex,
  {
    flexDirection: "row",
  },
  "Row"
)

export const Row = getSemanticLayoutPrimitive(StyledRow)
