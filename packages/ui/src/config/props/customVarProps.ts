import { omitKeys } from "./props.utils"
import { FilterKeys, CssPropKey } from "./props.models"

/**
 * Used to generate CSS classes for custom values (via a combo of className + CSS var).
 * Returns an object containing props with values matching a signature of:
 * `{ varName: string; className: string }`
 */
export function generateCustomVarPropsCss<K extends FilterKeys>(
  generateCss: (prop: CssPropKey, template?: (value: string) => string) => { varName: string; className: string },
  keys?: K
) {
  function value(prop: CssPropKey, template?: (value: string) => string) {
    return keys && !keys[prop] ? "" : generateCss(prop, template)
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

    font: value("font"),
    textDecoration: value("textDecoration"),
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

    animation: value("animation"),
    animationIterationCount: value("animationIterationCount"),

    transition: value("transition"),

    opacity: value("opacity"),

    listStyle: value("listStyle"),
    listStyleImage: value("listStyleImage"),

    filter: value("filter"),
  } as const

  if (keys) {
    return omitKeys(props, keys)
  }
  return props
}
