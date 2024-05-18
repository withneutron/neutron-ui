import { styled } from "@withneutron/quarks-react"

// TS Error caused by use of `npm link`
// @ts-ignore: TS4023
export const Button = styled(
  "button",
  {
    typo: "$body",
    fontWeight: "$600",
    bg: "transparent",
    color: "$primary9",
    border: "$primary",
    borderColor: "transparent",
    radius: "$4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: "$12",
    py: "$4",
    w: "max-content",
    minWidth: "$80",
    ":interact": {
      bg: "$primary9",
      color: "$primaryText9",
    },
    ":focus": {
      outline: "$primaryMax",
    },
  },
  {
    variant: {
      solid: {
        bg: "$primary9",
        color: "$primaryText9",
        ":interact": {
          bg: "$primary10",
          color: "$primaryText10",
        },
      },
      outline: {
        bg: "$minAlpha9",
        color: "$primary9",
        borderColor: "$primary",
        ":interact": {
          bg: "$primary10",
          color: "$primaryText10",
          borderColor: "$primaryMax",
        },
      },
      ghost: {
        bg: "transparent",
        color: "$primary9",
        ":interact": {
          bg: "$primary10",
          color: "$primaryText10",
        },
      },
      subtle: {
        bg: "$primaryAlpha2",
        color: "$primaryAlphaText2",
        ":interact": {
          bg: "$primary10",
          color: "$primaryText10",
        },
      },
    },
    size: {
      minimal: {
        size: "min-content",
        p: "$2",
        lineHeight: "$flat",
        minWidth: "unset",
      },
    },
  },
  "Button"
)
