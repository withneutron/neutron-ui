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
} from "../scales"
import { CssPropKey, CssRule, KeysFromScale } from "./props.models"

type CssValueClassMap<M extends CssValueMap> = Record<KeysFromScale<M>, string>

function filterMap<T extends CssValueMap>(map: T, keys: Record<keyof T, unknown>) {
  const output: Pick<T, keyof typeof keys> = { ...map }
  Object.keys(map).forEach((key: keyof T) => {
    if (!keys[key]) {
      delete output[key]
    }
  })
  return output
}

/** Util to extract the CSS value map from a scale object */
function map<S extends Scales, V extends Scale>(scales: S, scale: V, keys?: Record<string, unknown>) {
  const map = scales[scale].cssValueMap as S[V]["cssValueMap"]
  if (keys) {
    return filterMap(map, keys as Record<keyof typeof map, unknown>)
  }
  return map
}

/**
 * Used to generate CSS classes for various CSS props, based on scaled values.
 * Returns an object containing props with values matching
 * a Record<ScaleKey, CssClassForThatKey> signature.
 */
export function generateScaledPropsCss<S extends Scales, K extends Partial<Record<CssPropKey, unknown>>>(
  scales: S,
  generateClass: (value: CssRule) => string,
  keys?: K
) {
  function entries<M extends CssValueMap>(prop: CssPropKey, map: M) {
    return Object.entries(map).reduce(
      (output: Record<KeysFromScale<M>, string>, [scaleKey, scaleValue]: [keyof M, CssValue]) => {
        const value = typeof scaleValue === "string" ? { [prop]: scaleValue } : scaleValue
        const className = generateClass(value)
        const key = `$${scaleKey}` as KeysFromScale<M>
        output[key] = className
        return output
      },
      {} as CssValueClassMap<typeof map>
    )
  }

  const props = {
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

    inlineSize: entries("inlineSize", map(scales, Scale.size)),
    minInlineSize: entries("minInlineSize", map(scales, Scale.size)),
    maxInlineSize: entries("maxInlineSize", map(scales, Scale.size)),
    blockSize: entries("blockSize", map(scales, Scale.size)),
    minBlockSize: entries("minBlockSize", map(scales, Scale.size)),
    maxBlockSize: entries("maxBlockSize", map(scales, Scale.size)),

    // gridTemplateRows is probably not useful enough. Instead, use...
    gridAutoRows: entries("gridAutoRows", map(scales, Scale.row)),
    gridTemplateColumns: entries("gridTemplateColumns", map(scales, Scale.column)),

    columnGap: entries("columnGap", map(scales, Scale.space)),
    rowGap: entries("rowGap", map(scales, Scale.space)),

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

    borderStartStartRadius: entries("borderStartStartRadius", map(scales, Scale.radius)),
    borderStartEndRadius: entries("borderStartEndRadius", map(scales, Scale.radius)),
    borderEndStartRadius: entries("borderEndStartRadius", map(scales, Scale.radius)),
    borderEndEndRadius: entries("borderEndEndRadius", map(scales, Scale.radius)),

    // Scaled color values from `background` get routed to this instead
    backgroundColor: entries("backgroundColor", map(scales, Scale.color, colorCore)),

    color: entries("color", map(scales, Scale.color, colorText)),
    fill: entries("fill", map(scales, Scale.color, colorCore)),
    stroke: entries("stroke", map(scales, Scale.color, colorCore)),

    caretColor: entries("caretColor", map(scales, Scale.color, colorText)),
    columnRuleColor: entries("columnRuleColor", map(scales, Scale.color, colorCore)),

    font: entries("font", map(scales, Scale.font)),
    fontFamily: entries("fontFamily", map(scales, Scale.fontFamily)),
    fontSize: entries("fontSize", map(scales, Scale.fontSize)),
    fontWeight: entries("fontWeight", map(scales, Scale.fontWeight)),

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
    Object.keys(props).forEach(prop => {
      if (!keys[prop as CssPropKey]) {
        delete props[prop as keyof typeof props]
      }
    })
    type PickKeys = Extract<keyof typeof props, keyof typeof keys>
    return props as Pick<typeof props, PickKeys>
  }
  return props
}
