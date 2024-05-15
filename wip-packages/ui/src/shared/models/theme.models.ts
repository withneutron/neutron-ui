import { Color } from "chroma-js"
import { Locale } from "locale-enum"
import { enumValues } from "../utils"

export const BASE_STYLE_SIZE = 4
export const STYLE_UNIT = "rem"

// Neutron Palette
export const DEFAULT_HUE = 174
export const DEFAULT_PALETTE = 2
// Launchfox Palette
// export const DEFAULT_HUE = 217
// export const DEFAULT_PALETTE = 3
// Stepflow Palette
// export const DEFAULT_HUE = 224
// export const DEFAULT_PALETTE = 2

// COLORS /////////////////////////////////////////////////////////////////////
export type ColorMode = "light" | "dark"

export const DEFAULT_COLOR_MODE: ColorMode = "light"

export enum StaticColor {
  black = "black",
  white = "white",
  neutralMax = "neutralMax",
  neutralMin = "neutralMin",
}

export enum AlphaColorName {
  primaryA = "primaryA",
  secondaryA = "secondaryA",
  neutralA = "neutralA",
  neutralMaxA = "neutralMaxA",
  neutralMinA = "neutralMinA",
}

export enum SemanticStaticColorName {
  neutralMax = "neutralMax",
  neutralMin = "neutralMin",
  error = "error",
  errorMax = "errorMax",
  errorMin = "errorMin",
  errorForeground = "errorForeground",
  errorForegroundMax = "errorForegroundMax",
  info = "info",
  infoMax = "infoMax",
  infoMin = "infoMin",
  infoForeground = "infoForeground",
  infoForegroundMax = "infoForegroundMax",
  success = "success",
  successMax = "successMax",
  successMin = "successMin",
  successForeground = "successForeground",
  successForegroundMax = "successForegroundMax",
  warning = "warning",
  warningMax = "warningMax",
  warningMin = "warningMin",
  warningForeground = "warningForeground",
  warningForegroundMax = "warningForegroundMax",
}

export enum SemanticColorName {
  neutral = "neutral",
  primary = "primary",
  secondary = "secondary",
}
export enum SemanticTextColorName {
  primary = "textPrimary",
  secondary = "textSecondary",
  neutral = "textNeutral",
}

// Colors from a broad spectrum of hues, for general purposes
export enum FlavorColorName {
  tomato = "tomato",
  amber = "amber",
  grass = "grass",
  forest = "forest",
  aqua = "aqua",
  indigo = "indigo",
  plum = "plum",
  magenta = "magenta",
}
export enum FlavorTextColorName {
  tomato = "textTomato",
  amber = "textAmber",
  grass = "textGrass",
  forest = "textForest",
  aqua = "textAqua",
  indigo = "textIndigo",
  plum = "textPlum",
  magenta = "textMagenta",
}

export enum PrimaryColorName {
  primary = "primary",
  primaryA = "primaryA",
}

export enum StatusColorName {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

export enum StatusTextColorName {
  error = "textError",
  errorMax = "textErrorMax",
  errorMin = "textErrorMin",
  info = "textInfo",
  infoMax = "textInfoMax",
  infoMin = "textInfoMin",
  success = "textSuccess",
  successMax = "textSuccessMax",
  successMin = "textSuccessMin",
  warning = "textWarning",
  warningMax = "textWarningMax",
  warningMin = "textWarningMin",
}

export type HexColor = `#${number | string}`

export type AlphaColor =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`

export type RgbColor = `rgb(${number}, ${number}, ${number})` | `rgb(${number},${number},${number})`

export type RgbString = `${number}, ${number}, ${number}`

export type ColorString = HexColor | AlphaColor | RgbColor

export interface RgbComponent {
  r: number
  g: number
  b: number
}

export interface HslComponent {
  h: number
  s: number
  l: number
}

export type ChromaColor = string | number | Color

export interface ColorGenOptions {
  // Semantic colors
  primary: string
  secondary: string
  neutral: string
  neutralMax?: string
  neutralMin?: string
  // Status colors
  error?: string
  info?: string
  success?: string
  warning?: string
}

export type ColorNumberKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export interface ChromaOptions {
  mainBgLum: number
  altBgLum: number
  mainFgLum: number
  altFgLum: number
  primarySat: number
  secondarySat: number
  neutralSat: number
}

export const FG_COLOR_INDEX = 8
export const HIGH_CONTRAST_INDEX = 10
export const DARK_ALPHA_COLOR_VALUES = [0.02, 0.07, 0.12, 0.17, 0.25, 0.37, 0.45, 0.6, 0.9, 0.92, 0.95, 0.98]
export const LIGHT_ALPHA_COLOR_VALUES = [0.018, 0.06, 0.11, 0.15, 0.23, 0.34, 0.45, 0.6, 0.9, 0.92, 0.95, 0.98]
export const ALPHA_COLOR_VALUES = [0.018, 0.06, 0.11, 0.15, 0.23, 0.34, 0.45, 0.6, 0.9, 0.92, 0.95, 0.98]
export const NEUTRAL_ALPHA_COLOR_VALUES = {
  darkBg: {
    darkFg: [0.003, 0.015, 0.04, 0.07, 0.11, 0.15, 0.21, 0.3, 0.53, 0.61, 0.725, 0.84],
    lightFg: [0.04, 0.065, 0.095, 0.145, 0.215, 0.285, 0.32, 0.35, 0.57, 0.66, 0.79, 0.945],
  },
  lightBg: {
    darkFg: [0.015, 0.032, 0.055, 0.08, 0.12, 0.16, 0.225, 0.315, 0.53, 0.61, 0.725, 0.84],
    lightFg: [0.015, 0.032, 0.055, 0.09, 0.123, 0.16, 0.21, 0.245, 0.49, 0.6, 0.74, 0.94],
  },
}
export const NEUTRAL_DARK_LUMINANCE_VALUES = [
  0.0075, 0.015, 0.028, 0.0425, 0.055, 0.07, 0.085, 0.105, 0.285, 0.4, 0.6, 0.9,
]
export const NEUTRAL_LIGHT_LUMINANCE_VALUES = [
  0.95, 0.93, 0.88, 0.835, 0.755, 0.675, 0.56, 0.435, 0.165, 0.115, 0.06, 0.02,
]
export const DARK_LUMINANCE_VALUES = [0.015, 0.025, 0.044, 0.063, 0.085, 0.105, 0.125, 0.155, 0.3, 0.475, 0.6, 0.885]
export const LIGHT_LUMINANCE_VALUES = [0.95, 0.93, 0.88, 0.83, 0.74, 0.675, 0.56, 0.435, 0.165, 0.115, 0.06, 0.02]
export const DARK_STATUS_LUMINANCE_VALUES = [0.025, 0.3, 0.8]
export const LIGHT_STATUS_LUMINANCE_VALUES = [0.85, 0.14, 0.04]
export const DARK_STATUS_INVERTED_LUMINANCE_VALUES = [0.03, 0.5, 0.9]
export const LIGHT_STATUS_INVERTED_LUMINANCE_VALUES = [0.85, 0.5, 0.06]
export const DARK_STATUS_TEXT_LUMINANCE = 0.35
export const DARK_STATUS_TEXT_MAX_LUMINANCE = 0.45
export const LIGHT_STATUS_TEXT_LUMINANCE = 0.125
export const LIGHT_STATUS_TEXT_MAX_LUMINANCE = 0.095
export const LUMINANCE_CUTOFF = 0.5
export const LUMINANCE_DARK_LIMIT = 0.4
export const LUMINANCE_LIGHT_LIMIT = 0.6
export const STATUS_COLOR_POINTERS = {
  0: "Min",
  1: "",
  2: "Max",
} as const
export const DARK_STATUS_INFO_COLOR_POINTERS = {
  0: 4,
  1: 10,
  2: 12,
} as const
export const LIGHT_STATUS_INFO_COLOR_POINTERS = {
  0: 4,
  1: 9,
  2: 12,
} as const
export const STATUS_TEXT_COLOR_TARGETS = {
  0: "Max",
  1: null,
  2: "Min",
} as const
export const DARK_INFO_STATUS_TEXT_COLOR_TARGETS = {
  0: 12,
  1: "Min",
  2: 2,
} as const
export const LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS = {
  0: 12,
  1: "Max",
  2: 4,
} as const
export const TEXT_COLOR_TARGETS = {
  1: 10,
  2: 11,
  3: 11,
  4: 12,
  5: 12,
  6: 12,
  7: 12,
  8: 12,
  9: null,
  10: null,
  11: 3,
  12: 5,
} as const
export const DARK_CHROMA_OPTIONS: ChromaOptions = {
  mainBgLum: 0.875,
  altBgLum: 0.125,
  mainFgLum: 0.5,
  altFgLum: 0.5,
  primarySat: 1,
  secondarySat: 0.9,
  neutralSat: 0.04,
}
export const LIGHT_CHROMA_OPTIONS: ChromaOptions = {
  mainBgLum: 0.125,
  altBgLum: 0.875,
  mainFgLum: 0.5,
  altFgLum: 0.5,
  primarySat: 1,
  secondarySat: 0.85,
  neutralSat: 0.04,
}

export const NORMALIZATION_FACTOR = {
  0: 1.45,
  1: 1.05,
  2: 0.5,
  3: 0.35,
  4: 0.35,
  5: 0.7,
  6: 0.8,
  7: 1,
  8: 1.25,
  9: 1.75,
  10: 1.85,
  11: 2.25,
  12: 2.5,
  13: 2.25,
  14: 2,
  15: 1.85,
  16: 1.3,
  17: 1.3,
  18: 1.15,
  19: 1.15,
  20: 1.15,
  21: 1,
  22: 1,
  23: 0.85,
  24: 0.85,
  25: 0.85,
  26: 0.9,
  27: 1,
  28: 1.55,
  29: 2.15,
  30: 2.5,
  31: 2.25,
  32: 1.85,
  33: 1.4,
  34: 1.45,
  35: 1.45,
  36: 1.45,
}

export interface StatusColors {
  info: string
  success: string
  warning: string
  error: string
}

export interface FlavorColors {
  tomato: string
  amber: string
  grass: string
  forest: string
  aqua: string
  indigo: string
  plum: string
  magenta: string
}

export const DEFAULT_SOURCE_COLORS: StatusColors & FlavorColors = {
  info: `hsl(${DEFAULT_HUE} 0.4% 50%)`,
  success: "hsl(123 90% 50%)",
  warning: "hsl(33 100% 50%)",
  error: "hsl(350 75% 50%)",
  tomato: "hsl(8, 90%, 50%)",
  amber: "hsl(45, 100%, 50%)",
  grass: "hsl(77, 100%, 50%)",
  forest: "hsl(138, 90%, 50%)",
  aqua: "hsl(193, 90%, 50%)",
  indigo: "hsl(222, 90%, 50%)",
  plum: "hsl(267, 90%, 50%)",
  magenta: "hsl(313, 80%, 50%)",
}

export type SemanticColors = {
  [key in SemanticColorName]: string
}

export type ThemeColorName =
  | StaticColor
  | AlphaColorName
  | SemanticColorName
  | SemanticTextColorName
  | FlavorColorName
  | FlavorTextColorName
  | StatusColorName

export type ThemeColor =
  | `${StaticColor}`
  | `${AlphaColorName}${ColorNumberKey}`
  | `${SemanticColorName}${ColorNumberKey}`
  | `${SemanticTextColorName}${ColorNumberKey}`
  | `${FlavorColorName}${ColorNumberKey}`
  | `${FlavorTextColorName}${ColorNumberKey}`
  | `${SemanticStaticColorName}`

export type ColorPalette = {
  [key in ThemeColor]: string
}

export type ColorKeys<T extends string> =
  | `${T}1`
  | `${T}2`
  | `${T}3`
  | `${T}4`
  | `${T}5`
  | `${T}6`
  | `${T}7`
  | `${T}8`
  | `${T}9`
  | `${T}10`
  | `${T}11`
  | `${T}12`

export type BGWithTextColorNameKeys = `${SemanticColorName}${ColorNumberKey}` | `${FlavorColorName}${ColorNumberKey}`
export type BGColorNameKeys =
  | "transparent"
  | "alphaPattern"
  | `${SemanticStaticColorName}`
  | BGWithTextColorNameKeys
  | `${SemanticColorName}A${ColorNumberKey}`
  | `${AlphaColorName}${ColorNumberKey}`
export type TextColorNameKeys =
  | "transparent"
  | `${SemanticStaticColorName}`
  | BGWithTextColorNameKeys
  | `${SemanticColorName}A${ColorNumberKey}`
  | `${SemanticTextColorName}${ColorNumberKey}`
  | `${FlavorTextColorName}${ColorNumberKey}`
  | `${StatusTextColorName}`
  | `${AlphaColorName}${ColorNumberKey}`

export type AllColorNameKeys = TextColorNameKeys

export const BG_COLOR_KEYS = [
  ...enumValues(SemanticStaticColorName),
  ...enumValues(SemanticColorName),
  ...enumValues(FlavorColorName),
  ...enumValues(StatusColorName),
]

export const STATUS_COLOR_KEYS = enumValues(SemanticStaticColorName).filter(
  (name: SemanticStaticColorName) => !name.includes("neutral")
)
export const STATUS_TEXT_COLOR_KEYS = enumValues(StatusTextColorName)
export const FULL_STATUS_COLOR_KEYS = [...STATUS_COLOR_KEYS, ...STATUS_TEXT_COLOR_KEYS]
export const TEXT_COLOR_KEYS = [
  ...enumValues(SemanticStaticColorName),
  ...enumValues(SemanticColorName),
  ...enumValues(StatusColorName),
  ...enumValues(SemanticTextColorName),
  ...enumValues(FlavorColorName),
  ...enumValues(FlavorTextColorName),
  ...STATUS_TEXT_COLOR_KEYS,
]

export const COLOR_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// MISC ///////////////////////////////////////////////////////////////////////
export const DELAYS = {
  notificationReveal: 500,
}
export const THEME_PRIMITIVE_PROPS: string[] = ["className", "selector", "toString"]
export const THEME_FULL_PROPS: string[] = [
  "className",
  "selector",
  "toString",
  "borderStyles",
  "borderWidths",
  "colors",
  "fontSizes",
  "fontWeights",
  "fonts",
  "letterSpacings",
  "lineHeights",
  "radii",
  "shadows",
  "sizes",
  "space",
  "transitions",
  "zIndices",
]
export const THEME_STYLE_PROPS: string[] = [
  "borderStyles",
  "borderWidths",
  "colors",
  "fontSizes",
  "fontWeights",
  "fonts",
  "letterSpacings",
  "lineHeights",
  "radii",
  "shadows",
  "sizes",
  "space",
  "transitions",
  "zIndices",
]

export type ThemeStyleProps =
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

// SIZING /////////////////////////////////////////////////////////////////////
export enum SemanticSize {
  auto = "auto",
  px = "px",
  rem = "rem",
  base = "base",
  none = "none",
  quarter = "quarter",
  third = "third",
  half = "half",
  twoThirds = "twoThirds",
  threeQuarters = "threeQuarters",
  full = "full",
  fullVh = "fullVh",
  fullVw = "fullVw",
}

export type SemanticSizes = keyof typeof SemanticSize

export type SignedType<T extends string | number> = `${T}` | `minus${T}`

export const breakpoints = {
  bp1: 640,
  bp2: 760,
  bp3: 880,
  bp4: 1020,
  bp5: 1200,
  bp6: 1440,
}
export const BREAKPOINT_KEYS = Object.keys(breakpoints)

export type Breakpoints = keyof typeof breakpoints

export const RADIUS_KEYS = ["px", "base", "none", "round", "pill", "field", "button"]

// SEMANTIC HTML //////////////////////////////////////////////////////////////
export type SemanticLayoutPrimitive<T> = T & {
  /** ARTICLE: Defines independent, self-contained content */
  article: T
  /** ASIDE: Defines content aside from, but related to, the main content */
  aside: T
  /** DIALOG: Defines an overlaying box or window, such as a modal */
  dialog: T
  /** DIV: Defines a generic, block-rendered section in a document */
  div: T
  /** FOOTER: Defines an area at the foot of a document or section */
  footer: T
  /** HEADER: Defines an area at the head of a document or section */
  header: T
  /** LABEL: Identifies and links to an <input> element */
  label: T
  /** MAIN: Specifies the main content of a document */
  main: T
  /** NAV: Defines navigation links */
  nav: T
  /** SECTION: Defines a generic, block-rendered section in a document */
  section: T
  // /** DETAILS: Defines additional details that the user can view or hide */
  // details: T
  // /** FIGURE: Specifies self-contained content, like illustrations, diagrams, photos, code listings, etc */
  // figure: T
  // /** SPAN: Defines a generic, inline-rendered section in a document */
  // span: T
}
export type SemanticTextPrimitive<T> = T & {
  /** BLOCKQUOTE: Defines a section that is quoted from another source */
  blockquote: T
  /** CODE: Defines a piece of computer code */
  code: T
  /** DEL: Defines text that has been deleted from a document */
  del: T
  /** EM: Defines emphasized text */
  em: T
  /** I: Defines a part of text in an alternate voice or mood */
  i: T
  /** INS: Defines a text that has been inserted into a document */
  ins: T
  /** LABEL: Identifies and links to an <input> element */
  label: T
  /** P: Defines a paragraph */
  p: T
  /** PRE: Defines preformatted text */
  pre: T
  /** SMALL: Defines smaller text, or a footnote */
  small: T
  /** SPAN: Defines a generic, inline-rendered section in a document */
  span: T
  /** STRONG: Defines important text */
  strong: T
  /** TIME: Defines a date/time */
  time: T
  // abbr: T
  // address: T
  // b: T
  // bdi: T
  // bdo: T
  // cite: T
  // dfn: T
  // /** FIGCAPTION: Defines a caption for a <figure> element */
  // figcaption: T
  // ins: T
  // kbd: T
  // /** MARK: Defines marked/highlighted text */
  // mark: T
  // meter: T
  // progress: T
  // q: T
  // rp: T
  // rt: T
  // ruby: T
  // s: T
  // samp: T
  // sub: T
  // /** SUMMARY: Defines a visible heading for a <details> element */
  // summary: T
  // sup: T
  // template: T
  // u: T
  // var: T
  // wbr: T
}

export type SemanticHeadingPrimitive<T> = T & {
  /** H1: Defines a primary heading */
  h1: T
  /** H2: Defines a secondary heading */
  h2: T
  /** H3: Defines a tertiary heading */
  h3: T
  /** H4: Defines a heading nested 4 levels deep */
  h4: T
  /** H5: Defines a heading nested 5 levels deep */
  h5: T
  /** H6: Defines a heading nested 6 levels deep */
  h6: T
}

// TYPOGRAPHY /////////////////////////////////////////////////////////////////
export enum FontSource {
  google = "google",
}

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export enum SystemFontFamily {
  sansSerif = `-apple-system,BlinkMacSystemFont,
"Segoe UI",
Roboto,
Oxygen-Sans,Ubuntu,Cantarell,
"Helvetica Neue",Helvetica,Arial,sans-serif,
"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  serif = `Iowan Old Style,Apple Garamond,
Baskerville,Source Serif Pro,Droid Serif,
Times New Roman,Times,serif,
"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  monospace = `SFMono-Regular,Menlo,Monaco,
Consolas,"Liberation Mono",
"Courier New",monospace,
"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
}

export type SystemFontFallbackToken = "systemSans" | "systemSerif" | "systemMono"

export interface Font<
  T extends BodyFontFamily | HeadingFontFamily | CodeFontFamily = BodyFontFamily | HeadingFontFamily | CodeFontFamily
> {
  source: FontSource
  family: T
  fallback: SystemFontFamily
  fallbackKey: SystemFontFallbackToken
  weights: FontWeight[]
  italicWeights: FontWeight[]
}

export enum BodyFontFamily {
  // Sans serif
  openSans = "Open Sans",
  firaSans = "Fira Sans",
  workSans = "Work Sans",
  sourceSansPro = "Source Sans Pro",
  rubik = "Rubik",
  raleway = "Raleway",
  lato = "Lato",
  mulish = "Mulish",
  inter = "Inter",
  hind = "Hind",
  // Serif
  bitter = "Bitter",
  sourceSerifPro = "Source Serif Pro",
  merriweather = "Merriweather",
  alegreya = "Alegreya",
}

export enum HeadingFontFamily {
  // Serif
  libreBaskerville = "Libre Baskerville",
  vollkorn = "Vollkorn",
  ptSerif = "PT Serif",
  lora = "Lora",
  arvo = "Arvo",
  cormorantInfant = "Cormorant Infant",
  playfairDisplay = "Playfair Display",
  // Sans serif
  montserrat = "Montserrat",
  firaSans = "Fira Sans",
  sourceSansPro = "Source Sans Pro",
  lato = "Lato",
  rubik = "Rubik",
  raleway = "Raleway",
  // Monospaced
  firaCode = "Fira Code",
  inconsolata = "Inconsolata",
}

export enum CodeFontFamily {
  // Monospaced
  firaCode = "Fira Code",
  inconsolata = "Inconsolata",
}

// Default to 300, 400, 600, 800
/** Web fonts usable for body text */
export const bodyFonts: Record<keyof typeof BodyFontFamily, Font<BodyFontFamily>> = {
  // Sans serif
  openSans: {
    source: FontSource.google,
    family: BodyFontFamily.openSans,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  firaSans: {
    source: FontSource.google,
    family: BodyFontFamily.firaSans,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  workSans: {
    source: FontSource.google,
    family: BodyFontFamily.workSans,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  sourceSansPro: {
    source: FontSource.google,
    family: BodyFontFamily.sourceSansPro,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 900],
    italicWeights: [300, 400, 600, 900],
  },
  rubik: {
    source: FontSource.google,
    family: BodyFontFamily.rubik,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  raleway: {
    source: FontSource.google,
    family: BodyFontFamily.raleway,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  lato: {
    source: FontSource.google,
    family: BodyFontFamily.lato,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 700, 900],
    italicWeights: [300, 400, 700, 900],
  },
  mulish: {
    source: FontSource.google,
    family: BodyFontFamily.mulish,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  inter: {
    source: FontSource.google,
    family: BodyFontFamily.inter,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  // Serif
  bitter: {
    source: FontSource.google,
    family: BodyFontFamily.bitter,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [300, 400, 600, 800],
    italicWeights: [300, 400, 600, 800],
  },
  sourceSerifPro: {
    source: FontSource.google,
    family: BodyFontFamily.sourceSerifPro,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [300, 400, 600, 700],
    italicWeights: [300, 400, 600, 700],
  },
  merriweather: {
    source: FontSource.google,
    family: BodyFontFamily.merriweather,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [300, 400, 700, 900],
    italicWeights: [300, 400, 700, 900],
  },
  alegreya: {
    source: FontSource.google,
    family: BodyFontFamily.alegreya,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 500, 700, 800],
    italicWeights: [400, 500, 700, 800],
  },
  hind: {
    source: FontSource.google,
    family: BodyFontFamily.hind,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [300, 400, 600, 700],
    italicWeights: [300, 400, 600, 700],
  },
}

// Default to 600, 700, 800
/** Web fonts usable for headings */
export const headingFonts: Record<keyof typeof HeadingFontFamily, Font<HeadingFontFamily>> = {
  // Serif
  libreBaskerville: {
    source: FontSource.google,
    family: HeadingFontFamily.libreBaskerville,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 700],
    italicWeights: [400],
  },
  vollkorn: {
    source: FontSource.google,
    family: HeadingFontFamily.vollkorn,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 600, 700, 800],
    italicWeights: [400, 600, 700, 800],
  },
  ptSerif: {
    source: FontSource.google,
    family: HeadingFontFamily.ptSerif,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 700],
    italicWeights: [400, 700],
  },
  lora: {
    source: FontSource.google,
    family: HeadingFontFamily.lora,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 500, 600, 700],
    italicWeights: [400, 500, 600, 700],
  },
  arvo: {
    source: FontSource.google,
    family: HeadingFontFamily.arvo,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 700],
    italicWeights: [400, 700],
  },
  cormorantInfant: {
    source: FontSource.google,
    family: HeadingFontFamily.cormorantInfant,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 500, 600, 700],
    italicWeights: [400, 500, 600, 700],
  },
  playfairDisplay: {
    source: FontSource.google,
    family: HeadingFontFamily.playfairDisplay,
    fallback: SystemFontFamily.serif,
    fallbackKey: "systemSerif",
    weights: [400, 600, 700, 800],
    italicWeights: [400, 600, 700, 800],
  },
  // Sans serif
  montserrat: {
    source: FontSource.google,
    family: HeadingFontFamily.montserrat,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [400, 600, 700, 800],
    italicWeights: [400, 600, 700, 800],
  },
  firaSans: {
    source: FontSource.google,
    family: HeadingFontFamily.firaSans,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [400, 600, 700, 800],
    italicWeights: [400, 600, 700, 800],
  },
  sourceSansPro: {
    source: FontSource.google,
    family: HeadingFontFamily.sourceSansPro,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [400, 600, 700, 900],
    italicWeights: [400, 600, 700, 900],
  },
  lato: {
    source: FontSource.google,
    family: HeadingFontFamily.lato,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [400, 700, 900],
    italicWeights: [400, 700, 900],
  },
  rubik: {
    source: FontSource.google,
    family: HeadingFontFamily.rubik,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [400, 600, 700, 800],
    italicWeights: [400, 600, 700, 800],
  },
  raleway: {
    source: FontSource.google,
    family: HeadingFontFamily.raleway,
    fallback: SystemFontFamily.sansSerif,
    fallbackKey: "systemSans",
    weights: [400, 600, 700, 800],
    italicWeights: [400, 600, 700, 800],
  },
  // Monospaced
  firaCode: {
    source: FontSource.google,
    family: HeadingFontFamily.firaCode,
    fallback: SystemFontFamily.monospace,
    fallbackKey: "systemMono",
    weights: [400, 500, 600, 700],
    italicWeights: [400, 500, 600, 700],
  },
  inconsolata: {
    source: FontSource.google,
    family: HeadingFontFamily.inconsolata,
    fallback: SystemFontFamily.monospace,
    fallbackKey: "systemMono",
    weights: [400, 600, 700, 800],
    italicWeights: [400, 600, 700, 800],
  },
}

// Default to 300, 400, 600, with only 400 in italics
/** Web fonts usable for code samples */
export const codeFonts: Record<keyof typeof CodeFontFamily, Font<CodeFontFamily>> = {
  // Monospaced
  firaCode: {
    source: FontSource.google,
    family: CodeFontFamily.firaCode,
    fallback: SystemFontFamily.monospace,
    fallbackKey: "systemMono",
    weights: [300, 400, 600],
    italicWeights: [400],
  },
  inconsolata: {
    source: FontSource.google,
    family: CodeFontFamily.inconsolata,
    fallback: SystemFontFamily.monospace,
    fallbackKey: "systemMono",
    weights: [300, 400, 600],
    italicWeights: [400],
  },
}

export type FontFamilyKey = keyof typeof BodyFontFamily | keyof typeof HeadingFontFamily | keyof typeof CodeFontFamily

export interface FontFamilySpec {
  body?: keyof typeof BodyFontFamily
  button?: keyof typeof BodyFontFamily | keyof typeof HeadingFontFamily
  heading?: keyof typeof HeadingFontFamily
  code?: keyof typeof CodeFontFamily
}

export type FontFamilyName = BodyFontFamily | HeadingFontFamily | CodeFontFamily

export interface FontFamilyData {
  name: FontFamilyName
  weights: FontWeight[]
  italicWeights: FontWeight[]
}

export interface FontLinkData extends FontFamilyData {
  key: FontFamilyKey
}

export type FontFamily = typeof bodyFonts | typeof headingFonts | typeof codeFonts

export interface HtmlHeadLink {
  href: string
  crossOrigin?: "anonymous" | "use-credentials"
  rel: "preconnect" | "prefetch" | "preload" | "prerender" | "stylesheet" | string
  /** Potential destination for a preload request (for rel="preload" and rel="modulepreload") */
  as?:
    | "audio"
    | "audioworklet"
    | "document"
    | "embed"
    | "fetch"
    | "font"
    | "frame"
    | "iframe"
    | "image"
    | "manifest"
    | "object"
    | "paintworklet"
    | "report"
    | "script"
    | "serviceworker"
    | "sharedworker"
    | "style"
    | "track"
    | "video"
    | "worker"
    | "xslt"
    | string
}

export interface ThemeFonts {
  body: string
  button: string
  heading: string
  code: string
}
export interface GetThemeFonts<T = ThemeFonts> {
  fonts: T
  links: HtmlHeadLink[]
}

export interface InitialProps {
  colorMode?: ColorMode
  isMobile?: boolean
  locale?: Locale
}
