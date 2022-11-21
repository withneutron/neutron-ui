import {
  ComponentPropsWithRef,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  JSXElementConstructor,
  useEffect,
  useMemo,
} from "react"
import { useStyleConditions } from "../hooks"
import { CSS, VariantCSS, style, StyleManager, capitalizeFirstLetter } from "@withneutron/quarks"
import { getSemanticUniversalPrimitive } from "./config.utils"
import { ComponentType } from "../shared/models"
import { getVariantKeys } from "./styled.utils"

type StylelessComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<
  ComponentPropsWithRef<T>,
  "css" | "styleManager"
>

type VariantFunction<T extends Record<string, any>> = (variants: T) => VariantCSS

type BaseStyledProps<V extends Record<string, any> | undefined> = V extends Record<string, any>
  ? { css?: CSS; styleManager?: StyleManager } & V
  : { css?: CSS; styleManager?: StyleManager }

/** Used to create styling primitives, like `Row`, `Column`, etc */
export function styledPrimitive<C extends ComponentType, V extends Record<string, any>>(
  component: C,
  css: CSS,
  variantsOrStyleName?: string | VariantFunction<V>,
  styleName?: string
) {
  styleName = typeof variantsOrStyleName === "string" ? variantsOrStyleName : styleName
  const hasVariants = typeof variantsOrStyleName === "function"
  const variants = hasVariants ? variantsOrStyleName : () => undefined
  const variantKeys = hasVariants ? getVariantKeys(variants) : []
  const hasVariantKeys = variantKeys.length > 0

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
    const { as: polyAs, css: propsCss, styleManager, isSemantic, ...rest } = props

    const variantCss = useMemo(() => variants(rest as any as V), [rest])

    const styleProps = useMemo(
      () => style(css, conditions, variantCss, propsCss, styleName, styleManager),
      [conditions, variantCss, propsCss, styleManager]
    )
    const className = rest.className ? `${styleProps.className} ${rest.className}` : styleProps.className

    const isIntrinsic = typeof component === "string"
    const Element = useMemo(
      () => (isIntrinsic ? (polyAs as FunctionComponent<any>) ?? component : (component as FunctionComponent<any>)),
      []
    )

    if (hasVariants && hasVariantKeys) {
      variantKeys.forEach(key => {
        delete rest[key]
      })
    }

    useEffect(() => {
      if (rest.style && !styleManager) {
        const isStringPolyAs = typeof polyAs === "string" && polyAs
        const polySuffix = isStringPolyAs && isSemantic ? `.${capitalizeFirstLetter(polyAs)}` : ""
        const polyTail = isStringPolyAs && !isSemantic ? ` (as ${polyAs})` : ""
        const prefix = styleName ? `Component \`${styleName}${polySuffix}\`${polyTail}` : "Component"
        console.warn(
          `${prefix} does not support direct usage of the \`style\` prop. Please use the \`css\` prop for inline styling`
        )
      }
    }, [])

    return (
      <Element
        as={isIntrinsic ? undefined : polyAs}
        ref={ref}
        {...rest}
        {...styleProps}
        styleManager={isIntrinsic ? undefined : styleProps.styleManager}
        className={className}
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
  variantsOrStyleName?: string | VariantFunction<V>,
  styleName?: string
) {
  styleName = typeof variantsOrStyleName === "string" ? variantsOrStyleName : styleName
  const primitive =
    typeof variantsOrStyleName === "function"
      ? styledPrimitive(component, css, variantsOrStyleName, styleName)
      : styledPrimitive(component, css, styleName)
  return getSemanticUniversalPrimitive(primitive)
}
