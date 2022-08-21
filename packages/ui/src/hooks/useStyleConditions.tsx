import { CssConditionsContext } from "../providers/UIProvider"
import { useContext } from "react"

export function useStyleConditions() {
  const conditions = useContext(CssConditionsContext)
  return conditions
}
