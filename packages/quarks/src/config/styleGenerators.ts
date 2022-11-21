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
import { ConditionKey, BASE, InlineConditionValue, InlineConditionKey, VariantCSS } from "./styles.models"
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
  variantCss?: VariantCSS,
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
  manager.processCss(css, conditions)

  // Process variants, if any.
  if (variantCss) {
    manager.processVariantCss(variantCss, conditions)
  }

  // Process style overrides, if any. This is useful for runtime overrides
  if (overrides) {
    manager.processOverridesCss(overrides, conditions)
  }

  return manager.compile()
}

/*************************************************************************************************
 * StyleManager Class Definition
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
  private prevDebugDict: Record<string, Record<string, string>> = {}
  private debugDict: Record<string, Record<string, string>> = {}
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
  private styleVarsDict: Record<string, string> = {}
  private styleVars: StyleObj = {}
  private prevStyle: StyleObj = {}
  private style: StyleObj = {}
  private styleCount = 0

  private conditions: Conditions
  private name = ""
  private variantName = ""
  private conditionName = ""
  private overridesName = ""

  constructor(conditions: Conditions, name?: string) {
    this.conditions = conditions
    this.setName(name)
  }

  private getDebugVar(className: string) {
    return `--${className}`
  }

  private get isDebugMode() {
    return !!this.conditions.debug
  }

  private get debugScope() {
    const scope: string[] = [this.name]
    if (this.variantName) scope.push(this.variantName)
    if (this.overridesName) scope.push(this.overridesName)
    if (this.conditionName) scope.push(this.conditionName)
    const scopeName = scope.join("_")
    const suffix = scopeName.length < 4 ? "-" : ""
    return this.getDebugVar(`${scopeName}${suffix}`)
  }

  private addDebugInfo(className: string, originalProp: string, originalValue?: string) {
    if (this.isDebugMode) {
      if (!this.debugDict[this.debugScope]) this.debugDict[this.debugScope] = {}
      const value = originalValue ? `: ${originalValue}` : ""
      this.debugDict[this.debugScope][className] = `${originalProp}${value}`
    }
  }

  private compileDebugInfo() {
    if (this.isDebugMode) {
      let hash = ""
      const debugDict = { ...this.debugDict, ...this.prevDebugDict }
      const scopes = Object.entries(debugDict)
      scopes.forEach(([scope, debugData]) => {
        hash += stringToHash(scope)
        this.style[scope] = "▼"
        const debugList = Object.entries(debugData)
        debugList.forEach(([debugClass, debugValue]) => {
          hash += stringToHash(debugClass + debugValue)
          this.styleCount++
          const debugKey = this.getDebugVar(`-${debugClass}`)
          this.style[debugKey] = debugValue
        })
      })
      // Returns a hashed key, to rerender when the debug info changes, but not when it doesn't
      return `${this.name}-${hash}`
    }
  }

  private setName(name?: string) {
    this.name = name ?? getStyleName()
  }

  setNewStyle(conditions: Conditions, name?: string) {
    if (this.isDebugMode) {
      // Make sure we sequence the debug info in the correct order
      this.prevStyle = this.style
      this.style = {}
      this.prevDebugDict = this.debugDict
      this.debugDict = {}
    }
    this.conditions = conditions
    this.setName(name)
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
    const hasParentConflict = parentPriority <= incomingPriority

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
      hasParentConflict,
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
    const { propId, existingData, incomingPriority, hasExistingConflict, hasParentConflict } = this.getBaseState(
      prop,
      inlineCondition,
      pseudoClass
    )

    // Lower-valued priorities take precedence, and cannot be overwritten
    if (hasExistingConflict || hasParentConflict) {
      return
    }

    const index = existingData?.[0] ?? this.classList.length

    // Make sure we keep the tracked priority up-to-date
    this.classDict[pseudoClass][propId] = [index, incomingPriority]

    if (existingData === undefined) {
      this.classList.push(className)
    } else {
      // Clear out old style that is getting overwritten, if need be
      const oldClass = this.classList[index]
      const oldStyleVar = this.styleVarsDict[oldClass]
      if (oldStyleVar) {
        delete this.styleVars[oldStyleVar]
        this.styleCount--
      }
      this.classList[index] = className
    }

    this.addDebugInfo(className, originalProp ?? prop, originalValue ?? value)

    if (varName && value) {
      this.styleCount++
      this.styleVarsDict[className] = varName
      this.styleVars[varName] = value
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
    const output: { className: string; styleManager: StyleManager; style: StyleObj; key?: string } = {
      className: outputClass,
      styleManager: this,
      style: {},
    }

    // Generate debug info
    output.key = this.compileDebugInfo()

    // Generate inline styles
    if (this.styleCount > 0) {
      if (this.isDebugMode) {
        const style = { ...this.style, ...this.prevStyle }
        output.style = { ...style }
        output.style["--Variables"] = "▼"
        Object.entries(this.styleVars).forEach(([key, value]) => (output.style[key] = value))
      } else {
        output.style = this.styleVars
      }
    }

    return output
  }

  // PROCESSING FUNCTIONS ///////////////////////////////////////////////////////////////////////////
  /** Process fully-nestable CSS, in an object keyed by variant name-value pairs */
  processOverridesCss(overridesCss: CSS, conditions: Conditions) {
    this.overridesName = "css"
    this.processCss(overridesCss, conditions)
    this.overridesName = ""
  }

  /** Process fully-nestable CSS, in an object keyed by variant name-value pairs */
  processVariantCss(variantCss: VariantCSS, conditions: Conditions) {
    variantCss.forEach(({ key, css }) => {
      this.variantName = key
      this.processCss(css, conditions)
    })
    this.variantName = ""
  }

  /** Process fully-nestable CSS, including conditions and pseudo-classes */
  processCss(css: CSS, conditions: Conditions, condition?: InlineConditionKey) {
    const props = Object.entries(css)
    // Loop through each prop of css
    const propsLen = props.length
    for (let index = 0; index < propsLen; index++) {
      const [propName, propValue] = props[index]
      // If the prop is a condition, process its inner props, including its inner pseudo-classes
      if (conditionsMap[propName as ConditionKey]) {
        // Register that this style set depends on this condition being watched
        this.watchCondition(propName as ConditionKey)
        // Skip if the condition is currently false
        if (!conditions[propName as ConditionKey]) continue
        // Otherwise, proceed
        this.conditionName = propName.replace("!", "not-")
        this.processCss(propValue as ConditionalCSS, conditions, propName as InlineConditionKey)
        this.conditionName = ""
      } else if (pseudoClasses[propName as PseudoClassKey]) {
        // If the prop is a pseudo-class, process its inner props
        this.processBaseCss(propValue as BaseCSS, propName as PseudoClassKey, conditions, condition)
      } else {
        // Else, process the prop's value
        this.processCssProp(propName as CssPropKey, propValue as InlineConditionValue, conditions, condition)
      }
    }
  }

  /** Process non-conditional CSS, including pseudo-classes */
  processBaseCss(baseCss: BaseCSS, pseudo: PseudoClassKey, conditions: Conditions, condition?: InlineConditionKey) {
    const props = Object.entries(baseCss)
    const propsLen = props.length
    for (let index = 0; index < propsLen; index++) {
      const [propName, propValue] = props[index]
      this.processCssProp(propName as CssPropKey, propValue as InlineConditionValue, conditions, condition, pseudo)
    }
  }

  /**
   * Process a single CSS prop + value, including mapped props (which may be spread into multiple props),
   * and inline-conditional values, which need to be processed based on current conditions.
   */
  processCssProp(
    prop: CssPropKey,
    value: InlineConditionValue,
    conditions: Conditions,
    condition?: InlineConditionKey,
    pseudo?: PseudoClassKey,
    originalProp?: CssPropKey
  ) {
    // Check first to see if we have an inline condition `object`!
    if (typeof value === "object") {
      // If inline conditions include a base value, process that first
      if (value[BASE] !== undefined) {
        this.processCssProp(prop, value[BASE], conditions, BASE, pseudo)
      }
      const conditionKeysLen = conditionKeys.length
      for (let index = 0; index < conditionKeysLen; index++) {
        const conditionKey = conditionKeys[index]
        const innerValue = value[conditionKey]
        if (innerValue !== undefined) {
          this.watchCondition(conditionKey)
          if (conditions[conditionKey] === true) {
            this.conditionName = conditionKey.replace("!", "not-")
            this.processCssProp(prop, innerValue, conditions, conditionKey as InlineConditionKey, pseudo)
            this.conditionName = ""
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
          this.processCssProp(propName as CssPropKey, propValue, conditions, condition, pseudo, prop)
        }
      } else {
        value = valueMappers[prop as keyof typeof valueMappers]?.(value) ?? value
        if (pseudo) {
          const pseudos =
            pseudo in pseudoClassAliases ? pseudoClassAliases[pseudo as keyof typeof pseudoClassAliases] : [pseudo]
          const pseudosLen = pseudos.length
          for (let index = 0; index < pseudosLen; index++) {
            const pseudoKey = pseudos[index]
            this.addStyle(prop, value as string, condition, pseudoKey, originalProp ?? prop)
          }
        } else {
          this.addStyle(prop, value, condition, undefined, originalProp ?? prop)
        }
      }
    }
  }

  /** Adds style to style manager */
  addStyle(
    prop: CssPropKey,
    value: string,
    condition?: InlineConditionKey,
    pseudo?: PseudoClassKey,
    originalProp?: CssPropKey
  ) {
    const output = this.getStyle(prop, value, pseudo)
    if (output) {
      this.add(prop, output.className, condition, pseudo ?? BASE, output.varName, output.value, originalProp, value)

      // If this is a combo class with multiple props, make sure we avoid conflicts
      if (output.props && output.props.length > 0) {
        output.props.forEach(([comboProp, comboValue]) => {
          // This won't actually override the combo prop, but will avoid conflicts
          this.add(
            comboProp as CssPropKey,
            output.className,
            condition,
            pseudo ?? BASE,
            output.varName,
            output.value,
            originalProp,
            value
          )
          this.addDebugInfo(`${output.className}__${comboProp}`, comboValue)
        })
      }
    }
  }

  /** Returns a style from our utility class system, based on a prop, value, and (optional) CSS pseudo-class */
  getStyle(prop: CssPropKey, value: string, pseudo: PseudoCategoryKey = BASE) {
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
      const mapProps = propScale.cssValueMapProps
      const props = mapProps[value as keyof typeof mapProps] as CssPropKey[]
      if (scaledValue) return { className: scaledValue, props }
    } else {
      // If value is scaled, but we ended up here, it could be filtered out of the scale (e.g., a non-core color)
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
}

/*************************************************************************************************
 * UTILS
 *************************************************************************************************/
/** Takes a nested (group-based) theme overrides object, and flattens it, without groupings */
function flattenOverrides(overrides?: ThemeOverrides) {
  return !overrides
    ? {}
    : (Object.values(overrides).reduce((output, rules) => {
        Object.entries(rules).forEach(([varName, value]) => {
          output[varName] = value
        })
        return output
      }, {} as any) as Record<string, string | number>)
}

let styleId = 0
function getStyleName() {
  styleId++
  return `style-${styleId}`
}

function stringToHash(source: string) {
  const length = source.length
  let hash = 0
  if (length > 0) {
    let index = 0
    for (index = 0; index < length; index++) {
      hash += source.charCodeAt(index)
    }
  }
  return hash
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
