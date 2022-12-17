import { NotShared, Shared } from "../../shared/models"
import { OverrideScaledProp } from "../styles.css"
import { CssPropKey } from "./props.models"

type PropValue = string | number

/** Map CSS value to one or more keys */
function mapValue<V extends PropValue, K extends CssPropKey>(value: V, keys: K[]) {
  return keys.reduce((output, key) => {
    output[key] = value
    return output
  }, {} as Record<K, V>)
}

/** Maps a value to one or more CSS props */
function getPropMapper<K extends CssPropKey>(...keys: K[]) {
  return <V extends PropValue>(value: V) => mapValue(value, keys)
}

export const mappedProps = {
  // UTILS
  p: getPropMapper("paddingBlockStart", "paddingBlockEnd", "paddingInlineStart", "paddingInlineEnd"),
  pt: getPropMapper("paddingBlockStart"),
  pr: getPropMapper("paddingInlineEnd"),
  pb: getPropMapper("paddingBlockEnd"),
  pl: getPropMapper("paddingInlineStart"),
  px: getPropMapper("paddingInlineStart", "paddingInlineEnd"),
  paddingX: getPropMapper("paddingInlineStart", "paddingInlineEnd"),
  py: getPropMapper("paddingBlockStart", "paddingBlockEnd"),
  paddingY: getPropMapper("paddingBlockStart", "paddingBlockEnd"),

  m: getPropMapper("marginBlockStart", "marginBlockEnd", "marginInlineStart", "marginInlineEnd"),
  mt: getPropMapper("marginBlockStart"),
  mr: getPropMapper("marginInlineEnd"),
  mb: getPropMapper("marginBlockEnd"),
  ml: getPropMapper("marginInlineStart"),
  mx: getPropMapper("marginInlineStart", "marginInlineEnd"),
  marginX: getPropMapper("marginInlineStart", "marginInlineEnd"),
  my: getPropMapper("marginBlockStart", "marginBlockEnd"),
  marginY: getPropMapper("marginBlockStart", "marginBlockEnd"),

  bg: getPropMapper("backgroundColor"),
  background: getPropMapper("backgroundColor"),

  borderX: getPropMapper("borderInline"),
  borderY: getPropMapper("borderBlock"),

  radius: getPropMapper("borderStartStartRadius", "borderStartEndRadius", "borderEndStartRadius", "borderEndEndRadius"),
  radiusTop: getPropMapper("borderStartStartRadius", "borderStartEndRadius"),
  radiusBottom: getPropMapper("borderEndEndRadius", "borderEndStartRadius"),
  radiusLeft: getPropMapper("borderStartStartRadius", "borderEndStartRadius"),
  radiusRight: getPropMapper("borderStartEndRadius", "borderEndEndRadius"),
  radiusTopLeft: getPropMapper("borderStartStartRadius"),
  radiusTopRight: getPropMapper("borderStartEndRadius"),
  radiusBottomLeft: getPropMapper("borderEndStartRadius"),
  radiusBottomRight: getPropMapper("borderEndEndRadius"),

  z: getPropMapper("zIndex"),

  h: getPropMapper("blockSize"),
  w: getPropMapper("inlineSize"),
  size: getPropMapper("blockSize", "inlineSize"),

  gt: getPropMapper("gridTemplate"),
  gtAreas: getPropMapper("gridTemplateAreas"),
  autoRows: getPropMapper("gridAutoRows"),
  gtRows: getPropMapper("gridTemplateRows"),
  gtColumns: getPropMapper("gridTemplateColumns"),

  // Remapped CSS Props
  height: getPropMapper("blockSize"),
  width: getPropMapper("inlineSize"),
  minHeight: getPropMapper("minBlockSize"),
  minWidth: getPropMapper("minInlineSize"),
  maxHeight: getPropMapper("maxBlockSize"),
  maxWidth: getPropMapper("maxInlineSize"),

  margin: getPropMapper("marginBlockStart", "marginBlockEnd", "marginInlineStart", "marginInlineEnd"),
  marginBottom: getPropMapper("marginBlockEnd"),
  marginLeft: getPropMapper("marginInlineStart"),
  marginRight: getPropMapper("marginInlineEnd"),
  marginTop: getPropMapper("marginBlockStart"),

  padding: getPropMapper("paddingBlockStart", "paddingBlockEnd", "paddingInlineStart", "paddingInlineEnd"),
  paddingBottom: getPropMapper("paddingBlockEnd"),
  paddingLeft: getPropMapper("paddingInlineStart"),
  paddingRight: getPropMapper("paddingInlineEnd"),
  paddingTop: getPropMapper("paddingBlockStart"),

  bottom: getPropMapper("insetBlockEnd"),
  top: getPropMapper("insetBlockStart"),
  left: getPropMapper("insetInlineStart"),
  right: getPropMapper("insetInlineEnd"),

  border: getPropMapper(
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth",
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth"
  ),
  borderColor: getPropMapper(
    "borderBlockStartColor",
    "borderBlockEndColor",
    "borderInlineStartColor",
    "borderInlineEndColor"
  ),
  borderStyle: getPropMapper(
    "borderBlockStartStyle",
    "borderBlockEndStyle",
    "borderInlineStartStyle",
    "borderInlineEndStyle"
  ),
  borderWidth: getPropMapper(
    "borderBlockStartWidth",
    "borderBlockEndWidth",
    "borderInlineStartWidth",
    "borderInlineEndWidth"
  ),

  borderBlock: getPropMapper(
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth"
  ),
  borderBlockColor: getPropMapper("borderBlockStartColor", "borderBlockEndColor"),
  borderBlockStyle: getPropMapper("borderBlockStartStyle", "borderBlockEndStyle"),
  borderBlockWidth: getPropMapper("borderBlockStartWidth", "borderBlockEndWidth"),

  borderInline: getPropMapper(
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth"
  ),
  borderInlineColor: getPropMapper("borderInlineStartColor", "borderInlineEndColor"),
  borderInlineStyle: getPropMapper("borderInlineStartStyle", "borderInlineEndStyle"),
  borderInlineWidth: getPropMapper("borderInlineStartWidth", "borderInlineEndWidth"),

  borderTop: getPropMapper("borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"),
  borderTopColor: getPropMapper("borderBlockStartColor"),
  borderTopStyle: getPropMapper("borderBlockStartStyle"),
  borderTopWidth: getPropMapper("borderBlockStartWidth"),

  borderBottom: getPropMapper("borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"),
  borderBottomColor: getPropMapper("borderBlockEndColor"),
  borderBottomStyle: getPropMapper("borderBlockEndStyle"),
  borderBottomWidth: getPropMapper("borderBlockEndWidth"),

  borderLeft: getPropMapper("borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"),
  borderLeftColor: getPropMapper("borderInlineStartColor"),
  borderLeftStyle: getPropMapper("borderInlineStartStyle"),
  borderLeftWidth: getPropMapper("borderInlineStartWidth"),

  borderRight: getPropMapper("borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"),
  borderRightColor: getPropMapper("borderInlineEndColor"),
  borderRightStyle: getPropMapper("borderInlineEndStyle"),
  borderRightWidth: getPropMapper("borderInlineEndWidth"),

  borderBlockStart: getPropMapper("borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"),
  borderBlockEnd: getPropMapper("borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"),
  borderInlineStart: getPropMapper("borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"),
  borderInlineEnd: getPropMapper("borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"),

  borderRadius: getPropMapper(
    "borderStartStartRadius",
    "borderStartEndRadius",
    "borderEndStartRadius",
    "borderEndEndRadius"
  ),
  borderTopLeftRadius: getPropMapper("borderStartStartRadius"),
  borderTopRightRadius: getPropMapper("borderStartEndRadius"),
  borderBottomLeftRadius: getPropMapper("borderEndStartRadius"),
  borderBottomRightRadius: getPropMapper("borderEndEndRadius"),

  outline: getPropMapper("outlineColor", "outlineStyle", "outlineWidth", "outlineOffset"),

  gap: getPropMapper("rowGap", "columnGap"),

  wordWrap: getPropMapper("overflowWrap"),

  typography: getPropMapper("type"),
} as const

/*************************************************************************************************
 * VALUE MAPPERS
 *************************************************************************************************/

export const valueMappers = {
  gridTemplate: (value: string) => {
    // Check for line-breaks; throw error if they're found (only row/col syntax supported)
    const hasLineBreaks = (String(value).match(/\r|\n/) || []).length > 0
    if (hasLineBreaks)
      throw new Error("We do not currently support areas via this property; please use `gridArea` for that.")
    return value
  },
} as const
/** 
* THIS LOGIC SHOULD BE RUN IN THE CSS PROCESSOR, not here, because it should also apply to the
* native prop, not just this util!
*
* gt: getPropMapper("gridTemplate"], v => {
* }),
* gtRows: getPropMapper(
*   // If BOTH rows + cols are set, JOIN onto gridTemplate
*   (_v, p) => {
*     if (p.gtRows || p.gridTemplateRows) return ["gridTemplate"]
*     return ["gridTemplateRows"]
*   },
*   (v, p) => {
*     const cols = p.gtRows || p.gridTemplateRows
*     if (cols) return `${v} / ${cols}`
*     return v
*   }
* ),
* gtColumns: getPropMapper(
*   // If BOTH rows + cols are set, JOIN onto gridTemplate
*   (_v, p) => {
*     if (p.gtRows || p.gridTemplateRows) return ["gridTemplate"]
*     return ["gridTemplateColumns"]
*   },
*   (v, p) => {
*     const rows = p.gtRows || p.gridTemplateRows
*     if (rows) return `${rows} / ${v}`
*     return v
*   }
* ),

* These have custom classes that use --var in a "template", just like these string templates
* linearGradient: getPropMapper("backgroundImage"], v => `linear-gradient(${v})`),
* radialGradient: getPropMapper("backgroundImage"], v => `radial-gradient(${v})`),
* conicGradient: getPropMapper("backgroundImage"], v => `conic-gradient(${v})`),
*/

/*************************************************************************************************
 * TYPES
 *************************************************************************************************/
type MapType = typeof mappedProps
type MapKey = keyof MapType
type MappedProps<K extends MapKey> = keyof ReturnType<MapType[K]>

export type WithMappedProps<T extends Partial<Record<CssPropKey, any>>> = T & {
  [key in Shared<MapType, OverrideScaledProp>]?: OverrideScaledProp[key]
} & { [key in NotShared<MapType, OverrideScaledProp>]?: T[Extract<keyof T, MappedProps<key>>] }
