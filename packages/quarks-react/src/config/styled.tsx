import {
  ComponentPropsWithRef,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  JSXElementConstructor,
  memo,
  useEffect,
  useMemo,
  useRef,
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

type VariantFunction<T extends Record<string, any>> = { props: string[] } & ((variants: T) => VariantCSS)

type BaseStyledProps<V extends Record<string, any> | undefined> = V extends Record<string, any>
  ? { css?: CSS; styleManager?: StyleManager } & V
  : { css?: CSS; styleManager?: StyleManager }

const variantPlaceholder: any = () => undefined
variantPlaceholder.props = []

/** Used to style any React component of basic HTML element */
export function styled<C extends ComponentType, V extends Record<string, any>>(
  component: C,
  css: CSS,
  variantsOrStyleName?: string | VariantFunction<V>,
  styleName?: string
) {
  styleName = typeof variantsOrStyleName === "string" ? variantsOrStyleName : styleName
  const hasVariants = typeof variantsOrStyleName === "function"
  const variants = hasVariants ? variantsOrStyleName : variantPlaceholder
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
    const { as: polyAs, css: propsCss, styleManager, isSemantic, className, index, length, ...rest } = props

    // Make sure this ref only changes if the output changed
    const previousVariantProps = useRef<Record<string, any>>(getVariantProps(variants.props, rest))
    const previousVariantCss = useRef<VariantCSS>()
    const variantCss = useMemo(() => {
      if (previousVariantCss.current) {
        // If our variant props haven't changed, then return the existing reference
        const arePropsMatching = areVariantPropsEqual(variants.props, rest, previousVariantProps.current)
        if (arePropsMatching) {
          return previousVariantCss.current
        }
      }
      const output = variants(rest as any as V)
      previousVariantProps.current = getVariantProps(variants.props, rest)
      previousVariantCss.current = output
      return output
    }, [rest])

    const isIntrinsic = typeof component === "string"
    const Element = useMemo(
      () => (isIntrinsic ? (polyAs as FunctionComponent<any>) ?? component : (component as FunctionComponent<any>)),
      [polyAs]
    )

    const { styleManager: innerStyleManger, ...styleProps } = useMemo(
      () => style(css, conditions, variantCss, propsCss, styleName, styleManager, { className, index, length }),
      [conditions, variantCss, propsCss, styleManager, className, index, length]
    )
    const innerProps = {} as typeof props

    if (!isIntrinsic) {
      innerProps.styleManager = innerStyleManger
    }

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

    return <Element as={isIntrinsic ? undefined : polyAs} ref={ref} {...rest} {...styleProps} {...innerProps} />
  }
  styledComponent.displayName = styleName
  return memo(forwardRef(styledComponent)) as any as typeof styledComponent
}

/** Used to create styling primitives, like `Row`, `Column`, etc.
 * The output component will include semantic HTML variants, such as `Component.Aside`. */
export function styledPrimitive<C extends ComponentType, V extends Record<string, any>>(
  component: C,
  css: CSS,
  variantsOrStyleName?: string | VariantFunction<V>,
  styleName?: string
) {
  styleName = typeof variantsOrStyleName === "string" ? variantsOrStyleName : styleName
  const primitive =
    typeof variantsOrStyleName === "function"
      ? styled(component, css, variantsOrStyleName, styleName)
      : styled(component, css, styleName)
  return getSemanticUniversalPrimitive(primitive)
}

function getVariantProps(propKeys: string[], props: Record<string, any>) {
  const output = {} as Record<string, any>
  propKeys.forEach(prop => {
    output[prop] = props[prop]
  })
  return output
}

function areVariantPropsEqual(propKeys: string[], current: Record<string, any>, previous: Record<string, any>) {
  return propKeys.every(prop => previous[prop] === current[prop])
}
