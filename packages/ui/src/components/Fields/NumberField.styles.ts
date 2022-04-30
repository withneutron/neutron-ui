export const numberFieldStyles = {
  $$numberFieldPr: "calc($sizes$8 + $sizes$buttonBasePx)",
  $$numberFieldIconPr: "calc($sizes$8 + $sizes$buttonBasePx + $$extraIconPadding)",
  variants: {
    size: {
      tiny: {
        pr: "$$numberFieldPr",
        ".hasIcon &": { pr: "$$numberFieldIconPr" },
      },
      small: {
        pr: "$$numberFieldPr",
        ".hasIcon &": { pr: "$$numberFieldIconPr" },
      },
      medium: {
        pr: "$$numberFieldPr",
        ".hasIcon &": { pr: "$$numberFieldIconPr" },
      },
      large: {
        pr: "$$numberFieldPr",
        ".hasIcon &": { pr: "$$numberFieldIconPr" },
      },
    },
  },
}

const buttonStyles = {
  // LOCAL TOKENS //
  $$sizeShift: "2rem",
  $$buttonTinyPy: "calc($sizes$buttonBasePy + $borderWidths$2 - $$sizeShift)",
  $$buttonSmallPy: "calc($sizes$buttonBasePy + $borderWidths$2 - $$sizeShift + $sizes$1)",
  $$buttonMediumPy: "calc($sizes$buttonBasePy + $borderWidths$2 - $$sizeShift + $sizes$2)",
  $$buttonLargePy: "calc($sizes$buttonBasePy + $borderWidths$2 - $$sizeShift + $sizes$3)",
  // STYLES //
  h: "calc($4 - $borderWidths$2 * 2)",
  px: "$none !important",
  position: "absolute",
  radius: "$field",
  radiusLeft: "$none",
  w: "$8",
  right: 0,
  "&:before, &:after": {
    content: "",
    display: "block",
    h: "$borderWidths$2",
    pointerEvents: "none",
    position: "absolute",
    w: "$borderWidths$2",
  },
  defaultVariants: {
    size: "medium",
  },
}
export const incrementButtonStyles = {
  ...buttonStyles,
  pt: "$2",
  radiusBottom: "$none",
  "&:before": {
    bottom: "calc($borderWidths$2 * -1)",
    right: "calc($borderWidths$2 * -1)",
  },
  "&:after": {
    top: "calc($borderWidths$2 * -1)",
    left: "calc($borderWidths$2 * -1)",
  },
  "&.hasBorder": {
    h: "calc($4 - $borderWidths$2 * 3)",
    w: "calc($8 - $borderWidths$2)",
    right: "$borderWidths$2",
    borderTopRightRadius: "calc($field - $borderWidths$2)",
  },
  variants: {
    colorScheme: {
      primary: {
        ".focused > &.disabled:not(.hasBorder), .hovered > &.disabled:not(.hasBorder)": {
          borderTopColor: "$primary9",
          borderRightColor: "$primary9",
          "&:before, &:after": {
            bg: "$primary9",
          },
        },
      },
      secondary: {
        ".focused > &.disabled:not(.hasBorder), .hovered > &.disabled:not(.hasBorder)": {
          borderTopColor: "$secondary9",
          borderRightColor: "$secondary9",
          "&:before, &:after": {
            bg: "$secondary9",
          },
        },
      },
    },
    size: {
      tiny: {
        bottom: "calc($4 + $$buttonTinyPy)",
        pt: "calc($$buttonTinyPy / 2 + $1)",
        pb: "calc($$buttonTinyPy / 2 - $1)",
      },
      small: {
        bottom: "calc($4 + $$buttonSmallPy)",
        pt: "calc($$buttonSmallPy / 2 + $1)",
        pb: "calc($$buttonSmallPy / 2 - $1)",
      },
      medium: {
        bottom: "calc($4 + $$buttonMediumPy)",
        pt: "calc($$buttonMediumPy / 2 + $1)",
        pb: "calc($$buttonMediumPy / 2 - $1)",
      },
      large: {
        bottom: "calc($4 + $$buttonLargePy)",
        pt: "calc($$buttonLargePy / 2 + $1)",
        pb: "calc($$buttonLargePy / 2 - $1)",
      },
    },
  },
}
export const decrementButtonStyles = {
  ...buttonStyles,
  bottom: "0",
  pb: "$2",
  radiusTop: "$none",
  "&:before": {
    top: "calc($borderWidths$2 * -1)",
    right: "calc($borderWidths$2 * -1)",
  },
  "&:after": {
    bottom: "calc($borderWidths$2 * -1)",
    left: "calc($borderWidths$2 * -1)",
  },
  "&.hasBorder": {
    bottom: "$borderWidths$2",
    h: "calc($4 - $borderWidths$2 * 3)",
    w: "calc($8 - $borderWidths$2)",
    borderBottomRightRadius: "calc($field - $borderWidths$2)",
    right: "$borderWidths$2",
  },
  variants: {
    colorScheme: {
      primary: {
        ".focused > &.disabled:not(.hasBorder), .hovered > &.disabled:not(.hasBorder)": {
          borderBottomColor: "$primary9",
          borderRightColor: "$primary9",
          "&:before, &:after": {
            bg: "$primary9",
          },
        },
      },
      secondary: {
        ".focused > &.disabled:not(.hasBorder), .hovered > &.disabled:not(.hasBorder)": {
          borderBottomColor: "$secondary9",
          borderRightColor: "$secondary9",
          "&:before, &:after": {
            bg: "$secondary9",
          },
        },
      },
    },
    size: {
      tiny: {
        pt: "calc($$buttonTinyPy / 2 - $1)",
        pb: "calc($$buttonTinyPy / 2 + $1)",
      },
      small: {
        pt: "calc($$buttonSmallPy / 2 - $1)",
        pb: "calc($$buttonSmallPy / 2 + $1)",
      },
      medium: {
        pt: "calc($$buttonMediumPy / 2 - $1)",
        pb: "calc($$buttonMediumPy / 2 + $1)",
      },
      large: {
        pt: "calc($$buttonLargePy / 2 - $1)",
        pb: "calc($$buttonLargePy / 2 + $1)",
      },
    },
  },
}
