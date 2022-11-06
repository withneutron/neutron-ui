import {
  CssPropKey,
  mappedProps,
  valueMappers,
  pseudoClasses,
  scaledPropScale,
  pseudoClassAliases,
  CustomVarPropValue,
  sourcePropsIdMap,
  SCALED_PLACEHOLDER,
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
  tokenToVarMap,
  ConditionalCSS,
} from "./styles.css"
import { ConditionKey, BASE, InlineConditionValue, InlineConditionKey } from "./styles.models"
import {
  conditionKeys,
  conditionsMap,
  ResponsiveCondition,
  responsiveConditionsPriority,
  responsiveConditionsMap,
  ConditionCategories,
  ConditionCategory,
} from "./conditions"
import { CssAlias } from "./scales/scales.models"

/** Get theme override style */
export function getTheme(colorMode?: ColorMode, userOverrides?: ThemeOverrides) {
  const overrides = {
    ...(colorMode === "dark" ? darkVarMap : {}),
    ...flattenOverrides(userOverrides),
  }
  return overrides
}

/** Converts a CSS style object into a set of pre-generated CSS class names, and possibly a style object */
export function style(
  css: CSS,
  conditions: Conditions,
  overrides?: CSS | null,
  styleName?: string,
  manager?: StyleManager
) {
  if (manager) {
    manager.setNewStyle(conditions, styleName)
  } else {
    manager = new StyleManager(conditions, styleName)
  }

  // Process defined styles
  processCss(css, manager, conditions)

  // Process style overrides, if any. This is useful for runtime overrides
  if (overrides) {
    manager.setToOverrideMode()
    processCss(overrides, manager, conditions)
  }

  return manager.compile()
}

/*************************************************************************************************
 * CLASSES
 *************************************************************************************************/
/** Class to manage tracking, updating, and compilation of styles */
export class StyleManager {
  private watchCategories: { [k in ConditionCategory]: boolean } = {
    [ConditionCategory.responsive]: false,
    [ConditionCategory.preference]: false,
    [ConditionCategory.device]: false,
    [ConditionCategory.colorMode]: false,
    [ConditionCategory.debug]: false,
  }
  private debugList: [string, string][] = []
  private classList: string[] = []
  private classDict: ClassDict = {
    [BASE]: {},
    ":focus-visible": {},
    ":hover": {},
    ":active": {},
  }
  private parentClassDict: ClassDict = {
    [BASE]: {},
    ":focus-visible": {},
    ":hover": {},
    ":active": {},
  }
  private styleDict: Record<string, string> = {}
  private style: StyleObj = {}
  private styleCount = 0

  private conditions: Conditions
  private name: string

  constructor(conditions: Conditions, name?: string) {
    this.conditions = conditions
    this.name = name ?? getStyleName()
  }

  private getDebugVar(className: string) {
    return `--${className}`
  }

  debug() {
    if (this.conditions.debug) {
      this.styleCount += this.debugList.length
      const scopeName = this.getDebugVar(`-${this.name}`)
      this.style[scopeName] = ""
      this.debugList.forEach(([debugClass, debugValue]) => {
        this.style[scopeName] += `${debugClass} `
        this.style[this.getDebugVar(`--${debugClass}`)] = debugValue
      })
    }
    this.debugList = []
  }

  setNewStyle(conditions: Conditions, name?: string) {
    this.conditions = conditions
    this.name = name ?? getStyleName()
  }

  setToOverrideMode() {
    this.debug()
    this.name = `${this.name}_css`
  }

  /**
   * Get the responsive condition from a style line that defines that style
   * for one or more conditions.
   */
  private getResponsiveConditionFromInline(inlineCondition: InlineConditionKey) {
    return responsiveConditionsMap[inlineCondition as ResponsiveCondition]
      ? (inlineCondition as ResponsiveConditionKey)
      : BASE
  }

  private getPropId(prop: CssPropKey) {
    const propId = sourcePropsIdMap[prop as keyof typeof sourcePropsIdMap]
    if (propId === undefined) {
      throw new Error(`Invalid prop "${prop}" passed into '${sourcePropsIdMap}'`)
    }
    return propId
  }

  private getBaseState(prop: CssPropKey, inlineCondition: InlineConditionKey, pseudoClass: PseudoCategoryKey) {
    const condition = this.getResponsiveConditionFromInline(inlineCondition)
    const propId = this.getPropId(prop)

    // Existing data, to make sure we don't have a conflict
    const existingData = this.classDict[pseudoClass][propId]
    const incomingPriority = responsiveConditionsPriority[condition]
    const existingPriority = existingData?.[1] ?? responsiveConditionsPriority[BASE]

    // Parent data, to make sure we don't have a conflict with that data
    const parentData = this.parentClassDict[pseudoClass][propId]
    const parentPriority = parentData?.[1] ?? responsiveConditionsPriority[BASE] + 1

    // If the parent already has this style, only override if this one has HIGHER priority.
    const hasParentConflic = parentPriority <= incomingPriority

    // If what we've already processed of the current styles have a conflict,
    // only override it if this one has HIGHER OR EQUAL priority.
    const hasExistingConflict = existingPriority < incomingPriority

    return {
      propId,
      existingData,
      incomingPriority,
      existingPriority,
      parentData,
      parentPriority,
      hasParentConflic,
      hasExistingConflict,
    }
  }

  /** Returns an object with boolean values for whether this manager is watching each condition */
  getWatchedConditions() {
    return this.watchCategories
  }

  watchCondition(condition: InlineConditionKey) {
    const category = ConditionCategories[condition as ConditionKey]
    if (category) {
      this.watchCategories[category] = true
    }
  }

  /** Add a style to the style set */
  add(
    prop: CssPropKey,
    className: string,
    inlineCondition: InlineConditionKey = BASE,
    pseudoClass: PseudoCategoryKey = BASE,
    varName?: string,
    value?: string,
    originalProp?: CssPropKey,
    originalValue?: string
  ) {
    const { propId, existingData, incomingPriority, hasExistingConflict, hasParentConflic } = this.getBaseState(
      prop,
      inlineCondition,
      pseudoClass
    )

    // Lower-valued priorities take precedent, and cannot be overwritten
    if (hasExistingConflict || hasParentConflic) {
      return
    }

    const index = existingData?.[0] ?? this.classList.length

    // Make sure we keep the tracked priority up-to-date
    this.classDict[pseudoClass][propId] = [index, incomingPriority]

    if (existingData === undefined) {
      this.classList.push(className)
      this.debugList.push([className, `${originalProp}: ${originalValue}\n`])
    } else {
      // Clear out old style that got overwritten, if need be
      const oldClass = this.classList[index]
      const oldStyleVar = this.styleDict[oldClass]
      if (oldStyleVar) {
        delete this.style[oldStyleVar]
        this.styleCount--
      }
      this.classList[index] = className
      this.debugList[index] = [className, `${originalProp}: ${originalValue}\n`]
    }
    if (varName && value) {
      this.styleCount++
      this.styleDict[className] = varName
      this.style[varName] = value
    }
  }

  compile() {
    // Any further usage of this class will be for nested composition
    this.parentClassDict = {
      [BASE]: { ...this.classDict[BASE] },
      ":focus-visible": { ...this.classDict[":focus-visible"] },
      ":hover": { ...this.classDict[":hover"] },
      ":active": { ...this.classDict[":active"] },
    }

    // Compile our data into an output object
    const outputClass = this.classList.join(" ")
    const output: { className: string; styleManager: StyleManager; style?: StyleObj } = {
      className: outputClass,
      styleManager: this,
    }

    // Handle debug
    this.debug()

    if (this.styleCount > 0) {
      output.style = this.style
    }

    return output
  }
}

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

// PROCESSING FUNCTIONS ///////////////////////////////////////////////////////////////////////////
/** Process fully-nestable CSS, including conditions and pseudo-classes */
function processCss(css: CSS, manager: StyleManager, conditions: Conditions, condition?: InlineConditionKey) {
  const props = Object.entries(css)
  // Loop through each prop of css
  const propsLen = props.length
  for (let index = 0; index < propsLen; index++) {
    const [propName, propValue] = props[index]
    // If the prop is a condition, process its inner props, including its inner pseudo-classes
    if (conditionsMap[propName as ConditionKey]) {
      // Register that this style set depends on this condition being watched
      manager.watchCondition(propName as ConditionKey)
      // Skip if the condition is currently false
      if (!conditions[propName as ConditionKey]) continue
      // Otherwise, proceed
      processCss(propValue as ConditionalCSS, manager, conditions, propName as InlineConditionKey)
    } else if (pseudoClasses[propName as PseudoClassKey]) {
      // If the prop is a pseudo-class, process its inner props
      processBaseCss(propValue as BaseCSS, manager, propName as PseudoClassKey, conditions, condition)
    } else {
      // Else, process the prop's value
      processCssProp(propName as CssPropKey, propValue as InlineConditionValue, manager, conditions, condition)
    }
  }
}

/** Process non-conditional CSS, including pseudo-classes */
function processBaseCss(
  baseCss: BaseCSS,
  manager: StyleManager,
  pseudo: PseudoClassKey,
  conditions: Conditions,
  condition?: InlineConditionKey
) {
  const props = Object.entries(baseCss)
  const propsLen = props.length
  for (let index = 0; index < propsLen; index++) {
    const [propName, propValue] = props[index]
    processCssProp(propName as CssPropKey, propValue as InlineConditionValue, manager, conditions, condition, pseudo)
  }
}

/**
 * Process a single CSS prop + value, including mapped props (which may be spread into multiple props),
 * and inline-conditional values, which need to be processed based on current conditions.
 */
function processCssProp(
  prop: CssPropKey,
  value: InlineConditionValue,
  manager: StyleManager,
  conditions: Conditions,
  condition?: InlineConditionKey,
  pseudo?: PseudoClassKey,
  originalProp?: CssPropKey
) {
  // Check first to see if we have an inline condition `object`!
  if (typeof value === "object") {
    // If inline conditions include a base value, process that first
    if (value[BASE] !== undefined) {
      processCssProp(prop, value[BASE], manager, conditions, BASE, pseudo)
    }
    const conditionKeysLen = conditionKeys.length
    for (let index = 0; index < conditionKeysLen; index++) {
      const conditionKey = conditionKeys[index]
      const innerValue = value[conditionKey]
      if (innerValue !== undefined) {
        manager.watchCondition(conditionKey)
        if (conditions[conditionKey] === true) {
          processCssProp(prop, innerValue, manager, conditions, conditionKey as InlineConditionKey, pseudo)
        }
      }
    }
  } else {
    const mapper = prop in mappedProps ? mappedProps[prop as keyof typeof mappedProps] : undefined
    // If it's a mapped prop, run its mapping func, and proceed with the result of that
    if (mapper) {
      const innerProps = Object.entries(mapper(value))
      const innerPropsLen = innerProps.length
      for (let index = 0; index < innerPropsLen; index++) {
        const [propName, propValue] = innerProps[index]
        processCssProp(propName as CssPropKey, propValue, manager, conditions, condition, pseudo, prop)
      }
    } else {
      value = valueMappers[prop as keyof typeof valueMappers]?.(value) ?? value
      if (pseudo) {
        const pseudos =
          pseudo in pseudoClassAliases ? pseudoClassAliases[pseudo as keyof typeof pseudoClassAliases] : [pseudo]
        const pseudosLen = pseudos.length
        for (let index = 0; index < pseudosLen; index++) {
          const pseudoKey = pseudos[index]
          addStyle(prop, value as string, manager, condition, pseudoKey, originalProp ?? prop)
        }
      } else {
        addStyle(prop, value, manager, condition, undefined, originalProp ?? prop)
      }
    }
  }
}

/** Adds style to style manager */
function addStyle(
  prop: CssPropKey,
  value: string,
  manager: StyleManager,
  condition?: InlineConditionKey,
  pseudo?: PseudoClassKey,
  originalProp?: CssPropKey
) {
  const output = getStyle(prop, value, pseudo)
  if (output) {
    manager.add(prop, output.className, condition, pseudo ?? BASE, output.varName, output.value, originalProp, value)
  }
}

/** Returns a style from our utility class system, based on a prop, value, and (optional) CSS pseudo-class */
function getStyle(prop: CssPropKey, value: string, pseudo: PseudoCategoryKey = BASE) {
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
    if (scaledValue === SCALED_PLACEHOLDER) {
      const propAliasMap = propScale.cssAliasMap
      type AliasKey = keyof typeof propAliasMap
      const aliasValue = propAliasMap ? (propAliasMap[value as AliasKey] as CssAlias) : undefined
      if (aliasValue) {
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
        value = `var(${varFromToken})`
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

let styleId = 0
function getStyleName() {
  styleId++
  return `style-${styleId}`
}

/*************************************************************************************************
 * TYPES
 *************************************************************************************************/
type ResponsiveConditionKey = ResponsiveCondition | typeof BASE
type PseudoClassKey = keyof typeof pseudoClasses
type PseudoCategoryKey = PseudoClassKey | typeof BASE
type ScaledKey = keyof typeof scaledPropMap[typeof BASE]

type ClassDict = { [p in PseudoCategoryKey]: { [c: number]: [number, number] } }

type Vars = typeof vars

export type ThemeOverrides = {
  [key in keyof Vars]?: {
    [innerKey in keyof Vars[key]]?: string
  }
}

type StyleObj = Record<string, string>

type Conditions = Partial<Record<ConditionKey, boolean>>
