import {
  ComponentPropsWithRef,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  JSXElementConstructor,
} from "react"
import { useStyleConditions } from "../hooks"
import { CSS, mergeCss, style, StyleManager } from "@withneutron/quarks"
import { getSemanticUniversalPrimitive } from "./config.utils"
import { ComponentType } from "../shared/models"

type StylelessComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<
  ComponentPropsWithRef<T>,
  "css" | "styleManager"
>

type VariantsFunction<T extends Record<string, any>> = (variants: T) => CSS

type BaseStyledProps<V extends Record<string, any> | undefined> = V extends Record<string, any>
  ? { css?: CSS; styleManager?: StyleManager } & V
  : { css?: CSS; styleManager?: StyleManager }

/** Used to create styling primitives, like `Row`, `Column`, etc */
export function styledPrimitive<C extends ComponentType, V extends Record<string, any>>(
  component: C,
  css: CSS,
  variantsOrStyleName?: string | VariantsFunction<V>,
  styleName?: string
) {
  styleName = typeof variantsOrStyleName === "string" ? variantsOrStyleName : styleName
  const variants = typeof variantsOrStyleName === "function" ? variantsOrStyleName : () => undefined

  function styledComponent<T extends ComponentType, R>(
    props: HTMLAttributes<C> &
      StylelessComponentProps<C> &
      StylelessComponentProps<T> & { as?: T } & BaseStyledProps<V>,
    ref?: ForwardedRef<R>
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<C> & StylelessComponentProps<C> & { as?: any } & BaseStyledProps<V>,
    ref?: ForwardedRef<R>
  ): JSX.Element | null
  function styledComponent<R>(
    props: HTMLAttributes<C> & StylelessComponentProps<C> & { as?: ComponentType } & BaseStyledProps<V>,
    ref?: ForwardedRef<R>
  ) {
    const conditions = useStyleConditions()
    const { as: polyAs, css: propsCss, styleManager, ...rest } = props

    const variantsCss = variants(rest as any as V)
    const mergedCss = mergeCss(css, variantsCss)

    const styleProps = style(mergedCss, conditions, propsCss, styleName, styleManager)
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

/** Used to style any React component of basic HTML element.
 * The output component will include semantic HTML variants, such as `Component.Aside`. */
export function styled<C extends ComponentType, V extends Record<string, any>>(
  component: C,
  css: CSS,
  variantsOrStyleName?: string | VariantsFunction<V>,
  styleName?: string
) {
  styleName = typeof variantsOrStyleName === "string" ? variantsOrStyleName : styleName
  const primitive =
    typeof variantsOrStyleName === "function"
      ? styledPrimitive(component, css, variantsOrStyleName, styleName)
      : styledPrimitive(component, css, styleName)
  return getSemanticUniversalPrimitive(primitive)
}
