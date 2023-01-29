import { ColorSetter } from "../../config/scales/scales.models"
import {
  ColorGenOptions,
  ColorMode,
  ColorNumberKey,
  ColorPalette,
  COLOR_KEYS,
  StaticColorName,
  ScaleColorName,
  ThemeColor,
  MATRIX_INDICES,
  SEGMENT_SIZE,
  MAX_NEUTRAL_SATURATION,
  COLOR_MATRIX,
  DECODE_DIFF,
  ZERO_SATURATION_LUMINANCE,
  ALPHA_KEY,
  MAX_ALPHA_TEXT_COLOR_TARGETS,
  MIN_ALPHA_TEXT_COLOR_TARGETS,
  TEXT_COLOR_TARGETS,
  ALPHA_TEXT_COLOR_TARGETS,
  AlphaColorName,
  ALPHA_VALUES,
  CoreColorName,
  ZERO_SATURATION_INDICES,
} from "../models/colorGen.models"

export function getTextColor(color: ScaleColorName, numberKey?: ColorNumberKey): ThemeColor {
  const isMin = color.startsWith(StaticColorName.min)
  const isMax = color.startsWith(StaticColorName.max)
  const isAlpha = color.endsWith(ALPHA_KEY)
  let targets: Record<ColorNumberKey, string | number> = TEXT_COLOR_TARGETS
  if (isAlpha) {
    if (isMin) {
      targets = MIN_ALPHA_TEXT_COLOR_TARGETS
    } else if (isMax) {
      targets = MAX_ALPHA_TEXT_COLOR_TARGETS
    } else {
      targets = ALPHA_TEXT_COLOR_TARGETS
    }
  }
  if (!numberKey) {
    return isMin ? StaticColorName.max : StaticColorName.min
  }
  const targetKey = targets[numberKey]
  const safeColor = isMin || isMax ? CoreColorName.primary : color
  const targetColor = isAlpha ? safeColor.replace(ALPHA_KEY, "") : safeColor
  return (typeof targetKey === "number" ? `${targetColor}${targetKey}` : targetKey) as ThemeColor
}

/** Generates a color mode-based palette */
export function generateThemeColors<T = string>(
  inputColors: ColorGenOptions,
  mode: ColorMode,
  setValue: ColorSetter<T>
): ColorPalette<T> {
  const isDark = mode === "dark"

  const colors = {} as ColorPalette<T>

  Object.entries(inputColors).forEach(([colorKey, inputValue]) => {
    const isMapped = typeof inputValue === "string"
    const isInputObject = typeof inputValue === "object"
    const isStatic = isInputObject && "contrast" in inputValue
    const isNeutral = isInputObject && "isNeutral" in inputValue && inputValue.isNeutral

    let hue = isInputObject ? inputValue.hue : (inputValue as number)
    let saturation = isInputObject ? inputValue.saturation ?? 100 : 100

    // Validate hue and saturation
    if ((!isMapped && typeof hue !== "number") || isNaN(hue) || hue > 360 || hue < 0) {
      throw new Error(`Invalid value for hue on color "${colorKey}": ${hue}. Must be a number between 0 and 360.`)
    }
    if (typeof saturation !== "number" || isNaN(saturation) || saturation > 100 || saturation < 0) {
      throw new Error(
        `Invalid value for saturation on color "${colorKey}": ${saturation}. Must be a number between 0 and 100.`
      )
    }

    if (!isMapped) {
      // Make sure we normalize hue, and map 360 to 0
      hue = Math.round(hue)
      hue = hue > 359 ? 0 : hue
    }
    // Make sure we normalize saturation, including for neutrals
    saturation = Math.round(saturation)
    saturation = isNeutral && saturation > 40 ? Math.round((saturation / 100) * 40) : saturation

    if (isMapped) {
      /** These colors just reference another color */
      COLOR_KEYS.forEach(numberKey => {
        setValue(
          numerize(colorKey as ScaleColorName, numberKey),
          colors,
          numerize(inputValue as ScaleColorName, numberKey),
          numberKey,
          true
        )
      })
    } else if (isStatic) {
      /** These colors are NOT scaled */
      const contrast = inputValue.contrast
      // Validate contrast
      if (typeof contrast !== "number" || isNaN(contrast) || contrast > 100 || contrast < 0) {
        throw new Error(
          `Invalid value for contrast on color "${colorKey}": ${contrast}. Must be a number between 0 and 100.`
        )
      }
      setValue(colorKey as StaticColorName, colors, getHSL(hue, saturation, isDark ? contrast : 100 - contrast))
    } else {
      /**
       * We are dealing with a non-mapped, scaled color, so we need to grab scaled luminance values
       * from the encoded matrix, and interpolate those against the target saturation.
       */

      const fullSat = isNeutral ? MAX_NEUTRAL_SATURATION : 100
      const halfSat = fullSat / 2

      // Get our starting index in the encoded matrix
      const colorType = isNeutral ? "neutral" : "color"
      const baseIndex = MATRIX_INDICES[mode][colorType]
      const hueIndex = baseIndex + SEGMENT_SIZE.hue * hue
      // Only skip the half-saturation set if we are dealing with full saturation
      const setIndex = saturation < fullSat ? hueIndex : hueIndex + SEGMENT_SIZE.set

      const zeroSatIndex = ZERO_SATURATION_INDICES[mode][colorType]
      const zeroSatSet = ZERO_SATURATION_LUMINANCE.substring(zeroSatIndex, zeroSatIndex + 12)

      const needsInterpolation = saturation !== 0 && saturation !== fullSat && saturation !== halfSat
      let set = ""

      if (!needsInterpolation) {
        // Our saturation matches a set exactly, so we don't need to interpolate!
        const isZeroSat = saturation === 0
        set = isZeroSat ? zeroSatSet : COLOR_MATRIX.substring(setIndex, setIndex + SEGMENT_SIZE.set)
        processSet(
          set,
          (setKey, setSaturation, setLuminance) => {
            setValue(
              numerize(colorKey as ScaleColorName, setKey),
              colors,
              getHSL(hue, setSaturation, setLuminance),
              setKey
            )
          },
          isZeroSat
        )
      } else {
        let startSet = ""
        let endSet = ""
        let multiplier = (saturation - halfSat) / (fullSat - halfSat)

        if (saturation < halfSat) {
          // Interpolate using zero and half sets
          multiplier = saturation / halfSat
          startSet = zeroSatSet
          endSet = COLOR_MATRIX.substring(setIndex, setIndex + SEGMENT_SIZE.set)
          interpolateSets(
            startSet,
            endSet,
            multiplier,
            (setKey, setSaturation, setLuminance) => {
              setValue(
                numerize(colorKey as ScaleColorName, setKey),
                colors,
                getHSL(hue, setSaturation, setLuminance),
                setKey
              )
            },
            true
          )
        } else {
          // Interpolate using half and full sets
          startSet = COLOR_MATRIX.substring(setIndex, setIndex + SEGMENT_SIZE.set)
          endSet = COLOR_MATRIX.substring(setIndex + SEGMENT_SIZE.set, setIndex + SEGMENT_SIZE.set * 2)
          interpolateSets(startSet, endSet, multiplier, (setKey, setSaturation, setLuminance) => {
            setValue(
              numerize(colorKey as ScaleColorName, setKey),
              colors,
              getHSL(hue, setSaturation, setLuminance),
              setKey
            )
          })
        }
      }
    }

    /**
     * If the current `colorKey` is supposed to have an alpha scale, create it now
     */
    const alphaColorKey = AlphaColorName[`${colorKey}${ALPHA_KEY}` as keyof typeof AlphaColorName]
    if (alphaColorKey) {
      const minLuminance = isDark ? 0 : 100
      const maxLuminance = isDark ? 100 : 0
      const luminance = colorKey === "min" ? minLuminance : colorKey === "max" ? maxLuminance : 50
      ALPHA_VALUES.forEach((alpha, index) => {
        const alphaKey = (index + 1) as ColorNumberKey
        setValue(numerize(alphaColorKey, alphaKey), colors, getHSL(hue, saturation, luminance, alpha), alphaKey)
      })
    }
  })

  return colors
}

// INTERNAL UTILS /////////////////////////////////////////////////////////////////////////////////

function getHSL(hue: number, saturation: number, luminance: number, alpha?: number) {
  const alphaText = alpha ? `,${String(alpha).replace("0.", ".")}` : ""
  return `hsl(${hue},${saturation}%,${luminance}%${alphaText})`
}

function numerize(name: ScaleColorName, numberKey: ColorNumberKey): ThemeColor {
  return `${name}${numberKey}`
}

type Processor = (key: ColorNumberKey, saturation: number, luminance: number) => void

function processSet(set: string, processor: Processor, isZeroSat = false) {
  const size = isZeroSat ? SEGMENT_SIZE.value : SEGMENT_SIZE.valuePair
  let index = 0
  COLOR_KEYS.forEach(key => {
    const pair = set.substring(index, index + size)
    const saturation = isZeroSat ? 0 : decodeValue(pair[0])
    const luminance = isZeroSat ? decodeValue(pair[0]) : decodeValue(pair[1])
    processor(key, saturation, luminance)
    index += size
  })
}

function decodeValue(value: string) {
  return value.charCodeAt(0) + DECODE_DIFF
}

function interpolateSets(
  startSet: string,
  endSet: string,
  multiplier: number,
  processor: Processor,
  isStartSetZeroSat = false
) {
  const startSize = isStartSetZeroSat ? SEGMENT_SIZE.value : SEGMENT_SIZE.valuePair
  let startIndex = 0
  const endSize = SEGMENT_SIZE.valuePair
  let endIndex = 0
  COLOR_KEYS.forEach(key => {
    const startPair = startSet.substring(startIndex, startIndex + startSize)
    const startSaturation = isStartSetZeroSat ? 0 : decodeValue(startPair[0])
    const startLuminance = isStartSetZeroSat ? decodeValue(startPair[0]) : decodeValue(startPair[1])

    const endPair = endSet.substring(endIndex, endIndex + endSize)
    const endSaturation = decodeValue(endPair[0])
    const endLuminance = decodeValue(endPair[1])

    const saturation = interpolatePair(startSaturation, endSaturation, multiplier)
    const luminance = interpolatePair(startLuminance, endLuminance, multiplier)

    processor(key, saturation, luminance)

    startIndex += startSize
    endIndex += endSize
  })
}

function interpolatePair(fullValue: number, halfValue: number, multiplier: number) {
  const diff = fullValue - halfValue
  const mod = parseFloat((diff * multiplier).toFixed(2))

  return halfValue + mod
}
