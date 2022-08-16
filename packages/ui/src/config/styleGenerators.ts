import {
  CssPropKey,
  mappedProps,
  valueMappers,
  pseudoClasses,
  scaledPropScale,
  pseudoClassAliases,
  CustomVarPropValue,
  SCALED_VALUE,
} from "./props"
import { ColorMode } from "../shared/models"
import {
  vars,
  darkVarMap,
  CSS,
  BaseCSS,
  customVarPropMap,
  scaledPropMap,
  staticPropMap,
  scales,
  PSEUDO_BASE,
  tokenToVarMap,
} from "./styles.css"
import { ConditionKey } from "./styles.models"
import { conditionsMap } from "./conditions"
import { CssAlias } from "./scales/scales.models"

export function getTheme(colorMode?: ColorMode, userOverrides?: ThemeOverrides) {
  const overrides = {
    ...(colorMode === "dark" ? darkVarMap : {}),
    ...flattenOverrides(userOverrides),
  }
  return overrides
}

/** Converts a CSS style object into a set of pre-generated CSS class names, and possibly a style object */
export function style(css: CSS, conditions: Conditions, styleName?: string) {
  const classList: string[] = []
  const classDict: ClassDict = { ...baseClassDict }
  const styleDict: Record<string, string> = {}
  const style: Style = {}
  let styleCount = 0

  /** Adds a class name, and optionally a CSS var assignment, to our data */
  function addClass(
    prop: CssPropKey,
    className: string,
    pseudoClass: PseudoCategory = PSEUDO_BASE,
    varName?: string,
    value?: string
  ) {
    const isNew = classDict[pseudoClass][prop] === undefined
    const index = classDict[pseudoClass][prop] ?? classList.length
    if (isNew) {
      classList.push(className)
      classDict[pseudoClass][prop] = index
    } else {
      // Clear out old style that got overwritten, if need be
      const oldClass = classList[index]
      const oldStyleVar = styleDict[oldClass]
      if (oldStyleVar) {
        delete style[oldStyleVar]
        styleCount--
      }
      classList[index] = className
    }
    if (varName && value) {
      styleCount++
      styleDict[className] = varName
      style[varName] = value
    }
  }

  processCss(css, addClass, conditions)

  // Compile our data into an output object
  const outputClass = classList.join(" ")
  const output: { style?: Style; className: string } = {
    className: outputClass,
  }

  // Handle debug
  if (conditions.debug) {
    styleCount++
    style[getDebugVar(styleName ?? getStyleName())] = outputClass
  }

  if (styleCount > 0) {
    output.style = style
  }
  return output
}

function processCss(css: CSS, addClass: AddClass, conditions: Conditions) {
  const props = Object.entries(css)
  // Loop through each prop of css
  for (let index = 0; index < props.length; index++) {
    const [propName, propValue] = props[index]
    // If the prop is a condition, process its inner props, including its inner pseudo-classes
    if (conditionsMap[propName as ConditionKey]) {
      // Skip if the condition is currently false
      if (!conditions[propName as ConditionKey]) continue
      processCss(propValue, addClass, conditions)
    } else if (pseudoClasses[propName as PseudoClassKey]) {
      // If the prop is a pseudo-class, process its inner props
      processBaseCss(propValue, addClass, propName as PseudoClassKey)
    } else {
      // Else, process the prop's value
      processCssProp(propName as CssPropKey, propValue, addClass)
    }
  }
}

function processBaseCss(baseCss: BaseCSS, addClass: AddClass, pseudo: PseudoClassKey) {
  const props = Object.entries(baseCss)
  for (let index = 0; index < props.length; index++) {
    const [propName, propValue] = props[index]
    processCssProp(propName as CssPropKey, propValue, addClass, pseudo)
  }
}

function processCssProp(prop: CssPropKey, value: string, addClass: AddClass, pseudo?: PseudoClassKey) {
  const mapper = prop in mappedProps ? mappedProps[prop as keyof typeof mappedProps] : undefined
  // If it's a mapped prop, run its mapping func, and proceed with the result of that
  if (mapper) {
    const innerProps = Object.entries(mapper(value))
    for (let index = 0; index < innerProps.length; index++) {
      const [propName, propValue] = innerProps[index]
      processCssProp(propName as CssPropKey, propValue, addClass, pseudo)
    }
  } else {
    value = valueMappers[prop as keyof typeof valueMappers]?.(value) ?? value
    if (pseudo) {
      const pseudos =
        pseudo in pseudoClassAliases ? pseudoClassAliases[pseudo as keyof typeof pseudoClassAliases] : [pseudo]
      pseudos.forEach(pseudoKey => addClassFromStyle(prop, value, addClass, pseudoKey))
    } else {
      addClassFromStyle(prop, value, addClass)
    }
  }
}

function addClassFromStyle(prop: CssPropKey, value: string, addClass: AddClass, pseudo?: PseudoClassKey) {
  const output = getStyle(prop, value, pseudo)
  if (output) {
    addClass(prop, output.className, pseudo ?? PSEUDO_BASE, output.varName, output.value)
  }
}

// Sample to test types + auto-complete
const css: CSS = {
  bg: "$neutral10",
  color: "$textNeutral10",
  mt: "$8",
  mb: "$20",
  ml: "$16",
  mr: "$12",
  pl: "$16",
  pr: "$32",
  py: "$40",
  radiusTopLeft: "$2",
  radiusTopRight: "$12",
  radiusBottomLeft: "$8",
  radiusBottomRight: "$3",
  float: "left",
  maxWidth: "$320",
  fontWeight: "$bold",
  fontStyle: "italic",
  ":active": {
    color: "$primary9",
    bg: "$successMax",
  },
  ":focus-visible": {
    color: "$neutral10",
    bg: "$warningMin",
  },
  ":hover": {
    bg: "$secondary9",
  },
  "@dark": {
    outlineWidth: "$widthBase",
  },
  "@reducedMotion": {
    animation: "none",
  },
}
// const result = style(css,
//   {
//     "@sm": false,
//     "@md": false,
//     "@lg": false,
//     "@xl": false,
//     "!sm": false,
//     "!md": false,
//     "!lg": false,
//     "!xl": false,
//     "@highContrast": false,
//     "@reducedMotion": false,
//     "@reducedData": false,
//     "@touch": false,
//     "@pointer": false,
//     "@tv": false,
//     "!highContrast": false,
//     "!reducedMotion": false,
//     "!reducedData": false,
//     "!touch": false,
//     "!pointer": false,
//     "!tv": false,
//     "@light": false,
//     "@dark": false,
//     debug: true,
//   }
// )
// console.log("className", { className: result.className })
// console.log("style", result.style)

/*************************************************************************************************
 * UTILS
 *************************************************************************************************/
/** Takes a nested (group-based) theme overrides object, and flattens it, without groupings */
function flattenOverrides(overrides?: ThemeOverrides) {
  return !overrides
    ? {}
    : Object.values(overrides).reduce((output, rules) => {
        Object.entries(rules).forEach(([varName, value]) => {
          output[varName] = value
        })
        return output
      }, {} as Record<string, string | number>)
}

function getStyle(prop: CssPropKey, value: string, pseudo: PseudoCategory = PSEUDO_BASE) {
  const staticMap = staticPropMap[pseudo as keyof typeof staticPropMap]
  const staticProp = staticMap[prop as keyof typeof staticMap]
  const staticValue = staticProp && value in staticProp ? staticProp[value as keyof typeof staticProp] : undefined

  const scaledMap = scaledPropMap[pseudo as keyof typeof scaledPropMap]
  const scaledProp = scaledMap[prop as keyof typeof scaledMap]
  let scaledValue = scaledProp && value in scaledProp ? scaledProp[value as keyof typeof scaledProp] : undefined

  const scaleKey = scaledPropScale[prop as ScaledKey]
  const propScale = scales[scaleKey]

  if (staticValue) {
    return { className: staticValue }
  } else if (scaledValue) {
    // Check to see if this value is an alias
    if (scaledValue === SCALED_VALUE) {
      const propAliasMap = propScale.cssAliasMap
      type AliasKey = keyof typeof propAliasMap
      const alias = propAliasMap ? (propAliasMap[value as AliasKey] as CssAlias) : undefined
      if (alias) {
        const aliasValue = alias.target
        scaledValue = aliasValue in scaledProp ? scaledProp[aliasValue as keyof typeof scaledProp] : undefined
      }
    }
    if (scaledValue) return { className: scaledValue }
  } else {
    // If value is scaled, but we ended up, it could be filtered out of the scale (e.g., a non-core color)
    if (propScale?.themeProps[value as keyof typeof propScale.themeProps]) {
      const tokenMap = tokenToVarMap[scaleKey]
      const varFromToken = tokenMap[value as keyof typeof tokenMap]
      if (varFromToken) {
        value = varFromToken
      }
    }
    // Get both the className and varName needed to set a custom value, if possible for this prop
    const customVarMap = customVarPropMap[pseudo as keyof typeof customVarPropMap]
    const customVarProp =
      prop in customVarMap ? (customVarMap[prop as keyof typeof customVarMap] as CustomVarPropValue) : undefined
    const { className, varName } = customVarProp ?? {}
    if (className && varName) return { className, varName, value }
  }
}

function getDebugVar(className: string) {
  return `--_${className}`
}

let styleId = 0
function getStyleName() {
  styleId++
  return `style-${styleId}`
}

const baseClassDict = Object.keys(pseudoClasses).reduce((output, key) => {
  output[key as PseudoClassKey] = {}
  return output
}, {} as ClassDict)
baseClassDict[PSEUDO_BASE] = {}
Object.freeze(baseClassDict)

/*************************************************************************************************
 * TYPE GENERATION
 *************************************************************************************************/
type PseudoClassKey = keyof typeof pseudoClasses
type PseudoCategory = PseudoClassKey | typeof PSEUDO_BASE
type ScaledKey = keyof typeof scaledPropMap[typeof PSEUDO_BASE]

type ClassDict = { [p in PseudoCategory]: { [c in CssPropKey]?: number } }

type Vars = typeof vars

export type ThemeOverrides = {
  [key in keyof Vars]?: {
    [innerKey in keyof Vars[key]]?: string
  }
}

type Style = Record<string, string>

type AddClass = (
  prop: CssPropKey,
  className: string,
  pseudoClass?: PseudoCategory,
  varName?: string,
  value?: string
) => void

type Conditions = Record<ConditionKey, boolean>
