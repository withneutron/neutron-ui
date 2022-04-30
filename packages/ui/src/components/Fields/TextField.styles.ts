import { BASE_VARIANTS } from "../../config/stitches.config"

export const textFieldStyles = {
  // LOCAL TOKENS //
  $$extraIconPadding: "$sizes$6",
  $$primaryColor: "$colors$primary9",
  $$secondaryColor: "$colors$secondary9",
  $$errorColor: "$colors$errorForeground",
  // Disabled
  $$disabledBorder: "$colors$neutral4",
  $$disabledFocusBorder: "$colors$neutral9",
  $$disabledText: "$colors$neutralMaxA10",
  // Sizes
  $$fieldTinyPy: "$sizes$buttonBasePy",
  $$fieldSmallPy: "calc($sizes$buttonBasePy + $sizes$1)",
  $$fieldMediumPy: "calc($sizes$buttonBasePy + $sizes$2)",
  $$fieldLargePy: "calc($sizes$buttonBasePy + $sizes$3)",
  // STYLES //
  borderColor: "$neutral7",
  borderStyle: "solid",
  borderWidth: "$2",
  boxSizing: "content-box",
  caretColor: "$neutralMax",
  color: "$neutralMaxA10",
  fontFamily: "$body",
  fontWeight: "$6",
  lineHeight: "$field",
  height: "$6",
  minWidth: "$16",
  outlineColor: "$none",
  radius: "$field",
  transition: "border-color $fast, outline-color $fast",
  "&::placeholder": {
    fontFamily: "$body",
    fontWeight: "$4",
  },
  "&:focus": {
    outline: "none",
  },
  ".focused > &": {
    outlineOffset: "$sizes$1",
    outlineStyle: "$borderStyles$focusRing",
    outlineWidth: "$borderWidths$focusRing",
  },
  ".focused > &, .hovered > &": {
    borderColor: "$$primaryColor",
  },
  ".disabled > &": {
    borderColor: "$$disabledBorder",
    caretColor: "$none",
    color: "$$disabledText",
    cursor: "not-allowed",
    fontWeight: "$4",
    "&::selection": { color: "$neutralMaxA10" },
  },
  ".focused:not(.disabled) > &": {
    color: "$neutralMaxA11",
  },
  ".focused.disabled > &": { outlineColor: "$$disabledFocusBorder" },
  variants: {
    contrast: {
      low: {
        bg: "$neutralMin",
        borderColor: "$neutral4",
        "&:-webkit-autofill": {
          "&, &:hover, &:focus, &:active": {
            WebkitBoxShadow: "0 0 0 $sizes$12 $colors$neutralMin inset !important",
            WebkitTextFillColor: "$colors$neutralMaxA10",
          },
        },
        color: "$neutralMaxA10",
        "&::placeholder": { color: "$neutralMaxA10" },
        ".disabled > &": {
          "&::selection": { bg: "$neutralMin", color: "$neutralMaxA10" },
        },
      },
      medium: {
        bg: "$neutral3",
        borderColor: "$neutral6",
        "&:-webkit-autofill": {
          "&, &:hover, &:focus, &:active": {
            WebkitBoxShadow: "0 0 0 $sizes$12 $colors$neutral3 inset !important",
            WebkitTextFillColor: "$colors$neutralMaxA10",
          },
        },
        "&::placeholder": { color: "$neutralMaxA10" },
        ".disabled > &": {
          "&::selection": { bg: "$neutral3" },
        },
      },
      high: {
        bg: "$neutral5",
        borderColor: "$neutral7",
        "&:-webkit-autofill": {
          "&, &:hover, &:focus, &:active": {
            WebkitBoxShadow: "0 0 0 $sizes$12 $colors$neutral5 inset !important",
            WebkitTextFillColor: "$colors$neutralMax",
          },
        },
        color: "$neutralMax",
        "&::placeholder": { color: "$neutralMax" },
        ".disabled > &": {
          "&::selection": { bg: "$neutral5", color: "$neutralMax" },
        },
      },
    },
    shape: {
      rounded: { radius: "$rounded" },
      rectangular: { radius: "$rectangular" },
      field: { radius: "$field" },
      pill: { radius: "$pill" },
    },
    size: {
      tiny: {
        fontSize: "$fieldTiny",
        lineHeight: "calc($field + $fontSizes$fieldTiny / $fontSizes$base)",
        px: "$buttonBasePx",
        py: "$$fieldTinyPy",
        ".hasIcon &": {
          pr: "calc($buttonBasePx + $$extraIconPadding)",
        },
      },
      small: {
        fontSize: "$fieldSmall",
        letterSpacing: "$tight",
        px: "$buttonBasePx",
        py: "$$fieldSmallPy",
        ".hasIcon &": {
          pr: "calc($buttonBasePx + $$extraIconPadding)",
        },
      },
      medium: {
        fontSize: "$field",
        lineHeight: "calc($field + $fontSizes$fieldSmall / $fontSizes$base)",
        letterSpacing: "$tight",
        px: "calc($buttonBasePx + $2)",
        py: "$$fieldMediumPy",
        ".hasIcon &": {
          pr: "calc($buttonBasePx + $2 + $$extraIconPadding)",
        },
      },
      large: {
        fontSize: "$fieldLarge",
        lineHeight: "calc($field + $fontSizes$fieldLarge / $fontSizes$base)",
        letterSpacing: "$tight",
        px: "calc($buttonBasePx + $3)",
        py: "$$fieldLargePy",
        ".hasIcon &": {
          pr: "calc($buttonBasePx + $3 + $$extraIconPadding)",
        },
      },
    },
    minWidth: BASE_VARIANTS.minWidth,
    variant: {
      nested: {
        mt: "$4",
        "&::placeholder": { color: "$none !important" },
        ".disabled > &": { fontWeight: "$5" },
      },
      stacked: {
        mt: "$1",
      },
    },
    borderless: {
      true: {
        ".focused > &, .hovered > &": { borderColor: "$$primaryColor" },
        ".disabled > &": { borderColor: "$neutral3" },
      },
    },
    colorScheme: {
      primary: {
        ".focused:not(.disabled) > &": { outlineColor: "$$primaryColor" },
        ".focused > &, .hovered > &": { borderColor: "$$primaryColor" },
        ".hovered:not(.disabled) > &": { color: "$$primaryColor" },
        "&::selection": { bg: "$$primaryColor", color: "$neutralMin" },
        "&:-webkit-autofill": {
          "&, &:hover, &:focus, &:active": {
            "&::selection": { WebkitTextFillColor: "$colors$neutralMin" },
          },
        },
        ".disabled > &": {
          borderColor: "$$disabledBorder",
          ".focused&, .hovered&": { borderColor: "$$disabledFocusBorder" },
        },
      },
      secondary: {
        ".focused:not(.disabled) > &": { outlineColor: "$$secondaryColor" },
        ".focused > &, .hovered > &": { borderColor: "$$secondaryColor" },
        ".hovered:not(.disabled) > &": { color: "$$secondaryColor" },
        "&::selection": { bg: "$$secondaryColor", color: "$neutralMin" },
        "&:-webkit-autofill": {
          "&, &:hover, &:focus, &:active": {
            "&::selection": { WebkitTextFillColor: "$colors$neutralMin" },
          },
        },
        ".disabled > &": {
          borderColor: "$$disabledBorder",
          ".focused&, .hovered&": { borderColor: "$$disabledFocusBorder" },
        },
      },
      error: {
        ".focused:not(.disabled) > &": { outlineColor: "$$errorColor" },
        ".focused > &, .hovered > &": { borderColor: "$$errorColor" },
        ".hovered:not(.disabled) > &": { color: "$$errorColor" },
        "&::selection": { bg: "$$errorColor", color: "$neutralMin" },
        "&:-webkit-autofill": {
          "&, &:hover, &:focus, &:active": {
            "&::selection": { WebkitTextFillColor: "$colors$neutralMin" },
          },
        },
        ".disabled > &": {
          borderColor: "$$disabledBorder",
          ".focused&, .hovered&": { borderColor: "$$disabledFocusBorder" },
        },
      },
    },
  },
  compoundVariants: [
    {
      borderless: true,
      colorScheme: "primary",
      css: {
        ".disabled > &": {
          borderColor: "$neutral3",
        },
      },
    },
    {
      borderless: true,
      colorScheme: "secondary",
      css: {
        ".disabled > &": {
          borderColor: "$neutral3",
        },
      },
    },
    {
      borderless: true,
      colorScheme: "error",
      css: {
        ".disabled > &": {
          borderColor: "$neutral3",
        },
      },
    },
    {
      borderless: true,
      contrast: "low",
      css: {
        borderColor: "$neutralMin",
        ".disabled > &": {
          borderColor: "$neutralMin",
        },
      },
    },
    {
      borderless: true,
      contrast: "medium",
      css: {
        borderColor: "$neutral3",
        ".disabled > &": {
          borderColor: "$neutral3",
        },
      },
    },
    {
      borderless: true,
      contrast: "high",
      css: {
        borderColor: "$neutral5",
        ".disabled > &": {
          borderColor: "$neutral5",
        },
      },
    },
    {
      colorScheme: "primary",
      contrast: "high",
      css: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          borderColor: "$primary10",
          color: "$primary10",
        },
        "&::selection": { bg: "$primary10", color: "$neutralMin" },
      },
    },
    {
      colorScheme: "secondary",
      contrast: "high",
      css: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          borderColor: "$secondary10",
          color: "$secondary10",
        },
        "&::selection": { bg: "$secondary10", color: "$neutralMin" },
      },
    },
    {
      colorScheme: "error",
      contrast: "high",
      css: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          borderColor: "$errorForegroundMax",
          color: "$errorForegroundMax",
        },
        "&::selection": { bg: "$errorForegroundMax", color: "$neutralMin" },
      },
    },
  ],
  defaultVariants: {
    colorScheme: "primary",
    size: "medium",
    variant: "nested",
    contrast: "medium",
  },
}

export const wrapperStyles = {
  gap: "$1",
  mb: "$2",
  position: "relative",
  w: "$full",
  "& + .fieldWrapper": { mt: "$none" },
  variants: {
    variant: {
      nested: {
        "& + button, & + footer, & + section, & + div": { mt: "$4" },
      },
      stacked: {
        "& + button, & + footer, & + section, & + div": { mt: "$6" },
      },
    },
  },
  defaultVariants: {
    variant: "nested",
  },
}

export const labelStyles = {
  $$nestedPx: "max($sizes$3, min($radii$field, calc($sizes$2 + $sizes$1)))",
  color: "$neutralMaxA10",
  fontSize: "$fieldSmall",
  fontWeight: "$5",
  lineHeight: "$label",
  overflow: "hidden",
  textOverflow: "ellipsis",
  transition: "border-color $fast",
  w: "$full",
  whiteSpace: "nowrap",
  ".disabled > &": {
    cursor: "not-allowed",
    fontWeight: "$4",
  },
  variants: {
    contrast: {
      low: {
        color: "$neutralMaxA10",
      },
      medium: {},
      high: {
        color: "$neutralMax",
      },
    },
    colorScheme: {
      primary: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          color: "$primary10",
        },
      },
      secondary: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          color: "$secondary10",
        },
      },
      error: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          color: "$errorForeground",
        },
      },
    },
    variant: {
      nested: {
        $$pt: "calc($sizes$2 - min($lineHeights$modifier, $sizes$rem))",
        $$ptShift: "calc($$pt / 2)",
        bg: "$neutral3",
        position: "absolute",
        pt: "$$pt",
        px: "calc($$nestedPx + $borderWidths$2)",
        radius: "min($field, $rounded * 2)",
        top: "calc((($sizes$full - $sizes$4) / 2) + $sizes$4 - $$ptShift)",
        transform: "translateY(-50%)",
        transition: "top $fast, transform $fast",
        w: "$auto",
        ".hasValue &, .focused:not(.disabled) &": {
          fontSize: "$fieldTiny",
          top: "calc($4 - $$pt)",
        },
      },
      stacked: {},
    },
    size: {
      tiny: { left: "calc($sizes$buttonBasePx - $$nestedPx)" },
      small: { left: "calc($sizes$buttonBasePx - $$nestedPx)" },
      medium: { left: "calc($sizes$buttonBasePx + $sizes$2 - $$nestedPx)" },
      large: { left: "calc($sizes$buttonBasePx + $sizes$3 - $$nestedPx)" },
    },
  },
  compoundVariants: [
    {
      variant: "nested",
      contrast: "low",
      css: {
        bg: "$neutralMin",
      },
    },
    {
      variant: "nested",
      contrast: "high",
      css: {
        bg: "$neutral5",
      },
    },
    {
      colorScheme: "primary",
      contrast: "high",
      css: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          borderColor: "$primary10",
          color: "$primary10",
        },
      },
    },
    {
      colorScheme: "secondary",
      contrast: "high",
      css: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          borderColor: "$secondary10",
          color: "$secondary10",
        },
      },
    },
    {
      colorScheme: "error",
      contrast: "high",
      css: {
        ".focused:not(.disabled) > &, .hovered:not(.disabled) > &": {
          borderColor: "$errorForegroundMax",
          color: "$errorForegroundMax",
        },
      },
    },
  ],
  defaultVariants: {
    colorScheme: "primary",
    variant: "nested",
    size: "medium",
    contrast: "medium",
  },
}

export const errorStyles = {
  color: "$errorForeground",
  display: "inline-block",
  fontSize: "$fieldTiny",
  fontWeight: "$4",
  lineHeight: "$5",
  maxWidth: "$full",
  py: "$none",
  pr: "min($radii$field, $4)",
  variants: {
    size: {
      tiny: { px: "$buttonBasePx" },
      small: { px: "$buttonBasePx" },
      medium: { px: "calc($buttonBasePx + $2)" },
      large: { px: "calc($buttonBasePx + $3)" },
    },
  },
  defaultVariants: {
    size: "medium",
  },
}

export const descriptionStyles = {
  ...errorStyles,
  color: "$neutralMaxA10",
  fontWeight: "$4",
}
