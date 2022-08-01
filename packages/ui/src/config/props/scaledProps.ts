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
} from "../scales"
import { CssClassDef, CssPropKey } from "./props.models"
import { CharHash } from "../utils"

type MapRule<M extends CssValueMap> = Record<keyof M, CssClassDef>

function filterMap<T extends CssValueMap>(map: T, keys: Record<keyof T, boolean>) {
  const output: Pick<T, keyof typeof keys> = { ...map }
  Object.keys(map).forEach((key: keyof T) => {
    if (!keys[key]) {
      delete output[key]
    }
  })
  return output
}

function map<S extends Scales, V extends Scale>(scales: S, scale: V, keys?: Record<string, boolean>) {
  const map = scales[scale].cssValueMap as S[V]["cssValueMap"]
  if (keys) {
    return filterMap(map, keys as Record<keyof typeof map, boolean>)
  }
  return map
}

function getReducer<M extends CssValueMap>(prop: CssPropKey, hash: CharHash) {
  return (output: Record<keyof M, CssClassDef>, [scaleKey, scaleValue]: [keyof M, CssValue]) => {
    const value = typeof scaleValue === "string" ? { [prop]: scaleValue } : scaleValue
    output[scaleKey] = { [hash.name]: value }
    return output
  }
}

function entries<M extends CssValueMap>(prop: CssPropKey, map: M, hash: CharHash) {
  return Object.entries(map).reduce(getReducer<typeof map>(prop, hash), {} as MapRule<typeof map>)
}

/** Props that use predefined scales */
export const scaledProps = {
  outline: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("outline", map(scales, Scale.outline, outlineCombos), hash),
  outlineWidth: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("outlineWidth", map(scales, Scale.outline, outlineWidths), hash),
  outlineColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("outlineColor", map(scales, Scale.outline, outlineColors), hash),
  outlineOffset: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("outlineOffset", map(scales, Scale.outline, outlineOffsets), hash),

  borderBlockStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderBlockStart", map(scales, Scale.border, borderCombos), hash),
  borderBlockEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderBlockEnd", map(scales, Scale.border, borderCombos), hash),
  borderInlineStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderInlineStart", map(scales, Scale.border, borderCombos), hash),
  borderInlineEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderInlineEnd", map(scales, Scale.border, borderCombos), hash),

  borderBlockStartColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderBlockStartColor", map(scales, Scale.border, borderColors), hash),
  borderBlockEndColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderBlockEndColor", map(scales, Scale.border, borderColors), hash),
  borderInlineStartColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderInlineStartColor", map(scales, Scale.border, borderColors), hash),
  borderInlineEndColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderInlineEndColor", map(scales, Scale.border, borderColors), hash),

  borderBlockStartWidth: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderBlockStartWidth", map(scales, Scale.border, borderWidths), hash),
  borderBlockEndWidth: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderBlockEndWidth", map(scales, Scale.border, borderWidths), hash),
  borderInlineStartWidth: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderInlineStartWidth", map(scales, Scale.border, borderWidths), hash),
  borderInlineEndWidth: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderInlineEndWidth", map(scales, Scale.border, borderWidths), hash),

  flexBasis: <S extends Scales>(scales: S, hash: CharHash) => entries("flexBasis", map(scales, Scale.size), hash),

  inlineSize: <S extends Scales>(scales: S, hash: CharHash) => entries("inlineSize", map(scales, Scale.size), hash),
  minInlineSize: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("minInlineSize", map(scales, Scale.size), hash),
  maxInlineSize: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("maxInlineSize", map(scales, Scale.size), hash),
  blockSize: <S extends Scales>(scales: S, hash: CharHash) => entries("blockSize", map(scales, Scale.size), hash),
  minBlockSize: <S extends Scales>(scales: S, hash: CharHash) => entries("minBlockSize", map(scales, Scale.size), hash),
  maxBlockSize: <S extends Scales>(scales: S, hash: CharHash) => entries("maxBlockSize", map(scales, Scale.size), hash),

  // gridTemplateRows is probably not useful enough. Instead, use...
  gridAutoRows: <S extends Scales>(scales: S, hash: CharHash) => entries("gridAutoRows", map(scales, Scale.row), hash),
  gridTemplateColumns: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("gridTemplateColumns", map(scales, Scale.column), hash),

  columnGap: <S extends Scales>(scales: S, hash: CharHash) => entries("columnGap", map(scales, Scale.space), hash),
  rowGap: <S extends Scales>(scales: S, hash: CharHash) => entries("rowGap", map(scales, Scale.space), hash),

  marginBlockStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("marginBlockStart", map(scales, Scale.space), hash),
  marginBlockEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("marginBlockEnd", map(scales, Scale.space), hash),
  marginInlineStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("marginInlineStart", map(scales, Scale.space), hash),
  marginInlineEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("marginInlineEnd", map(scales, Scale.space), hash),

  paddingBlockStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("paddingBlockStart", map(scales, Scale.space), hash),
  paddingBlockEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("paddingBlockEnd", map(scales, Scale.space), hash),
  paddingInlineStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("paddingInlineStart", map(scales, Scale.space), hash),
  paddingInlineEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("paddingInlineEnd", map(scales, Scale.space), hash),

  insetBlockStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("insetBlockStart", map(scales, Scale.space), hash),
  insetBlockEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("insetBlockEnd", map(scales, Scale.space), hash),
  insetInlineStart: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("insetInlineStart", map(scales, Scale.space), hash),
  insetInlineEnd: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("insetInlineEnd", map(scales, Scale.space), hash),

  borderStartStartRadius: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderStartStartRadius", map(scales, Scale.radius), hash),
  borderStartEndRadius: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderStartEndRadius", map(scales, Scale.radius), hash),
  borderEndStartRadius: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderEndStartRadius", map(scales, Scale.radius), hash),
  borderEndEndRadius: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("borderEndEndRadius", map(scales, Scale.radius), hash),

  // Scaled color values from `background` get routed to this instead
  backgroundColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("backgroundColor", map(scales, Scale.color, colorCore), hash),

  color: <S extends Scales>(scales: S, hash: CharHash) => entries("color", map(scales, Scale.color, colorCore), hash),
  fill: <S extends Scales>(scales: S, hash: CharHash) => entries("fill", map(scales, Scale.color, colorCore), hash),
  stroke: <S extends Scales>(scales: S, hash: CharHash) => entries("stroke", map(scales, Scale.color, colorCore), hash),

  caretColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("caretColor", map(scales, Scale.color, colorCore), hash),
  columnRuleColor: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("columnRuleColor", map(scales, Scale.color, colorCore), hash),

  font: <S extends Scales>(scales: S, hash: CharHash) => entries("font", map(scales, Scale.font), hash),
  fontFamily: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("fontFamily", map(scales, Scale.fontFamily), hash),
  fontSize: <S extends Scales>(scales: S, hash: CharHash) => entries("fontSize", map(scales, Scale.fontSize), hash),
  fontWeight: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("fontWeight", map(scales, Scale.fontWeight), hash),

  textDecoration: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("textDecoration", map(scales, Scale.textDecoration), hash),

  lineHeight: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("lineHeight", map(scales, Scale.lineHeight), hash),
  letterSpacing: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("letterSpacing", map(scales, Scale.typeSpace), hash),
  wordSpacing: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("wordSpacing", map(scales, Scale.typeSpace), hash),
  textUnderlineOffset: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("textUnderlineOffset", map(scales, Scale.typeSpace), hash),

  zIndex: <S extends Scales>(scales: S, hash: CharHash) => entries("zIndex", map(scales, Scale.zIndex), hash),

  boxShadow: <S extends Scales>(scales: S, hash: CharHash) => entries("boxShadow", map(scales, Scale.shadow), hash),

  animation: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("animation", map(scales, Scale.animation, animationCombos), hash),
  animationDuration: <S extends Scales>(scales: S, hash: CharHash) =>
    entries("animationDuration", map(scales, Scale.animation, animationDurations), hash),
} as const
