import { CharHash } from "../utils"
import { ThemeScale, Keyframes } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `animation` theme scale */
export function getAnimation(hash: CharHash, keyframeHash: CharHash) {
  const spin = keyframeHash.name
  const spinAndPause = keyframeHash.name
  const flashSize = keyframeHash.name
  const bounceUp = keyframeHash.name
  const bounceRight = keyframeHash.name
  const bounceDown = keyframeHash.name
  const bounceLeft = keyframeHash.name
  const keyframes: Keyframes = {
    [spin]: {
      "0%, 5.1%": { transform: "rotate(0deg)" },
      "20%, 80%": { transform: "rotate(180deg)" },
      "50%, to": { transform: "rotate(360deg)" },
    },
    [spinAndPause]: {
      "0%, 25.1%": { transform: "rotate(0deg)" },
      "10%, 40%": { transform: "rotate(180deg)" },
      "25%, 50%, to": { transform: "rotate(360deg)" },
    },
    [flashSize]: {
      "0%, to": { transform: "scale3d(1, 1, 1)" },
      "50%": { transform: "scale3d(1.12, 1.12, 1)" },
    },
    [bounceUp]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, -30px, 0) scaleY(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, -15px, 0) scaleY(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleY(.95)",
      },
      "45%": {
        transform: "translate3d(0, -4px, 0) scaleY(1.02)",
      },
    },
    [bounceRight]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(30px, 0, 0) scaleX(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(15px, 0, 0) scaleX(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleX(.95)",
      },
      "45%": {
        transform: "translate3d(4px, 0, 0) scaleX(1.02)",
      },
    },
    [bounceDown]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, 30px, 0) scaleY(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(0, 15px, 0) scaleY(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleY(.95)",
      },
      "45%": {
        transform: "translate3d(0, 4px, 0) scaleY(1.02)",
      },
    },
    [bounceLeft]: {
      "0%, 10%, 26.5%, 50%, to": {
        animationTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0)",
      },
      "20%, 21.5%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(-30px, 0, 0) scaleX(1.1)",
      },
      "35%": {
        animationTimingFunction: "cubic-bezier(.755, .05, .855, .06)",
        transform: "translate3d(-15px, 0, 0) scaleX(1.05)",
      },
      "40%": {
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
        transform: "translate3d(0, 0, 0) scaleX(.95)",
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
    flashSizeDuration: { ...hash.var, value: ".5s" },
    bounceDuration: { ...hash.var, value: "2.5s" },
  } as const

  const transition = {
    transitionProperty: `opacity, transform`,
    transitionDuration: vars.defaultDuration.ref,
  } as const
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
      animationName: spin,
      animationDuration: vars.spinDuration.ref,
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "both",
    },
    spinAndPause: {
      animationName: spinAndPause,
      animationDuration: vars.spinAndPauseDuration.ref,
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "both",
    },
    flashSize: {
      animationName: flashSize,
      animationDuration: vars.flashSizeDuration.ref,
      animationIterationCount: "2",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "both",
    },
    bounceUp: {
      animationName: bounceUp,
      animationDuration: vars.bounceDuration.ref,
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "both",
      transformOrigin: "center bottom",
    },
    bounceRight: {
      animationName: bounceRight,
      animationDuration: vars.bounceDuration.ref,
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "both",
      transformOrigin: "left center",
    },
    bounceDown: {
      animationName: bounceDown,
      animationDuration: vars.bounceDuration.ref,
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "both",
      transformOrigin: "center top",
    },
    bounceLeft: {
      animationName: bounceLeft,
      animationDuration: vars.bounceDuration.ref,
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "both",
      transformOrigin: "right center",
    },
    // Animated Transitions
    slideInTop: transition,
    slideOutTop: {
      ...hidden,
      ...transition,
      transform: slideTop,
    },
    slideInRight: transition,
    slideOutRight: {
      ...hidden,
      ...transition,
      transform: slideRight,
    },
    slideInBottom: transition,
    slideOutBottom: {
      ...hidden,
      ...transition,
      transform: slideBottom,
    },
    slideInLeft: transition,
    slideOutLeft: {
      ...hidden,
      ...transition,
      transform: slideLeft,
    },

    fadeIn: transition,
    fadeOut: {
      ...hidden,
      ...transition,
    },

    zoomIn: transition,
    zoomOut: {
      ...hidden,
      ...transition,
      transform: "scale3d(.5,.5,1)",
    },
  } as const

  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
    keyframes,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, Record<any, any>, typeof keyframes>
}

// FILTER KEYS ////////////////////////////////////////////////////////////////
// Used for generating types that map to only parts of this scale

export const animationDurations = {
  fastDuration: true,
  slowDuration: true,
  defaultDuration: true,
  spinDuration: true,
  spinAndPauseDuration: true,
  flashSizeDuration: true,
  bounceDuration: true,
} as const

export const animationCombos = {
  spin: true,
  spinAndPause: true,
  flashSize: true,
  bounceUp: true,
  bounceRight: true,
  bounceDown: true,
  bounceLeft: true,
  slideInTop: true,
  slideOutTop: true,
  slideInRight: true,
  slideOutRight: true,
  slideInBottom: true,
  slideOutBottom: true,
  slideInLeft: true,
  slideOutLeft: true,
  fadeIn: true,
  fadeOut: true,
  zoomIn: true,
  zoomOut: true,
} as const
