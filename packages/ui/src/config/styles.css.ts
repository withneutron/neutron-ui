/**
 * NOTES:
 * Use `InlineStart` as left, and `InlineEnd` as right, instead of RTL "magic"
 * Use `border-start-start-radius` (etc) for radii
 *
 * Create a global style for `[dir]` that sets the `direction: ___;` css property
 *
 * Convert padding, marging, and other shorthand props (border, etc) to their
 * 4 directional counterparts, in the resolver, to reduce number of classes we generate.
 *
 * Make sure `initial` and (for inherited props) `inherit` values are available to
 * any props that can use them; they could be used to emulate inverted breakpoints.
 */

/** PREFIX LEGEND *********************************************************************************
 * $  -> Theme object OR theme token OR compound theme value.
 * :  -> CSS pseudo-classes for interaction state OR for structural targeting.
 * @  -> Breakpoint (desktop-first) OR other media query OR light/dark color mode.
 * !  -> Inverted breakpoint (mobile-first) OR inverted media query.
 *       E.g. `!reducedMotion` matches when the user agent does NOT request reduced motion.
 *************************************************************************************************/

import { createGlobalTheme, createTheme, style, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css"
import { CharHash } from "./utils"
import {
  getSize,
  getSpace,
  getRadius,
  getColumn,
  getRow,
  getZIndex,
  getLineHeight,
  getTypeSpace,
  getTextDecoration,
  getShadow,
  getFontSize,
  getFontWeight,
  getFontFamily,
  getFont,
  getColor,
  getBorder,
  getOutline,
  getAnimation,
} from "./scales"
import {
  CssPropKey,
  CssRule,
  FilterKeys,
  generateCustomVarPropsCss,
  generateScaledPropsCss,
  generateStaticPropsCss,
  generateInteractivePseudoClassCss,
  generateStructuralPseudoClassCss,
  InteractivePseudoClassesWithAliases,
  AllPseudoClassesWithAliases,
} from "./props"
import { getSelector } from "./styles.utils"
import {
  CssFromMap,
  CssFromConditionalMap,
  CssFromCustomVars,
  MergeCssProps,
  CssFromConditionalCustomVars,
  Exclusive,
  ExclusivelyShared,
  MergeCssPropsPair,
  NestedShared,
} from "./styles.models"

/*************************************************************************************************
 * GLOBAL STYLES
 *************************************************************************************************/
// Export the theme
export const themeClass = "nui"

// Function that generates the styles
globalStyle("html, body", {
  margin: 0,
  padding: 0,
})

/*************************************************************************************************
 * STYLING SYSTEM GENERATION
 *************************************************************************************************/
const varHash = new CharHash()
const keyframeHash = new CharHash()
const classHash = new CharHash()

// GENERATE THEME SCALES //////////////////////////////////////////////////////////////////////////
const animation = getAnimation(varHash, keyframeHash)
const color = getColor(varHash)
const size = getSize(varHash)
const space = getSpace(varHash, size.vars)
const radius = getRadius(varHash)
const column = getColumn(varHash, size.vars)
const row = getRow(varHash, column.vars)
const zIndex = getZIndex(varHash)
const lineHeight = getLineHeight(varHash, size.vars)
const typeSpace = getTypeSpace(varHash)
const textDecoration = getTextDecoration(varHash, color.vars)
const shadow = getShadow(varHash, color.vars)
const fontSize = getFontSize(varHash)
const fontWeight = getFontWeight(varHash)
const fontFamily = getFontFamily(varHash)
const font = getFont(varHash, fontSize.vars, fontWeight.vars, fontFamily.vars)
const border = getBorder(varHash, color.vars)
const outline = getOutline(varHash, color.vars)

const scales = {
  animation,
  border,
  color,
  column,
  font,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  outline,
  radius,
  row,
  shadow,
  size,
  space,
  textDecoration,
  typeSpace,
  zIndex,
} as const

// SCALED PROPS ///////////////////////////////////////////////////////////////////////////////////
/** Generate CSS props that are based on scales */
const scaledProps = generateScaledPropsCss(scales, (value: CssRule) => {
  const className = classHash.name
  globalStyle(getSelector(className), value)
  return className
})

/** Generate CSS props that are _conditional_, and based on scales */
const scaledPropsIPC = generateInteractivePseudoClassCss<typeof scaledProps>((condition: string, keys: FilterKeys) =>
  generateScaledPropsCss(
    scales,
    (value: CssRule) => {
      const className = classHash.name
      globalStyle(getSelector(className, condition), value)
      return className
    },
    keys
  )
)

// CUSTOM VAR PROPS ///////////////////////////////////////////////////////////////////////////////
/** Generate vars and classes for custom props */
const customVarProps = generateCustomVarPropsCss((prop: CssPropKey, template?: (value: string) => string) => {
  const cssVar = varHash.var
  const className = classHash.name
  template = template ?? ((v: string) => v)
  globalStyle(getSelector(className), {
    [prop]: template(cssVar.ref),
  })
  return { varName: cssVar.name, className }
})

/** Generate CSS props that are _conditional_, for custom var props */
const conditionalCustomVarPropGenerator = (condition: string, keys: FilterKeys) =>
  generateCustomVarPropsCss((prop: CssPropKey, template?: (value: string) => string) => {
    const cssVar = varHash.var
    const className = classHash.name
    template = template ?? ((v: string) => v)
    globalStyle(getSelector(className, condition), {
      [prop]: template(cssVar.ref),
    })
    return { varName: cssVar.name, className }
  }, keys)

const customVarPropsIPC = generateInteractivePseudoClassCss<typeof customVarProps>(conditionalCustomVarPropGenerator)
const customVarPropsSPC = generateStructuralPseudoClassCss<typeof customVarProps>(conditionalCustomVarPropGenerator)

// STATIC PROPS ///////////////////////////////////////////////////////////////////////////////////
/** Generate CSS props that are based on scales */
const staticProps = generateStaticPropsCss((value: CssRule) => {
  const className = classHash.name
  globalStyle(getSelector(className), value)
  return className
})

/** Generate CSS props that are _conditional_, and based on scales */
const staticPropsIPC = generateInteractivePseudoClassCss<typeof staticProps>((condition: string, keys: FilterKeys) =>
  generateStaticPropsCss((value: CssRule) => {
    const className = classHash.name
    globalStyle(getSelector(className, condition), value)
    return className
  }, keys)
)

// OUTPUT STATS ///////////////////////////////////////////////////////////////////////////////////
console.log("---- Generated CSS ----")
console.log(String(classHash.count).padStart(5, " "), "classes.")
console.log(String(varHash.count).padStart(5, " "), "variables.")
console.log(String(keyframeHash.count).padStart(5, " "), "keyframe animations.")

/*************************************************************************************************
 * TYPE GENERATION
 *************************************************************************************************/
type ScaledProps = CssFromMap<typeof scaledProps>
type CustomVarProps = CssFromCustomVars<typeof customVarProps>
type StaticProps = CssFromMap<typeof staticProps>

type A = typeof scaledPropsIPC
type B = typeof customVarPropsIPC & typeof customVarPropsSPC
type C = typeof staticPropsIPC

type MergeConditionalCssProps =
  & { ":focus-visible"?: MergeCssProps<CssFromMap<A[":focus-visible"]>, CssFromCustomVars<B[":focus-visible"]>, CssFromMap<C[":focus-visible"]>> }
  & { ":hover"?: MergeCssProps<CssFromMap<A[":hover"]>, CssFromCustomVars<B[":hover"]>, CssFromMap<C[":hover"]>> }
  & { ":active"?: MergeCssProps<CssFromMap<A[":active"]>, CssFromCustomVars<B[":active"]>, CssFromMap<C[":active"]>> }
  & { ":nth-child(odd)"?: CssFromCustomVars<B[":nth-child(odd)"]> }
  & { ":first-child"?: CssFromCustomVars<B[":first-child"]> }
  & { ":last-child"?: CssFromCustomVars<B[":last-child"]> }


export type CSS = MergeCssProps<ScaledProps, CustomVarProps, StaticProps> &
  AllPseudoClassesWithAliases<MergeConditionalCssProps>
// Sample to test types + auto-complete
const props: CSS = {
  backgroundColor: "$amber10",
  maxBlockSize: "initial",
  animationDuration: "$bounceDuration",
  inlineSize: "$buttonTactileHighlight",
  borderBlockStart: "$primaryMax",
  minBlockSize: "$0",
  fill: "initial",
  ":active": {
    color: "$primary9",
    backgroundColor: "$neutral1",
    borderBlockEnd: "$secondaryMin",
  },
  ":focus-visible": {
    color: "$neutral10",
    borderBlockEnd: "initial",
    background: "$warningMin",
  },
  ":focus": {
    backgroundColor: "$secondary9",
  },
}
