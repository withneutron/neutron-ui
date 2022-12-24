import { CSS } from "@withneutron/quarks"
import { useState, useEffect } from "react"

export function useAnimation(
  hideAnimation: CSS["animation"],
  showAnimation: CSS["animation"],
  shouldHide = false,
  hideDelay = 230
) {
  const [animation, setAnimation] = useState<CSS["animation"]>(hideAnimation)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimation(showAnimation)
    }, 20)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (shouldHide) {
      setAnimation(hideAnimation)
      timeout = setTimeout(() => setIsVisible(false), hideDelay)
    } else {
      setIsVisible(true)
      timeout = setTimeout(() => setAnimation(showAnimation), 20)
    }
    return () => clearTimeout(timeout)
  }, [shouldHide])

  return {
    animation,
    isVisible,
  }
}
