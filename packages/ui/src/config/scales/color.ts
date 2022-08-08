import { generatePaletteFromHue } from "../../shared/utils"
import { CharHash } from "../utils"
import { ColorPalette, ScaleEntry, ThemeScale } from "./scales.models"
import { generateThemeColors, getCssMapFromVars, getThemePropsFromCssMap } from "./scales.utils"

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

export const colorCore = {
  neutralMin: true,
  neutralMax: true,
  primary1: true,
  primary2: true,
  primary3: true,
  primary4: true,
  primary5: true,
  primary6: true,
  primary7: true,
  primary8: true,
  primary9: true,
  primary10: true,
  primary11: true,
  primary12: true,
  secondary1: true,
  secondary2: true,
  secondary3: true,
  secondary4: true,
  secondary5: true,
  secondary6: true,
  secondary7: true,
  secondary8: true,
  secondary9: true,
  secondary10: true,
  secondary11: true,
  secondary12: true,
  neutral1: true,
  neutral2: true,
  neutral3: true,
  neutral4: true,
  neutral5: true,
  neutral6: true,
  neutral7: true,
  neutral8: true,
  neutral9: true,
  neutral10: true,
  neutral11: true,
  neutral12: true,
} as const

export const colorText = {
  neutralMin: true,
  neutralMax: true,
  primary1: true,
  primary2: true,
  primary3: true,
  primary4: true,
  primary5: true,
  primary6: true,
  primary7: true,
  primary8: true,
  primary9: true,
  primary10: true,
  primary11: true,
  primary12: true,
  secondary1: true,
  secondary2: true,
  secondary3: true,
  secondary4: true,
  secondary5: true,
  secondary6: true,
  secondary7: true,
  secondary8: true,
  secondary9: true,
  secondary10: true,
  secondary11: true,
  secondary12: true,
  neutral1: true,
  neutral2: true,
  neutral3: true,
  neutral4: true,
  neutral5: true,
  neutral6: true,
  neutral7: true,
  neutral8: true,
  neutral9: true,
  neutral10: true,
  neutral11: true,
  neutral12: true,
  textPrimary1: true,
  textPrimary2: true,
  textPrimary3: true,
  textPrimary4: true,
  textPrimary5: true,
  textPrimary6: true,
  textPrimary7: true,
  textPrimary8: true,
  textPrimary9: true,
  textPrimary10: true,
  textPrimary11: true,
  textPrimary12: true,
  textSecondary1: true,
  textSecondary2: true,
  textSecondary3: true,
  textSecondary4: true,
  textSecondary5: true,
  textSecondary6: true,
  textSecondary7: true,
  textSecondary8: true,
  textSecondary9: true,
  textSecondary10: true,
  textSecondary11: true,
  textSecondary12: true,
  textNeutral1: true,
  textNeutral2: true,
  textNeutral3: true,
  textNeutral4: true,
  textNeutral5: true,
  textNeutral6: true,
  textNeutral7: true,
  textNeutral8: true,
  textNeutral9: true,
  textNeutral10: true,
  textNeutral11: true,
  textNeutral12: true,
} as const
