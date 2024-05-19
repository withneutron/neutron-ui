import { CSS } from "@withneutron/quarks"
import { useState, useEffect } from "react"

export function useAnimation(
  hideAnimation: CSS["animation"],
  showAnimation: CSS["animation"],
  shouldBeVisible = false,
  hideDelay = 230
) {
  const [animation, setAnimation] = useState<CSS["animation"]>(hideAnimation)
  const [isVisible, setIsVisible] = useState(shouldBeVisible)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (!shouldBeVisible) {
      setAnimation(hideAnimation)
      timeout = setTimeout(() => setIsVisible(false), hideDelay)
    } else {
      setIsVisible(true)
      timeout = setTimeout(() => setAnimation(showAnimation), 20)
    }
    return () => clearTimeout(timeout)
  }, [shouldBeVisible])

  return {
    animation,
    isVisible,
  }
}
