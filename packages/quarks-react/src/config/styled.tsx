import { ComponentProps, FunctionComponent, HTMLAttributes, JSXElementConstructor, Ref } from "react"
import { useStyleConditions } from "../hooks"
import { CSS, style, StyleManager } from "@withneutron/quarks"
import { getSemanticUniversalPrimitive } from "./config.utils"
import { AnyProps, ComponentType } from "../shared/models"

type StylelessComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<
  ComponentProps<T>,
  "css" | "styleManager"
>

/** TODO: Add Ref forwarding */
export function styled<C extends ComponentType>(component: C, css: CSS, styleName?: string) {
  return getSemanticUniversalPrimitive(styledPrimitive(component, css, styleName))
}

/** TODO: Add Ref forwarding */
export function styledPrimitive<C extends ComponentType>(component: C, css: CSS, styleName?: string) {
  function styledComponent<T extends ComponentType>(
    props: HTMLAttributes<C> &
      StylelessComponentProps<C> &
      StylelessComponentProps<T> & { as: T; css?: CSS; styleManager?: StyleManager }
  ): JSX.Element
  function styledComponent(
    props: HTMLAttributes<C> & StylelessComponentProps<C> & { as?: any; css?: CSS; styleManager?: StyleManager }
  ): JSX.Element
  function styledComponent(
    props: HTMLAttributes<C> &
      StylelessComponentProps<C> & { as?: ComponentType; css?: CSS; styleManager?: StyleManager }
  ) {
    const conditions = useStyleConditions()
    const { as: polyAs, css: propsCss, styleManager, ...rest } = props

    const styleProps = style(css, conditions, propsCss, styleName, styleManager)
    const className = rest.className ? `${styleProps.className} ${rest.className}` : styleProps.className
    const styleObj = rest.style ? { ...styleProps.style, ...rest.style } : styleProps.style

    const isIntrinsic = typeof component === "string"
    const Element = isIntrinsic
      ? (polyAs as FunctionComponent<any>) ?? component
      : (component as FunctionComponent<any>)

    const passDownProps: Record<string, unknown> = { ...styleProps }
    if (isIntrinsic) {
      delete passDownProps.styleManager
    }
    return (
      <Element
        as={isIntrinsic ? undefined : polyAs}
        {...rest}
        {...passDownProps}
        className={className}
        style={styleObj}
      />
    )
  }
  styledComponent.displayName = styleName
  return styledComponent
}
