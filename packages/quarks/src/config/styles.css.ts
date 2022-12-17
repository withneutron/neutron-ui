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
 * !  -> Inverted breakpoint (mobile-first) OR inverted media query.
 *       E.g. `!reducedMotion` matches when the user agent does NOT request reduced motion.
 *************************************************************************************************/

import { globalStyle, globalKeyframes } from "@vanilla-extract/css"
import { addPrefix, classHash, keyframeHash, removePrefix, varHash } from "./utils"
import {
  getSize,
  getSpace,
  getRadius,
  getColumn,
  getRow,
  getZIndex,
  getLineHeight,
  getTypeSpace,
  getType,
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
  BaseVars,
  ThemeProps,
  PrefixedKey,
  CssAliasMap,
  SCALED_ALIAS,
  borderCombos,
  outlineCombos,
} from "./scales"
import {
  CssPropKey,
  CssRule,
  FilterKeys,
  generateCustomVarPropsCss,
  generateScaledPropsCss,
  generateStaticPropsCss,
  generatePseudoClassCss,
  PseudoClassesWithAliases,
} from "./props"
import { getSelector } from "./styles.utils"
import { CssFromMap, CssFromCustomVars, MergedCssProps, ConditionKey, InlineConditionCss, BASE } from "./styles.models"
import { CoreColorName, STYLE_UNIT } from "../shared/models/"
import { getTextColor } from "../shared/utils/"

/*************************************************************************************************
 * STYLING SYSTEM GENERATION
 *************************************************************************************************/
// GENERATE THEME SCALES //////////////////////////////////////////////////////////////////////////
const size = getSize(varHash)
const space = getSpace(varHash, size.vars)
const color = getColor(varHash)
const fontSize = getFontSize(varHash)
const fontWeight = getFontWeight(varHash)
const fontFamily = getFontFamily(varHash)
const font = getFont(varHash, fontWeight.vars, fontSize.vars, fontFamily.vars)
const border = getBorder(varHash, color.vars)
const outline = getOutline(varHash, color.vars)
const radius = getRadius(varHash)
const zIndex = getZIndex(varHash)
const column = getColumn(varHash, size.vars)
const row = getRow(varHash, column.vars)
const lineHeight = getLineHeight(varHash, size.vars)
const typeSpace = getTypeSpace(varHash)
const type = getType(font.vars, lineHeight.vars, typeSpace.vars)
const textDecoration = getTextDecoration(varHash, color.vars)
const shadow = getShadow(varHash, color.vars)
const animation = getAnimation(varHash, keyframeHash)

export const scales = {
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
  type,
  zIndex,
} as const

// GLOBAL STYLES //////////////////////////////////////////////////////////////////////////////////
// Export the theme
export const themeClass = "nui"

// Function that generates the styles
globalStyle("html, body", {
  margin: 0,
  padding: 0,
})
globalStyle("html", { fontSize: "6.25%" })
globalStyle("body", {
  background: color.vars.primary2.ref,
  color: color.vars.defaultBody.ref,
  fontSize: "16em",
  fontWeight: fontWeight.vars.p.ref,
  lineHeight: lineHeight.vars.body.ref,
})
// Fix for Safari to properly set `rem` units
globalStyle("html", {
  "@media": {
    "not all and (min-resolution:.001dpcm)": {
      "@supports": {
        "(-webkit-appearance:none)": {
          fontSize: "1px",
        },
      },
    },
  },
})
globalStyle("*", {
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  boxSizing: "border-box",
})
globalStyle("*::placeholder", {
  color: color.vars[getTextColor(CoreColorName.primary, 9)].ref,
})
globalStyle("body, a, p, li, strong, em, b, i, button", {
  fontFamily: fontFamily.vars.body.ref,
})
globalStyle("button", {
  fontFamily: fontFamily.vars.button.ref,
})
globalStyle("pre, code", {
  fontFamily: fontFamily.vars.code.ref,
})
globalStyle("code", {
  background: color.vars.maxAlpha2.ref,
  color: color.vars.max.ref,
  fontWeight: fontWeight.vars.code.ref,
})
globalStyle("blockquote", {
  fontFamily: fontFamily.vars.quote.ref,
  fontSize: fontSize.vars.quote.ref,
  lineHeight: lineHeight.vars.spaced.ref,
  fontStyle: "italic",
})
globalStyle("ul", {
  listStyleType: "circle",
})
globalStyle("a, p, li, pre, code, strong, em, b, i, blockquote", {
  fontSize: fontSize.vars.p.ref,
})
globalStyle("a", {
  color: color.vars.secondary9.ref,
  fontWeight: fontWeight.vars[600].ref,
  borderRadius: radius.vars.field.ref,
  textDecoration: "underline",
  boxShadow: `inset 0 -3${STYLE_UNIT} 0 ${color.vars.secondary5.ref}`,
})
globalStyle("a:focus", {
  boxShadow: `inset 0 1.25em 0 ${color.vars.secondary9.ref}`,
  outline: "none",
})
globalStyle("a:hover", {
  boxShadow: `inset 0 1.25em 0 ${color.vars.secondary5.ref}`,
  color: color.vars.secondary12.ref,
})
globalStyle("a:focus, a:focus code", {
  color: color.vars[getTextColor(CoreColorName.secondary, 9)].ref,
})
globalStyle("li > a, nav a, button a, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a", {
  boxShadow: "none",
})
globalStyle("blockquote, pre", {
  background: color.vars.primary3.ref,
  color: color.vars[getTextColor(CoreColorName.primary, 3)].ref,
  marginInline: 0,
  paddingInline: space.vars[32].ref,
  paddingBlock: space.vars[20].ref,
  borderRadius: radius.vars.rounded.ref,
})
const headings = ["h1", "h2", "h3", "h4", "h5", "h6"]
globalStyle(mapSelectorsToTemplate("&:first-child", ...headings), {
  marginTop: space.vars[0].ref,
})
globalStyle(mapSelectorsToTemplate("& + &", ...headings), {
  marginTop: space.vars[0].ref,
})
globalStyle(mapSelectorsToTemplate("&, & > *", ...headings), {
  fontFamily: fontFamily.vars.heading.ref,
})
globalStyle("h1, h1 > *", {
  fontSize: fontSize.vars.h1.ref,
  fontWeight: fontWeight.vars.h1.ref,
  letterSpacing: typeSpace.vars.tightest.ref,
})
globalStyle("h2, h2 > *", {
  fontSize: fontSize.vars.h2.ref,
  fontWeight: fontWeight.vars.h2.ref,
})
globalStyle("h3, h3 > *", {
  fontSize: fontSize.vars.h3.ref,
  fontWeight: fontWeight.vars.h3.ref,
})
globalStyle("h4, h4 > *", {
  fontSize: fontSize.vars.h4.ref,
  fontWeight: fontWeight.vars.h4.ref,
})
globalStyle("h5, h5 > *", {
  fontSize: fontSize.vars.h5.ref,
  fontWeight: fontWeight.vars.h5.ref,
})
globalStyle("h6, h6 > *", {
  fontSize: fontSize.vars.h6.ref,
  fontWeight: fontWeight.vars.h6.ref,
})
globalStyle("em", {
  fontStyle: "normal",
})
globalStyle("strong", {
  fontWeight: fontWeight.vars.p.ref,
})
globalStyle("::selection", {
  background: color.vars.secondary9.ref,
  color: color.vars[getTextColor(CoreColorName.secondary, 9)].ref,
})

/** Get a series of selectors from a template (replaces instances of `&`) */
function mapSelectorsToTemplate(template: string, ...targets: string[]) {
  let output = ""
  targets.forEach((target, index) => {
    const prefix = index === 0 ? "" : ","
    output += `${prefix}${template.replaceAll("&", target)}`
  })
  return output
}

// Add keyframes to CSS
if (animation.keyframes) {
  Object.entries(animation.keyframes).forEach(([name, rule]) => {
    globalKeyframes(name, rule)
  })
}

// SCALED PROPS ///////////////////////////////////////////////////////////////////////////////////
/** Generate CSS props that are based on scales */
const scaledProps = generateScaledPropsCss(scales, (value: CssRule) => {
  const className = classHash.name
  globalStyle(getSelector(className), value)
  return className
})

/** Generate CSS props that are _pseudo class based_, and based on scales */
const scaledPropsPC = generatePseudoClassCss<typeof scaledProps>((pseudoClass: string, keys: FilterKeys) =>
  generateScaledPropsCss(
    scales,
    (value: CssRule) => {
      const className = classHash.name
      globalStyle(getSelector(className, pseudoClass), value)
      return className
    },
    keys
  )
)

// STATIC PROPS ///////////////////////////////////////////////////////////////////////////////////
/** Generate CSS props that are based on scales */
const staticProps = generateStaticPropsCss((value: CssRule) => {
  const className = classHash.name
  globalStyle(getSelector(className), value)
  return className
})

/** Generate CSS props that are _pseudo class based_, and based on scales */
const staticPropsPC = generatePseudoClassCss<typeof staticProps>((pseudoClass: string, keys: FilterKeys) =>
  generateStaticPropsCss((value: CssRule) => {
    const className = classHash.name
    globalStyle(getSelector(className, pseudoClass), value)
    return className
  }, keys)
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

/** Generate CSS props that are _pseudo class based_, for custom var props */
const pseudoClassCustomVarPropGenerator = (pseudoClass: string, keys: FilterKeys) =>
  generateCustomVarPropsCss((prop: CssPropKey, template?: (value: string) => string) => {
    const cssVar = varHash.var
    const className = classHash.name
    template = template ?? ((v: string) => v)
    globalStyle(getSelector(className, pseudoClass), {
      [prop]: template(cssVar.ref),
    })
    return { varName: cssVar.name, className }
  }, keys)

const customVarPropsPC = generatePseudoClassCss<typeof customVarProps>(pseudoClassCustomVarPropGenerator)

// PROP MAPS //////////////////////////////////////////////////////////////////////////////////////
export const scaledPropMap = {
  ...scaledPropsPC,
  [BASE]: scaledProps,
}
export const customVarPropMap = {
  ...customVarPropsPC,
  [BASE]: customVarProps,
}
export const staticPropMap = {
  ...staticPropsPC,
  [BASE]: staticProps,
}

// OUTPUT STATS ///////////////////////////////////////////////////////////////////////////////////
console.log("---- Generated CSS ----")
console.log(String(classHash.count).padStart(5, " "), "classes.")
console.log(String(varHash.count).padStart(5, " "), "variables.")
console.log(String(keyframeHash.count).padStart(5, " "), "keyframe animations.")
/*************************************************************************************************
 * TYPE GENERATION
 *************************************************************************************************/
/** Scaled props that override mapped props */
export type OverrideScaledProp = {
  outline: PrefixedKey<typeof outlineCombos> | keyof typeof staticProps.outline
  border: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderBlock: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderInline: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderTop: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderBottom: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderLeft: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderRight: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.border
  borderBlockStart: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.borderBlockStart
  borderBlockEnd: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.borderBlockEnd
  borderInlineStart: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.borderInlineStart
  borderInlineEnd: PrefixedKey<typeof borderCombos> | keyof typeof staticProps.borderInlineEnd
}

// Pseudo-class types
type A = typeof scaledPropsPC
type B = typeof customVarPropsPC
type C = typeof staticPropsPC

type FocusVisible = {
  ":focus-visible"?: MergedCssProps<
    CssFromMap<A[":focus-visible"]>,
    CssFromCustomVars<B[":focus-visible"]>,
    CssFromMap<C[":focus-visible"]>
  >
}
type Hover = {
  ":hover"?: MergedCssProps<CssFromMap<A[":hover"]>, CssFromCustomVars<B[":hover"]>, CssFromMap<C[":hover"]>>
}
type Active = {
  ":active"?: MergedCssProps<CssFromMap<A[":active"]>, CssFromCustomVars<B[":active"]>, CssFromMap<C[":active"]>>
}
type MergePCCssProps = FocusVisible & Hover & Active

// Inline-conditional, pseudo-class types
type ICFocusVisible = {
  ":focus-visible"?: InlineConditionCss<
    MergedCssProps<
      CssFromMap<A[":focus-visible"]>,
      CssFromCustomVars<B[":focus-visible"]>,
      CssFromMap<C[":focus-visible"]>
    >
  >
}
type ICHover = {
  ":hover"?: InlineConditionCss<
    MergedCssProps<CssFromMap<A[":hover"]>, CssFromCustomVars<B[":hover"]>, CssFromMap<C[":hover"]>>
  >
}
type ICActive = {
  ":active"?: InlineConditionCss<
    MergedCssProps<CssFromMap<A[":active"]>, CssFromCustomVars<B[":active"]>, CssFromMap<C[":active"]>>
  >
}
type ICMergePCCssProps = ICFocusVisible & ICHover & ICActive

// CSS types
type ScaledProps = CssFromMap<typeof scaledProps>
type CustomVarProps = CssFromCustomVars<typeof customVarProps>
type StaticProps = CssFromMap<typeof staticProps>

/** Style object, including pseudo-classes and INLINE conditions, but excluding root-level conditions */
export type BaseCSS = InlineConditionCss<MergedCssProps<ScaledProps, CustomVarProps, StaticProps>> &
  PseudoClassesWithAliases<ICMergePCCssProps>

type BaseConditionalCSS = MergedCssProps<ScaledProps, CustomVarProps, StaticProps> &
  PseudoClassesWithAliases<MergePCCssProps>

/** Style object for root-level conditions, including pseudo-classes */
export type ConditionalCSS = { [k in ConditionKey]?: BaseConditionalCSS }

/** Full type of Neutron UI style objects, including pseudo-classes and conditions */
export type CSS = BaseCSS & ConditionalCSS

/*************************************************************************************************
 * THEME GENERATION
 *************************************************************************************************/
export const varMap = {} as Record<string, string | number>
export const darkVarMap = {} as Record<string, string | number>

function getVars<V extends BaseVars>(vars: V, map = varMap) {
  return Object.entries(vars).reduce((output, [key, { name, value }]) => {
    output[key as keyof typeof output] = `var(${name})`
    if (typeof value === "string") {
      map[name] = value
    }
    return output
  }, {} as { [k in keyof V]: string })
}

function getTokenToVarsMap<V extends BaseVars, A extends CssAliasMap>(vars: V, aliases?: A) {
  const output = {} as { [k in PrefixedKey<V>]: string }
  Object.entries(vars).forEach(([key, { name }]) => {
    const token = addPrefix(key)
    output[token as keyof typeof output] = name
    return output
  })
  if (aliases) {
    Object.entries(aliases).forEach(([token, alias]) => {
      const keyFromAlias = removePrefix(alias)
      output[token as keyof typeof output] = keyFromAlias === SCALED_ALIAS ? SCALED_ALIAS : vars[keyFromAlias].name
      return output
    })
  }
  return output
}

function getThemeProps<T extends ThemeProps>(props: T) {
  return Object.entries(props).reduce((output, [key, value]) => {
    output[key as keyof typeof output] = value
    return output
  }, {} as { [k in keyof T]: string })
}

export const vars = {
  animation: getVars(animation.vars),
  border: getVars(border.vars),
  color: getVars(color.vars),
  column: getVars(column.vars),
  font: getVars(font.vars),
  fontFamily: getVars(fontFamily.vars),
  fontSize: getVars(fontSize.vars),
  fontWeight: getVars(fontWeight.vars),
  lineHeight: getVars(lineHeight.vars),
  outline: getVars(outline.vars),
  radius: getVars(radius.vars),
  row: getVars(row.vars),
  shadow: getVars(shadow.vars),
  size: getVars(size.vars),
  space: getVars(space.vars),
  textDecoration: getVars(textDecoration.vars),
  typeSpace: getVars(typeSpace.vars),
  type: getVars(type.vars),
  zIndex: getVars(zIndex.vars),
} as const

export const theme = {
  animation: getThemeProps(animation.themeProps),
  border: getThemeProps(border.themeProps),
  color: getThemeProps(color.themeProps),
  column: getThemeProps(column.themeProps),
  font: getThemeProps(font.themeProps),
  fontFamily: getThemeProps(fontFamily.themeProps),
  fontSize: getThemeProps(fontSize.themeProps),
  fontWeight: getThemeProps(fontWeight.themeProps),
  lineHeight: getThemeProps(lineHeight.themeProps),
  outline: getThemeProps(outline.themeProps),
  radius: getThemeProps(radius.themeProps),
  row: getThemeProps(row.themeProps),
  shadow: getThemeProps(shadow.themeProps),
  size: getThemeProps(size.themeProps),
  space: getThemeProps(space.themeProps),
  textDecoration: getThemeProps(textDecoration.themeProps),
  typeSpace: getThemeProps(typeSpace.themeProps),
  type: getThemeProps(type.themeProps),
  zIndex: getThemeProps(zIndex.themeProps),
} as const

/**
 * Can be used to convert a theme token value (e.g., `$primary9` color), to a CSS var.
 *
 * For instance, when generating styles for color, the generator could check `scaledProps.color` to
 * see if a key exists there; if it doesn't, it could use this map to convert the value into a var
 * instead, which will leverage our custom var system instead of a pre-generated CSS class.
 */
export const tokenToVarMap = {
  animation: getTokenToVarsMap(animation.vars, animation.cssAliasMap),
  border: getTokenToVarsMap(border.vars, border.cssAliasMap),
  color: getTokenToVarsMap(color.vars, color.cssAliasMap),
  column: getTokenToVarsMap(column.vars, column.cssAliasMap),
  font: getTokenToVarsMap(font.vars, font.cssAliasMap),
  fontFamily: getTokenToVarsMap(fontFamily.vars, fontFamily.cssAliasMap),
  fontSize: getTokenToVarsMap(fontSize.vars, fontSize.cssAliasMap),
  fontWeight: getTokenToVarsMap(fontWeight.vars, fontWeight.cssAliasMap),
  lineHeight: getTokenToVarsMap(lineHeight.vars, lineHeight.cssAliasMap),
  outline: getTokenToVarsMap(outline.vars, outline.cssAliasMap),
  radius: getTokenToVarsMap(radius.vars, radius.cssAliasMap),
  row: getTokenToVarsMap(row.vars, row.cssAliasMap),
  shadow: getTokenToVarsMap(shadow.vars, shadow.cssAliasMap),
  size: getTokenToVarsMap(size.vars, size.cssAliasMap),
  space: getTokenToVarsMap(space.vars, space.cssAliasMap),
  textDecoration: getTokenToVarsMap(textDecoration.vars, textDecoration.cssAliasMap),
  typeSpace: getTokenToVarsMap(typeSpace.vars, typeSpace.cssAliasMap),
  type: getTokenToVarsMap(type.vars, type.cssAliasMap),
  zIndex: getTokenToVarsMap(zIndex.vars, zIndex.cssAliasMap),
} as const

export const darkColor = getVars(color.darkVars!, darkVarMap)
export const darkShadow = getVars(shadow.darkVars!, darkVarMap)

globalStyle(":root", varMap)
