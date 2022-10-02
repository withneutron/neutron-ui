import type { ComponentProps, HTMLAttributes, ReactNode, RefObject } from "react"
import { cloneElement } from "react"
import { SemanticLayoutPrimitive, SemanticTextPrimitive, SemanticHeadingPrimitive } from "../shared/models"

type StyledRef = ((instance: HTMLElement | null) => void) | RefObject<HTMLElement> | null | undefined

function getSemantic(
  // eslint-disable-next-line
  Comp: any,
  tag?: keyof JSX.IntrinsicElements
) {
  const Wrapper = (
    props: HTMLAttributes<HTMLElement> & ComponentProps<typeof Comp>,
    ref?: StyledRef
  ): ReactNode | null => cloneElement(<Comp />, { as: tag, ref, ...props })

  const suffix = tag ? `.${tag}` : ""
  return Object.assign({}, Comp, {
    render: Wrapper,
    displayName: `${Comp.displayName || "Styled"}${suffix}`,
  })
}

/** Generates a series of typed, semantic layout primitives associated with an input component */
// eslint-disable-next-line
export function getSemanticLayoutPrimitive<T>(Comp: T) {
  const output = Comp as SemanticLayoutPrimitive<T>
  // Semantic HTML shortcuts
  output.article = getSemantic(Comp, "article")
  output.aside = getSemantic(Comp, "aside")
  output.dialog = getSemantic(Comp, "dialog")
  output.div = getSemantic(Comp, "div")
  output.footer = getSemantic(Comp, "footer")
  output.header = getSemantic(Comp, "header")
  output.label = getSemantic(Comp, "label")
  output.main = getSemantic(Comp, "main")
  output.nav = getSemantic(Comp, "nav")
  output.section = getSemantic(Comp, "section")
  return output
}

/** Generates a series of typed, semantic text primitives associated with an input component */
// eslint-disable-next-line
export function getSemanticTextPrimitive<T>(Comp: T) {
  const output = getSemantic(Comp, undefined) as SemanticTextPrimitive<T>
  // Semantic HTML shortcuts
  output.blockquote = getSemantic(Comp, "blockquote")
  output.code = getSemantic(Comp, "code")
  output.del = getSemantic(Comp, "del")
  output.em = getSemantic(Comp, "em")
  output.i = getSemantic(Comp, "i")
  output.ins = getSemantic(Comp, "ins")
  output.label = getSemantic(Comp, "label")
  output.p = getSemantic(Comp, "p")
  output.pre = getSemantic(Comp, "pre")
  output.small = getSemantic(Comp, "small")
  output.span = getSemantic(Comp, "span")
  output.strong = getSemantic(Comp, "strong")
  output.time = getSemantic(Comp, "time")
  return output
}

/** Generates a series of typed, semantic heading primitives associated with an input component */
// eslint-disable-next-line
export function getSemanticHeadingPrimitive<T>(Comp: T) {
  const output = getSemantic(Comp, undefined) as SemanticHeadingPrimitive<T>
  // Semantic HTML shortcuts
  output.h1 = getSemantic(Comp, "h1")
  output.h2 = getSemantic(Comp, "h2")
  output.h3 = getSemantic(Comp, "h3")
  output.h4 = getSemantic(Comp, "h4")
  output.h5 = getSemantic(Comp, "h5")
  output.h6 = getSemantic(Comp, "h6")
  return output
}
