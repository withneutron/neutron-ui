import * as React from "react"
import { useSubmit, Form } from "remix"
import { Button } from "~ui"

interface FallbackTextProps {
  fallbackSubmitText?: string
  fallbackSubmitElement?: never
}

interface FallbackElementProps {
  fallbackSubmitText?: never
  fallbackSubmitElement?: React.ReactElement
}

type SyncProps = (FallbackTextProps | FallbackElementProps) & {
  children?: React.ReactNode
  delay?: number
  inputDelay?: number
  manually?: boolean
  replace?: boolean
  thenReset?: boolean
  viaPUT?: boolean
  viaGET?: boolean
  disabled?: boolean
  onSubmit?: (event: React.FormEvent) => void
}

export function Sync({
  children,
  delay = 0,
  fallbackSubmitText = "Submit",
  fallbackSubmitElement,
  inputDelay = 1000,
  manually = false,
  replace = true,
  thenReset = true,
  viaPUT = false,
  viaGET = false,
  disabled = false,
  onSubmit = () => undefined,
}: SyncProps): React.ReactElement {
  const submit = useSubmit()
  const ref = React.useRef<HTMLFormElement>(null)
  const debounce = React.useRef<NodeJS.Timeout>()
  const defaultMethod = viaPUT ? "put" : "post"

  const reset = React.useCallback(() => {
    setTimeout(() => {
      ref.current?.reset()
      // Update children, post reset
      const event = new Event("reset", { bubbles: true })
      const children = ref.current?.querySelectorAll("input, textarea, select") || []
      for (let item of children) {
        item.dispatchEvent(event)
      }
    })
  }, [ref.current])

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      if (disabled) {
        event.preventDefault()
      } else {
        onSubmit(event)
        if (thenReset) {
          reset()
        }
      }
    },
    [disabled]
  )

  const handleInput = React.useCallback(
    ({ type }: React.FormEvent<HTMLFormElement>) => {
      const isInput = type === "input"
      debounce.current && clearTimeout(debounce.current)
      if (ref.current) {
        debounce.current = setTimeout(
          () => {
            submit(ref.current, { replace })
          },
          isInput ? inputDelay : delay
        )
      }
    },
    [submit, ref.current]
  )

  // Clear on destroy
  React.useEffect(() => () => debounce.current && clearTimeout(debounce.current), [])

  return (
    <Form
      method={viaGET ? "get" : defaultMethod}
      ref={ref}
      replace={replace}
      onInput={!manually ? handleInput : undefined}
      onSubmit={manually ? handleSubmit : undefined}
    >
      {children}
      <noscript>
        {!manually && fallbackSubmitElement}
        {!manually && !fallbackSubmitElement && <Button submit>{fallbackSubmitText}</Button>}
      </noscript>
    </Form>
  )
}
Sync.displayName = "Sync"

// SEMANTIC WRAPPERS //
export function Get(props: SyncProps): React.ReactElement {
  return <Sync {...props} viaGET viaPUT={false} />
}
Get.displayName = "Get"

export function Put(props: SyncProps): React.ReactElement {
  return <Sync {...props} viaPUT viaGET={false} />
}
Put.displayName = "Put"

export function Post(props: SyncProps): React.ReactElement {
  return <Sync {...props} viaGET={false} viaPUT={false} />
}
Post.displayName = "Post"

export function Autosave(props: SyncProps): React.ReactElement {
  return <Sync {...props} manually={false} />
}
Autosave.displayName = "Autosave"
