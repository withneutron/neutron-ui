import { ThemeScale } from "./scales.models"
import { getAliasMap, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `typo` theme scale */
export function getTypo() {
  const vars = {} as const

  // These keys will get mapped into classes with multiple CSS properties
  const cssValueMap = {
    // Composition combos, for class generation
    majorTitle: "majorTitle",
    title: "title",
    minorTitle: "minorTitle",
    heading: "heading",
    subHeading: "subHeading",
    body: "body",
    caption: "caption",
  } as const

  const { aliasMap, cssAliases } = getAliasMap(
    {
      majorTitle: {
        font: "h1",
        lineHeight: "heading",
      },
      title: {
        font: "h2",
        lineHeight: "heading",
      },
      minorTitle: {
        font: "h5",
        lineHeight: "heading",
      },
      heading: {
        font: "h3",
        lineHeight: "heading",
      },
      subHeading: {
        font: "h4",
        lineHeight: "heading",
      },
      body: {
        font: "body",
        lineHeight: "body",
      },
      caption: {
        font: "small",
        lineHeight: "tight",
      },
    },
    {
      fontStyle: "normal",
    }
  )

  const cssAliasMap = { ...cssAliases } as const

  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
    cssAliasMap,
    aliasMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, typeof cssAliasMap>
}

// FILTER KEYS ////////////////////////////////////////////////////////////////
// Used for generating types that map to only parts of this scale

export const typoCombos = {
  majorTitle: true,
  title: true,
  minorTitle: true,
  heading: true,
  subHeading: true,
  body: true,
  caption: true,
} as const
