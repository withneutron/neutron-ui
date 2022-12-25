import { styled } from "../../config"
import { vars } from "@withneutron/quarks"

export const Anchor = styled(
  "a",
  {
    fontWeight: "$600",
    radius: "$0",
    textDecoration: "none",
    transitionProperty: "box-shadow, color",
    transitionDuration: `${vars.animation.fastDuration}, ${vars.animation.fastDuration}`,
    ":focus": {
      outline: "none",
    },
    ":hover": {
      transitionDuration: `${vars.animation.defaultDuration}, ${vars.animation.defaultDuration}`,
    },
  },
  "Anchor"
)
