import { styled } from "../../config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

export const Grid = getSemanticLayoutPrimitive(
  styled(
    Box,
    {
      display: "grid",
    },
    "Grid"
  )
)
