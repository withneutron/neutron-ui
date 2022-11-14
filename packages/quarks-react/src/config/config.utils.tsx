import { forwardRef, RefObject, ForwardRefRenderFunction, ComponentPropsWithoutRef } from "react"
import {
  SemanticLayoutPrimitive,
  SemanticTextPrimitive,
  SemanticHeadingPrimitive,
  SemanticUniversalPrimitive,
} from "../shared/models"

type StyledRef = ((instance: HTMLElement | null) => void) | RefObject<HTMLElement> | null | undefined
type StyledComponent = ForwardRefRenderFunction<any, any>

function getSemantic<T extends StyledComponent>(Comp: T, tag?: keyof JSX.IntrinsicElements) {
  const AnyComp = Comp as any
  const WrappedComponent = !tag
    ? AnyComp
    : (props: ComponentPropsWithoutRef<T>, ref?: StyledRef) => <AnyComp as={tag} ref={ref} {...props} />

  const suffix = tag ? `.${tag}` : ""
  WrappedComponent.displayName = `${AnyComp.displayName || "Styled"}${suffix}`
  return forwardRef(WrappedComponent) as any as T
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
