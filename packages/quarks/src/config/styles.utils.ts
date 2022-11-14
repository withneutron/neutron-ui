import { CSS } from "./styles.css"

/** Generates a CSS class name from a `className` string, plus an optional pseudo-class */
export function getSelector(className: string, pseudoClass = "") {
  return `.${className}${pseudoClass}`
}

type MaybeCSS = CSS | false | null | undefined

/** Keeps the order of merged CSS selectors & props, unlike a regular merge, if an object key is repeated */
export const mergeCss = (...cssObject: MaybeCSS[]): CSS => {
  const mergedObj = {} as Record<string, any>

  // Loop through each CSS object
  cssObject.forEach((obj: MaybeCSS): void => {
    // Skip falsy values
    if (!obj) return

    // Loop through each property of the object
    Object.keys(obj).forEach((k: string): void => {
      type ObjKey = keyof typeof obj
      const key = k as ObjKey
      const newValue = obj[key]

      if (mergedObj[key] === undefined) {
        mergedObj[key] = newValue
      } else if (newValue && typeof newValue === "object") {
        const oldValue = mergedObj[key] ? (mergedObj[key] as CSS) : ({} as CSS)
        mergedObj[key] = mergeCss(oldValue, newValue as CSS)
      } else {
        // For primitives, just replace the old value with the new one, after deleting
        // the old one to preserve the order of properties.
        delete mergedObj[key]
        mergedObj[key] = newValue
      }
    })
  })
  return mergedObj as CSS
}
