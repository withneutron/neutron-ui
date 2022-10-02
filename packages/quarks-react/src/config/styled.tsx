import { ComponentProps, FunctionComponent, Ref } from "react"
import { useStyleConditions } from "../hooks"
import { CSS, style, StyleManager } from "@withneutron/quarks"

type ComponentType<T> = keyof JSX.IntrinsicElements | FunctionComponent<T>

/** TODO: Add Ref forwarding */
export function styled<C extends ComponentType<any>>(component: C, css: CSS, styleName?: string) {
  function styledComponent<T extends ComponentType<any>, R>(
    props: ComponentProps<C> & ComponentProps<T> & { as?: T; css?: CSS; styleManager?: StyleManager }
  ) {
    const conditions = useStyleConditions()
    const { as: polyAs, css: propsCss, styleManager, ...rest } = props

    const styleProps = style(css, conditions, propsCss, styleName, styleManager)
    const className = rest.className ? `${styleProps.className} ${rest.className}` : styleProps.className
    const styleObj = rest.style ? { ...styleProps.style, ...rest.style } : styleProps.style

    const isIntrinsic = typeof component === "string"
    const Element = (polyAs as FunctionComponent<any>) ?? (component as FunctionComponent<any>)
    const passDownProps: Record<string, unknown> = { ...styleProps }
    if (isIntrinsic) {
      delete passDownProps.styleManager
    }
    return <Element {...rest} {...passDownProps} className={className} style={styleObj} />
  }
  styledComponent.displayName = styleName
  return styledComponent
}
