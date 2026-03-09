import { configureTheme } from "@withneutron/quarks-react-native"

configureTheme({
  colors: {
    primary: { hue: 200, saturation: 85 },
    secondary: { hue: 290, saturation: 50 },
    tertiary: { hue: 290, saturation: 0, isNeutral: true },
  },
  space: { base: 4 },
  fontSize: { base: 16 },
  radius: { base: 6 },
})
