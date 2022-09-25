import { omitKeys } from "./props.utils"
import {
  Scale,
  CssValueMap,
  Scales,
  outlineCombos,
  outlineColors,
  outlineOffsets,
  outlineWidths,
  borderColors,
  borderCombos,
  borderWidths,
  CssValue,
  animationCombos,
  animationDurations,
  colorCore,
  colorText,
  CssAliasMap,
} from "../scales"
import {
  CssPropKey,
  CssRule,
  CssValueClassMap,
  FilterKeys,
  KeysFromScale,
  PickKeys,
  SCALED_VALUE,
} from "./props.models"
import { addPrefix } from "../utils"

function filterMap<M extends CssValueMap, K extends Record<string, unknown>>(map: M, keys: K) {
  const output: PickKeys<M, typeof keys> = { ...map }
  Object.keys(map).forEach((key: keyof M) => {
    if (!keys[key as keyof typeof keys]) {
      delete output[key as keyof typeof output]
    }
  })
  return output
}

/** Util to extract the CSS value map from a scale object */
function map<
  S extends Scales,
  V extends Scale,
  K extends Record<string, unknown> = Record<keyof S[V]["cssValueMap"], unknown>
>(scales: S, scale: V, keys?: K) {
  const map = scales[scale].cssValueMap as S[V]["cssValueMap"]
  if (keys) {
    return filterMap(map, keys)
  }
  return map
}

/**
 * Used to generate CSS classes for various CSS props, based on scaled values.
 * Returns an object containing props with values matching a signature of:
 * `Record<ScaleKey, CssClassForThatKey>`
 */
export function generateScaledPropsCss<S extends Scales, K extends FilterKeys>(
  scales: S,
  generateClass: (value: CssRule) => string,
  keys?: K
) {
  function entries<M extends CssValueMap, A extends CssAliasMap = CssAliasMap>(prop: CssPropKey, map: M, aliasMap?: A) {
    return Object.entries(map).reduce(
      (output: Record<KeysFromScale<M>, string>, [scaleKey, scaleValue]: [keyof M, CssValue]) => {
        const value = typeof scaleValue === "string" ? { [prop]: scaleValue } : scaleValue

        const isFilteredKey = keys && !keys[prop]
        const isAliasKey = aliasMap?.[addPrefix(String(scaleKey))]
        const fallbackValue = isAliasKey ? SCALED_VALUE : ""
        const className = isFilteredKey || isAliasKey ? fallbackValue : generateClass(value)

        const key = addPrefix(String(scaleKey)) as KeysFromScale<M>
        output[key] = className

        return output
      },
      {} as CssValueClassMap<typeof map>
    )
  }

  const backgroundColor = entries("backgroundColor", map(scales, Scale.color, colorCore))

  const props = {
    inlineSize: entries("inlineSize", map(scales, Scale.size)),
    blockSize: entries("blockSize", map(scales, Scale.size)),
    minInlineSize: entries("minInlineSize", map(scales, Scale.size)),
    maxInlineSize: entries("maxInlineSize", map(scales, Scale.size)),
    minBlockSize: entries("minBlockSize", map(scales, Scale.size)),
    maxBlockSize: entries("maxBlockSize", map(scales, Scale.size)),

    marginBlockStart: entries("marginBlockStart", map(scales, Scale.space)),
    marginBlockEnd: entries("marginBlockEnd", map(scales, Scale.space)),
    marginInlineStart: entries("marginInlineStart", map(scales, Scale.space)),
    marginInlineEnd: entries("marginInlineEnd", map(scales, Scale.space)),

    paddingBlockStart: entries("paddingBlockStart", map(scales, Scale.space)),
    paddingBlockEnd: entries("paddingBlockEnd", map(scales, Scale.space)),
    paddingInlineStart: entries("paddingInlineStart", map(scales, Scale.space)),
    paddingInlineEnd: entries("paddingInlineEnd", map(scales, Scale.space)),

    insetBlockStart: entries("insetBlockStart", map(scales, Scale.space)),
    insetBlockEnd: entries("insetBlockEnd", map(scales, Scale.space)),
    insetInlineStart: entries("insetInlineStart", map(scales, Scale.space)),
    insetInlineEnd: entries("insetInlineEnd", map(scales, Scale.space)),

    outline: entries("outline", map(scales, Scale.outline, outlineCombos)),
    outlineWidth: entries("outlineWidth", map(scales, Scale.outline, outlineWidths)),
    outlineColor: entries("outlineColor", map(scales, Scale.outline, outlineColors)),
    outlineOffset: entries("outlineOffset", map(scales, Scale.outline, outlineOffsets)),

    borderBlockStart: entries("borderBlockStart", map(scales, Scale.border, borderCombos)),
    borderBlockEnd: entries("borderBlockEnd", map(scales, Scale.border, borderCombos)),
    borderInlineStart: entries("borderInlineStart", map(scales, Scale.border, borderCombos)),
    borderInlineEnd: entries("borderInlineEnd", map(scales, Scale.border, borderCombos)),

    borderBlockStartColor: entries("borderBlockStartColor", map(scales, Scale.border, borderColors)),
    borderBlockEndColor: entries("borderBlockEndColor", map(scales, Scale.border, borderColors)),
    borderInlineStartColor: entries("borderInlineStartColor", map(scales, Scale.border, borderColors)),
    borderInlineEndColor: entries("borderInlineEndColor", map(scales, Scale.border, borderColors)),

    borderBlockStartWidth: entries("borderBlockStartWidth", map(scales, Scale.border, borderWidths)),
    borderBlockEndWidth: entries("borderBlockEndWidth", map(scales, Scale.border, borderWidths)),
    borderInlineStartWidth: entries("borderInlineStartWidth", map(scales, Scale.border, borderWidths)),
    borderInlineEndWidth: entries("borderInlineEndWidth", map(scales, Scale.border, borderWidths)),

    flexBasis: entries("flexBasis", map(scales, Scale.size)),

    // gridTemplateRows is probably not useful enough. Instead, use...
    gridAutoRows: entries("gridAutoRows", map(scales, Scale.row)),
    gridTemplateColumns: entries("gridTemplateColumns", map(scales, Scale.column)),

    columnGap: entries("columnGap", map(scales, Scale.space)),
    rowGap: entries("rowGap", map(scales, Scale.space)),

    borderStartStartRadius: entries("borderStartStartRadius", map(scales, Scale.radius)),
    borderStartEndRadius: entries("borderStartEndRadius", map(scales, Scale.radius)),
    borderEndStartRadius: entries("borderEndStartRadius", map(scales, Scale.radius)),
    borderEndEndRadius: entries("borderEndEndRadius", map(scales, Scale.radius)),

    // Scaled color values from `background` get routed to this instead
    background: backgroundColor,
    backgroundColor,

    color: entries("color", map(scales, Scale.color, colorText)),
    fill: entries("fill", map(scales, Scale.color, colorCore)),
    stroke: entries("stroke", map(scales, Scale.color, colorCore)),

    font: entries("font", map(scales, Scale.font)),
    fontFamily: entries("fontFamily", map(scales, Scale.fontFamily)),
    fontSize: entries("fontSize", map(scales, Scale.fontSize)),
    fontWeight: entries("fontWeight", map(scales, Scale.fontWeight), scales[Scale.fontWeight].cssAliasMap),

    textDecoration: entries("textDecoration", map(scales, Scale.textDecoration)),

    lineHeight: entries("lineHeight", map(scales, Scale.lineHeight)),
    letterSpacing: entries("letterSpacing", map(scales, Scale.typeSpace)),
    wordSpacing: entries("wordSpacing", map(scales, Scale.typeSpace)),
    textUnderlineOffset: entries("textUnderlineOffset", map(scales, Scale.typeSpace)),

    zIndex: entries("zIndex", map(scales, Scale.zIndex)),

    boxShadow: entries("boxShadow", map(scales, Scale.shadow)),

    animation: entries("animation", map(scales, Scale.animation, animationCombos)),
    animationDuration: entries("animationDuration", map(scales, Scale.animation, animationDurations)),
  } as const

  if (keys) {
    return omitKeys(props, keys)
  }
  return props
}

export const scaledPropScale = {
  inlineSize: Scale.size,
  blockSize: Scale.size,
  minInlineSize: Scale.size,
  maxInlineSize: Scale.size,
  minBlockSize: Scale.size,
  maxBlockSize: Scale.size,

  marginBlockStart: Scale.space,
  marginBlockEnd: Scale.space,
  marginInlineStart: Scale.space,
  marginInlineEnd: Scale.space,

  paddingBlockStart: Scale.space,
  paddingBlockEnd: Scale.space,
  paddingInlineStart: Scale.space,
  paddingInlineEnd: Scale.space,

  insetBlockStart: Scale.space,
  insetBlockEnd: Scale.space,
  insetInlineStart: Scale.space,
  insetInlineEnd: Scale.space,

  outline: Scale.outline,
  outlineWidth: Scale.outline,
  outlineColor: Scale.outline,
  outlineOffset: Scale.outline,

  borderBlockStart: Scale.border,
  borderBlockEnd: Scale.border,
  borderInlineStart: Scale.border,
  borderInlineEnd: Scale.border,

  borderBlockStartColor: Scale.border,
  borderBlockEndColor: Scale.border,
  borderInlineStartColor: Scale.border,
  borderInlineEndColor: Scale.border,

  borderBlockStartWidth: Scale.border,
  borderBlockEndWidth: Scale.border,
  borderInlineStartWidth: Scale.border,
  borderInlineEndWidth: Scale.border,

  flexBasis: Scale.size,

  gridAutoRows: Scale.row,
  gridTemplateColumns: Scale.column,

  columnGap: Scale.space,
  rowGap: Scale.space,

  borderStartStartRadius: Scale.radius,
  borderStartEndRadius: Scale.radius,
  borderEndStartRadius: Scale.radius,
  borderEndEndRadius: Scale.radius,

  background: Scale.color,
  backgroundColor: Scale.color,

  color: Scale.color,
  fill: Scale.color,
  stroke: Scale.color,

  font: Scale.font,
  fontFamily: Scale.fontFamily,
  fontSize: Scale.fontSize,
  fontWeight: Scale.fontWeight,

  textDecoration: Scale.textDecoration,

  lineHeight: Scale.lineHeight,
  letterSpacing: Scale.typeSpace,
  wordSpacing: Scale.typeSpace,
  textUnderlineOffset: Scale.typeSpace,

  zIndex: Scale.zIndex,

  boxShadow: Scale.shadow,

  animation: Scale.animation,
  animationDuration: Scale.animation,
} as const
