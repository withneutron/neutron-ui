import { styled } from "../../config/stitches.config"
import { getTextStyles } from "../Text/Text"
import { getSemanticHeadingPrimitive } from "../../config"

const StyledHeading = styled(
  "h1",
  {
    boxSizing: "border-box",
    color: "$defaultHeading",
    fontSize: "$h1",
    fontWeight: "$h1",
    lineHeight: "$heading",
    my: "$6",
    "&:first-child": {
      mt: "0",
    },
    "& + &": {
      mt: "0",
    },
    "&, & > *": {
      fontFamily: "$heading",
    },
    [`h1&`]: {
      "&, & > *": {
        fontSize: "$h1",
        fontWeight: "$h1",
      },
    },
    [`h2&`]: {
      "&, & > *": {
        fontSize: "$h2",
        fontWeight: "$h2",
      },
    },
    [`h3&`]: {
      "&, & > *": {
        fontSize: "$h3",
        fontWeight: "$h3",
      },
    },
    [`h4&`]: {
      "&, & > *": {
        fontSize: "$h4",
        fontWeight: "$h4",
      },
    },
    [`h5&`]: {
      "&, & > *": {
        fontSize: "$h5",
        fontWeight: "$h5",
      },
    },
    [`h6&`]: {
      "&, & > *": {
        fontSize: "$h6",
        fontWeight: "$h6",
      },
    },
    variants: {
      ...getTextStyles().variants,
      colorScheme: {
        primary: {
          color: "$primary10",
        },
        secondary: {
          color: "$secondary10",
        },
        neutral: {
          color: "$neutral10",
        },
      },
      contrast: {
        high: {
          color: "$secondary11",
        },
        max: {
          color: "$secondary12",
        },
      },
    },
    compoundVariants: [
      {
        contrast: "high",
        colorScheme: "primary",
        css: {
          color: "$primary11",
        },
      },
      {
        contrast: "max",
        colorScheme: "primary",
        css: {
          color: "$primary12",
        },
      },
      {
        contrast: "high",
        colorScheme: "secondary",
        css: {
          color: "$secondary11",
        },
      },
      {
        contrast: "max",
        colorScheme: "secondary",
        css: {
          color: "$secondary12",
        },
      },
      {
        contrast: "high",
        colorScheme: "neutral",
        css: {
          color: "$neutral11",
        },
      },
      {
        contrast: "max",
        colorScheme: "neutral",
        css: {
          color: "$neutral12",
        },
      },
    ],
  },
  "Heading"
)

export const Heading = getSemanticHeadingPrimitive(StyledHeading)
