import { Font, LineHeight, ThemeScale, TypeSpace } from "./scales.models"
import { getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

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
      font: font.h1.ref,
      lineHeight: lineHeight.heading.ref,
      fontStyle: "normal",
    },
    title: {
      font: font.h2.ref,
      lineHeight: lineHeight.heading.ref,
      fontStyle: "normal",
    },
    minorTitle: {
      font: font.h5.ref,
      letterSpacing: typeSpace.loose.ref,
      lineHeight: lineHeight.heading.ref,
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    heading: {
      font: font.h3.ref,
      lineHeight: lineHeight.heading.ref,
      fontStyle: "normal",
    },
    subHeading: {
      font: font.h4.ref,
      letterSpacing: typeSpace.remMax.ref,
      lineHeight: lineHeight.heading.ref,
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    body: {
      font: font.body.ref,
      lineHeight: lineHeight.body.ref,
      fontStyle: "normal",
    },
    caption: {
      font: font.small.ref,
      lineHeight: lineHeight.tight.ref,
      fontStyle: "normal",
    },
  } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
