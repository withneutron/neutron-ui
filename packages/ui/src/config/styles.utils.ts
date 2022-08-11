export function getSelector(className: string, condition = "") {
  return `.${className}${condition}`
}
