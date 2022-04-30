import type { HTMLAttributes, ReactNode, RefObject } from "react"
import { cloneElement, isValidElement } from "react"
import { VariantProps } from "@stitches/react"
import { getSmartypantsComponent } from "../../shared/utils"

export type StyledRef =
  | ((instance: HTMLElement | null) => void)
  | RefObject<HTMLElement>
  | null
  | undefined

// eslint-disable-next-line
export function getSemantic(
  // eslint-disable-next-line
  Comp: any,
  tag?: keyof JSX.IntrinsicElements,
  improveTypography = false
) {
  const Wrapper = (
    props: HTMLAttributes<HTMLElement> & VariantProps<typeof Comp>,
    ref?: StyledRef
  ): ReactNode | null => {
    const node = cloneElement(<Comp />, { as: tag, ref, ...props })
    if (improveTypography && isValidElement(node)) {
      return getSmartypantsComponent(node)
    }
    return node
  }
  const suffix = tag ? `.${tag}` : ""
  return Object.assign({}, Comp, {
    render: Wrapper,
    displayName: `${Comp.displayName || "Styled"}${suffix}`,
  })
}
