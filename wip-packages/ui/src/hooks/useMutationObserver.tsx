import type { RefObject } from "react"
import { useMemo, useEffect } from "react"
import { getRefElement, isSSR } from "../shared/utils/dom.utils"

const DEFAULT_OPTIONS = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
}

interface Props {
  target: RefObject<Element> | Element | Node | null
  callback: MutationCallback
  options?: MutationObserverInit
}

export const useMutationObserver = ({
  target,
  callback,
  options = DEFAULT_OPTIONS,
}: Props): void => {
  const observer = useMemo(
    () =>
      !isSSR
        ? new MutationObserver((mutationRecord, mutationObserver) => {
            callback?.(mutationRecord, mutationObserver)
          })
        : null,
    [callback]
  )

  useEffect(() => {
    const element = getRefElement(target)
    if (observer && element) {
      observer.observe(element, options)
      return () => observer.disconnect()
    }
    return undefined
  }, [target, observer, options])
}
