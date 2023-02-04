import { useContext } from "react"
import { QuarksContext } from "../providers/QuarksProvider"

export function useTokens() {
  const { tokenValue } = useContext(QuarksContext)
  return { tokenValue }
}
