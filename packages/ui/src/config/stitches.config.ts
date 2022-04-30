import { createStitches, defaultThemeMap } from "@stitches/react"
import type * as S from "@stitches/react"
import { Token } from "@stitches/react/types/theme"
import { generateDirectionalCSS } from "./l10n"
import {
  BASE_STYLE_SIZE,
  BGColorNameKeys,
  BG_COLOR_KEYS,
  BodyFontFamily,
  bodyFonts,
  breakpoints,
  Breakpoints,
  CodeFontFamily,
  codeFonts,
  COLOR_KEYS,
  DEFAULT_HUE,
  DEFAULT_PALETTE,
  FontFamilyData,
  FontFamilyKey,
  FontFamilySpec,
  FontWeight,
  FULL_STATUS_COLOR_KEYS,
  GetThemeFonts,
  HeadingFontFamily,
  headingFonts,
  HtmlHeadLink,
  RADIUS_KEYS,
  SemanticSize,
  SemanticSizes,
  SemanticStaticColorName,
  StatusTextColorName,
  STYLE_UNIT,
  SystemFontFamily,
  TextColorNameKeys,
  TEXT_COLOR_KEYS,
} from "../shared/models/theme.models"
import { generatePaletteFromHue, generateThemeColors } from "../shared/utils/theme.utils"
import { capitalizeFirstLetter, enumKeys } from "../shared/utils/common.utils"

export type { VariantProps } from "@stitches/react"

// BASE THEME VALUES //////////////////////////////////////////////////////////
// Sizes, used for `sizes` and `space` token categories
const sizes = {
  auto: "auto",
  px: "1px",
  rem: "1rem",
  base: `${BASE_STYLE_SIZE}${STYLE_UNIT}`,
  none: "0",
  quarter: "25%",
  third: "33.33333333%",
  half: "50%",
  twoThirds: "66.66666666%",
  threeQuarters: "75%",
  full: "100%",
  fullVh: "100vh",
  fullVw: "100vw",
  // X-SMALL --> <=48              [0 – 48]
  0: "$none", //                "0"
  1: `calc($base / 2)`, //      "2"
  2: "$base", //                "4"
  3: `calc($base * 2)`, //      "8"
  4: `calc($base * 3)`, //     "12"
  5: `calc($base * 4)`, //     "16"
  6: `calc($base * 5)`, //     "20"
  7: `calc($base * 6)`, //     "24"
  8: `calc($base * 8)`, //     "32"
  9: `calc($base * 10)`, //    "40"
  10: `calc($base * 12)`, //   "48"
  // SMALL   --> 64+               [64 – 120]
  11: `calc($base * 16)`, //   "64"
  12: `calc($base * 20)`, //   "80"
  13: `calc($base * 24)`, //   "96"
  14: `calc($base * 30)`, //  "120"
  // MEDIUM  --> 160+              [160 – 320]
  15: `calc($base * 40)`, //  "160"
  16: `calc($base * 50)`, //  "200"
  17: `calc($base * 60)`, //  "240"
  18: `calc($base * 80)`, //  "320"
  // LARGE   --> 400+              [400 – 800]
  19: `calc($base * 100)`, // "400"
  20: `calc($base * 120)`, // "480"
  21: `calc($base * 140)`, // "560"
  22: `calc($base * 160)`, // "640"
  23: `calc($base * 180)`, // "720"
  24: `calc($base * 200)`, // "800"
  // X-LARGE --> 960+              [960 – 1600]
  25: `calc($base * 240)`, // "960"
  26: `calc($base * 280)`, //"1120"
  27: `calc($base * 320)`, //"1280"
  28: `calc($base * 360)`, //"1440"
  29: `calc($base * 400)`, //"1600"
}

const shadows = {
  light: {
    none: "none",
    low: `0px 1px 1.5px hsl($colors$shadowBase / 0.18)`,
    medium: `
0px 1.8px 2.7px hsl($colors$shadowBase / 0.08),
0px 5.1px 7.7px hsl($colors$shadowBase / 0.16)
    `,
    high: `
0px 3.7px 5.6px hsl($colors$shadowBase / 0.03),
0px 8px 12px hsl($colors$shadowBase / 0.05),
0px 17px 25.5px hsl($colors$shadowBase / 0.12)
    `,
    highSoft: `
0px 3.7px 5.6px hsl($colors$shadowBase / 0.01),
0px 8px 12px hsl($colors$shadowBase / 0.02),
0px 17px 25.5px hsl($colors$shadowBase / 0.04)
    `,
  },
  dark: {
    none: "none",
    low: `0px 1.5px 2.3px hsl($colors$shadowBase / 0.38)`,
    medium: `
0px 2.6px 3.9px hsl($colors$shadowBase / 0.25),
0px 7.5px 11.3px hsl($colors$shadowBase / 0.40)
    `,
    high: `
0px 8.6px 12.9px hsl($colors$shadowBase / 0.22),
0px 19.1px 28.7px hsl($colors$shadowBase / 0.35),
0px 40.8px 61.2px hsl($colors$shadowBase / 0.55)
    `,
    highSoft: `
0px 8.6px 12.9px hsl($colors$shadowBase / 0.18),
0px 19.1px 28.7px hsl($colors$shadowBase / 0.30),
0px 40.8px 61.2px hsl($colors$shadowBase / 0.44)
    `,
  },
}

// Font definition
const DEFAULT_FONTS: Required<FontFamilySpec> = {
  body: "sourceSansPro",
  button: "sourceSansPro",
  heading: "montserrat",
  code: "firaCode",
}

// LIGHT THEME ////////////////////////////////////////////////////////////////
// Color generation
const lightPalette = generateThemeColors(
  generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE),
  "light"
)
const colors: ThemeColors = {
  none: "transparent",
  panel: "$neutralMin",
  shadowBase: "53 0% 7%",
  shadowBlack: "hsl(0 0% 0%)",
  shadowLight: "hsl($colors$shadowBase / 0.05)",
  shadowHeavy: "hsl($colors$shadowBase / 0.15)",
  defaultBody: "$textNeutral2",
  defaultHeading: "$neutral10",
  ...lightPalette,
}

// Source theme values
const baseThemeValues = {
  borderStyles: {
    focusRing: "solid",
  },
  borderWidths: {
    px: "1px",
    rem: "1rem",
    base: `2${STYLE_UNIT}`,
    focusRing: "$none",
    none: "0",
    0: "$none",
    1: `calc($base - 1${STYLE_UNIT})`,
    2: "$base",
    3: `calc($base + 2${STYLE_UNIT})`,
    4: `calc($base + 4${STYLE_UNIT})`,
    5: `calc($base + 6${STYLE_UNIT})`,
    6: `calc($base + 8${STYLE_UNIT})`,
    7: `calc($base + 10${STYLE_UNIT})`,
    8: `calc($base * 6)`,
    9: `calc($base * 8)`,
    10: `calc($base * 10)`,
  },
  colors,
  fonts: {
    body: `$${DEFAULT_FONTS.body}, $systemSans`,
    button: `$${DEFAULT_FONTS.button}, $systemSans`,
    heading: `$${DEFAULT_FONTS.heading}, $systemSerif`,
    code: `$${DEFAULT_FONTS.code}, $systemMono`,
    quote: "$heading, $systemSerif",
    systemSans: SystemFontFamily.sansSerif as string,
    systemSerif: SystemFontFamily.serif as string,
    systemMono: SystemFontFamily.monospace as string,
    ...enumKeys(BodyFontFamily).reduce(
      (output: Record<keyof typeof BodyFontFamily, string>, key: keyof typeof BodyFontFamily) => {
        output[key] = `"${BodyFontFamily[key]}"`
        return output
      },
      {} as Record<keyof typeof BodyFontFamily, string>
    ),
    ...enumKeys(HeadingFontFamily).reduce(
      (
        output: Record<keyof typeof HeadingFontFamily, string>,
        key: keyof typeof HeadingFontFamily
      ) => {
        output[key] = `"${HeadingFontFamily[key]}"`
        return output
      },
      {} as Record<keyof typeof HeadingFontFamily, string>
    ),
    ...enumKeys(CodeFontFamily).reduce(
      (output: Record<keyof typeof CodeFontFamily, string>, key: keyof typeof CodeFontFamily) => {
        output[key] = `"${CodeFontFamily[key]}"`
        return output
      },
      {} as Record<keyof typeof CodeFontFamily, string>
    ),
  },
  fontSizes: {
    base: `16${STYLE_UNIT}`,
    quote: "$h2",
    h1: "$9",
    h2: "$7",
    h3: "$6",
    h4: "$5",
    h5: "$4",
    h6: "$3",
    p: "$3",
    field: "$p",
    fieldTiny: "calc($field * 0.8)",
    fieldSmall: "calc($field * 0.9)",
    fieldLarge: "calc($field * 1.25)",
    button: "$field",
    buttonTiny: "calc($button * 0.8)",
    buttonSmall: "calc($button * 0.9)",
    buttonLarge: "calc($button * 1.25)",
    smallest: "$1",
    small: "$2",
    medium: "$3",
    large: "$6",
    largest: "$9",
    1: `calc($base - 2${STYLE_UNIT})`,
    2: "$base",
    3: `calc($base + 1${STYLE_UNIT})`,
    4: `calc($base + 3${STYLE_UNIT})`,
    5: `calc($base + 6${STYLE_UNIT})`,
    6: `calc($base + 10${STYLE_UNIT})`,
    7: `calc($base + 15${STYLE_UNIT})`,
    8: `calc($base + 21${STYLE_UNIT})`,
    9: `calc($base + 28${STYLE_UNIT})`,
    10: `calc($base + 36${STYLE_UNIT})`,
    11: `calc($base + 45${STYLE_UNIT})`,
    12: `calc($base + 55${STYLE_UNIT})`,
  },
  fontWeights: {
    h1: "$6",
    h2: "$7",
    h3: "$6",
    h4: "$9",
    h5: "$6",
    h6: "$8",
    p: "$3",
    code: "$6",
    hairline: "$1",
    thin: "$2",
    light: "$3",
    regular: "$4",
    bold: "$6",
    heavy: "$7",
    black: "$9",
    1: "100",
    2: "200",
    3: "300",
    4: "400",
    5: "500",
    6: "600",
    7: "700",
    8: "800",
    9: "900",
  },
  letterSpacings: {
    tightest: `-1${STYLE_UNIT}`,
    tight: `-0.25${STYLE_UNIT}`,
    regular: `0${STYLE_UNIT}`,
    loose: `0.5${STYLE_UNIT}`,
  },
  lineHeights: {
    base: "1.65",
    body: "calc($base + $modifier)",
    heading: "calc((0.75 + ($base * 0.3)) + $modifier)",
    listItem: "calc((0.75 + ($base * 0.3)) + $modifier)",
    min: "1px",
    spaced: "calc(($base * 1.1) + $modifier)",
    tight: "calc(($base / 1.65) + $modifier)",
    field: "$6",
    label: "$field",
    button: "2rem",
    modifier: "0rem",
    /** 2 --> 4rem */
    2: "calc($sizes$2 + $modifier)",
    /** 3 --> 8rem */
    3: "calc($sizes$3 + $modifier)",
    /** 4 --> 12rem */
    4: "calc($sizes$4 + $modifier)",
    /** 5 --> 16rem */
    5: "calc($sizes$5 + $modifier)",
    /** 6 --> 20rem */
    6: "calc($sizes$6 + $modifier)",
    /** 7 --> 24rem */
    7: "calc($sizes$7 + $modifier)",
    /** 8 --> 32rem */
    8: "calc($sizes$8 + $modifier)",
    /** 9 --> 40rem */
    9: "calc($sizes$9 + $modifier)",
    /** 10 --> 48rem */
    10: "calc($sizes$10 + $modifier)",
    /** 11 --> 64rem */
    11: "calc($sizes$11 + $modifier)",
    /** 12 --> 80rem */
    12: "calc($sizes$12 + $modifier)",
    /** 13 --> 96rem */
    13: "calc($sizes$13 + $modifier)",
    /** 14 --> 120rem */
    14: "calc($sizes$14 + $modifier)",
  },
  radii: {
    px: "1px",
    rem: "1rem",
    base: `4${STYLE_UNIT}`,
    round: "50%",
    pill: `240${STYLE_UNIT}`,
    rounded: `min(max($field, 4${STYLE_UNIT}), 4${STYLE_UNIT})`,
    rectangular: `0${STYLE_UNIT}`,
    field: "$3",
    button: "$field",
    tooltip: "$rounded",
    none: "0",
    0: "$none",
    1: `calc($base * 0.5)`,
    2: `calc($base * 0.75)`,
    3: "$base",
    4: `calc($base * 1.5)`,
    5: `calc($base * 2)`,
    6: `calc($base * 2.5)`,
    7: `calc($base * 3)`,
    8: `calc($base * 10)`,
    9: `calc($base * 20)`,
    10: `calc($base * 30)`,
  },
  shadows: shadows.light,
  sizes: {
    ...sizes,
    buttonBasePx: "$4",
    buttonBasePy: "$2",
    buttonTactileHighlight: "1rem",
    buttonTactileShadow: "4rem",
    tooltipBaseP: "$3",
  },
  space: sizes,
  zIndices: {
    max: "9999",
    min: "-1",
    0: "0",
    1: "10",
    2: "50",
    3: "100",
    4: "200",
    5: "300",
    6: "400",
    7: "500",
    8: "600",
    9: "700",
    10: "800",
    11: "900",
    12: "1000",
  },
  transitions: {
    none: "none",
    instant: "0s",
    faster: "0.15s",
    fast: "0.25s",
    slow: "0.5s",
    slower: "0.75s",
    slowest: "1s",
  },
}

export const { styled, css, theme, createTheme, getCssText, globalCss, keyframes, config } =
  createStitches({
    cssPreProcessor: generateDirectionalCSS,
    theme: baseThemeValues,
    themeMap: {
      ...defaultThemeMap,
      padding: "sizes",
      paddingTop: "sizes",
      paddingRight: "sizes",
      paddingBottom: "sizes",
      paddingLeft: "sizes",
      paddingBlock: "sizes",
      paddingBlockEnd: "sizes",
      paddingBlockStart: "sizes",
      paddingInline: "sizes",
      paddingInlineEnd: "sizes",
      paddingInlineStart: "sizes",
    },
    media: {
      ...(Object.entries(breakpoints).reduce((output, [name, size]) => {
        output[name] = `(min-width: ${size}px)`
        output[`<${name}`] = `(max-width: ${size - 0.00001}px)`
        return output
      }, {} as Record<string, string>) as Record<Breakpoints, string>),
      highContrast: "(prefers-contrast: more)",
      lowContrast: "(prefers-contrast: less)",
      forcedColors: "(forced-colors: active)",
      reducedMotion: "(prefers-reduced-motion)",
      reducedData: "(prefers-reduced-data)",
      touch: "(hover: none)",
      hover: "(any-hover: hover)",
      controller: "(hover: hover) and (pointer: coarse)",
      pointer: "(hover: hover) and (pointer: fine)",
      dark: "(prefers-color-scheme: dark)",
      light: "(prefers-color-scheme: light)",
      safari: "not all and (min-resolution:.001dpcm)",
    },
    // Uses `styled-system` as a base for utils
    utils: {
      p: (value: S.PropertyValue<"padding">) => ({
        padding: value,
      }),
      pt: (value: S.PropertyValue<"padding">) => ({
        paddingTop: value,
      }),
      pr: (value: S.PropertyValue<"padding">) => ({
        paddingRight: value,
      }),
      pb: (value: S.PropertyValue<"padding">) => ({
        paddingBottom: value,
      }),
      pl: (value: S.PropertyValue<"padding">) => ({
        paddingLeft: value,
      }),
      px: (value: S.PropertyValue<"padding">) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: S.PropertyValue<"padding">) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: (value: S.PropertyValue<"margin">) => ({
        margin: value,
      }),
      mt: (value: S.PropertyValue<"margin">) => ({
        marginTop: value,
      }),
      mr: (value: S.PropertyValue<"margin">) => ({
        marginRight: value,
      }),
      mb: (value: S.PropertyValue<"margin">) => ({
        marginBottom: value,
      }),
      ml: (value: S.PropertyValue<"margin">) => ({
        marginLeft: value,
      }),
      mx: (value: S.PropertyValue<"margin">) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: S.PropertyValue<"margin">) => ({
        marginTop: value,
        marginBottom: value,
      }),

      bg: (value: S.PropertyValue<"background"> | "alphaPattern") => {
        // TODO: Account for high contrast mode
        return value === "alphaPattern"
          ? {
              backgroundColor: "transparent",
              backgroundSize: "12px 12px",
              backgroundPosition: "0px 0px, 6px 0px, 6px -6px, 0px 6px",
              backgroundImage: `linear-gradient(
          45deg, $neutral6 25%, transparent 25%), linear-gradient(
          135deg, $neutral6 25%, transparent 25%), linear-gradient(
          45deg, transparent 75%, $neutral6 75%), linear-gradient(
          135deg, transparent 75%, $neutral6 75%)`,
            }
          : {
              background: value,
            }
      },

      radius: (value: S.PropertyValue<"borderRadius">) => ({
        borderRadius: value,
      }),
      radiusTop: (value: S.PropertyValue<"borderRadius">) => ({
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
      }),
      radiusBottom: (value: S.PropertyValue<"borderRadius">) => ({
        borderBottomLeftRadius: value,
        borderBottomRightRadius: value,
      }),
      radiusLeft: (value: S.PropertyValue<"borderRadius">) => ({
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      }),
      radiusRight: (value: S.PropertyValue<"borderRadius">) => ({
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      }),

      borderX: (value: S.PropertyValue<"border">) => ({
        borderLeft: value,
        borderRight: value,
      }),
      borderY: (value: S.PropertyValue<"border">) => ({
        borderBottom: value,
        borderTop: value,
      }),

      z: (value: S.PropertyValue<"zIndex">) => ({ zIndex: value }),

      h: (value: S.PropertyValue<"height">) => ({ height: value }),
      w: (value: S.PropertyValue<"width">) => ({ width: value }),
      size: (value: S.PropertyValue<"width" & "height">) => ({
        width: value,
        height: value,
      }),

      linearGradient: (value: string) => ({
        backgroundImage: `linear-gradient(${value})`,
      }),

      appearance: (value: S.PropertyValue<"appearance">) => ({
        WebkitAppearance: value,
        appearance: value,
      }),
      userSelect: (value: S.PropertyValue<"userSelect">) => ({
        WebkitUserSelect: value,
        userSelect: value,
      }),
      backgroundClip: (value: S.PropertyValue<"backgroundClip">) => ({
        WebkitBackgroundClip: value,
        backgroundClip: value,
      }),
    },
  })
export const baseTheme = theme

// Animations
export type TimingFuctionValues =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "step-start"
  | "step-end"

export interface AnimationOptions {
  duration?: number | string
  timingFunction?: TimingFuctionValues | string
  delay?: number | string
  direction?: string
  fillMode?: string
  iterationCount?: number | "infinite"
  playState?: string
  transformOrigin?: string
}

export interface AnimationStyles {
  animation: string
  transformOrigin?: string
}

const isNumber = (n: string | number) => !isNaN(+n)
const getTime = (time: string | number): string => (isNumber(time) ? `${time}s` : String(time))

export const animate = (
  animation: Record<string, CSS>,
  options: AnimationOptions = {} as AnimationOptions
): AnimationStyles => {
  const {
    duration = "$transitions$fast",
    timingFunction = "ease",
    delay = "0s",
    iterationCount = 1,
    direction = "normal",
    fillMode = "none",
    playState = "running",
    transformOrigin,
  } = options
  const target = keyframes(animation)
  const durationTime = getTime(duration)
  const delayTime = getTime(delay)
  return {
    animation: `${durationTime} ${timingFunction} ${delayTime} ${iterationCount}
      ${direction} ${fillMode} ${playState} ${target}`,
    ...(transformOrigin ? { transformOrigin } : {}),
  }
}

// DARK THEME /////////////////////////////////////////////////////////////////
// Color generation
const darkPalette = generateThemeColors(
  generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE, 1, "dark"),
  "dark"
)
export const darkThemeColors = {
  none: "transparent",
  panel: "$neutral3",
  shadowBase: "53 0% 7%",
  shadowBlack: "hsl(0 0% 0%)",
  shadowLight: "hsl($colors$shadowBase / 0.2)",
  shadowHeavy: "hsl($colors$shadowBase / 0.35)",
  ...darkPalette,
}

export const darkTheme = createTheme("neutron-dark-theme", {
  colors: darkThemeColors,
  shadows: shadows.dark,
})
export const baseDarkTheme = darkTheme

// GLOBAL STYLES //////////////////////////////////////////////////////////////
// CSS Reset //
export const globalStyles = globalCss({
  html: {
    fontSize: "6.25%",
  },
  // Fix for Safari to properly set `rem` units
  "@safari": {
    "@supports (-webkit-appearance:none)": {
      html: { fontSize: "1px" },
    },
  },
  body: {
    bg: "$neutral2",
    color: "$defaultBody",
    fontSize: "16em",
    fontWeight: "$p",
    lineHeight: "$body",
    m: "$none",
    p: "$none",
  },
  "*": {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    boxSizing: "border-box",
    "&::placeholder": {
      color: "$textNeutral9",
    },
    "@reducedMotion": {
      animation: "$none !important",
      transition: "$none !important",
    },
  },
  "body, a, p, li, strong, em, b, i, button": {
    fontFamily: "$body",
  },
  button: {
    fontFamily: "$button",
  },
  "pre, code": {
    fontFamily: "$code",
  },
  code: {
    bg: "$neutralMaxA2",
    color: "$neutralMax",
    fontWeight: "$code",
  },
  blockquote: {
    fontFamily: "$quote",
    fontSize: "$quote",
    lineHeight: "$spaced",
    fontStyle: "italic",
  },
  ul: {
    listStyleType: "circle",
  },
  "a, p, li, pre, code, strong, em, b, i, blockquote": {
    fontSize: "$p",
  },
  a: {
    color: "$primary10",
    fontWeight: "$6",
    radius: "$field",
    textDecoration: "underline",
    "&:focus": {
      outline: "2px solid $colors$primaryA10",
    },
  },
  "blockquote, pre": {
    bg: "$neutral3",
    color: "$textNeutral3",
    mx: "$none",
    px: "$8",
    py: "$6",
    radius: "$rounded",
  },
  h1: {
    fontSize: "$h1",
    fontWeight: "$h1",
    letterSpacing: "$tightest",
  },
  h2: {
    fontSize: "$h2",
    fontWeight: "$h2",
  },
  h3: {
    fontSize: "$h3",
    fontWeight: "$h3",
  },
  h4: {
    fontSize: "$h4",
    fontWeight: "$h4",
  },
  h5: {
    fontSize: "$h5",
    fontWeight: "$h5",
  },
  h6: {
    fontSize: "$h6",
    fontWeight: "$h6",
  },
  em: {
    fontStyle: "normal",
  },
  strong: {
    fontWeight: "$p",
  },
  "::selection": {
    bg: "$primary9",
    color: "$textPrimary9",
  },
})

// DERIVED TYPES //////////////////////////////////////////////////////////////
type ThemeColors = typeof lightPalette & {
  none?: string
  panel?: string
  shadowBase?: string
  shadowBlack?: string
  shadowLight?: string
  shadowHeavy?: string
  defaultBody?: string
  defaultHeading?: string
}

export type MediaToken = keyof typeof config.media
export type BorderStylesToken = keyof typeof theme.borderStyles
export type BorderWidthsToken = keyof typeof theme.borderWidths
export type ColorsToken = keyof typeof theme.colors
export type FontSizesToken = keyof typeof theme.fontSizes
export type FontWeightsToken = keyof typeof theme.fontWeights
export type FontsToken = keyof typeof theme.fonts
export type LetterSpacingsToken = keyof typeof theme.letterSpacings
export type LineHeightsToken = keyof typeof theme.lineHeights
export type RadiiToken = keyof typeof theme.radii
export type ShadowsToken = keyof typeof theme.shadows
export type SizesToken = keyof typeof theme.sizes
export type SpaceToken = keyof typeof theme.space
export type TransitionsToken = keyof typeof theme.transitions
export type ZIndicesToken = keyof typeof theme.zIndices
export type ThemeStyleTokenProps =
  | BorderStylesToken
  | BorderWidthsToken
  | ColorsToken
  | FontSizesToken
  | FontWeightsToken
  | FontsToken
  | LetterSpacingsToken
  | LineHeightsToken
  | RadiiToken
  | ShadowsToken
  | SizesToken
  | SpaceToken
  | TransitionsToken
  | ZIndicesToken

export type ThemeCategoryName = keyof PartialTheme
export type ThemeTokenCategory =
  | typeof theme.borderStyles
  | typeof theme.borderWidths
  | typeof theme.colors
  | typeof theme.fontSizes
  | typeof theme.fontWeights
  | typeof theme.fonts
  | typeof theme.letterSpacings
  | typeof theme.lineHeights
  | typeof theme.radii
  | typeof theme.shadows
  | typeof theme.sizes
  | typeof theme.space
  | typeof theme.transitions
  | typeof theme.zIndices

export type ThemeTokenProps =
  | keyof typeof baseThemeValues.borderStyles
  | keyof typeof baseThemeValues.borderWidths
  | keyof typeof baseThemeValues.colors
  | keyof typeof baseThemeValues.fontSizes
  | keyof typeof baseThemeValues.fontWeights
  | keyof typeof baseThemeValues.fonts
  | keyof typeof baseThemeValues.letterSpacings
  | keyof typeof baseThemeValues.lineHeights
  | keyof typeof baseThemeValues.radii
  | keyof typeof baseThemeValues.shadows
  | keyof typeof baseThemeValues.sizes
  | keyof typeof baseThemeValues.space
  | keyof typeof baseThemeValues.transitions
  | keyof typeof baseThemeValues.zIndices

export type ThemeTokenValues =
  | typeof baseThemeValues.borderStyles
  | typeof baseThemeValues.borderWidths
  | typeof baseThemeValues.colors
  | typeof baseThemeValues.fontSizes
  | typeof baseThemeValues.fontWeights
  | typeof baseThemeValues.fonts
  | typeof baseThemeValues.letterSpacings
  | typeof baseThemeValues.lineHeights
  | typeof baseThemeValues.radii
  | typeof baseThemeValues.shadows
  | typeof baseThemeValues.sizes
  | typeof baseThemeValues.space
  | typeof baseThemeValues.transitions
  | typeof baseThemeValues.zIndices

export type PartialThemeTokenValues =
  | Partial<typeof baseThemeValues.borderStyles>
  | Partial<typeof baseThemeValues.borderWidths>
  | Partial<typeof baseThemeValues.colors>
  | Partial<typeof baseThemeValues.fontSizes>
  | Partial<typeof baseThemeValues.fontWeights>
  | Partial<typeof baseThemeValues.fonts>
  | Partial<typeof baseThemeValues.letterSpacings>
  | Partial<typeof baseThemeValues.lineHeights>
  | Partial<typeof baseThemeValues.radii>
  | Partial<typeof baseThemeValues.shadows>
  | Partial<typeof baseThemeValues.sizes>
  | Partial<typeof baseThemeValues.space>
  | Partial<typeof baseThemeValues.transitions>
  | Partial<typeof baseThemeValues.zIndices>

export type CompleteTheme = typeof theme & {
  borderStyles: typeof theme.borderStyles
  borderWidths: typeof theme.borderWidths
  colors: typeof theme.colors
  fontSizes: typeof theme.fontSizes
  fontWeights: typeof theme.fontWeights
  fonts: typeof theme.fonts
  letterSpacings: typeof theme.letterSpacings
  lineHeights: typeof theme.lineHeights
  radii: typeof theme.radii
  shadows: typeof theme.shadows
  sizes: typeof theme.sizes
  space: typeof theme.space
  transitions: typeof theme.transitions
  zIndices: typeof theme.zIndices
}
export type PartialTheme = Omit<
  typeof theme,
  | "borderStyles"
  | "borderWidths"
  | "colors"
  | "fontSizes"
  | "fontWeights"
  | "fonts"
  | "letterSpacings"
  | "lineHeights"
  | "radii"
  | "shadows"
  | "sizes"
  | "space"
  | "transitions"
  | "zIndices"
> & {
  borderStyles: Partial<typeof theme.borderStyles>
  borderWidths: Partial<typeof theme.borderWidths>
  colors: Partial<typeof theme.colors>
  fontSizes: Partial<typeof theme.fontSizes>
  fontWeights: Partial<typeof theme.fontWeights>
  fonts: Partial<typeof theme.fonts>
  letterSpacings: Partial<typeof theme.letterSpacings>
  lineHeights: Partial<typeof theme.lineHeights>
  radii: Partial<typeof theme.radii>
  shadows: Partial<typeof theme.shadows>
  sizes: Partial<typeof theme.sizes>
  space: Partial<typeof theme.space>
  transitions: Partial<typeof theme.transitions>
  zIndices: Partial<typeof theme.zIndices>
}
export type CompleteThemeValues = {
  borderStyles: Partial<typeof baseThemeValues.borderStyles> | null
  borderWidths: Partial<typeof baseThemeValues.borderWidths> | null
  colors: Partial<typeof baseThemeValues.colors> | null
  fontSizes: Partial<typeof baseThemeValues.fontSizes> | null
  fontWeights: Partial<typeof baseThemeValues.fontWeights> | null
  fonts: Partial<typeof baseThemeValues.fonts> | null
  letterSpacings: Partial<typeof baseThemeValues.letterSpacings> | null
  lineHeights: Partial<typeof baseThemeValues.lineHeights> | null
  radii: Partial<typeof baseThemeValues.radii> | null
  shadows: Partial<typeof baseThemeValues.shadows> | null
  sizes: Partial<typeof baseThemeValues.sizes> | null
  space: Partial<typeof baseThemeValues.space> | null
  transitions: Partial<typeof baseThemeValues.transitions> | null
  zIndices: Partial<typeof baseThemeValues.zIndices> | null
}
export type Theme = Partial<PartialTheme>
export type ThemeValues = Partial<CompleteThemeValues>
export type ThemeConfig = Parameters<typeof createTheme>[1]
export type CSS = S.CSS<typeof config>
export type Polymorphic = string | React.ComponentType<unknown>

export type VariantType = string | Record<MediaToken, string>

export type BorderWidths = Partial<typeof baseThemeValues.borderWidths>
export type FontFamilies = Partial<typeof baseThemeValues.fonts>
export type FontSizes = Partial<typeof baseThemeValues.fontSizes>
export type LineHeights = Partial<typeof baseThemeValues.lineHeights>
export type Radii = Partial<typeof baseThemeValues.radii>
export type Sizes = Partial<typeof baseThemeValues.sizes>
export type Space = Partial<typeof baseThemeValues.space>

// Types of variant sequences
export interface SizeVariantsHalf {
  "0": CSS
  "1": CSS
  "2": CSS
  "3": CSS
  "4": CSS
  "5": CSS
  "6": CSS
  "7": CSS
  "8": CSS
  "9": CSS
  "10": CSS
  "11": CSS
  "12": CSS
}
export interface SignedSizeVariantsHalf extends SizeVariantsHalf {
  minus12: CSS
  minus11: CSS
  minus10: CSS
  minus9: CSS
  minus8: CSS
  minus7: CSS
  minus6: CSS
  minus5: CSS
  minus4: CSS
  minus3: CSS
  minus2: CSS
  minus1: CSS
}
export interface SizeVariantsFull {
  "0": CSS
  "1": CSS
  "2": CSS
  "3": CSS
  "4": CSS
  "5": CSS
  "6": CSS
  "7": CSS
  "8": CSS
  "9": CSS
  "10": CSS
  "11": CSS
  "12": CSS
  "13": CSS
  "14": CSS
  "15": CSS
  "16": CSS
  "17": CSS
  "18": CSS
  "19": CSS
  "20": CSS
  "21": CSS
  "22": CSS
  "23": CSS
  "24": CSS
  "25": CSS
  "26": CSS
  "27": CSS
  "28": CSS
  "29": CSS
}
export interface SignedSizeVariantsFull extends SizeVariantsFull {
  minus29: CSS
  minus28: CSS
  minus27: CSS
  minus26: CSS
  minus25: CSS
  minus24: CSS
  minus23: CSS
  minus22: CSS
  minus21: CSS
  minus20: CSS
  minus19: CSS
  minus18: CSS
  minus17: CSS
  minus16: CSS
  minus15: CSS
  minus14: CSS
  minus13: CSS
  minus12: CSS
  minus11: CSS
  minus10: CSS
  minus9: CSS
  minus8: CSS
  minus7: CSS
  minus6: CSS
  minus5: CSS
  minus4: CSS
  minus3: CSS
  minus2: CSS
  minus1: CSS
}
export type BorderWidthVariant = Omit<SizeVariantsHalf, "10" | "11" | "12">
export type FontSizeVariant = Omit<SizeVariantsHalf, "0">
export type FontWeightVariant = Omit<SizeVariantsHalf, "0" | "10" | "11" | "12">
export type RadiusVariant = Omit<SizeVariantsHalf, "11" | "12">
export type SizeVariant = Omit<SizeVariantsFull, "none">
export type SpaceVariant = Omit<SizeVariantsFull, "none">
export type zIndexVariant = Omit<SizeVariantsHalf, "none">
export type PositionVariant = Omit<SizeVariantsHalf, "none">
export type SignedSizeVariant = Omit<SignedSizeVariantsFull, "none">
export type SignedSpaceVariant = Omit<SignedSizeVariantsFull, "none">
export type SignedzIndexVariant = Omit<SignedSizeVariantsHalf, "none">
export type SignedPositionVariant = Omit<SignedSizeVariantsHalf, "none">

type SemanticRadii = {
  [key in "px" | "rem" | "base" | "none" | "round" | "pill" | "field" | "button"]: CSS
}
//////

type BGColorNames = {
  [key in BGColorNameKeys]: CSS
}
type TextColorNames = {
  [key in TextColorNameKeys]: CSS
}

export type Fonts = typeof baseThemeValues.fonts
export const FONT_PROPS = Object.keys(baseThemeValues.fonts) as (keyof Fonts)[]

// DERIVED UTILS //////////////////////////////////////////////////////////////
/** Find the root value of a theme variable */
export function getRootValueFromTheme(
  theme: Theme,
  category: ThemeCategoryName,
  token: ThemeStyleTokenProps
): string {
  const categoryData = theme[category]
  if (categoryData) {
    const tokenData = categoryData[token as keyof typeof categoryData] as Token
    let value = tokenData.value
    if (value) {
      const isVar = value.includes("var(")
      if (isVar) {
        const keys = value.replace(`var(--`, "").replace(")", "").split("-")
        value = getRootValueFromTheme(
          theme,
          keys[0] as ThemeCategoryName,
          keys[1] as ThemeStyleTokenProps
        )
      }
    }
    return String(value)
  }
  return ""
}

const getFontWeightReducer =
  (prefix: number) =>
  (output: string, weight: FontWeight, index: number): string => {
    output += `${!index ? "" : ";"}${prefix},${weight}`
    return output
  }
//
/** Get HTML <head> Link data for the design system's fonts */
export function getFontLinks(fontFamilies: FontFamilySpec = DEFAULT_FONTS): HtmlHeadLink[] {
  let families = ""

  // Make sure we merge repeated fonts, to get all the necessary weights!
  const bodyKey = fontFamilies.body || DEFAULT_FONTS.body
  const bodyWeights: FontWeight[] = bodyFonts[bodyKey].weights
  const bodyItalicWeights: FontWeight[] = bodyFonts[bodyKey].italicWeights
  const headingKey = fontFamilies.heading || DEFAULT_FONTS.heading
  let headingWeights: FontWeight[] = headingFonts[headingKey].weights
  let headingItalicWeights: FontWeight[] = headingFonts[headingKey].italicWeights
  const codeKey = fontFamilies.code || DEFAULT_FONTS.code
  let codeWeights: FontWeight[] = codeFonts[codeKey].weights
  let codeItalicWeights: FontWeight[] = codeFonts[codeKey].italicWeights

  if (headingKey === bodyKey) {
    headingWeights = [...bodyWeights, ...headingFonts[headingKey].weights]
    headingItalicWeights = [...bodyItalicWeights, ...headingFonts[headingKey].italicWeights]
  }
  if (codeKey === headingKey) {
    codeWeights = [...headingWeights, ...codeFonts[codeKey].weights]
    codeItalicWeights = [...headingItalicWeights, ...codeFonts[codeKey].italicWeights]
  }

  const familyData = new Map<FontFamilyKey, FontFamilyData>()
  familyData.set(bodyKey, {
    name: BodyFontFamily[bodyKey],
    weights: Array.from(bodyWeights).sort(),
    italicWeights: Array.from(bodyItalicWeights).sort(),
  })
  familyData.set(headingKey, {
    name: HeadingFontFamily[headingKey],
    weights: Array.from(headingWeights).sort(),
    italicWeights: Array.from(headingItalicWeights).sort(),
  })
  familyData.set(codeKey, {
    name: CodeFontFamily[codeKey],
    weights: Array.from(codeWeights).sort(),
    italicWeights: Array.from(codeItalicWeights).sort(),
  })
  const fonts = Array.from(familyData)

  fonts.forEach(([, fontData]: [FontFamilyKey, FontFamilyData]) => {
    if (!fontData) {
      return
    }
    const { weights, italicWeights } = fontData
    const fontName = String(fontData.name).replace(" ", "+")
    let variants = ""
    if (weights.length + italicWeights.length > 1) {
      const regular = weights.reduce(getFontWeightReducer(0), "")
      const italic = italicWeights.reduce(getFontWeightReducer(1), "")
      variants = `:ital,wght@${regular};${italic}`
    }
    families += `&family=${fontName}${variants}`
  })
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "style",
      href: `https://fonts.googleapis.com/css2?display=auto${families}`,
    },
    {
      rel: "stylesheet",
      href: `https://fonts.googleapis.com/css2?display=auto${families}`,
    },
  ]
}

/** Get theme font data + font links to add to the HTML <head> */
export function getThemeFonts(
  fontFamilies: FontFamilySpec = DEFAULT_FONTS
): GetThemeFonts<FontFamilies> {
  const { body, button, heading, code } = fontFamilies
  const bodyKey = body || DEFAULT_FONTS.body
  const buttonKey = button || body || DEFAULT_FONTS.button
  const headingKey = heading || DEFAULT_FONTS.heading
  const codeKey = code || DEFAULT_FONTS.code
  const buttonFontData =
    bodyFonts[buttonKey as keyof typeof bodyFonts] ||
    headingFonts[buttonKey as keyof typeof headingFonts]
  const bodyFallback = bodyFonts[bodyKey as keyof typeof bodyFonts].fallbackKey || "systemSans"
  const buttonFallback = buttonFontData.fallbackKey || "systemSans"
  const headingFallback =
    headingFonts[headingKey as keyof typeof headingFonts].fallbackKey || "systemSerif"
  const codeFallback = codeFonts[codeKey as keyof typeof codeFonts].fallbackKey || "systemCode"
  return {
    fonts: {
      body: `$${bodyKey}, $${bodyFallback}`,
      button: `$${buttonKey}, $${buttonFallback}`,
      heading: `$${headingKey}, $${headingFallback}`,
      code: `$${codeKey}, $${codeFallback}`,
    },
    links: getFontLinks(fontFamilies),
  }
}

/** Generates a numbered sequence of Stitches variant entries */
export function generateVariantSequence<
  T extends Partial<SizeVariant | SignedSizeVariant> = SizeVariant
>(entries: number, contentGetter: (value: number) => CSS, shift = 1): T {
  const out: T = Array(entries)
    .fill(0)
    .reduce((output: Record<string | number, CSS>, x: number, index: number) => {
      const key = index + shift
      const validKey = key < 0 ? `minus${Math.abs(key)}` : key
      output[validKey] = contentGetter(key)
      return output
    }, {} as Record<string | number, CSS>)
  return out as T
}

function getSignedContentGetter(prop: keyof CSS): (n: number) => CSS {
  return (n: number) => {
    const val = Math.abs(n)
    return { [prop]: n < 0 ? `calc($${val} * -1)` : `$${val}` }
  }
}

function getSemanticSizes(prop: keyof CSS): Record<SemanticSizes, CSS> {
  return enumKeys(SemanticSize).reduce(
    (output: Record<SemanticSizes, CSS>, key: keyof typeof SemanticSize) => {
      output[key] = { [prop]: `$${key}` }
      return output
    },
    {} as Record<SemanticSizes, CSS>
  )
}

const heightVariants = {
  ...getSemanticSizes("h"),
  ...generateVariantSequence(30, (n: number) => ({ h: `$${n}` }), 0),
}
const widthVariants = {
  ...getSemanticSizes("w"),
  ...generateVariantSequence(30, (n: number) => ({ w: `$${n}` }), 0),
}

function generateSemanticRadii(setter: (k: string) => CSS): SemanticRadii {
  return RADIUS_KEYS.reduce((output: SemanticRadii, key: string) => {
    output[key as keyof SemanticRadii] = setter(key)
    return output
  }, {} as SemanticRadii)
}

const getBgColorReducer =
  (isFocusStyle = false) =>
  (output: BGColorNames, bg: string) => {
    const name = bg.toLowerCase()
    const isNeutral = name.includes("neutral")
    const isNeutralStatic = isNeutral && (name.includes("max") || name.includes("min"))
    const isStatus =
      !isNeutral && !!SemanticStaticColorName[bg as keyof typeof SemanticStaticColorName]
    let style: CSS
    if (isNeutralStatic || isStatus) {
      style = { bg: `$${bg}` }
      output[bg as keyof BGColorNames] = isFocusStyle ? { "&:focus, &:hover": style } : style
    }
    if (!isStatus) {
      COLOR_KEYS.forEach((key: number) => {
        if (!isNeutralStatic) {
          style = { bg: `$${bg}${key}` }
          output[`${bg}${key}` as keyof BGColorNames] = isFocusStyle
            ? { "&:focus, &:hover": style }
            : style
        }
        style = { bg: `$${bg}A${key}` }
        output[`${bg}A${key}` as keyof BGColorNames] = isFocusStyle
          ? { "&:focus, &:hover": style }
          : style
      })
    }
    if (!output.transparent) {
      style = { bg: "transparent" }
      output.transparent = isFocusStyle ? { "&:focus, &:hover": style } : style
    }
    return output
  }
const getBorderColorReducer =
  (isFocusStyle = false) =>
  (output: BGColorNames, borderColor: string) => {
    const name = borderColor.toLowerCase()
    const isNeutral = name.includes("neutral")
    const isNeutralStatic = isNeutral && (name.includes("max") || name.includes("min"))
    const isStatus =
      !isNeutral && !!SemanticStaticColorName[borderColor as keyof typeof SemanticStaticColorName]
    let style: CSS
    if (isNeutralStatic || isStatus) {
      style = { borderColor: `$${borderColor}` }
      output[borderColor as keyof BGColorNames] = isFocusStyle
        ? { "&:focus, &:hover": style }
        : style
    }
    if (!isStatus) {
      COLOR_KEYS.forEach((key: number) => {
        if (!isNeutralStatic) {
          style = { borderColor: `$${borderColor}${key}` }
          output[`${borderColor}${key}` as keyof BGColorNames] = isFocusStyle
            ? { "&:focus, &:hover": style }
            : style
        }
        style = { borderColor: `$${borderColor}A${key}` }
        output[`${borderColor}A${key}` as keyof BGColorNames] = isFocusStyle
          ? { "&:focus, &:hover": style }
          : style
      })
    }
    if (!output.transparent) {
      style = { borderColor: "transparent" }
      output.transparent = isFocusStyle ? { "&:focus, &:hover": style } : style
    }
    return output
  }
const getTextColorReducer =
  (isFocusStyle = false) =>
  (output: TextColorNames, color: string) => {
    const isStatus = FULL_STATUS_COLOR_KEYS.includes(color as StatusTextColorName)
    let style: CSS
    if (isStatus) {
      style = { color: `$${color}` }
      output[color as keyof TextColorNames] = isFocusStyle ? { "&:focus, &:hover": style } : style
    } else {
      COLOR_KEYS.forEach((key: number) => {
        style = { color: `$${color}${key}` }
        output[`${color}${key}` as keyof TextColorNames] = isFocusStyle
          ? { "&:focus, &:hover": style }
          : style
      })
    }
    if (!output.transparent) {
      style = { color: "transparent" }
      output.transparent = isFocusStyle ? { "&:focus, &:hover": style } : style
    }
    return output
  }
const bgColorReducer = getBgColorReducer()
const textColorReducer = getTextColorReducer()
const borderColorReducer = getBorderColorReducer()
const focusBorderReducer = getBorderColorReducer(true)
const focusBgReducer = getBgColorReducer(true)
const focusColorReducer = getTextColorReducer(true)
const getHoverColorProps = (value: string): CSS => ({
  "&:focus, &:hover": {
    bg: value,
    color: `$text${capitalizeFirstLetter(value.replace("$", ""))}`,
    outline: "none",
  },
})
const focusButtonReducer = (output: BGColorNames, color: string) => {
  const name = color.toLowerCase()
  const isNeutral = name.includes("neutral")
  const isNeutralStatic = isNeutral && (name.includes("max") || name.includes("min"))
  const isStatus =
    !isNeutral && !!SemanticStaticColorName[color as keyof typeof SemanticStaticColorName]
  if (isNeutralStatic || isStatus) {
    output[color as keyof BGColorNames] = getHoverColorProps(`$${color}`)
  }
  if (!isStatus) {
    COLOR_KEYS.forEach((key: number) => {
      if (!isNeutralStatic) {
        output[`${color}${key}` as keyof BGColorNames] = getHoverColorProps(`$${color}${key}`)
      }
      output[`${color}A${key}` as keyof BGColorNames] = getHoverColorProps(`$${color}A${key}`)
    })
  }
  if (!output.transparent) {
    output.transparent = {
      "&:focus, &:hover": {
        bg: "transparent",
        color: "transparent",
        outline: "none",
      },
    }
  }
  return output
}

// SHARED STYLES (DERIVED) ////////////////////////////////////////////////////
/** Variants for background and text color */
export const COLOR_VARIANTS = {
  bg: {
    ...BG_COLOR_KEYS.reduce(bgColorReducer, {} as BGColorNames),
    alphaPattern: { bg: "alphaPattern" },
  },
  color: {
    ...TEXT_COLOR_KEYS.reduce(textColorReducer, {} as TextColorNames),
    neutralMax: { color: "$neutralMax" },
    neutralMin: { color: "$neutralMin" },
  },
  borderColor: BG_COLOR_KEYS.reduce(borderColorReducer, {} as BGColorNames),
  focusBorder: BG_COLOR_KEYS.reduce(focusBorderReducer, {} as BGColorNames),
  focusButton: BG_COLOR_KEYS.reduce(focusButtonReducer, {} as BGColorNames),
  focusBg: BG_COLOR_KEYS.reduce(focusBgReducer, {} as BGColorNames),
  focusColor: {
    ...TEXT_COLOR_KEYS.reduce(focusColorReducer, {} as TextColorNames),
    neutralMax: { "&:focus, &:hover": { color: "$neutralMax" } },
    neutralMin: { "&:focus, &:hover": { color: "$neutralMin" } },
  },
}

/** Base variants, including all the dimension CSS properties, for all sizes */
export const BASE_VARIANTS = {
  shadow: {
    none: { boxShadow: "$none" },
    low: { boxShadow: "$low" },
    medium: { boxShadow: "$medium" },
    high: { boxShadow: "$high" },
    highSoft: { boxShadow: "$highSoft" },
  },
  position: {
    absolute: { position: "absolute" },
    fixed: { position: "fixed" },
    relative: { position: "relative" },
    sticky: { position: "sticky" },
  },
  transparent: { true: { opacity: 0 } },
  overflow: {
    auto: { overflow: "auto" },
    hidden: { overflow: "hidden" },
    scroll: { overflow: "scroll" },
  },
  overflowX: {
    auto: { overflowX: "auto" },
    hidden: { overflowX: "hidden" },
    scroll: { overflowX: "scroll" },
  },
  overflowY: {
    auto: { overflowY: "auto" },
    hidden: { overflowY: "hidden" },
    scroll: { overflowY: "scroll" },
  },
  top: generateVariantSequence<SignedPositionVariant>(30, getSignedContentGetter("top"), -12),
  right: generateVariantSequence<SignedPositionVariant>(30, getSignedContentGetter("right"), -12),
  bottom: generateVariantSequence<SignedPositionVariant>(30, getSignedContentGetter("bottom"), -12),
  left: generateVariantSequence<SignedPositionVariant>(30, getSignedContentGetter("left"), -12),
  fixedBottom: {
    true: { position: "fixed", left: 0, bottom: 0, right: 0 },
  },
  fixedTop: {
    true: { position: "fixed", left: 0, top: 0, right: 0 },
  },
  stickyBottom: {
    true: { position: "sticky", left: 0, bottom: 0, right: 0 },
  },
  stickyTop: {
    true: { position: "sticky", left: 0, top: 0, right: 0 },
  },
  lineHeight: {
    min: { lineHeight: "$min" },
    base: { lineHeight: "$base" },
    heading: { lineHeight: "$heading" },
    body: { lineHeight: "$body" },
    spaced: { lineHeight: "$spaced" },
    listItem: { lineHeight: "$listItem" },
    tight: { lineHeight: "$tight" },
    field: { lineHeight: "$field" },
    2: { lineHeight: "$2" },
    3: { lineHeight: "$3" },
    4: { lineHeight: "$4" },
    5: { lineHeight: "$5" },
    6: { lineHeight: "$6" },
    7: { lineHeight: "$7" },
    8: { lineHeight: "$8" },
    9: { lineHeight: "$9" },
    10: { lineHeight: "$10" },
    11: { lineHeight: "$11" },
    12: { lineHeight: "$12" },
    13: { lineHeight: "$13" },
    14: { lineHeight: "$14" },
  },
  p: {
    ...getSemanticSizes("p"),
    ...generateVariantSequence(30, (n: number) => ({ p: `$${n}` }), 0),
  },
  pt: {
    ...getSemanticSizes("pt"),
    ...generateVariantSequence(30, (n: number) => ({ pt: `$${n}` }), 0),
  },
  pb: {
    ...getSemanticSizes("pb"),
    ...generateVariantSequence(30, (n: number) => ({ pb: `$${n}` }), 0),
  },
  pr: {
    ...getSemanticSizes("pr"),
    ...generateVariantSequence(30, (n: number) => ({ pr: `$${n}` }), 0),
  },
  pl: {
    ...getSemanticSizes("pl"),
    ...generateVariantSequence(30, (n: number) => ({ pl: `$${n}` }), 0),
  },
  px: {
    ...getSemanticSizes("px"),
    ...generateVariantSequence(30, (n: number) => ({ px: `$${n}` }), 0),
  },
  py: {
    ...getSemanticSizes("py"),
    ...generateVariantSequence(30, (n: number) => ({ py: `$${n}` }), 0),
  },
  m: {
    ...getSemanticSizes("m"),
    ...generateVariantSequence<SignedSizeVariant>(49, getSignedContentGetter("m"), -29),
  },
  mt: {
    ...getSemanticSizes("mt"),
    ...generateVariantSequence<SignedSizeVariant>(49, getSignedContentGetter("mt"), -29),
  },
  mb: {
    ...getSemanticSizes("mb"),
    ...generateVariantSequence<SignedSizeVariant>(49, getSignedContentGetter("mb"), -29),
  },
  mr: {
    ...getSemanticSizes("mr"),
    ...generateVariantSequence<SignedSizeVariant>(49, getSignedContentGetter("mr"), -29),
  },
  ml: {
    ...getSemanticSizes("ml"),
    ...generateVariantSequence<SignedSizeVariant>(49, getSignedContentGetter("ml"), -29),
  },
  mx: {
    ...getSemanticSizes("mx"),
    ...generateVariantSequence<SignedSizeVariant>(49, getSignedContentGetter("mx"), -29),
  },
  my: {
    ...getSemanticSizes("my"),
    ...generateVariantSequence<SignedSizeVariant>(49, getSignedContentGetter("my"), -29),
  },
  z: {
    max: { z: "$max" },
    min: { z: "$min" },
    ...generateVariantSequence<zIndexVariant>(12, (n: number) => ({ z: `$${n}` })),
  },
  h: heightVariants,
  height: heightVariants,
  w: widthVariants,
  width: widthVariants,
  maxHeight: {
    ...getSemanticSizes("maxHeight"),
    ...generateVariantSequence(30, (n: number) => ({ maxHeight: `$${n}` }), 0),
  },
  maxWidth: {
    ...getSemanticSizes("maxWidth"),
    ...generateVariantSequence(30, (n: number) => ({ maxWidth: `$${n}` }), 0),
  },
  minHeight: {
    ...getSemanticSizes("minHeight"),
    ...generateVariantSequence(30, (n: number) => ({ minHeight: `$${n}` }), 0),
  },
  minWidth: {
    ...getSemanticSizes("minWidth"),
    ...generateVariantSequence(30, (n: number) => ({ minWidth: `$${n}` }), 0),
  },
  size: {
    ...getSemanticSizes("size"),
    ...generateVariantSequence(30, (n: number) => ({ h: `$${n}`, w: `$${n}` }), 0),
  },
  radius: {
    ...generateSemanticRadii((k: string) => ({ radius: `$${k}` })),
    ...generateVariantSequence<RadiusVariant>(11, (n: number) => ({ radius: `$${n}` }), 0),
  },
  radiusTop: {
    ...generateSemanticRadii((k: string) => ({ radiusTop: `$${k}` })),
    ...generateVariantSequence<RadiusVariant>(11, (n: number) => ({ radiusTop: `$${n}` }), 0),
  },
  radiusBottom: {
    ...generateSemanticRadii((k: string) => ({ radiusBottom: `$${k}` })),
    ...generateVariantSequence<RadiusVariant>(11, (n: number) => ({ radiusBottom: `$${n}` }), 0),
  },
  radiusLeft: {
    ...generateSemanticRadii((k: string) => ({ radiusLeft: `$${k}` })),
    ...generateVariantSequence<RadiusVariant>(11, (n: number) => ({ radiusLeft: `$${n}` }), 0),
  },
  radiusRight: {
    ...generateSemanticRadii((k: string) => ({ radiusRight: `$${k}` })),
    ...generateVariantSequence<RadiusVariant>(11, (n: number) => ({ radiusRight: `$${n}` }), 0),
  },
  borderWidth: {
    px: { borderStyle: "solid", borderColor: "$none", borderWidth: "$px" },
    rem: { borderStyle: "solid", borderColor: "$none", borderWidth: "$rem" },
    base: { borderStyle: "solid", borderColor: "$none", borderWidth: "$base" },
    none: { borderStyle: "solid", borderColor: "$none", borderWidth: "$none" },
    ...generateVariantSequence<BorderWidthVariant>(
      10,
      (n: number) => ({ borderStyle: "solid", borderColor: "$none", borderWidth: `$${n}` }),
      0
    ),
  },
}

/** Variants for typography, excluding color */
export const TYPOGRAPHY_VARIANTS = {
  fontSize: {
    ...generateVariantSequence<FontSizeVariant>(12, (n: number) => ({
      fontSize: `$${n} !important`,
    })),
    base: { fontSize: "$base !important" },
    quote: { fontSize: "$quote !important" },
    h1: { fontSize: "$h1 !important" },
    h2: { fontSize: "$h2 !important" },
    h3: { fontSize: "$h3 !important" },
    h4: { fontSize: "$h4 !important" },
    h5: { fontSize: "$h5 !important" },
    h6: { fontSize: "$h6 !important" },
    p: { fontSize: "$p !important" },
    field: { fontSize: "$field !important" },
    fieldTiny: { fontSize: "$fieldTiny !important" },
    fieldSmall: { fontSize: "$fieldSmall !important" },
    fieldLarge: { fontSize: "$fieldLarge !important" },
    button: { fontSize: "$button !important" },
    buttonTiny: { fontSize: "$buttonTiny !important" },
    buttonSmall: { fontSize: "$buttonSmall !important" },
    buttonLarge: { fontSize: "$buttonLarge !important" },
    smallest: { fontSize: "$smallest !important" },
    small: { fontSize: "$small !important" },
    medium: { fontSize: "$medium !important" },
    large: { fontSize: "$large !important" },
    largest: { fontSize: "$largest !important" },
  },
  fontWeight: {
    ...generateVariantSequence<FontWeightVariant>(
      10,
      (n: number) => ({ fontWeight: `$${n} !important` }),
      0
    ),
    h1: { fontWeight: "$h1 !important" },
    h2: { fontWeight: "$h2 !important" },
    h3: { fontWeight: "$h3 !important" },
    h4: { fontWeight: "$h4 !important" },
    h5: { fontWeight: "$h5 !important" },
    h6: { fontWeight: "$h6 !important" },
    p: { fontWeight: "$p !important" },
    code: { fontWeight: "$code !important" },
    hairline: { fontWeight: "$hairline !important" },
    thin: { fontWeight: "$thin !important" },
    light: { fontWeight: "$light !important" },
    regular: { fontWeight: "$regular !important" },
    bold: { fontWeight: "$bold !important" },
    heavy: { fontWeight: "$heavy !important" },
    black: { fontWeight: "$black !important" },
  },
  fontFamily: {
    body: { fontFamily: "$body" },
    button: { fontFamily: "$button" },
    heading: { fontFamily: "$heading" },
    code: { fontFamily: "$code" },
    quote: { fontFamily: "$quote" },
    systemSans: { fontFamily: "$systemSans" },
    systemSerif: { fontFamily: "$systemSerif" },
    systemMono: { fontFamily: "$systemMono" },
    ...[
      ...enumKeys(BodyFontFamily),
      ...enumKeys(HeadingFontFamily),
      ...enumKeys(CodeFontFamily),
    ].reduce((output: Record<FontFamilyKey, CSS>, key: FontFamilyKey) => {
      output[key] = { fontFamily: `$${key}"` }
      return output
    }, {} as Record<FontFamilyKey, CSS>),
  },
}
