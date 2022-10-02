import { styled } from "../../config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

export const Flex = getSemanticLayoutPrimitive(
  styled(
    Box,
    {
      display: "flex",
    },
    "Flex"
  )
)
