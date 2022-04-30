import { styled } from "../../config/stitches.config"
import { getFlexStyles } from "../"

export const FlexList = styled(
  "ul",
  {
    ...getFlexStyles(),
    listStyle: "none",
    m: "$none",
    p: "$none",
  },
  "FlexList"
)
