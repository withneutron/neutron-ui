import { useContext } from "react"
import { CssConditionsContext } from "../providers/QuarksProvider"

export function useStyleConditions() {
  const conditions = useContext(CssConditionsContext)
  return conditions
}
