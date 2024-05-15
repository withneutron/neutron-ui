import { CSS, getCssText, Theme, ThemeValues, VariantType } from "./stitches.config"
import {
  THEME_FULL_PROPS,
  THEME_PRIMITIVE_PROPS,
  THEME_STYLE_PROPS,
  SemanticLayoutPrimitive,
  SemanticTextPrimitive,
  SemanticHeadingPrimitive,
  ClientElement,
} from "../shared/models"
import { isSSR } from "../shared/utils/dom.utils"
import { getSemantic } from "../utilityComponents"

/** Get the styled markup for SSR, based on a generator */
export const getStyledMarkup = (generator: () => string): string => {
  // Render the markup
  let markup = generator()

  // Then append our styles to the very end of the <head>
  const styles = `<style id="stitches">${getCssText()}</style>`
  markup = markup.replace("</head>", `${styles}</head>`)
  return markup
}

/** Get the DOM element that contains a theme's className */
export const getThemeElement = (theme: ThemeValues): ClientElement =>
  isSSR ? null : document.querySelector<HTMLElement>(`.${theme}`)

/** Merges 2 or more Stitches (partial) themes */
export const mergeThemes = (themes: (Theme | undefined)[]): Theme => {
  if (themes.length === 0) {
    return {} as Theme
  }
  return themes.reduce((output: Theme, theme: Theme | undefined) => {
    if (!theme) {
      return output
    }
    THEME_FULL_PROPS.forEach((prop: string) => {
      if (theme[prop as keyof Theme] !== undefined) {
        // Null values will clear preceding values
        if (theme[prop as keyof Theme] === null) {
          delete output[prop as keyof Theme]
        } else {
          output[prop as keyof Omit<Theme, "length">] = THEME_PRIMITIVE_PROPS.includes(prop)
            ? (theme[prop as keyof Theme] as any)
            : Object.assign({}, output[prop as keyof Theme], theme[prop as keyof Theme])
        }
      }
    })
    return output
  }, {} as Theme) as Theme
}

/** Merges 2 or more Stitches (partial) theme styles (i.e., source values) */
export const mergeThemeValues = (themes: (ThemeValues | undefined)[]): ThemeValues => {
  if (themes.length === 0) {
    return {} as ThemeValues
  }
  return themes.reduce((output: ThemeValues, theme: ThemeValues | undefined) => {
    if (!theme) {
      return output
    }
    THEME_STYLE_PROPS.forEach((prop: string) => {
      if (theme[prop as keyof ThemeValues] !== undefined) {
        // Null values will clear preceding values
        if (theme[prop as keyof ThemeValues] === null) {
          delete output[prop as keyof ThemeValues]
        } else {
          output[prop as keyof ThemeValues] = THEME_PRIMITIVE_PROPS.includes(prop)
            ? theme[prop as keyof ThemeValues]
            : Object.assign({}, output[prop as keyof ThemeValues], theme[prop as keyof ThemeValues])
        }
      }
    })
    return output
  }, {} as ThemeValues) as ThemeValues
}

/** Generates a series of typed, semantic layout primitives associated with an input component */
// eslint-disable-next-line
export function getSemanticLayoutPrimitive<T>(Comp: T) {
  const output = Comp as SemanticLayoutPrimitive<T>
  // Semantic HTML shortcuts
  output.article = getSemantic(Comp, "article")
  output.aside = getSemantic(Comp, "aside")
  output.dialog = getSemantic(Comp, "dialog")
  output.div = getSemantic(Comp, "div")
  output.footer = getSemantic(Comp, "footer")
  output.header = getSemantic(Comp, "header")
  output.label = getSemantic(Comp, "label")
  output.main = getSemantic(Comp, "main")
  output.nav = getSemantic(Comp, "nav")
  output.section = getSemantic(Comp, "section")
  return output
}

/** Generates a series of typed, semantic text primitives associated with an input component */
// eslint-disable-next-line
export function getSemanticTextPrimitive<T>(Comp: T) {
  const output = getSemantic(Comp, undefined, true) as SemanticTextPrimitive<T>
  // Semantic HTML shortcuts
  output.blockquote = getSemantic(Comp, "blockquote", true)
  output.code = getSemantic(Comp, "code", true)
  output.del = getSemantic(Comp, "del", true)
  output.em = getSemantic(Comp, "em", true)
  output.i = getSemantic(Comp, "i", true)
  output.ins = getSemantic(Comp, "ins", true)
  output.label = getSemantic(Comp, "label", true)
  output.p = getSemantic(Comp, "p", true)
  output.pre = getSemantic(Comp, "pre", true)
  output.small = getSemantic(Comp, "small", true)
  output.span = getSemantic(Comp, "span", true)
  output.strong = getSemantic(Comp, "strong", true)
  output.time = getSemantic(Comp, "time", true)
  return output
}

/** Generates a series of typed, semantic heading primitives associated with an input component */
// eslint-disable-next-line
export function getSemanticHeadingPrimitive<T>(Comp: T) {
  const output = getSemantic(Comp, undefined, true) as SemanticHeadingPrimitive<T>
  // Semantic HTML shortcuts
  output.h1 = getSemantic(Comp, "h1", true)
  output.h2 = getSemantic(Comp, "h2", true)
  output.h3 = getSemantic(Comp, "h3", true)
  output.h4 = getSemantic(Comp, "h4", true)
  output.h5 = getSemantic(Comp, "h5", true)
  output.h6 = getSemantic(Comp, "h6", true)
  return output
}

/** Replaces a value in a (responsive) Stitches variant */
export function swapVariantValues<T extends VariantType = VariantType>(
  variant: T,
  searchValue: string,
  replaceValue: string
): string | T {
  if (typeof variant === "string" && variant === searchValue) {
    return replaceValue
  } else if (typeof variant !== "object") {
    return variant
  }
  return Object.keys(variant).reduce((output: T, key: string): T => {
    if (String(variant[key as keyof T]) === searchValue) output[key as keyof T] = replaceValue as any
    return output
  }, {} as T)
}
