import {
  CssPropKey,
  mappedProps,
  valueMappers,
  combinedPseudoClasses,
  scaledPropScale,
  pseudoClassAliases,
  CustomVarPropValue,
  sourcePropsIdMap,
  SCALED_PLACEHOLDER,
  pseudoClasses,
  NthChildKeys,
  nthChildCheckers,
  isCustomNthChild,
  getIndexErrorMessage,
  directionalProps,
  complexShorthandMappedProps,
  ComplexShorthandProp,
} from "./props"
import {
  token,
  CSS,
  BaseCSS,
  customVarPropMap,
  scaledPropMap,
  staticPropMap,
  scales,
  tokenToVarMap,
} from "./styles.css"
import { ConditionKey, BASE, InlineConditionValue, InlineConditionKey, VariantCSS } from "./styles.models"
import { conditionKeys, conditionsMap, ConditionCategories, ConditionCategory } from "./conditions"
import { CssAlias, SCALED_ALIAS } from "./scales/scales.models"
import { mapAliasToValue } from "./scales"
import { THEME_PREFIX } from "./utils"

/*************************************************************************************************
 * StyleManager Class Definition
 *************************************************************************************************/
/** Class to manage tracking, updating, and compilation of styles */
export class StyleManager {
  private watchCategories: { [k in ConditionCategory]: boolean } = {
    [ConditionCategory.locale]: false,
    [ConditionCategory.responsive]: false,
    [ConditionCategory.preference]: false,
    [ConditionCategory.device]: false,
    [ConditionCategory.colorMode]: false,
    // We always set this to true, to make sure changes in debug mode are applied
    [ConditionCategory.debug]: true,
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
  private parentClassDicts: ClassDict[] = []
  private styleVarsDict: Record<string, string> = {}
  private styleVars: StyleObj = {}
  private prevStyle: StyleObj = {}
  private style: StyleObj = {}
  private styleCount = 0

  private conditions: Conditions
  private name = ""
  private baseClassName = ""
  private variantName = ""
  private conditionName = ""
  private pseudoClassName = ""
  private overridesName = ""

  private index: number | undefined
  private length: number | undefined

  constructor(conditions: Conditions, name?: string, props?: StyleMangerProps) {
    const { className, index, length } = props ?? {}
    this.conditions = conditions
    this.setName(name)
    this.baseClassName = className ? `${className} ` : ""
    this.index = index
    this.length = length
  }

  private getDebugVarKey(className: string) {
    return `--${className}`
  }

  private getDebugClassVarKey(className: string) {
    return this.getDebugVarKey(`-${className}`)
  }

  private get isDebugMode() {
    return !!this.conditions.debug
  }

  private get debugScope() {
    const scope: string[] = [this.name]
    if (this.variantName) scope.push(this.variantName)
    if (this.overridesName) scope.push(this.overridesName)
    if (this.conditionName) scope.push(this.conditionName)
    if (this.pseudoClassName) scope.push(this.pseudoClassName)
    const scopeName = scope.join("_")
    const suffix = scopeName.length < 4 ? "-" : ""
    return this.getDebugVarKey(`${scopeName}${suffix}`)
  }

  private addDebugInfo(className: string, originalProp: string, originalValue?: string) {
    if (this.isDebugMode) {
      if (!this.debugDict[this.debugScope]) this.debugDict[this.debugScope] = {}
      const value = originalValue ? `: ${originalValue}` : ""
      this.debugDict[this.debugScope][className] = `${originalProp}${value}`
    }
  }

  private removeDebugClass(className: string) {
    if (this.isDebugMode) {
      delete this.prevStyle[this.getDebugClassVarKey(className)]
    }
  }

  private compileDebugInfo() {
    if (this.isDebugMode) {
      let hash = ""
      const debugDict = { ...this.debugDict, ...this.prevDebugDict }
      const scopes = Object.entries(debugDict)
      scopes.forEach(([scope, debugData]) => {
        hash += stringToHash(scope)
        this.style[scope] = DEBUG_GROUP_VALUE
        const debugList = Object.entries(debugData)
        debugList.forEach(([debugClass, debugValue]) => {
          hash += stringToHash(debugClass + debugValue)
          this.styleCount++
          const debugKey = this.getDebugClassVarKey(debugClass)
          if (this.style[debugKey]) {
            delete this.style[debugKey]
          }
          this.style[debugKey] = debugValue
        })
      })
      this.removeEmptyDebugGroups()
      // Returns a hashed key, to rerender when the debug info changes, but not when it doesn't
      return `${this.name}-${hash}`
    }
  }

  private removeEmptyDebugGroups() {
    const entries = Object.entries(this.style)
    const len = 0
    let index = entries.length
    for (; index >= len; index--) {
      const [prevKey, prevValue] = entries[index - 1] ?? []
      const [, value] = entries[index] ?? []
      if (prevValue === DEBUG_GROUP_VALUE && (!value || value === DEBUG_GROUP_VALUE)) {
        delete this.style[prevKey]
      }
    }
  }

  private setName(name?: string) {
    this.name = name ?? getStyleName()
  }

  private setVariantName(name?: string) {
    this.variantName = name ? `V_${name}` : ""
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

  private getPropId(prop: CssPropKey) {
    const propId = sourcePropsIdMap[prop as keyof typeof sourcePropsIdMap]
    if (propId === undefined) {
      throw new Error(`Invalid prop "${prop}" passed into '${sourcePropsIdMap}'`)
    }
    return propId
  }

  private getScaledProps<V extends string>(prop: CssPropKey, value: V, pseudo: PseudoCategoryKey = BASE) {
    const scaledMap = scaledPropMap[pseudo as keyof typeof scaledPropMap]
    const scaledProp = scaledMap ? scaledMap[prop as keyof typeof scaledMap] : undefined
    const scaleKey = scaledPropScale[prop as ScaledKey]
    const propScale = scales[scaleKey]
    const scaledValue: string | undefined =
      scaledProp && value in scaledProp ? scaledProp[value as keyof typeof scaledProp] : undefined
    return {
      scaledProp,
      scaleKey,
      propScale,
      scaledValue,
    }
  }

  /** Returns an object with boolean values for whether this manager is watching each condition */
  getWatchedConditions() {
    return this.watchCategories
  }

  setWatchedCondition(condition: InlineConditionKey) {
    const category = ConditionCategories[condition as ConditionKey]
    if (category) {
      this.watchCategories[category] = true
    }
  }

  /** Add a style to the style set */
  private add(
    prop: CssPropKey,
    className: string,
    pseudoClass: PseudoCategoryKey = BASE,
    varName?: string,
    value?: string,
    originalProp?: CssPropKey,
    originalValue?: string
  ) {
    const propId = this.getPropId(prop)

    // If the parent already has this style, don't override it.
    const hasParentConflict = this.parentClassDicts.some(p => p[pseudoClass][propId] !== undefined)

    // Lower-valued priorities take precedence, and cannot be overwritten
    if (hasParentConflict) return

    const index = this.classDict[pseudoClass][propId] ?? this.classList.length

    // Skip it if a complex shorthand is overriding this specific prop
    if (index === -1) return

    if (this.classDict[pseudoClass][propId] === undefined) {
      this.classList.push(className)
    } else {
      // Clear out old style that is getting overwritten, if need be
      const oldClassName = this.classList[index]
      if (oldClassName) {
        this.removeDebugClass(oldClassName)
      }
      const oldStyleVar = this.styleVarsDict[oldClassName]
      if (oldStyleVar) {
        delete this.styleVars[oldStyleVar]
        this.styleCount--
      }
      this.classList[index] = className
    }

    // Make sure we keep the tracked priority up-to-date
    this.classDict[pseudoClass][propId] = index

    this.addDebugInfo(className, originalProp ?? prop, originalValue ?? value)

    if (varName && value) {
      this.styleCount++
      this.styleVarsDict[className] = varName
      this.styleVars[varName] = value
    }
  }

  compile() {
    // Any further usage of this class will be for nested composition
    this.parentClassDicts.push({
      [BASE]: { ...this.classDict[BASE] },
      ":focus-visible": { ...this.classDict[":focus-visible"] },
      ":hover": { ...this.classDict[":hover"] },
      ":active": { ...this.classDict[":active"] },
    })

    // Compile our data into an output object
    const outputClass = this.classList.join(" ")
    const className = `${this.baseClassName}${outputClass}`
    const output: { className?: string; styleManager: StyleManager; style: StyleObj; key?: string } = {
      className: className ? className : undefined,
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
  processOverridesCss(overridesCss: CSS) {
    this.overridesName = "css"
    this.processCss(overridesCss)
    this.overridesName = ""
  }

  /** Process fully-nestable CSS, in an object keyed by variant name-value pairs */
  processVariantCss(variantCss: VariantCSS) {
    variantCss.forEach(({ key, css }) => {
      this.setVariantName(key)
      this.processCss(css)
    })
    this.setVariantName()
  }

  /** Process fully-nestable CSS, including conditions and pseudo-classes */
  processCss(css: CSS, condition?: InlineConditionKey) {
    const props = Object.entries(css)
    // Loop through each prop of css
    let index = 0
    for (; index < props.length; index++) {
      const [propName, propValue] = props[index]

      // If the prop is a condition, process its inner props, including its inner pseudo-classes
      if (conditionsMap[propName as ConditionKey]) {
        // Register that this style set depends on this condition being watched
        this.setWatchedCondition(propName as ConditionKey)
        // Skip if the condition is currently false
        if (!this.conditions[propName as ConditionKey]) continue
        // Otherwise, proceed
        this.conditionName = propName.replace("!", "not-")
        this.processCss(propValue as CSS, propName as InlineConditionKey)
        this.conditionName = ""
        continue
      }

      // If the prop is a pseudo-class, process its inner props
      if (combinedPseudoClasses[propName as CombinedPseudoClassKey]) {
        this.processBaseCss(propValue as BaseCSS, propName as CombinedPseudoClassKey, condition)
        continue
      }

      // If the prop is an nth-child pseudo selector, process its inner props
      if (nthChildCheckers[propName as NthChildKeys] || isCustomNthChild(propName as NthChildKeys)) {
        const checker = nthChildCheckers[propName as NthChildKeys] || nthChildCheckers[BASE]
        if (this.index === undefined) {
          console.error(getIndexErrorMessage(propName as NthChildKeys))
          continue
        }
        const isMatchingNthChild = checker(this.index, propName as NthChildKeys, this.length)
        if (isMatchingNthChild) {
          this.processCss(propValue as CSS)
        }
        continue
      }

      // Otherwise, process the prop's value
      this.processCssProp(propName as CssPropKey, propValue as InlineConditionValue, condition)
    }
  }

  /** Process non-conditional CSS, including pseudo-classes */
  processBaseCss(baseCss: BaseCSS, pseudo: CombinedPseudoClassKey, condition?: InlineConditionKey) {
    const props = Object.entries(baseCss)
    let index = 0
    for (; index < props.length; index++) {
      const [propName, propValue] = props[index]
      this.processCssProp(propName as CssPropKey, propValue as InlineConditionValue, condition, pseudo)
    }
  }

  /**
   * Process a single CSS prop + value, including mapped props (which may be spread into multiple props),
   * and inline-conditional values, which need to be processed based on current conditions.
   */
  processCssProp(
    prop: CssPropKey,
    value: InlineConditionValue,
    condition?: InlineConditionKey,
    pseudo?: CombinedPseudoClassKey,
    originalProp?: CssPropKey
  ) {
    let index = 0

    // Check first to see if we have an inline condition `object`!
    if (typeof value === "object") {
      // If inline conditions include a base value, process that first
      if (value[BASE] !== undefined) {
        this.processCssProp(prop, value[BASE] as InlineConditionValue, BASE, pseudo)
      }
      index = 0
      for (; index < conditionKeys.length; index++) {
        const conditionKey = conditionKeys[index]
        const innerValue = value[conditionKey]
        if (innerValue !== undefined) {
          this.setWatchedCondition(conditionKey)
          if (this.conditions[conditionKey] === true) {
            this.conditionName = conditionKey.replace("!", "not-")
            this.processCssProp(prop, innerValue as InlineConditionValue, conditionKey as InlineConditionKey, pseudo)
            this.conditionName = ""
          }
        }
      }
      return
    }

    let scaledOriginalProp: CssPropKey | undefined

    if (originalProp) {
      const { propScale } = this.getScaledProps(originalProp, value, pseudo as PseudoCategoryKey)
      if (propScale?.aliasMap) {
        const scaledValue = mapAliasToValue(propScale.aliasMap, prop, value)
        if (scaledValue) {
          value = scaledValue
          scaledOriginalProp = prop
        }
      }
    }

    const directionalMapper =
      prop in directionalProps ? directionalProps[prop as keyof typeof directionalProps] : undefined
    // If it's a directional prop, run its mapping func, and proceed with the result of that
    if (directionalMapper) {
      value = directionalMapper(value, !!this.conditions.rtl)
    }

    const complexShorthandMap = complexShorthandMappedProps[prop as ComplexShorthandProp]
    let isPreGenValue = this.isPreGenValue(prop, value)
    let hasCustomComplexShorthandValue = !isPreGenValue && !!complexShorthandMap

    // If it's a mapped prop, run its mapping func, and proceed with the result of that
    const mapper = prop in mappedProps ? mappedProps[prop as keyof typeof mappedProps] : undefined
    if (mapper) {
      const innerProps = Object.entries(mapper(value))
      index = 0
      for (; index < innerProps.length; index++) {
        const [propName, propValue] = innerProps[index] as [CssPropKey, string]

        // Check if this is a pre-generated value
        isPreGenValue = this.isPreGenValue(propName, propValue)

        // Only remap if this is a pre-generated value, or it's not a complex shorthand prop!
        if (isPreGenValue || !complexShorthandMap) {
          this.processCssProp(propName, propValue, condition, pseudo, scaledOriginalProp ?? originalProp ?? prop)
        } else {
          hasCustomComplexShorthandValue = true
        }
      }
      if (!hasCustomComplexShorthandValue) {
        return
      }
    }

    // If there are any special mappers for this value, apply them now
    value = valueMappers[prop as keyof typeof valueMappers]?.(value) ?? value

    if (pseudo) {
      const pseudos =
        pseudo in pseudoClassAliases ? pseudoClassAliases[pseudo as keyof typeof pseudoClassAliases] : [pseudo]
      index = 0
      for (; index < pseudos.length; index++) {
        const pseudoKey = pseudos[index] as PseudoClassKey

        // Process complex shorthands that have custom values
        if (complexShorthandMap && hasCustomComplexShorthandValue) {
          this.removeComplexShorthandStyles(complexShorthandMap, pseudoKey)
        }

        this.pseudoClassName = StyleManager.sanitizePseudoKey(pseudoKey)
        this.addStyle(prop, value as string, pseudoKey, originalProp ?? prop)
        this.pseudoClassName = ""
      }
      return
    }

    // Process complex shorthands that have custom values
    if (complexShorthandMap && hasCustomComplexShorthandValue) {
      this.removeComplexShorthandStyles(complexShorthandMap)
    }

    this.addStyle(prop, value, undefined, originalProp ?? prop)
  }

  private isPreGenValue(prop: CssPropKey, value: InlineConditionValue) {
    // All theme tokens should be treated as pre-gen
    if (typeof value !== "string" || value[0] === THEME_PREFIX) return true

    const staticValue = this.getStaticValue(prop, value)
    const { scaledValue } = this.getScaledProps(prop, value)
    return !!staticValue || !!scaledValue
  }

  private removeComplexShorthandStyles(complexShorthandMap: CssPropKey[], pseudo?: PseudoClassKey) {
    let index = 0
    for (; index < complexShorthandMap.length; index++) {
      const propName = complexShorthandMap[index]
      this.removeStyle(propName, pseudo)
    }
  }

  /** Remove style from style manager */
  private removeStyle(prop: CssPropKey, pseudo: PseudoCategoryKey = BASE) {
    const propId = this.getPropId(prop)
    this.classList.splice(this.classDict[pseudo][propId], 1)
    this.classDict[pseudo][propId] = -1
  }

  /** Adds style to style manager */
  private addStyle(
    prop: CssPropKey,
    originalValue: string,
    pseudo: PseudoCategoryKey = BASE,
    originalProp?: CssPropKey
  ) {
    const result = this.getStyle(prop, originalValue, pseudo)
    if (result) {
      this.add(prop, result.className, pseudo, result.varName, result.value, originalProp, originalValue)

      // If this is a combo class with multiple props, make sure we avoid conflicts
      if (result.props && result.props.length > 0) {
        result.props.forEach(resultProp => {
          const [comboProp, comboValue] = resultProp
          // This won't actually override the combo prop, but will avoid conflicts
          this.add(
            comboProp as CssPropKey,
            result.className,
            pseudo ?? BASE,
            result.varName,
            result.value,
            originalProp,
            value
          )
          this.addDebugInfo(`${result.className}__${comboProp}`, comboValue)
        })
      }
    }
  }

  private getStaticValue(prop: CssPropKey, value: string, pseudo: PseudoCategoryKey = BASE) {
    const staticMap = staticPropMap[pseudo as keyof typeof staticPropMap]
    const staticProp = staticMap[prop as keyof typeof staticMap]
    const staticValue = staticProp && value in staticProp ? staticProp[value as keyof typeof staticProp] : undefined
    return staticValue
  }

  /** Returns a style from our utility class system, based on a prop, value, and (optional) CSS pseudo-class */
  private getStyle(prop: CssPropKey, value: string, pseudo: PseudoCategoryKey = BASE) {
    const staticValue = this.getStaticValue(prop, value, pseudo)
    // eslint-disable-next-line prefer-const
    let { scaledProp, scaleKey, propScale, scaledValue } = this.getScaledProps(prop, value, pseudo)

    if (staticValue) {
      return { className: staticValue }
    }

    if (scaledValue) {
      // Check to see if this value is an alias
      if (scaledValue === SCALED_PLACEHOLDER) {
        const propAliasMap = propScale.cssAliasMap
        type AliasKey = keyof typeof propAliasMap
        let aliasValue = propAliasMap ? (propAliasMap[value as AliasKey] as CssAlias) : undefined
        if (aliasValue) {
          if (aliasValue === SCALED_ALIAS && propScale.aliasMap) {
            aliasValue = (mapAliasToValue(propScale.aliasMap, prop, value) ?? "") as CssAlias
          }
          scaledValue =
            scaledProp && aliasValue in scaledProp ? scaledProp[aliasValue as keyof typeof scaledProp] : undefined
        }
      }
      const mapProps = propScale.cssValueMapProps
      const props = mapProps[value as keyof typeof mapProps] as CssPropKey[]
      return scaledValue ? { className: scaledValue, props } : undefined
    }

    // If value is scaled, but we ended up here, it could be filtered out of the scale (e.g., a non-core color)
    if (propScale?.themeProps[value as keyof typeof propScale.themeProps]) {
      const tokenMap = tokenToVarMap[scaleKey]
      let varFromToken = tokenMap[value as keyof typeof tokenMap]
      if (varFromToken) {
        if (varFromToken === SCALED_ALIAS && propScale.aliasMap) {
          const aliasValue = mapAliasToValue(propScale.aliasMap, prop, value)
          varFromToken = tokenMap[aliasValue as keyof typeof tokenMap]
        }
        if (varFromToken) {
          value = `var(${varFromToken})`
        }
      }
    }
    // Get both the className and varName needed to set a custom value, if possible for this prop
    const customVarMap = customVarPropMap[pseudo as keyof typeof customVarPropMap]
    const customVarProp =
      prop in customVarMap ? (customVarMap[prop as keyof typeof customVarMap] as CustomVarPropValue) : undefined
    const { className, varName } = customVarProp ?? {}
    return className && varName ? { className, varName, value } : undefined
  }

  static sanitizePseudoKey(key: CombinedPseudoClassKey) {
    return key.replaceAll(":", "")
  }
}

/*************************************************************************************************
 * UTILS
 *************************************************************************************************/
const DEBUG_GROUP_VALUE = "▼"

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
type PseudoClassKey = keyof typeof pseudoClasses
type CombinedPseudoClassKey = keyof typeof combinedPseudoClasses
type PseudoCategoryKey = PseudoClassKey | typeof BASE
type ScaledKey = keyof typeof scaledPropMap[typeof BASE]

type ClassDict = { [p in PseudoCategoryKey]: { [c: number]: number } }

type Token = typeof token

export type ThemeOverrides = {
  [key in keyof Token]?: {
    [innerKey in keyof Token[key]]?: string
  }
}

type StyleObj = Record<string, string>

export type Conditions = Partial<Record<ConditionKey, boolean>>

export type StyleMangerProps = {
  className?: string
  index?: number
  length?: number
}
