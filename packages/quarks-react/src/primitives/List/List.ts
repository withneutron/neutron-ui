import { styled } from "../../config"

const LIST_STYLES = {
  mb: "$20",
  mt: "$0",
} as const
export const getListStyles = () => LIST_STYLES
export const List = styled("ul", getListStyles(), "List")
