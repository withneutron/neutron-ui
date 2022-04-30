import {
  BASE_VARIANTS,
  COLOR_VARIANTS,
  generateVariantSequence,
  keyframes,
} from "../../config/stitches.config"

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "50%": { transform: "rotate(180deg)" },
  "100%": { transform: "rotate(360deg)" },
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
      faster: { animation: `${spin} $transitions$faster infinite linear` },
      fast: { animation: `${spin} $transitions$fast infinite linear` },
      slow: { animation: `${spin} $transitions$slow infinite linear` },
      slower: { animation: `${spin} $transitions$slower infinite linear` },
      slowest: { animation: `${spin} $transitions$slowest infinite linear` },
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
