import { generatePaletteFromHue } from "../../shared/utils"
import { CharHash } from "../CharHash"
import { ColorPalette, ScaleEntry, ThemeScale } from "./models"
import { generateThemeColors, getCssMapFromVars, getThemePropsFromCssMap } from "./utils"

// Default Palette
export const DEFAULT_HUE = 174
export const DEFAULT_PALETTE = 2
// Alt1 Palette
// export const DEFAULT_HUE = 217
// export const DEFAULT_PALETTE = 3
// Alt2 Palette
// export const DEFAULT_HUE = 224
// export const DEFAULT_PALETTE = 2
/** Generator function for `color` theme scale */
export function getColor(hash: CharHash) {
  const palette = {} as ColorPalette
  const lightPalette = generateThemeColors(
    generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE),
    "light",
    (key: keyof ColorPalette, value?: string | ScaleEntry) => {
      if (value) {
        if (typeof value === "string") {
          palette[key] = palette[key] ? { ...palette[key], value } : { ...hash.var, value }
        } else {
          palette[key] = palette[key] ? { ...palette[key], value: value.ref } : { ...hash.var, value: value.ref }
        }
      }
      if (!palette[key]) {
        palette[key] = { ...hash.var, value: typeof value === "object" && value?.ref ? value.ref : String(value) }
      }
      return palette[key]
    }
  )
  const shadowBase = { ...hash.var, value: "53 0% 7%" }

  const lightScale = {
    shadowBase,
    shadowBlack: { ...hash.var, value: "hsl(0 0% 0%)" },
    defaultBody: { ...hash.var, value: lightPalette.textNeutral2.ref },
    defaultHeading: { ...hash.var, value: lightPalette.neutral10.ref },
    // Unique to light palette
    panel: { ...hash.var, value: lightPalette.neutralMin.ref },
    shadowLight: { ...hash.var, value: `hsl(${shadowBase.ref} / 0.05)` },
    shadowHeavy: { ...hash.var, value: `hsl(${shadowBase.ref} / 0.15)` },
    ...lightPalette,
  } as const

  const darkVars = {
    shadowBase,
    shadowBlack: lightScale.shadowBlack,
    defaultBody: lightScale.defaultBody,
    defaultHeading: lightScale.defaultHeading,
    // Unique to dark palette
    panel: { ...lightScale.panel, value: lightScale.neutral3.ref },
    shadowLight: { ...lightScale.shadowLight, value: `hsl(${shadowBase.ref} / 0.2)` },
    shadowHeavy: { ...lightScale.shadowHeavy, value: `hsl(${shadowBase.ref} / 0.35)` },
    ...generateThemeColors(
      generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE, 1, "dark"),
      "dark",
      (key: keyof ColorPalette, value?: string | ScaleEntry) => {
        if (value) {
          if (typeof value === "string") {
            return { ...lightScale[key], value }
          }
          return { ...lightScale[key], value: value.ref }
        }
        return lightScale[key]
      }
    ),
  } as const

  ////////////////////////////////////////////////////////////////////////////////
  const vars = lightScale
  const cssValueMap = { ...getCssMapFromVars(lightScale) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    darkVars,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
