import type { RefObject } from "react"
import { useMemo, useEffect } from "react"
import { getRefElement, isSSR } from "../shared/utils"

const DEFAULT_OPTIONS: ResizeObserverOptions = {
  // TODO: Switch to "device-pixel-content-box", once it's supported in Safari.
  box: "content-box",
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
      try {
        observer.observe(element, options)
      } catch (error) {
        console.warn("ResizeObserver Error", error)
        return () => undefined
      }
      return () => observer.disconnect()
    }
    return undefined
  }, [target, observer, options])
}
