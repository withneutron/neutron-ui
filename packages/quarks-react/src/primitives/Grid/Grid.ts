import { styledPrimitive } from "../../config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

export const Grid = getSemanticLayoutPrimitive(
  styledPrimitive(
    Box,
    {
      display: "grid",
    },
    "Grid"
  )
)
