import { omitKeys } from "./props.utils"
import { FilterKeys, CssPropKey, CssRule } from "./props.models"

const DEFAULT_VALUES = { initial: true } as const
const INHERITED_VALUES = { ...DEFAULT_VALUES, inherit: true } as const

const inheritedProps = {
  borderCollapse: INHERITED_VALUES,
  borderSpacing: INHERITED_VALUES,
  color: INHERITED_VALUES,
  cursor: INHERITED_VALUES,
  font: INHERITED_VALUES,
  fontFamily: INHERITED_VALUES,
  fontSize: INHERITED_VALUES,
  fontStyle: INHERITED_VALUES,
  fontWeight: INHERITED_VALUES,
  letterSpacing: INHERITED_VALUES,
  lineHeight: INHERITED_VALUES,
  listStyle: INHERITED_VALUES,
  listStyleImage: INHERITED_VALUES,
  listStylePosition: INHERITED_VALUES,
  listStyleType: INHERITED_VALUES,
  textAlign: INHERITED_VALUES,
  textShadow: INHERITED_VALUES,
  textTransform: INHERITED_VALUES,
  visibility: INHERITED_VALUES,
  whiteSpace: INHERITED_VALUES,
  wordBreak: INHERITED_VALUES,
  wordSpacing: INHERITED_VALUES,
  wordWrap: INHERITED_VALUES,
} as const

function options<T extends string>(...options: T[]) {
  const output = {} as Record<T, boolean>
  options.forEach(item => (output[item] = true))
  return output
}

const transparent = options("transparent")
const noneAuto = options("none", "auto")
const none = options("none")
const overflow = options("visible", "hidden", "clip", "scroll", "auto")
const borderStyle = options("dashed", "dotted", "groove")

type Placeholder = { fakeProp: true }

/**
 * Used to generate CSS classes for custom values (via a combo of className + CSS var).
 * Returns an object containing props with values matching a signature of:
 * `Record<StaticValue, CssClassForThatValue>`
 */
export function generateStaticPropsCss<K extends FilterKeys>(generateClass: (value: CssRule) => string, keys?: K) {
  // Value getter
  function values<P extends CssPropKey, V extends { [k: string]: unknown } = Placeholder>(prop: P, customValues?: V) {
    const baseValues = inheritedProps[prop as keyof typeof inheritedProps] ?? DEFAULT_VALUES
    const valuesMap = { ...baseValues, ...(customValues ?? {}) }

    type BaseType = P extends keyof typeof inheritedProps ? typeof INHERITED_VALUES : typeof DEFAULT_VALUES
    type ValueKey = V extends Placeholder ? keyof BaseType : keyof BaseType | keyof V

    return Object.keys(valuesMap).reduce((output: { [k in ValueKey]: string }, key: string) => {
      const value = { [prop]: key }
      const className = keys && !keys[prop] ? "" : generateClass(value)
      output[key as ValueKey] = className
      return output
    }, {} as { [k in ValueKey]: string })
  }

  const props = {
    appearance: values("appearance", noneAuto),

    animation: values("animation", none),
    animationIterationCount: values("animationIterationCount", options("infinite", "1", "2")),

    background: values("background", transparent),
    backgroundColor: values("backgroundColor", transparent),
    color: values("color", transparent),
    outlineColor: values("outlineColor", transparent),
    borderBlockStartColor: values("borderBlockStartColor", transparent),
    borderBlockEndColor: values("borderBlockEndColor", transparent),
    borderInlineStartColor: values("borderInlineStartColor", transparent),
    borderInlineEndColor: values("borderInlineEndColor", transparent),
    fill: values("fill", transparent),
    stroke: values("stroke", transparent),
    caretColor: values("caretColor", transparent),
    columnRuleColor: values("columnRuleColor", transparent),

    userSelect: values("userSelect", options("none", "auto", "text", "contain", "all")),

    all: values("all", options("inherit")),

    position: values("position", options("static", "relative", "absolute", "fixed", "sticky")),
    display: values(
      "display",
      options(
        "block",
        "inline",
        "inline-block",
        "flex",
        "inline-flex",
        "grid",
        "inline-grid",
        "flow-root",
        "none",
        "contents",
        "list-item",
        "table",
        "table-row-group",
        "table-header-group",
        "table-footer-group",
        "table-row",
        "table-cell",
        "table-column-group",
        "table-column",
        "table-caption"
      )
    ),
    visibility: values("visibility", options("visible", "hidden", "collapse")),
    opacity: values("opacity", options("0", "1")),

    cursor: values(
      "cursor",
      options(
        "auto",
        "default",
        "context-menu",
        "help",
        "pointer",
        "progress",
        "wait",
        "cell",
        "crosshair",
        "text",
        "vertical-text",
        "alias",
        "copy",
        "move",
        "no-drop",
        "not-allowed",
        "grab",
        "grabbing",
        "all-scroll",
        "col-resize",
        "row-resize",
        "n-resize",
        "e-resize",
        "s-resize",
        "w-resize",
        "ne-resize",
        "nw-resize",
        "se-resize",
        "sw-resize",
        "ew-resize",
        "ns-resize",
        "nesw-resize",
        "nwse-resize",
        "zoom-in"
      )
    ),
    pointerEvents: values("pointerEvents", noneAuto),

    boxSizing: values("boxSizing", options("border-box", "content-box")),

    resize: values("resize", options("none", "both", "horizontal", "vertical", "block", "inline")),

    outlineStyle: values(
      "outlineStyle",
      options("auto", "none", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset")
    ),

    borderBlockStartStyle: values("borderBlockStartStyle", borderStyle),
    borderBlockEndStyle: values("borderBlockEndStyle", borderStyle),
    borderInlineStartStyle: values("borderInlineStartStyle", borderStyle),
    borderInlineEndStyle: values("borderInlineEndStyle", borderStyle),

    borderCollapse: values("borderCollapse", options("collapse", "separate")),

    flexDirection: values("flexDirection", options("row", "row-reverse", "column", "column-reverse")),
    flexFlow: values(
      "flexFlow",
      options(
        "row",
        "row-reverse",
        "column",
        "column-reverse",
        "nowrap",
        "wrap",
        "wrap-reverse",
        "row nowrap",
        "column wrap",
        "column-reverse wrap-reverse"
      )
    ),
    flexWrap: values("flexWrap", options("nowrap", "wrap", "wrap-reverse")),
    flexGrow: values("flexGrow", options("0", "1", "2", "3", "4", "5", "6")),
    flexShrink: values("flexShrink", options("0", "1", "2", "3", "4", "5", "6")),

    gridAutoFlow: values("gridAutoFlow", options("row", "column", "dense", "row dense", "column dense")),

    // Strip `flex-`.
    alignContent: values(
      "alignContent",
      options(
        "center",
        "start",
        "end",
        "normal",
        "baseline",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch"
      )
    ),
    // Strip `flex-`.
    alignItems: values("alignItems", options("normal", "stretch", "center", "start", "end", "baseline")),
    // Strip `flex-`.
    alignSelf: values(
      "alignSelf",
      options("auto", "normal", "center", "start", "end", "self-start", "self-end", "baseline", "stretch")
    ),
    // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
    justifyContent: values(
      "justifyContent",
      options("center", "start", "end", "normal", "space-between", "space-around", "space-evenly", "stretch")
    ),
    // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
    justifyItems: values(
      "justifyItems",
      options("normal", "stretch", "center", "start", "end", "self-start", "self-end", "baseline")
    ),
    // Don't include `left`/`right` in type def; convert to `start`/`end`; strip `flex-`.
    justifySelf: values(
      "justifySelf",
      options("auto", "normal", "stretch", "center", "start", "end", "self-start", "self-end", "baseline")
    ),

    float: values("float", options("left", "right")),

    writingMode: values("writingMode", options("horizontal-tb", "vertical-rl", "vertical-lr")),

    fontStyle: values("fontStyle", options("normal", "italic", "oblique")),

    textOverflow: values("textOverflow", options("clip", "ellipsis")),
    textTransform: values("textTransform", options("none", "capitalize", "uppercase", "lowercase")),

    overflow: values("overflow", overflow),
    overflowY: values("overflowY", overflow),
    overflowX: values("overflowX", overflow),

    whiteSpace: values("whiteSpace", options("normal", "nowrap", "pre", "pre-wrap", "pre-line", "break-spaces")),

    wordBreak: values("wordBreak", options("normal", "break-all", "keep-all")),
    overflowWrap: values("overflowWrap", options("normal", "break-word", "anywhere")),

    textAlign: values("textAlign", options("start", "end", "center", "justify")),
    verticalAlign: values(
      "verticalAlign",
      options("baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom")
    ),

    listStylePosition: values("listStylePosition", options("inside", "outside")),
    listStyleType: values("listStyleType", options("disc", "circle", "square", "decimal", "none")),

    filter: values("filter", none),

    scrollSnapAlign: values("scrollSnapAlign", options("none", "start", "end", "center")),
    scrollSnapType: values(
      "scrollSnapType",
      options(
        "none",
        "block",
        "inline",
        "both",
        "block mandatory",
        "inline mandatory",
        "both mandatory",
        "block proximity",
        "inline proximity",
        "both proximity"
      )
    ),

    // STANDARD VALUES ONLY //
    inlineSize: values("inlineSize"),
    minInlineSize: values("minInlineSize"),
    maxInlineSize: values("maxInlineSize"),
    blockSize: values("blockSize"),
    minBlockSize: values("minBlockSize"),
    maxBlockSize: values("maxBlockSize"),
    marginBlockStart: values("marginBlockStart"),
    marginBlockEnd: values("marginBlockEnd"),
    marginInlineStart: values("marginInlineStart"),
    marginInlineEnd: values("marginInlineEnd"),
    paddingBlockStart: values("paddingBlockStart"),
    paddingBlockEnd: values("paddingBlockEnd"),
    paddingInlineStart: values("paddingInlineStart"),
    paddingInlineEnd: values("paddingInlineEnd"),
    insetBlockStart: values("insetBlockStart"),
    insetBlockEnd: values("insetBlockEnd"),
    insetInlineStart: values("insetInlineStart"),
    insetInlineEnd: values("insetInlineEnd"),
    fontFamily: values("fontFamily"),
    fontSize: values("fontSize"),
    fontWeight: values("fontWeight"),
    borderBlockStart: values("borderBlockStart"),
    borderBlockStartWidth: values("borderBlockStartWidth"),
    borderBlockEnd: values("borderBlockEnd"),
    borderBlockEndWidth: values("borderBlockEndWidth"),
    borderInlineStart: values("borderInlineStart"),
    borderInlineStartWidth: values("borderInlineStartWidth"),
    borderInlineEnd: values("borderInlineEnd"),
    borderInlineEndWidth: values("borderInlineEndWidth"),
    borderStartStartRadius: values("borderStartStartRadius"),
    borderStartEndRadius: values("borderStartEndRadius"),
    borderEndStartRadius: values("borderEndStartRadius"),
    borderEndEndRadius: values("borderEndEndRadius"),
    outline: values("outline"),
    outlineOffset: values("outlineOffset"),
    outlineWidth: values("outlineWidth"),
    zIndex: values("zIndex"),
    boxShadow: values("boxShadow"),
    rowGap: values("rowGap"),
    columnGap: values("columnGap"),
    animationDuration: values("animationDuration"),
    lineHeight: values("lineHeight"),
    textUnderlineOffset: values("textUnderlineOffset"),
    letterSpacing: values("letterSpacing"),
    wordSpacing: values("wordSpacing"),
  } as const

  if (keys) {
    return omitKeys(props, keys)
  }
  return props
}
