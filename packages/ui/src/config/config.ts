import { CharHash } from "packages/ui/src/config/CharHash"
import { scaledProps, props, directionalProps, conditionNames } from "./cssProps"

export function createCSS() {
  const hasName: Record<string, boolean> = {}
  const styles: Record<string, any> = {}
  const dyanmicProps: Record<string, any> = {}
  const staticProps: Record<string, any> = {}

  const addClass = (propName: string, className: string) => {
    if (hasName[propName]) {
      return
    }
    const isDirectional = directionalProps[propName as keyof typeof directionalProps]

    const conditions: Record<string, any> = {}
    conditionNames.forEach((bp: string) => {
      if (isDirectional) {
        const ltrKey = ltrConditionKeys[bp as keyof typeof ltrConditionKeys] ?? ""
        const rtlKey = rtlConditionKeys[bp as keyof typeof rtlConditionKeys] ?? ""
        conditions[bp as keyof typeof conditions] = {
          className: `${className}${ltrKey ? "-" : ""}${ltrKey}`,
          var: `--${className}${ltrKey ? "-" : ""}${ltrKey}`,
        }
        conditions[`${bp}RTL`] = {
          className: `${className}${rtlKey ? "-" : ""}${rtlKey}`,
          var: `--${className}${rtlKey ? "-" : ""}${rtlKey}`,
        }
      } else {
        const key = conditionKeys[bp as keyof typeof conditionKeys] ?? ""
        conditions[bp] = {
          className: `${className}${key ? "-" : ""}${key}`,
          var: `--${className}${key ? "-" : ""}${key}`,
        }
      }
    })

    hasName[propName] = true
    const styleName = camelize(propName)
    styles[styleName] = {
      conditions,
      cssProp: propName,
    }

    if (!isDirectional) {
      styles[styleName].className = className
      styles[styleName].var = `--${className}`
      if (!scaledProps[styleName as keyof typeof scaledProps]) {
        staticProps[styleName] = styles[styleName]
      }
    } else if (!scaledProps[styleName as keyof typeof scaledProps]) {
      console.log(styleName)
    }

    if (scaledProps[styleName as keyof typeof scaledProps] || isDirectional) {
      dyanmicProps[styleName] = styles[styleName]
    }
  }

  const hash = new CharHash()

  props.forEach((prop: string) => {
    addClass(prop, hash.name)
  })

  // These should use CSS vars, instead of generating all possible values.
  // They can also use a theme scale for typing purposes, if possible (e.g., `color`, `size`, etc.)
  console.log("dyanmicProps", Object.keys(dyanmicProps).length, dyanmicProps)
  // These should have pre-defined utility classes for all possible values,
  // including for responsive purposes.
  console.log("staticProps", Object.keys(staticProps).length, staticProps)

  return styles
}

console.log(createCSS())
