import { CharHash } from "../CharHash"
import { ThemeScale, Keyframes } from "./models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./utils"

/** Generator function for `animation` theme scale */
export function getAnimation(hash: CharHash, keyframeHash: CharHash) {
  const spin = keyframeHash.name
  const spinAndPause = keyframeHash.name
  const bounceTop = keyframeHash.name
  const bounceRight = keyframeHash.name
  const bounceBottom = keyframeHash.name
  const bounceLeft = keyframeHash.name
  const keyframes: Keyframes = {
    [spin]: {
      "0%, 50.1%": { transform: "rotate(0deg)" },
      "20%, 80%": { transform: "rotate(180deg)" },
      "50%, to": { transform: "rotate(360deg)" },
    },
    [spinAndPause]: {
      "0%, 25.1%": { transform: "rotate(0deg)" },
      "10%, 40%": { transform: "rotate(180deg)" },
      "25%, 50%, to": { transform: "rotate(360deg)" },
    },
    [bounceTop]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(0, -30px, 0) scaleY(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(0, -15px, 0) scaleY(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0) scaleY(0.95)",
      },
      "45%": {
        transform: "translate3d(0, -4px, 0) scaleY(1.02)",
      },
    },
    [bounceRight]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(30px, 0, 0) scaleX(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(15px, 0, 0) scaleX(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0) scaleX(0.95)",
      },
      "45%": {
        transform: "translate3d(4px, 0, 0) scaleX(1.02)",
      },
    },
    [bounceBottom]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(0, 30px, 0) scaleY(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(0, 15px, 0) scaleY(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0) scaleY(0.95)",
      },
      "45%": {
        transform: "translate3d(0, 4px, 0) scaleY(1.02)",
      },
    },
    [bounceLeft]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(-30px, 0, 0) scaleX(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        transform: "translate3d(-15px, 0, 0) scaleX(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        transform: "translate3d(0, 0, 0) scaleX(0.95)",
      },
      "45%": {
        transform: "translate3d(-4px, 0, 0) scaleX(1.02)",
      },
    },
  }

  const fastDuration = { ...hash.var, value: ".25s" }
  const vars = {
    fastDuration,
    slowDuration: { ...hash.var, value: ".75s" },
    defaultDuration: { ...hash.var, value: fastDuration.ref },
    spinDuration: { ...hash.var, value: "1.25s" },
    spinAndPauseDuration: { ...hash.var, value: "1.75s" },
    bounceDuration: { ...hash.var, value: "2.5s" },
  } as const

  const transition = `opacity ${vars.defaultDuration}, transform ${vars.defaultDuration}` as const
  const slideOn = { transition } as const
  const hidden = {
    opacity: "0",
    pointerEvents: "none",
  } as const
  const slideTop = "translate3d(0,-100%,0)" as const
  const slideRight = "translate3d(-100%,0,0)" as const
  const slideBottom = "translate3d(0,100%,0)" as const
  const slideLeft = "translate3d(100%,0,0)" as const

  const cssValueMap = {
    ...getCssMapFromVars(vars),
    // Animations
    spin: {
      animation: `${spin} ${vars.spinDuration.ref} infinite linear`,
    },
    spinAndPause: {
      animation: `${spin} ${vars.spinAndPauseDuration.ref} infinite linear`,
    },
    bounceTop: {
      animation: `${bounceTop} ${vars.bounceDuration.ref} infinite linear`,
      transformOrigin: "center bottom",
    },
    bounceRight: {
      animation: `${bounceRight} ${vars.bounceDuration.ref} infinite linear`,
      transformOrigin: "left center",
    },
    bounceBottom: {
      animation: `${bounceBottom} ${vars.bounceDuration.ref} infinite linear`,
      transformOrigin: "center top",
    },
    bounceLeft: {
      animation: `${bounceLeft} ${vars.bounceDuration.ref} infinite linear`,
      transformOrigin: "right center",
    },
    // Animated Transitions
    slideTopOn: slideOn,
    slideTopOff: {
      pointerEvents: "none",
      transform: slideTop,
      transition,
    },
    slideRightOn: slideOn,
    slideRightOff: {
      pointerEvents: "none",
      transform: slideRight,
      transition,
    },
    slideBottomOn: slideOn,
    slideBottomOff: {
      pointerEvents: "none",
      transform: slideBottom,
      transition,
    },
    slideLeftOn: slideOn,
    slideLeftOff: {
      pointerEvents: "none",
      transform: slideLeft,
      transition,
    },

    fadeTopOn: slideOn,
    fadeTopOff: {
      ...hidden,
      transform: slideTop,
      transition,
    },
    fadeRightOn: slideOn,
    fadeRightOff: {
      ...hidden,
      transform: slideRight,
      transition,
    },
    fadeBottomOn: slideOn,
    fadeBottomOff: {
      ...hidden,
      transform: slideBottom,
      transition,
    },
    fadeLeftOn: slideOn,
    fadeLeftOff: {
      ...hidden,
      transform: slideLeft,
      transition,
    },

    fadeCenterOn: slideOn,
    fadeCenterOff: {
      ...hidden,
      transform: "scale3d(.5,.5,1)",
      transition,
    },
  } as const

  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    keyframes,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}