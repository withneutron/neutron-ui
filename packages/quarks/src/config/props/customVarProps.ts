import { omitKeys } from "./props.utils"
import { FilterKeys, CssPropKey, CustomVarPropValue, KeysFromScale } from "./props.models"
import { getColor } from "../scales"

/**
 * Used to generate CSS classes for custom values (via a combo of className + CSS var).
 * Returns an object containing props with values matching a signature of:
 * `{ varName: string; className: string }`
 */
export function generateCustomVarPropsCss<K extends FilterKeys>(
  generateCss: (prop: CssPropKey, template?: (value: string) => string) => CustomVarPropValue,
  keys?: K
) {
  function value(prop: CssPropKey, template?: (value: string) => string): CustomVarPropValue {
    return keys && !keys[prop] ? { varName: "", className: "" } : generateCss(prop, template)
  }

  const props = {
    background: value("background"), // Scaled color values get routed to `backgroundColor` instead
    backgroundColor: value("backgroundColor"),
    backgroundBlendMode: value("backgroundBlendMode"),
    backgroundPosition: value("backgroundPosition"),
    backgroundImage: value("backgroundImage"),
    // These are technically remapped, but we want the inline var assignment to only need to
    // include the actual gradient, not the type. This will keep those assignments shorter!
    linearGradient: value("backgroundImage", v => `linear-gradient(${v})`),
    radialGradient: value("backgroundImage", v => `radial-gradient(${v})`),
    conicGradient: value("backgroundImage", v => `conic-gradient(${v})`),

    mask: value("mask"),

    borderImage: value("borderImage"),
    borderSpacing: value("borderSpacing"),

    color: value("color"),
    fill: value("fill"),
    stroke: value("stroke"),

    caretColor: value("caretColor"),
    columnRuleColor: value("columnRuleColor"),

    fontSize: value("fontSize"),
    fontFamily: value("fontFamily"),
    textDecorationLine: value("textDecorationLine"),
    textDecorationColor: value("textDecorationColor"),
    textDecorationThickness: value("textDecorationThickness"),
    textShadow: value("textShadow"),

    flex: value("flex"),
    flexGrow: value("flexGrow"),
    flexShrink: value("flexShrink"),
    flexBasis: value("flexBasis"),

    gridTemplate: value("gridTemplate"),
    gridTemplateRows: value("gridTemplateRows"),
    gridTemplateColumns: value("gridTemplateColumns"),
    gridTemplateAreas: value("gridTemplateAreas"),
    gridArea: value("gridArea"),
    gridRow: value("gridRow"),
    gridColumn: value("gridColumn"),
    gridAutoRows: value("gridAutoRows"),
    gridAutoColumns: value("gridAutoColumns"),

    transform: value("transform"),
    transformOrigin: value("transformOrigin"),

    animationDelay: value("animationDelay"),
    animationDuration: value("animationDuration"),
    animationIterationCount: value("animationIterationCount"),
    animationName: value("animationName"),
    animationTimingFunction: value("animationTimingFunction"),

    transition: value("transition"),

    opacity: value("opacity"),

    listStyle: value("listStyle"),
    listStyleImage: value("listStyleImage"),

    filter: value("filter"),

    // Make sure all sizing-related properties can have custom values
    inlineSize: value("inlineSize"),
    minInlineSize: value("minInlineSize"),
    maxInlineSize: value("maxInlineSize"),
    blockSize: value("blockSize"),
    minBlockSize: value("minBlockSize"),
    maxBlockSize: value("maxBlockSize"),

    marginBlockStart: value("marginBlockStart"),
    marginBlockEnd: value("marginBlockEnd"),
    marginInlineStart: value("marginInlineStart"),
    marginInlineEnd: value("marginInlineEnd"),

    paddingBlockStart: value("paddingBlockStart"),
    paddingBlockEnd: value("paddingBlockEnd"),
    paddingInlineStart: value("paddingInlineStart"),
    paddingInlineEnd: value("paddingInlineEnd"),

    insetBlockStart: value("insetBlockStart"),
    insetBlockEnd: value("insetBlockEnd"),
    insetInlineStart: value("insetInlineStart"),
    insetInlineEnd: value("insetInlineEnd"),
  } as const

  if (keys) {
    return omitKeys(props, keys)
  }
  return props
}

type Colors = KeysFromScale<ReturnType<typeof getColor>["cssValueMap"]>

export type CustomVarPropHints = {
  background: Colors
  backgroundColor: Colors
  color: Colors
  fill: Colors
  stroke: Colors
  caretColor: Colors
  columnRuleColor: Colors
}
