export const isSSR = !(typeof window !== "undefined" && window.document?.createElement)

type Ref<T> = React.ForwardedRef<T | null> | undefined

export function mergeRefs<T extends HTMLElement | null = HTMLElement>(refs: Ref<T>[]): (node: T) => void {
  return (node: T) => {
    refs.forEach((ref: Ref<T>) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(node)
        } else {
          try {
            ref.current = node
          } catch (error) {
            // We want this to fail silently
          }
        }
      }
    })
  }
}
