import {
  ComponentPropsWithRef,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  JSXElementConstructor,
  memo,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useStyleConditions } from "../hooks"
import { CSS, VariantCSS, style, StyleManager, capitalizeFirstLetter } from "@withneutron/quarks"
import { getSemanticUniversalPrimitive } from "./config.utils"
import { ComponentType } from "../shared/models"

/** Used to style any React component of basic HTML element */
export function styled<C extends ComponentType, V extends Variants | undefined>(
  component: C,
  css: CSS,
  variants?: string | V,
  styleName?: string
) {
  styleName = typeof variants === "string" ? variants : styleName
  const hasVariants = !!variants && typeof variants !== "string"
  const variantsDefinition = hasVariants ? variants : undefined
  const variantKeys: string[] = hasVariants ? Object.keys(variants) : []
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
    const { as: polyAs, css: propsCss, styleManager, isSemantic, className, index, length, ...mainProps } = props

    // Get any variants that are valid, based on our incoming mainProps
    const variantCss = useVariants(mainProps, hasVariants, variantKeys, variantsDefinition)

    const hasStyleManager = !!styleManager
    const isIntrinsic = typeof component === "string"
    const isStyledComponent = !!(component as any).isStyledComponent
    const Element = useMemo(
      () =>
        !isStyledComponent ? (polyAs as FunctionComponent<any>) ?? component : (component as FunctionComponent<any>),
      [polyAs]
    )

    const styleProps = style(css, conditions, variantCss, propsCss, styleName, styleManager, {
      className,
      index,
      length,
      isIntrinsic,
      isStyledComponent,
    })

    // Because this is memoized, it can be seen in react-devtools
    useMemo(() => ({ debug: styleProps.debug }), [styleProps])
    delete styleProps.debug

    if (hasVariants && hasVariantKeys) {
      variantKeys.forEach(key => {
        delete mainProps[key as keyof typeof mainProps]
      })
    }

    useEffect(() => {
      if (mainProps.style && !hasStyleManager) {
        const isStringPolyAs = typeof polyAs === "string" && polyAs
        const polySuffix = isStringPolyAs && isSemantic ? `.${capitalizeFirstLetter(polyAs)}` : ""
        const polyTail = isStringPolyAs && !isSemantic ? ` (as ${polyAs})` : ""
        const prefix = styleName ? `Component \`${styleName}${polySuffix}\`${polyTail}` : "Component"
        console.warn(
          `${prefix} does not support direct usage of the \`style\` prop. Please use the \`css\` prop for inline styling`
        )
      }
    }, [mainProps.style, hasStyleManager, polyAs, isSemantic])

    return <Element as={!isStyledComponent ? undefined : polyAs} ref={ref} {...mainProps} {...styleProps} />
  }
  styledComponent.displayName = styleName
  const outputComponent = memo(forwardRef(styledComponent)) as any as typeof styledComponent
  ;(outputComponent as any).isStyledComponent = true
  return outputComponent
}

/** Used to create styling primitives, like `Row`, `Column`, etc.
 * The output component will include semantic HTML variants, such as `Component.Aside`. */
export function styledPrimitive<C extends ComponentType, V extends Variants | undefined>(
  component: C,
  css: CSS,
  variants?: string | V,
  styleName?: string
) {
  styleName = typeof variants === "string" ? variants : styleName
  const primitive =
    typeof variants === "object" ? styled(component, css, variants, styleName) : styled(component, css, styleName)
  return getSemanticUniversalPrimitive(primitive)
}

// HOOKS //////////////////////////////////////////////////////////////////////////////////////////
function useVariants<P extends Record<string, any>, V extends Variants>(
  props: P,
  hasVariants: boolean,
  variantKeys: string[],
  variantsDefinition?: NonNullable<V>
) {
  const [variantCss, setVariantCss] = useState<VariantCSS>([])
  const [cacheKey, setCacheKey] = useState("")
  const prevDefinition = useRef(variantsDefinition)
  const hasChanged = variantsDefinition !== prevDefinition.current

  // Process new values
  if (hasVariants && variantsDefinition) {
    const newVariantCss: VariantCSS = []
    let newCacheKey = ""
    let i = 0
    for (; i < variantKeys.length; i++) {
      const variant = variantsDefinition[variantKeys[i] as VariantKey]
      const variantValue = props[variantKeys[i] as VariantKey] ? String(props[variantKeys[i] as VariantKey]) : undefined
      if (variantValue && variant[variantValue]) {
        const keyValue = variantValue === "true" ? "" : `-${variantValue}`
        const key = `${variantKeys[i]}${keyValue}`
        newCacheKey += key
        newVariantCss.push({ key, css: variant[variantValue] })
      }
    }

    // Only update reference if variant values have changed
    if (hasChanged || newCacheKey !== cacheKey) {
      setVariantCss(newVariantCss)
      setCacheKey(newCacheKey)
      prevDefinition.current = variantsDefinition
    }
  }

  return variantCss
}

// TYPES //////////////////////////////////////////////////////////////////////////////////////////

type BooleanString = "true" | "false"

type Variants = {
  [name: string]: { [value: string]: CSS }
}
type VariantKey = keyof Variants

type VariantProps<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends BooleanString ? boolean : keyof V[prop]
}

type StylelessComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<
  ComponentPropsWithRef<T>,
  "css" | "styleManager"
>

type BaseStyledProps<V extends Variants | undefined> = V extends Variants
  ? { css?: CSS; styleManager?: StyleManager } & VariantProps<V>
  : { css?: CSS; styleManager?: StyleManager }
