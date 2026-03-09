import { useState, useEffect, useRef } from "react"

interface TransitionResult {
  active: boolean
  mounted: boolean
  style: Record<string, any>
}

interface TransitionOptions {
  enter?: number
  exit?: number
}

export function useTransition(visible: boolean, options?: TransitionOptions): TransitionResult {
  const [mounted, setMounted] = useState(visible)
  const [active, setActive] = useState(visible)
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (exitTimer.current) clearTimeout(exitTimer.current)

    if (visible) {
      setMounted(true)
      setTimeout(() => setActive(true), 0)
    } else {
      setActive(false)
      const delay = options?.exit ?? 200
      exitTimer.current = setTimeout(() => setMounted(false), delay)
    }
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current)
    }
  }, [visible, options?.exit])

  return {
    active,
    mounted,
    style: { opacity: active ? 1 : 0 },
  }
}
