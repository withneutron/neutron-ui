import { styledPrimitive } from "../../config"

const LIST_STYLES = {
  mb: "$20",
  mt: "$0",
} as const
export const getListStyles = () => LIST_STYLES
export const List = styledPrimitive("ul", getListStyles(), "List")
