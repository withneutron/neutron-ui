import { BASE_VARIANTS, COLOR_VARIANTS, generateVariantSequence, keyframes } from "../../config/stitches.config"

const spin = keyframes({
  "0%, 25.1%": { transform: "rotate(0deg)" },
  "10%, 40%": { transform: "rotate(180deg)" },
  "25%, 50%, to": { transform: "rotate(360deg)" },
})
const bounce = keyframes({
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
})

const heightVariants = generateVariantSequence(
  30,
  (n: number) => ({
    h: `$${n}`,
    "& > svg": { h: `$${n}` },
  }),
  0
)
const widthVariants = generateVariantSequence(
  30,
  (n: number) => ({
    w: `$${n}`,
    "& > svg": { w: `$${n}` },
  }),
  0
)

export const iconStyles = {
  lineHeight: "$min",
  variants: {
    ...BASE_VARIANTS,
    h: heightVariants,
    height: heightVariants,
    w: widthVariants,
    width: widthVariants,
    inline: {
      true: { display: "inline-block" },
    },
    verticalAlign: {
      top: { verticalAlign: "top" },
      bottom: { verticalAlign: "bottom" },
      middle: { verticalAlign: "middle" },
      baseline: { verticalAlign: "baseline" },
      textBottom: { verticalAlign: "text-bottom" },
      textTop: { verticalAlign: "text-top" },
    },
    maxHeight: generateVariantSequence(
      30,
      (n: number) => ({
        maxHeight: `$${n}`,
        "& > svg": { maxHeight: `$${n}` },
      }),
      0
    ),
    maxWidth: generateVariantSequence(
      30,
      (n: number) => ({
        maxWidth: `$${n}`,
        "& > svg": { maxWidth: `$${n}` },
      }),
      0
    ),
    minHeight: generateVariantSequence(
      30,
      (n: number) => ({
        minHeight: `$${n}`,
        "& > svg": { minHeight: `$${n}` },
      }),
      0
    ),
    minWidth: generateVariantSequence(
      30,
      (n: number) => ({
        minWidth: `$${n}`,
        "& > svg": { minWidth: `$${n}` },
      }),
      0
    ),
    size: generateVariantSequence(
      30,
      (n: number) => ({
        h: `$${n}`,
        w: `$${n}`,
        "& > svg": { size: `$${n}` },
      }),
      0
    ),
    padded: {
      small: {
        mx: "$3",
        "&:first-child": { ml: "0" },
        "&:last-child": { mr: "0" },
      },
      medium: {
        mx: "$4",
        "&:first-child": { ml: "0" },
        "&:last-child": { mr: "0" },
      },
      large: {
        mx: "$6",
        "&:first-child": { ml: "0" },
        "&:last-child": { mr: "0" },
      },
    },
    spin: {
      faster: { animation: `${bounce} 2.5s infinite linear`, transformOrigin: "right center" },
      fast: { animation: `${bounce} 2.5s infinite linear`, transformOrigin: "right center" },
      slow: { animation: `${bounce} 2.5s infinite linear`, transformOrigin: "right center" },
      slower: { animation: `${bounce} 2.5s infinite linear`, transformOrigin: "right center" },
      slowest: { animation: `${bounce} 2.5s infinite linear`, transformOrigin: "right center" },
    },
    noPointerEvents: {
      true: { pointerEvents: "none" },
    },
    forbidden: {
      true: { cursor: "not-allowed" },
    },
    color: COLOR_VARIANTS.color,
  },
}
