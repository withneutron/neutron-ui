import { CssPropKey } from "./props.models"

type PropValue = string | number

/** Map CSS value to one or more keys */
function mapValue(value: PropValue, keys: CssPropKey[]) {
  return keys.reduce((output, key) => {
    output[key] = value
    return output
  }, {} as Record<string, PropValue>)
}

/** Maps a value to one or more CSS props */
function getPropMapper(keys: CssPropKey[]) {
  return (value: PropValue) => mapValue(value, keys)
}

export const mappedProps = {
  // UTILS
  p: getPropMapper(["padding"]),
  pt: getPropMapper(["paddingTop"]),
  pr: getPropMapper(["paddingRight"]),
  pb: getPropMapper(["paddingBottom"]),
  pl: getPropMapper(["paddingLeft"]),
  px: getPropMapper(["paddingLeft", "paddingRight"]),
  paddingX: getPropMapper(["paddingLeft", "paddingRight"]),
  py: getPropMapper(["paddingTop", "paddingBottom"]),
  paddingY: getPropMapper(["paddingTop", "paddingBottom"]),

  m: getPropMapper(["margin"]),
  mt: getPropMapper(["marginTop"]),
  mr: getPropMapper(["marginRight"]),
  mb: getPropMapper(["marginBottom"]),
  ml: getPropMapper(["marginLeft"]),
  mx: getPropMapper(["marginLeft", "marginRight"]),
  marginX: getPropMapper(["marginLeft", "marginRight"]),
  my: getPropMapper(["marginTop", "marginBottom"]),
  marginY: getPropMapper(["marginTop", "marginBottom"]),

  bg: getPropMapper(["background"]),

  borderX: getPropMapper(["borderInline"]),
  borderY: getPropMapper(["borderBlock"]),

  radius: getPropMapper(["borderRadius"]),
  radiusTop: getPropMapper(["borderStartStartRadius", "borderStartEndRadius"]),
  radiusBottom: getPropMapper(["borderEndEndRadius", "borderEndStartRadius"]),
  radiusLeft: getPropMapper(["borderStartStartRadius", "borderEndStartRadius"]),
  radiusRight: getPropMapper(["borderStartEndRadius", "borderEndEndRadius"]),

  z: getPropMapper(["zIndex"]),

  h: getPropMapper(["height"]),
  w: getPropMapper(["width"]),
  size: getPropMapper(["height", "width"]),

  gt: getPropMapper(["gridTemplate"]),
  gtAreas: getPropMapper(["gridTemplateAreas"]),
  autoRows: getPropMapper(["gridAutoRows"]),
  gtRows: getPropMapper(["gridTemplateRows"]),
  gtColumns: getPropMapper(["gridTemplateColumns"]),
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // THIS LOGIC SHOULD LIVE IN THE CSS PROCESSOR, not here, because it should also apply to the
  // native prop, not just this util!
  //
  // gt: getPropMapper(["gridTemplate"], v => {
  //   // Check for line-breaks; throw error if they're found (only row/col syntax supported)
  //   const hasLineBreaks = (String(v).match(/\r|\n/) || []).length > 0
  //   if (hasLineBreaks)
  //     throw new Error("We do not currently support areas via this property; please use `gridArea` for that.")
  //   return v
  // }),
  // gtRows: getPropMapper(
  //   // If BOTH rows + cols are set, JOIN onto gridTemplate
  //   (_v, p) => {
  //     if (p.gtRows || p.gridTemplateRows) return ["gridTemplate"]
  //     return ["gridTemplateRows"]
  //   },
  //   (v, p) => {
  //     const cols = p.gtRows || p.gridTemplateRows
  //     if (cols) return `${v} / ${cols}`
  //     return v
  //   }
  // ),
  // gtColumns: getPropMapper(
  //   // If BOTH rows + cols are set, JOIN onto gridTemplate
  //   (_v, p) => {
  //     if (p.gtRows || p.gridTemplateRows) return ["gridTemplate"]
  //     return ["gridTemplateColumns"]
  //   },
  //   (v, p) => {
  //     const rows = p.gtRows || p.gridTemplateRows
  //     if (rows) return `${rows} / ${v}`
  //     return v
  //   }
  // ),

  // These have custom classes that use --var in a "template", just like these string templates
  // linearGradient: getPropMapper(["backgroundImage"], v => `linear-gradient(${v})`),
  // radialGradient: getPropMapper(["backgroundImage"], v => `radial-gradient(${v})`),
  // conicGradient: getPropMapper(["backgroundImage"], v => `conic-gradient(${v})`),

  // Remapped CSS Props
  height: getPropMapper(["blockSize"]),
  width: getPropMapper(["inlineSize"]),
  minHeight: getPropMapper(["minBlockSize"]),
  minWidth: getPropMapper(["minInlineSize"]),
  maxHeight: getPropMapper(["maxBlockSize"]),
  maxWidth: getPropMapper(["maxInlineSize"]),

  margin: getPropMapper(["marginBlockStart", "marginBlockEnd", "marginInlineStart", "marginInlineEnd"]),
  marginBottom: getPropMapper(["marginBlockEnd"]),
  marginLeft: getPropMapper(["marginInlineStart"]),
  marginRight: getPropMapper(["marginInlineEnd"]),
  marginTop: getPropMapper(["marginBlockStart"]),

  padding: getPropMapper(["paddingBlockStart", "paddingBlockEnd", "paddingInlineStart", "paddingInlineEnd"]),
  paddingBottom: getPropMapper(["paddingBlockEnd"]),
  paddingLeft: getPropMapper(["paddingInlineStart"]),
  paddingRight: getPropMapper(["paddingInlineEnd"]),
  paddingTop: getPropMapper(["paddingBlockStart"]),

  bottom: getPropMapper(["insetBlockEnd"]),
  top: getPropMapper(["insetBlockStart"]),
  left: getPropMapper(["insetInlineStart"]),
  right: getPropMapper(["insetInlineEnd"]),

  border: getPropMapper(["borderBlockStart", "borderBlockEnd", "borderInlineStart", "borderInlineEnd"]),
  borderColor: getPropMapper([
    "borderBlockStartColor",
    "borderBlockEndColor",
    "borderInlineStartColor",
    "borderInlineEndColor",
  ]),
  borderStyle: getPropMapper([
    "borderBlockStartStyle",
    "borderBlockEndStyle",
    "borderInlineStartStyle",
    "borderInlineEndStyle",
  ]),
  borderWidth: getPropMapper([
    "borderBlockStartWidth",
    "borderBlockEndWidth",
    "borderInlineStartWidth",
    "borderInlineEndWidth",
  ]),

  borderBlock: getPropMapper(["borderBlockStart", "borderBlockEnd"]),
  borderBlockColor: getPropMapper(["borderBlockStartColor", "borderBlockEndColor"]),
  borderBlockStyle: getPropMapper(["borderBlockStartStyle", "borderBlockEndStyle"]),
  borderBlockWidth: getPropMapper(["borderBlockStartWidth", "borderBlockEndWidth"]),

  borderInline: getPropMapper(["borderInlineStart", "borderInlineEnd"]),
  borderInlineColor: getPropMapper(["borderInlineStartColor", "borderInlineEndColor"]),
  borderInlineStyle: getPropMapper(["borderInlineStartStyle", "borderInlineEndStyle"]),
  borderInlineWidth: getPropMapper(["borderInlineStartWidth", "borderInlineEndWidth"]),

  borderTop: getPropMapper(["borderBlockStart"]),
  borderTopColor: getPropMapper(["borderBlockStartColor"]),
  borderTopStyle: getPropMapper(["borderBlockStartStyle"]),
  borderTopWidth: getPropMapper(["borderBlockStartWidth"]),

  borderBottom: getPropMapper(["borderBlockEnd"]),
  borderBottomColor: getPropMapper(["borderBlockEndColor"]),
  borderBottomStyle: getPropMapper(["borderBlockEndStyle"]),
  borderBottomWidth: getPropMapper(["borderBlockEndWidth"]),

  borderLeft: getPropMapper(["borderInlineStart"]),
  borderLeftColor: getPropMapper(["borderInlineStartColor"]),
  borderLeftStyle: getPropMapper(["borderInlineStartStyle"]),
  borderLeftWidth: getPropMapper(["borderInlineStartWidth"]),

  borderRight: getPropMapper(["borderInlineEnd"]),
  borderRightColor: getPropMapper(["borderInlineEndColor"]),
  borderRightStyle: getPropMapper(["borderInlineEndStyle"]),
  borderRightWidth: getPropMapper(["borderInlineEndWidth"]),

  borderRadius: getPropMapper([
    "borderStartStartRadius",
    "borderStartEndRadius",
    "borderEndStartRadius",
    "borderEndEndRadius",
  ]),
  borderTopLeftRadius: getPropMapper(["borderStartStartRadius"]),
  borderTopRightRadius: getPropMapper(["borderStartEndRadius"]),
  borderBottomLeftRadius: getPropMapper(["borderEndStartRadius"]),
  borderBottomRightRadius: getPropMapper(["borderEndEndRadius"]),

  gap: getPropMapper(["rowGap", "columnGap"]),

  wordWrap: getPropMapper(["overflowWrap"]),
} as const
