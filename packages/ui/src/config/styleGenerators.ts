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
import { vars, darkVarMap, CSS, BaseCSS, customVarPropMap, scaledPropMap, staticPropMap, scales } from "./styles.css"
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

/**
 * TODO:
 * Maybe switch to putting ALL vars in the markup, not just overrides
 * - Should still only happen once, in SPAs.
 * - Avoids duplicating many vars (e.g., colors and shadows in dark mode)
 * - Tradeoff is no caching of vars for cases with JS disabled on the frontend, but that's very few people
 * - Refreshes, revisits, etc would also be faster with caching, though... so maybe the CSS file size hit is worth it
 */

export function style(css: CSS, conditions: Conditions) {
  const classList: string[] = []
  const classDict: Partial<Record<CssPropKey, number>> = {}
  const styleDict: Record<string, string> = {}
  const style: Style = {}
  let styleCount = 0

  /** Adds a class name, and optionally a CSS var assignment, to our data */
  function addClass(prop: CssPropKey, className: string, varName?: string, value?: string) {
    const isNew = classDict[prop] === undefined
    const index = classDict[prop] ?? classList.length
    if (isNew) {
      classList.push(className)
      classDict[prop] = index
    } else {
      // Clear out old style that got overwritten, if need be
      const oldStyleVar = styleDict[classList[index]]
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
  const output: { style?: Style; className: string } = {
    className: classList.join(" "),
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
    addClass(prop, output.className, output.varName, output.value)
  }
}

// Sample to test types + auto-complete
const result = style(
  {
    maxBlockSize: "initial",
    blockSize: "$buttonTactileShadow",
    h: "$120",
    bg: "transparent",
    color: "transparent",
    px: "$buttonBasePx",
    animationDuration: "$bounceDuration",
    inlineSize: "$buttonTactileHighlight",
    borderBlockStart: "$primaryMax",
    minBlockSize: "$0",
    fill: "initial",
    fontWeight: "$semiBold",
    ":active": {
      color: "$primary9",
      bg: "$neutral1",
      borderBlockEnd: "$secondaryMin",
    },
    ":focus-visible": {
      color: "$neutral10",
      borderBlockEnd: "initial",
      background: "$warningMin",
    },
    ":focus": {
      bg: "$secondary9",
    },
    "@dark": {
      outlineWidth: "$widthBase",
    },
    "@reducedMotion": {
      animation: "none",
    },
  },
  {
    "@sm": false,
    "@md": false,
    "@lg": false,
    "@xl": false,
    "!sm": false,
    "!md": false,
    "!lg": false,
    "!xl": false,
    "@highContrast": false,
    "@reducedMotion": false,
    "@reducedData": false,
    "@touch": false,
    "@pointer": false,
    "@tv": false,
    "!highContrast": false,
    "!reducedMotion": false,
    "!reducedData": false,
    "!touch": false,
    "!pointer": false,
    "!tv": false,
    "@light": false,
    "@dark": false,
  }
)
console.log("result", result)

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

function getStyle(prop: CssPropKey, value: string, pseudo: PseudoClassKey | "base" = "base") {
  const staticMap = staticPropMap[pseudo as keyof typeof staticPropMap]
  const staticProp = staticMap[prop as keyof typeof staticMap]
  const staticValue = staticProp && value in staticProp ? staticProp[value as keyof typeof staticProp] : undefined

  const scaledMap = scaledPropMap[pseudo as keyof typeof scaledPropMap]
  const scaledProp = scaledMap[prop as keyof typeof scaledMap]
  let scaledValue = scaledProp && value in scaledProp ? scaledProp[value as keyof typeof scaledProp] : undefined

  if (staticValue) {
    return { className: staticValue }
  } else if (scaledValue) {
    // Check to see if this value is an alias
    if (scaledValue === SCALED_VALUE) {
      const propScale = scales[scaledPropScale[prop as ScaledKey]]
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
    const customVarMap = customVarPropMap[pseudo as keyof typeof customVarPropMap]
    const customVarProp =
      prop in customVarMap ? (customVarMap[prop as keyof typeof customVarMap] as CustomVarPropValue) : undefined
    const { className, varName } = customVarProp ?? {}
    console.log(pseudo, prop, className, varName, value)
    if (className && varName) return { className, varName, value }
  }
}

/*************************************************************************************************
 * TYPE GENERATION
 *************************************************************************************************/
type PseudoClassKey = keyof typeof pseudoClasses
type ScaledKey = keyof typeof scaledPropMap["base"]

type Vars = typeof vars

export type ThemeOverrides = {
  [key in keyof Vars]?: {
    [innerKey in keyof Vars[key]]?: string
  }
}

type Style = Record<string, string>

type AddClass = (prop: CssPropKey, className: string, varName?: string, value?: string) => void

type Conditions = Record<ConditionKey, boolean>
