export const toKebabCase = (text: string): string => {
  const matches = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  return matches && matches.length > 0 ? matches.map(x => x.toLowerCase()).join("-") : ""
}
