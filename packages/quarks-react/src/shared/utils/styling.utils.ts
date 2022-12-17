import { CSS, VariantCSS } from "@withneutron/quarks"

type StringBoolean = "true" | "false"

type Variants = {
  [name: string]: { [value: string]: CSS }
}

/** Used to strictly enforce CSS typing in variant definitions */
type StrictVariantsCSS<V extends Variants> = {
  [name in keyof V]: { [value in keyof V[name]]: CSS }
}

type VariantProps<V extends Variants> = {
  [prop in keyof V]?: keyof V[prop] extends StringBoolean ? boolean : keyof V[prop]
}

/** Helper function to define style variants in a simple nested (and fully typed) object */
export function variants<V extends Variants = Variants>(variantDefinitions: V | StrictVariantsCSS<V>) {
  // We can pre-generate prop arrays from the definition, so that
  // we don't have to do so multiple times at run-time.
  const props = Object.keys(variantDefinitions)

  const variantStyles = (variantProps: VariantProps<V>) => {
    const variantCss: VariantCSS = []
    props.forEach(propName => {
      const variant = variantDefinitions[propName]
      const variantValue = String(variantProps[propName])
      const css = variant[variantValue]
      if (css) {
        const keyValue = variantValue === "true" ? "" : `-${variantValue}`
        variantCss.push({
          key: `${propName}${keyValue}`,
          css,
        })
      }
    })
    return variantCss
  }

  // Save these props for later, to filter them out of props that get passed to the DOM
  variantStyles.props = props

  return variantStyles
}
