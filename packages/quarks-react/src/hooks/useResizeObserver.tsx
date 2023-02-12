import type { RefObject } from "react"
import { useMemo, useEffect } from "react"
import { getRefElement, isSSR } from "../shared/utils"

const DEFAULT_OPTIONS: ResizeObserverOptions = {
  box: "device-pixel-content-box",
}

export const useResizeObserver = (
  target: RefObject<Element> | Element | null,
  callback: (
    size: Array<{ height: number; width: number }>,
    entries: ResizeObserverEntry[],
    observer: ResizeObserver
  ) => void,
  options: ResizeObserverOptions = DEFAULT_OPTIONS
): void => {
  const observer = useMemo(
    () =>
      !isSSR
        ? new ResizeObserver((entries, observerInstance) => {
            callback(
              entries.map(entry => ({
                height: entry.contentBoxSize?.[0].blockSize ?? entry.contentRect.height,
                width: entry.contentBoxSize?.[0].inlineSize ?? entry.contentRect.width,
              })),
              entries,
              observerInstance
            )
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
