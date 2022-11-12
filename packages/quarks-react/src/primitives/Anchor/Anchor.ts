import { styledPrimitive } from "../../config"
import { vars } from "@withneutron/quarks"

export const Anchor = styledPrimitive(
  "a",
  {
    fontWeight: "$600",
    radius: "$0",
    textDecoration: "none",
    transition: `box-shadow ${vars.animation.fastDuration}, color ${vars.animation.fastDuration}`,
    ":focus": {
      outline: "none",
    },
    ":hover": {
      transition: `box-shadow ${vars.animation.defaultDuration}, color ${vars.animation.defaultDuration}`,
    },
  },
  "Anchor"
)
