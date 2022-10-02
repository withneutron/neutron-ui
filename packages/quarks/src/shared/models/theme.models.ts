import { Locale } from "locale-enum"
import { ColorMode } from "./colorGen.models"

export const BASE_STYLE_SIZE = 4
export const STYLE_UNIT = "rem"

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
