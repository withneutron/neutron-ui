import { animate, BASE_VARIANTS } from "../../config/stitches.config"

const cssGhostPrimary = {
  bg: "$none",
  borderColor: "$none",
  color: "$$primaryBgHover",
  "&.active": {
    bg: "$$primaryBgActive",
    borderColor: "$$primaryBgActive",
    color: "$$primaryTextActive",
  },
  "&.focused, &.hovered": {
    bg: "$$primaryBgHover",
    borderColor: "$$primaryBgHover",
    color: "$$primaryTextHover",
  },
  "&:active": {
    bg: "$$primaryBgPressed",
    borderColor: "$$primaryBgPressed",
    color: "$$primaryTextPressed",
  },
  "&.disabled": {
    bg: "$$disabledBg",
    borderColor: "$$disabledBg",
    color: "$$disabledText",
  },
}
const cssGhostSecondary = {
  bg: "$none",
  borderColor: "$none",
  color: "$$secondaryBgHover",
  "&.active": {
    bg: "$$secondaryBgActive",
    borderColor: "$$secondaryBgActive",
    color: "$$secondaryTextActive",
  },
  "&.focused, &.hovered": {
    bg: "$$secondaryBgHover",
    borderColor: "$$secondaryBgHover",
    color: "$$secondaryTextHover",
  },
  "&:active": {
    bg: "$$secondaryBgPressed",
    borderColor: "$$secondaryBgPressed",
    color: "$$secondaryTextPressed",
  },
  "&.disabled": {
    bg: "$$disabledBg",
    borderColor: "$$disabledBg",
    color: "$$disabledText",
  },
}

const cssSolidPrimary = {
  bg: "$$primaryBg",
  borderColor: "$$primaryBg",
  color: "$$primaryText",
  "&.active": {
    bg: "$$primaryBgActiveSolid",
    borderColor: "$$primaryBgActiveSolid",
    color: "$$primaryTextActiveSolid",
  },
  "&.focused, &.hovered": {
    bg: "$$primaryBgHover",
    borderColor: "$$primaryBgHover",
    color: "$$primaryTextHover",
  },
  "&:active": {
    bg: "$$primaryBgPressed",
    borderColor: "$$primaryBgPressed",
    color: "$$primaryTextPressed",
  },
  "&.disabled": {
    bg: "$$disabledBg",
    borderColor: "$$disabledBg",
    color: "$$disabledText",
  },
}
const cssSolidSecondary = {
  bg: "$$secondaryBg",
  borderColor: "$$secondaryBg",
  color: "$$secondaryText",
  "&.active": {
    bg: "$$secondaryBgActiveSolid",
    borderColor: "$$secondaryBgActiveSolid",
    color: "$$secondaryTextActiveSolid",
  },
  "&.focused, &.hovered": {
    bg: "$$secondaryBgHover",
    borderColor: "$$secondaryBgHover",
    color: "$$secondaryTextHover",
  },
  "&:active": {
    bg: "$$secondaryBgPressed",
    borderColor: "$$secondaryBgPressed",
    color: "$$secondaryTextPressed",
  },
  "&.disabled": {
    bg: "$$disabledBg",
    borderColor: "$$disabledBg",
    color: "$$disabledText",
  },
}
const cssOutlinePrimary = {
  bg: "$$outlineBg",
  borderColor: "$$primaryBg",
  color: "$$primaryTextOutline",
  "&.active": {
    bg: "$$primaryBgActive",
    borderColor: "$$primaryBg",
    color: "$$primaryTextActive",
  },
  "&.focused, &.hovered": {
    bg: "$$primaryBgHover",
    borderColor: "$$primaryBgHover",
    color: "$$primaryTextHover",
  },
  "&:active": {
    bg: "$$primaryBgPressed",
    borderColor: "$$primaryBgPressed",
    color: "$$primaryTextPressed",
  },
  "&.disabled": {
    bg: "$$disabledBg",
    borderColor: "$$disabledBorder",
    color: "$$disabledText",
  },
}
const cssOutlineSecondary = {
  bg: "$$outlineBg",
  borderColor: "$$secondaryBg",
  color: "$$secondaryTextOutline",
  "&.active": {
    bg: "$$secondaryBgActive",
    borderColor: "$$secondaryBg",
    color: "$$secondaryTextActive",
  },
  "&.focused, &.hovered": {
    bg: "$$secondaryBgHover",
    borderColor: "$$secondaryBgHover",
    color: "$$secondaryTextHover",
  },
  "&:active": {
    bg: "$$secondaryBgPressed",
    borderColor: "$$secondaryBgPressed",
    color: "$$secondaryTextPressed",
  },
  "&.disabled": {
    bg: "$$disabledBg",
    borderColor: "$$disabledBorder",
    color: "$$disabledText",
  },
}
const cssTactileDisabled = {
  borderColor: "$neutral5",
  borderTopColor: "$$disabledBg",
  boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralA5,
    inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA9,
    inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA7`,
}
const cssTactileDisabledDarkMode = {
  borderColor: "$neutralMinA7",
  borderTopColor: "$neutralMinA4",
  boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralMinA7,
    inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutral5,
    inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutral4`,
}

export const buttonStyles = {
  // LOCAL TOKENS //
  $$primaryBg: "$colors$primary9",
  $$primaryBgHover: "$colors$primary10",
  $$primaryBgPressed: "$colors$primary11",
  $$primaryBgActive: "$colors$primary6",
  $$primaryBgActiveSolid: "$colors$primary8",
  $$primaryText: "$colors$textPrimary9",
  $$primaryTextHover: "$colors$textPrimary10",
  $$primaryTextPressed: "$colors$textPrimary11",
  $$primaryTextActive: "$colors$textPrimary6",
  $$primaryTextActiveSolid: "$colors$textPrimary8",
  $$secondaryBg: "$colors$secondary9",
  $$secondaryBgHover: "$colors$secondary10",
  $$secondaryBgPressed: "$colors$secondary11",
  $$secondaryBgActive: "$colors$secondary6",
  $$secondaryBgActiveSolid: "$colors$secondary8",
  $$secondaryText: "$colors$textSecondary9",
  $$secondaryTextHover: "$colors$textSecondary10",
  $$secondaryTextPressed: "$colors$textSecondary11",
  $$secondaryTextActive: "$colors$textSecondary6",
  $$secondaryTextActiveSolid: "$colors$textSecondary8",
  // Subtle
  $$subtleBg: "$colors$neutralMaxA2",
  // Outlines
  $$outlineBg: "$colors$neutralMinA4",
  $$primaryTextOutline: "$$primaryBgHover",
  $$secondaryTextOutline: "$$secondaryBgHover",
  // Disabled
  $$disabledBg: "$colors$neutral4",
  $$disabledBorder: "$colors$neutral6",
  $$disabledText: "$colors$neutral10",
  // Sizes
  $$buttonTinyPy: "$sizes$buttonBasePy",
  $$buttonSmallPy: "calc($sizes$buttonBasePy + $sizes$1)",
  $$buttonMediumPy: "calc($sizes$buttonBasePy + $sizes$2)",
  $$buttonLargePy: "calc($sizes$buttonBasePy + $sizes$3)",
  // STYLES //
  alignItems: "center",
  borderStyle: "solid",
  borderWidth: "$borderWidths$2",
  boxSizing: "content-box",
  display: "flex",
  fontWeight: "$6",
  h: "$lineHeights$field",
  justifyContent: "center",
  lineHeight: "$button",
  minWidth: "$lineHeights$field",
  position: "relative",
  radius: "$button",
  textAlign: "center",
  "a&": {
    textDecoration: "none",
  },
  "&:focus": {
    outline: "none",
  },
  "&.disabled": {
    cursor: "not-allowed",
  },
  variants: {
    square: {
      true: { lineHeight: "$min" },
    },
    shape: {
      rounded: { radius: "$rounded" },
      rectangular: { radius: "$rectangular" },
      field: { radius: "$field" },
      pill: { radius: "$pill" },
    },
    size: {
      tiny: {
        fontSize: "$buttonTiny",
        px: "$buttonBasePx",
        py: "$$buttonTinyPy",
      },
      small: {
        fontSize: "$buttonSmall",
        letterSpacing: "$tight",
        px: "$buttonBasePx",
        py: "$$buttonSmallPy",
      },
      medium: {
        fontSize: "$button",
        letterSpacing: "$tight",
        px: "calc($buttonBasePx + $2)",
        py: "$$buttonMediumPy",
      },
      large: {
        fontSize: "$buttonLarge",
        letterSpacing: "$tight",
        px: "calc($buttonBasePx + $3)",
        py: "$$buttonLargePy",
      },
    },
    variant: {
      tactile: {},
      solid: cssSolidPrimary,
      ghost: cssGhostPrimary,
      subtle: {
        ...cssGhostPrimary,
        bg: "$$subtleBg",
        color: "$primary10",
      },
      outline: cssOutlinePrimary,
    },
    colorScheme: {
      primary: cssOutlinePrimary,
      secondary: cssOutlineSecondary,
    },
    position: BASE_VARIANTS.position,
    top: BASE_VARIANTS.top,
    bottom: BASE_VARIANTS.bottom,
    left: BASE_VARIANTS.left,
    right: BASE_VARIANTS.right,
    h: BASE_VARIANTS.h,
    w: BASE_VARIANTS.w,
    maxHeight: BASE_VARIANTS.maxHeight,
    maxWidth: BASE_VARIANTS.maxWidth,
    minWidth: BASE_VARIANTS.minWidth,
    radius: BASE_VARIANTS.radius,
    radiusTop: BASE_VARIANTS.radiusTop,
    radiusBottom: BASE_VARIANTS.radiusBottom,
    radiusLeft: BASE_VARIANTS.radiusLeft,
    radiusRight: BASE_VARIANTS.radiusRight,
    p: BASE_VARIANTS.p,
    px: BASE_VARIANTS.px,
    py: BASE_VARIANTS.py,
    pt: BASE_VARIANTS.pt,
    pb: BASE_VARIANTS.pb,
    pl: BASE_VARIANTS.pl,
    pr: BASE_VARIANTS.pr,
    m: BASE_VARIANTS.m,
    mx: BASE_VARIANTS.mx,
    my: BASE_VARIANTS.my,
    mt: BASE_VARIANTS.mt,
    mb: BASE_VARIANTS.mb,
    ml: BASE_VARIANTS.ml,
    mr: BASE_VARIANTS.mr,
  },
  compoundVariants: [
    // SQUARE
    {
      square: true,
      size: "tiny",
      css: { p: "$$buttonTinyPy" },
    },
    {
      square: true,
      size: "small",
      css: { p: "$$buttonSmallPy" },
    },
    {
      square: true,
      size: "medium",
      css: { p: "$$buttonMediumPy" },
    },
    {
      square: true,
      size: "large",
      css: { p: "$$buttonLargePy" },
    },
    // TACTILE
    {
      variant: "tactile",
      colorScheme: "primary",
      css: {
        ...cssSolidPrimary,
        borderColor: "$primary10",
        borderTopColor: "$primary9",
        boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$primary10,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA5,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA3`,
        "&.active": {
          ...cssSolidPrimary["&.active"],
          borderColor: "$primaryA7",
          borderTopColor: "$primaryA4",
          borderBottomColor: "$primaryA8",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$primaryA8,
            inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA6,
            inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA3`,
        },
        "&.focused, &.hovered": {
          ...cssSolidPrimary["&.focused, &.hovered"],
          borderColor: "$primaryA11",
          borderTopColor: "$primary10",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$primaryA11,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA6,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA3`,
        },
        "&:active": {
          ...cssSolidPrimary["&:active"],
          borderColor: "$primaryA12",
          borderTopColor: "$primary11",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$primaryA12,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA7,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA4`,
        },
        "&, &.focused, &.hovered, &:active": {
          "&.disabled": {
            ...cssSolidPrimary["&.disabled"],
            ...cssTactileDisabled,
          },
        },
      },
    },
    {
      variant: "tactile",
      colorScheme: "secondary",
      css: {
        ...cssSolidSecondary,
        borderColor: "$secondary10",
        borderTopColor: "$secondary9",
        boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$secondary10,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA5,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA3`,
        "&.active": {
          ...cssSolidSecondary["&.active"],
          borderColor: "$secondaryA7",
          borderTopColor: "$secondaryA4",
          borderBottomColor: "$secondaryA8",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$secondaryA8,
            inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA6,
            inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA3`,
        },
        "&.focused, &.hovered": {
          ...cssSolidSecondary["&.focused, &.hovered"],
          borderColor: "$secondaryA11",
          borderTopColor: "$secondary10",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$secondaryA11,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA6,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA3`,
        },
        "&:active": {
          ...cssSolidSecondary["&:active"],
          borderColor: "$secondaryA12",
          borderTopColor: "$secondary11",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$secondaryA12,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMinA7,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMinA4`,
        },
        "&, &.focused, &.hovered, &:active": {
          "&.disabled": {
            ...cssSolidSecondary["&.disabled"],
            ...cssTactileDisabled,
          },
        },
      },
    },
    // TACTILE DARK MODE
    {
      variant: "tactileDarkMode",
      colorScheme: "primary",
      css: {
        ...cssSolidPrimary,
        borderColor: "$neutralMinA7",
        borderTopColor: "$neutralMinA5",
        boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralMinA7,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$primaryA10,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$primaryA9`,
        "&.active, &.focused, &.hovered": {
          borderColor: "$neutralMinA7",
          borderTopColor: "$neutralMinA5",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralMinA7,
            inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMaxA3,
            inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMaxA1`,
        },
        "&:active": {
          ...cssSolidPrimary["&:active"],
          borderColor: "$neutralMinA8",
          borderTopColor: "$neutralMinA6",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralMinA8,
            inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMaxA4,
            inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMaxA2`,
        },
        "&, &.focused, &.hovered, &:active": {
          "&.disabled": {
            ...cssSolidPrimary["&.disabled"],
            ...cssTactileDisabledDarkMode,
          },
        },
      },
    },
    {
      variant: "tactileDarkMode",
      colorScheme: "secondary",
      css: {
        ...cssSolidSecondary,
        borderColor: "$neutralMinA7",
        borderTopColor: "$neutralMinA5",
        boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralMinA7,
          inset 0 $sizes$buttonTactileHighlight 0 0 $colors$secondaryA10,
          inset 0 0 0 $sizes$buttonTactileHighlight $colors$secondaryA9`,
        "&.active, &.focused, &.hovered": {
          borderColor: "$neutralMinA7",
          borderTopColor: "$neutralMinA5",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralMinA7,
            inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMaxA3,
            inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMaxA1`,
        },
        "&:active": {
          ...cssSolidSecondary["&:active"],
          borderColor: "$neutralMinA8",
          borderTopColor: "$neutralMinA6",
          boxShadow: `inset 0 calc($sizes$buttonTactileShadow * -1 + $borderWidths$2) 0 0 $colors$neutralMinA8,
            inset 0 $sizes$buttonTactileHighlight 0 0 $colors$neutralMaxA4,
            inset 0 0 0 $sizes$buttonTactileHighlight $colors$neutralMaxA2`,
        },
        "&, &.focused, &.hovered, &:active": {
          "&.disabled": {
            ...cssSolidSecondary["&.disabled"],
            ...cssTactileDisabledDarkMode,
          },
        },
      },
    },
    // SOLID
    {
      variant: "solid",
      colorScheme: "primary",
      css: cssSolidPrimary,
    },
    {
      variant: "solid",
      colorScheme: "secondary",
      css: cssSolidSecondary,
    },
    // GHOST
    {
      variant: "ghost",
      colorScheme: "primary",
      css: cssGhostPrimary,
    },
    {
      variant: "ghost",
      colorScheme: "secondary",
      css: cssGhostSecondary,
    },
    // SUBTLE
    {
      variant: "subtle",
      colorScheme: "primary",
      css: {
        ...cssGhostPrimary,
        bg: "$$subtleBg",
        color: "$primary10",
      },
    },
    {
      variant: "subtle",
      colorScheme: "secondary",
      css: {
        ...cssGhostSecondary,
        bg: "$$subtleBg",
        color: "$secondary10",
      },
    },
  ],
  defaultVariants: {
    colorScheme: "primary",
    size: "medium",
    variant: "solid",
  },
}

export const offsetStyles = { variants: {} }

export const ringStyles = {
  // LOCAL TOKENS //
  // Min() in these tokens catches cases where base radius is set to 0
  $$extraRadiusButton: "min($radii$button * 999, $borderWidths$8 / 4)",
  $$extraRadiusRounded: "min($radii$rounded * 999, $borderWidths$8 / 4)",
  $$extraRadiusRectangular: "min($radii$rectangular * 999, $borderWidths$8 / 4)",
  $$extraRadiusField: "min($radii$field * 999, $borderWidths$8 / 4)",
  $$extraRadiusPill: "min($radii$pill * 999, $borderWidths$8 / 4)",
  $$disabledBorder: "$colors$neutral9",
  $$extraSpace: "max($sizes$4, $borderWidths$8)",
  // STYLES //
  ...animate({
    "0%": {
      opacity: "0",
    },
    "100%": {
      opacity: "1",
    },
  }),
  border: "$borderWidths$2 $borderStyles$focusRing $primary10",
  h: "calc($full + $$extraSpace)",
  left: "calc($$extraSpace / -2)",
  pointerEvents: "none",
  position: "absolute",
  radius: "calc($button + $$extraRadiusButton)",
  top: "calc($$extraSpace / -2)",
  w: "calc($full + $$extraSpace)",
  ".disabled &": {
    borderColor: "$$disabledBorder",
  },
  zIndex: "$3",
  variants: {
    shape: {
      rounded: { radius: "calc($rounded + $$extraRadiusRounded)" },
      rectangular: { radius: "calc($rectangular + $$extraRadiusRectangular)" },
      field: { radius: "calc($field + $$extraRadiusField)" },
      pill: { radius: "calc($pill + $$extraRadiusPill)" },
    },
    colorScheme: {
      primary: {
        borderColor: "$primary10",
        ".disabled &": {
          borderColor: "$$disabledBorder",
        },
      },
      secondary: {
        borderColor: "$secondary10",
        ".disabled &": {
          borderColor: "$$disabledBorder",
        },
      },
    },
  },
}
