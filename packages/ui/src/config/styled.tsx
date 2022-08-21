import { ComponentProps, FunctionComponent, Ref } from "react"
import { useStyleConditions } from "../hooks/useStyleConditions"
import { CSS } from "./styles.css"
import { style, StyleManager } from "./styleGenerators"

type ComponentType<T> = keyof JSX.IntrinsicElements | FunctionComponent<T>

/** TODO: Add Ref forwarding */
export function styledNUI<C extends ComponentType<any>>(component: C, css: CSS, styleName?: string) {
  function styledComponent<R>(props: ComponentProps<C> & { css?: CSS; styleManager?: StyleManager }) {
    const conditions = useStyleConditions()
    const { css: propsCss, styleManager, ...rest } = props

    const styleProps = style(css, conditions, propsCss, styleName, styleManager)
    const className = rest.className ? `${styleProps.className} ${rest.className}` : styleProps.className
    const styleObj = rest.style ? { ...styleProps.style, ...rest.style } : styleProps.style

    const Element = component as FunctionComponent<any>
    return <Element {...rest} {...styleProps} className={className} style={styleObj} />
  }
  styledComponent.displayName = styleName
  return styledComponent
}
