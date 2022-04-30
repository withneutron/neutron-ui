import { getTextVariants } from "../Text/Text"
import { styled } from "../../config/stitches.config"
import { STYLE_UNIT } from "../../shared/models/theme.models"

export const Anchor = styled(
  "a",
  {
    // TOKENS
    $$insetShadowSize: `-3${STYLE_UNIT}`,
    $$focusBgShadowSize: `1.25em`,
    // STYLES
    boxSizing: "border-box",
    fontSize: "$p",
    fontWeight: "$6",
    radius: "$none",
    textDecoration: "none",
    transition: "box-shadow $faster, color $faster",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      transition: "box-shadow $fast, color $fast",
    },
    variants: {
      ...getTextVariants(),
      colorScheme: {
        primary: {
          boxShadow: `inset 0 $$insetShadowSize 0 $colors$primary5`,
          color: "$primary9",
          "li > &, nav &, button &, h1 &, h2 &, h3 &, h4 &, h5 &, h6 &": {
            boxShadow: "$none",
          },
          "&:focus": {
            boxShadow: `inset 0 $$focusBgShadowSize 0 $colors$primary9`,
            "&, & code": { color: "$textPrimary9" },
          },
          "&:hover": {
            boxShadow: `inset 0 $$focusBgShadowSize 0 $colors$primary5`,
            color: "$primary12",
          },
        },
        secondary: {
          boxShadow: `inset 0 $$insetShadowSize 0 $colors$secondary5`,
          color: "$secondary9",
          "li > &, nav &, button &, h1 &, h2 &, h3 &, h4 &, h5 &, h6 &": {
            boxShadow: "$none",
          },
          "&:focus": {
            boxShadow: `inset 0 $$focusBgShadowSize 0 $colors$secondary9`,
            "&, & code": { color: "$textSecondary9" },
          },
          "&:hover": {
            boxShadow: `inset 0 $$focusBgShadowSize 0 $colors$secondary5`,
            color: "$secondary12",
          },
        },
      },
      contrast: {
        high: {
          color: "$secondary10",
        },
        max: {
          color: "$secondary11",
        },
      },
      basic: {
        true: {
          "&, &:focus, &:hover": {
            boxShadow: "$none",
          },
          "&:focus": {
            outline: "2rem solid $colors$secondary9",
          },
        },
      },
      reset: {
        true: {
          "&, &:focus, &:hover": {
            boxShadow: "$none",
            outline: "none",
          },
        },
      },
    },
    compoundVariants: [
      {
        contrast: "high",
        colorScheme: "primary",
        css: {
          color: "$primary10",
        },
      },
      {
        contrast: "max",
        colorScheme: "primary",
        css: {
          color: "$primary11",
        },
      },
      {
        contrast: "high",
        colorScheme: "secondary",
        css: {
          color: "$secondary10",
        },
      },
      {
        contrast: "max",
        colorScheme: "secondary",
        css: {
          color: "$secondary11",
        },
      },
    ],
    defaultVariants: {
      colorScheme: "primary",
    },
  },
  "Anchor"
)
