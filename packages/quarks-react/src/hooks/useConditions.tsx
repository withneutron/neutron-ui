import { useContext } from "react"
import { CssConditionsContext } from "../providers/QuarksProvider"

export function useConditions() {
  const conditions = useContext(CssConditionsContext)
  return conditions
}
