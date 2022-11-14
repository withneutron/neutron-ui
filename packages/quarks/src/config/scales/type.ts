import { Font, LineHeight, ThemeScale, TypeSpace } from "./scales.models"
import { getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `type` theme scale */
export function getType<F extends Font, L extends LineHeight, S extends TypeSpace>(
  font: F,
  lineHeight: L,
  typeSpace: S
) {
  const vars = {} as const

  // These keys will get mapped into classes with multiple CSS properties
  const cssValueMap = {
    // Composition combos, for class generation
    majorTitle: {
      lineHeight: lineHeight.heading.ref,
      font: font.h1.ref,
      fontStyle: "normal",
    },
    title: {
      lineHeight: lineHeight.heading.ref,
      font: font.h2.ref,
      fontStyle: "normal",
    },
    minorTitle: {
      letterSpacing: typeSpace.loose.ref,
      lineHeight: lineHeight.heading.ref,
      font: font.h5.ref,
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    heading: {
      lineHeight: lineHeight.heading.ref,
      font: font.h3.ref,
      fontStyle: "normal",
    },
    subHeading: {
      letterSpacing: typeSpace.remMax.ref,
      lineHeight: lineHeight.heading.ref,
      font: font.h4.ref,
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    body: {
      lineHeight: lineHeight.body.ref,
      font: font.body.ref,
      fontStyle: "normal",
    },
    caption: {
      lineHeight: lineHeight.tight.ref,
      font: font.small.ref,
      fontStyle: "normal",
    },
  } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
