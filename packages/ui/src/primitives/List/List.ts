import {
  styled,
  BASE_VARIANTS,
  COLOR_VARIANTS,
  SizeVariantsHalf,
  generateVariantSequence,
  CSS,
  TYPOGRAPHY_VARIANTS,
} from "../../config/stitches.config"

type Spaced = SizeVariantsHalf & { [k: string]: CSS }

const LIST_STYLES = {
  boxSizing: "border-box",
  mb: "$6",
  mt: "$none",
  "&:last-child": {
    mb: "$none",
  },
  variants: {
    ...BASE_VARIANTS,
    ...COLOR_VARIANTS,
    ...TYPOGRAPHY_VARIANTS,
    align: {
      center: { textAlign: "center" },
      left: { textAlign: "left" },
      right: { textAlign: "right" },
    },
    reset: {
      true: {
        listStyle: "none",
        m: "$none",
        p: "$none",
      },
    },
    flat: {
      true: { my: "$none" },
    },
    gap: generateVariantSequence<Spaced>(
      13,
      (n: number) => ({
        "& > li": {
          my: `$${n}`,
        },
        "& > li:first-child": {
          mt: `$none`,
        },
        "& > li-last-child": {
          mb: `$none`,
        },
      }),
      0
    ),
    italic: {
      true: { fontStyle: "italic" },
    },
    oblique: {
      true: { fontStyle: "oblique" },
    },
    capitalize: {
      true: { textTransform: "capitalize" },
    },
    lowercase: {
      true: { textTransform: "lowercase" },
    },
    uppercase: {
      true: { textTransform: "uppercase" },
    },
    type: {
      circle: { listStyleType: "circle" },
      disc: { listStyleType: "disc" },
      square: { listStyleType: "square" },
      armenian: { listStyleType: "armenian" },
      cjkIdeographic: { listStyleType: "cjk-ideographic" },
      decimal: { listStyleType: "decimal" },
      decimalLeadingZero: { listStyleType: "decimal-leading-zero" },
      georgian: { listStyleType: "georgian" },
      hebrew: { listStyleType: "hebrew" },
      hiragana: { listStyleType: "hiragana" },
      hiraganaIroha: { listStyleType: "hiragana-iroha" },
      katakana: { listStyleType: "katakana" },
      katakanaIroha: { listStyleType: "katakana-iroha" },
      lowerAlpha: { listStyleType: "lower-alpha" },
      lowerGreek: { listStyleType: "lower-greek" },
      lowerLatin: { listStyleType: "lower-latin" },
      lowerRoman: { listStyleType: "lower-roman" },
      upperAlpha: { listStyleType: "upper-alpha" },
      upperGreek: { listStyleType: "upper-greek" },
      upperLatin: { listStyleType: "upper-latin" },
      upperRoman: { listStyleType: "upper-roman" },
    },
    position: {
      inside: { listStylePosition: "inside" },
      outside: { listStylePosition: "outside" },
    },
  },
}
export const getListStyles = (): typeof LIST_STYLES => LIST_STYLES
export const List = styled("ul", getListStyles(), "List")
