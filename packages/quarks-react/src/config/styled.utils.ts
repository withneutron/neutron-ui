/** Retrieves the argument names of a given function */
export function getVariantKeys(func: ((...params: any[]) => any) & { props?: string[] }) {
  // If they used our helper function, we've already done the work at the source!
  if (func.props) {
    return func.props
  }

  let funcString = func.toString().replace(/\s/g, "")
  let chunks: string[]
  const hasObjectSyntax = funcString.includes("param.")

  if (hasObjectSyntax) {
    chunks = funcString.split("param.")
  } else {
    // Start parameter names after first '('
    const start = funcString.indexOf("(") + 1
    const endArrow = funcString.indexOf(")=>")
    const endFunc = funcString.indexOf("){")
    let end = Math.min(endArrow, endFunc)

    if (end < 0) {
      end = Math.max(endArrow, endFunc)
    }

    chunks = funcString.substring(start, end).split(",")
  }

  const params: string[] = []

  chunks.forEach((chunk: string, index) => {
    const end = chunk.search(/[\W_]+/g)
    chunk = end > 0 ? chunk.substring(0, end) : chunk.replace(/[\W_]+/g, "")

    if ((index > 0 || !hasObjectSyntax) && chunk.length > 0) params.push(chunk)
  })

  return params
}
