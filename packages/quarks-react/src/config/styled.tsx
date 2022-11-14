import {
  ComponentPropsWithRef,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  JSXElementConstructor,
} from "react"
import { useStyleConditions } from "../hooks"
import { CSS, style, StyleManager } from "@withneutron/quarks"
import { getSemanticUniversalPrimitive } from "./config.utils"
import { ComponentType } from "../shared/models"

type StylelessComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<
  ComponentPropsWithRef<T>,
  "css" | "styleManager"
>

type BaseStyledProps = { css?: CSS; styleManager?: StyleManager }

/** Used to style any React component of basic HTML element.
 * The output component will include semantic HTML variants, such as `Component.Aside`. */
export function styled<C extends ComponentType>(component: C, css: CSS, styleName?: string) {
  return getSemanticUniversalPrimitive(styledPrimitive(component, css, styleName))
}

/** Used to create styling primitives, like `Row`, `Column`, etc */
export function styledPrimitive<C extends ComponentType>(component: C, css: CSS, styleName?: string) {
  function styledComponent<T extends ComponentType, R>(
    props: HTMLAttributes<C> & StylelessComponentProps<C> & StylelessComponentProps<T> & { as?: T } & BaseStyledProps,
    ref?: ForwardedRef<R>
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<C> & StylelessComponentProps<C> & { as?: any } & BaseStyledProps,
    ref?: ForwardedRef<R>
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<C> & StylelessComponentProps<C> & { as?: ComponentType } & BaseStyledProps,
    ref?: ForwardedRef<R>
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
        ref={ref}
        {...rest}
        {...passDownProps}
        className={className}
        style={styleObj}
      />
    )
  }
  styledComponent.displayName = styleName
  return forwardRef(styledComponent) as any as typeof styledComponent
}
