import { ForwardRefRenderFunction } from "react"
import {
  SemanticLayoutPrimitive,
  SemanticTextPrimitive,
  SemanticHeadingPrimitive,
  SemanticUniversalPrimitive,
} from "../shared/models"

type StyledComponent = ForwardRefRenderFunction<any, any>

function getSemantic<T extends StyledComponent>(Comp: T, as: keyof JSX.IntrinsicElements) {
  // Creates a proxy component that sets a default polymorphic `as` prop,
  // and displays the semantic tag name in React dev tools.
  const proxy = new Proxy(Comp, {
    get: function (targetComp: T, prop, ...rest) {
      if (prop === "type") {
        const sourceType = targetComp[prop as keyof T] as any
        // Use a proxy to decorate the `displayName` as well
        return new Proxy(sourceType, {
          get: function (type: any, typeProp, ...typeRest) {
            if (typeProp === "displayName") {
              return type.displayName ?? `${type.render?.displayName ?? "Semantic"}.${as}`
            }
            return Reflect.get(type, typeProp, ...typeRest)
          },
        })
      }

      if (prop === "defaultProps") {
        return { as, isSemantic: true }
      }

      return Reflect.get(targetComp, prop, ...rest)
    },
  })
  return proxy as T
}

/** Generates a series of typed, semantic layout primitives associated with an input component */
export function getSemanticLayoutPrimitive<T extends StyledComponent>(Comp: T) {
  const output = Comp as SemanticLayoutPrimitive<T>
  // Semantic HTML shortcuts
  output.Article = getSemantic(Comp, "article")
  output.Aside = getSemantic(Comp, "aside")
  output.Dialog = getSemantic(Comp, "dialog")
  output.Div = getSemantic(Comp, "div")
  output.Footer = getSemantic(Comp, "footer")
  output.Header = getSemantic(Comp, "header")
  output.Label = getSemantic(Comp, "label")
  output.Main = getSemantic(Comp, "main")
  output.Nav = getSemantic(Comp, "nav")
  output.Section = getSemantic(Comp, "section")
  output.Span = getSemantic(Comp, "span")
  return output
}

/** Generates a series of typed, semantic text primitives associated with an input component */
export function getSemanticTextPrimitive<T extends StyledComponent>(Comp: T) {
  const output = Comp as SemanticTextPrimitive<T>
  // Semantic HTML shortcuts
  output.Blockquote = getSemantic(Comp, "blockquote")
  output.Code = getSemantic(Comp, "code")
  output.Del = getSemantic(Comp, "del")
  output.Em = getSemantic(Comp, "em")
  output.I = getSemantic(Comp, "i")
  output.Ins = getSemantic(Comp, "ins")
  output.Label = getSemantic(Comp, "label")
  output.P = getSemantic(Comp, "p")
  output.Pre = getSemantic(Comp, "pre")
  output.Small = getSemantic(Comp, "small")
  output.Span = getSemantic(Comp, "span")
  output.Strong = getSemantic(Comp, "strong")
  output.Time = getSemantic(Comp, "time")
  return output
}

/** Generates a series of typed, semantic heading primitives associated with an input component */
export function getSemanticHeadingPrimitive<T extends StyledComponent>(Comp: T) {
  const output = Comp as SemanticHeadingPrimitive<T>
  // Semantic HTML shortcuts
  output.H1 = getSemantic(Comp, "h1")
  output.H2 = getSemantic(Comp, "h2")
  output.H3 = getSemantic(Comp, "h3")
  output.H4 = getSemantic(Comp, "h4")
  output.H5 = getSemantic(Comp, "h5")
  output.H6 = getSemantic(Comp, "h6")
  return output
}

/** Generates a series of typed, semantic universal primitives associated with an input component */
export function getSemanticUniversalPrimitive<T extends StyledComponent>(Comp: T) {
  const output = Comp as SemanticUniversalPrimitive<T>
  // Semantic HTML shortcuts
  output.Article = getSemantic(Comp, "article")
  output.Aside = getSemantic(Comp, "aside")
  output.Dialog = getSemantic(Comp, "dialog")
  output.Div = getSemantic(Comp, "div")
  output.Footer = getSemantic(Comp, "footer")
  output.Header = getSemantic(Comp, "header")
  output.Label = getSemantic(Comp, "label")
  output.Main = getSemantic(Comp, "main")
  output.Nav = getSemantic(Comp, "nav")
  output.Section = getSemantic(Comp, "section")
  output.Blockquote = getSemantic(Comp, "blockquote")
  output.Code = getSemantic(Comp, "code")
  output.Del = getSemantic(Comp, "del")
  output.Em = getSemantic(Comp, "em")
  output.I = getSemantic(Comp, "i")
  output.Ins = getSemantic(Comp, "ins")
  output.P = getSemantic(Comp, "p")
  output.Pre = getSemantic(Comp, "pre")
  output.Small = getSemantic(Comp, "small")
  output.Span = getSemantic(Comp, "span")
  output.Strong = getSemantic(Comp, "strong")
  output.Time = getSemantic(Comp, "time")
  output.H1 = getSemantic(Comp, "h1")
  output.H2 = getSemantic(Comp, "h2")
  output.H3 = getSemantic(Comp, "h3")
  output.H4 = getSemantic(Comp, "h4")
  output.H5 = getSemantic(Comp, "h5")
  output.H6 = getSemantic(Comp, "h6")
  return output
}
