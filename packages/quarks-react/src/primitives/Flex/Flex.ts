import { styledPrimitive } from "../../config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

export const Flex = getSemanticLayoutPrimitive(
  styledPrimitive(
    Box,
    {
      display: "flex",
    },
    "Flex"
  )
)
