import { styled } from "../../config/stitches.config"
import { Box } from "../Box/Box"
import { getSemanticLayoutPrimitive } from "../../config"

const StyledGridItem = styled(
  Box,
  {
    variants: {
      colSpan: {
        2: { gridColumn: "span 2" },
        3: { gridColumn: "span 3" },
        4: { gridColumn: "span 4" },
        5: { gridColumn: "span 5" },
      },
      rowSpan: {
        2: { gridRow: "span 2" },
        3: { gridRow: "span 3" },
        4: { gridRow: "span 4" },
        5: { gridRow: "span 5" },
      },
      justifySelf: {
        center: {
          justifySelf: "center",
        },
        end: {
          justifySelf: "end",
        },
        start: {
          justifySelf: "start",
        },
      },
      alignSelf: {
        center: {
          alignSelf: "center",
        },
        end: {
          alignSelf: "end",
        },
        start: {
          alignSelf: "start",
        },
      },
    },
  },
  "GridItem"
)

export const GridItem = getSemanticLayoutPrimitive(StyledGridItem)
