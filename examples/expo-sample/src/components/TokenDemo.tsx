import { View, Text as RNText } from "react-native"
import { styled, Text } from "@withneutron/quarks-react-native"
import { SectionTitle, Caption, Row } from "./ui"

// Color swatches
const Swatch = styled(
  View,
  {
    w: "$40",
    h: "$40",
    radius: "$4",
    alignItems: "center",
    justifyContent: "center",
  },
  "Swatch",
)

const SwatchNum = styled(
  RNText,
  {
    fontSize: "$12",
    fontWeight: "$semiBold",
  },
  "SwatchNum",
)

const SwatchRow = styled(View, {
  flexDirection: "row",
  gap: "$4",
  mb: "$4",
})

const ScaleLabel = styled(RNText, {
  fontSize: "$12",
  fontWeight: "$medium",
  color: "$tertiary9",
  mb: "$4",
  dark: {
    color: "$tertiary5",
  },
})

// Space visualization
const SpaceBar = styled(View, {
  h: "$8",
  backgroundColor: "$primary5",
  radius: "$2",
  mb: "$4",
  dark: {
    backgroundColor: "$primary7",
  },
})

const SpaceRow = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: "$8",
  mb: "$4",
})

const SpaceLabel = styled(RNText, {
  fontSize: "$12",
  fontFamily: "$systemMono",
  color: "$tertiary9",
  w: "$40",
  dark: {
    color: "$tertiary5",
  },
})

const COLOR_SCALES = [
  "primary", "secondary", "tertiary",
  "info", "success", "warning", "error",
  "tomato", "amber", "grass", "forest", "aqua", "indigo", "plum", "magenta",
] as const

function ColorScale({ name }: { name: string }) {
  return (
    <View>
      <ScaleLabel>{name}</ScaleLabel>
      <SwatchRow>
        {[1, 2, 3, 4, 5, 6].map(n => (
          <Swatch key={n} css={{ backgroundColor: `$${name}${n}` as any }}>
            <SwatchNum css={{ color: `$${name}${n <= 8 ? 11 : 3}` as any }}>{n}</SwatchNum>
          </Swatch>
        ))}
      </SwatchRow>
      <SwatchRow css={{ mb: "$12" }}>
        {[7, 8, 9, 10, 11, 12].map(n => (
          <Swatch key={n} css={{ backgroundColor: `$${name}${n}` as any }}>
            <SwatchNum css={{ color: `$${name}${n <= 8 ? 11 : 3}` as any }}>{n}</SwatchNum>
          </Swatch>
        ))}
      </SwatchRow>
    </View>
  )
}

export function TokenDemo() {
  return (
    <View>
      <SectionTitle>Color Tokens</SectionTitle>
      {COLOR_SCALES.map(name => (
        <ColorScale key={name} name={name} />
      ))}

      <SectionTitle css={{ mt: "$16" }}>Space Scale</SectionTitle>
      {(["$4", "$8", "$12", "$16", "$24", "$32", "$40"] as const).map(token => (
        <SpaceRow key={token}>
          <SpaceLabel>{token}</SpaceLabel>
          <SpaceBar css={{ w: token as any }} />
        </SpaceRow>
      ))}

      <SectionTitle css={{ mt: "$16" }}>Font Sizes</SectionTitle>
      {(["$14", "$16", "$18", "$21", "$25", "$30"] as const).map(token => (
        <RNText
          key={token}
          style={{ marginBottom: 4 }}
        >
          <Caption>{token} </Caption>
          <Text css={{ fontSize: token as any }}>The quick brown fox</Text>
        </RNText>
      ))}

      <SectionTitle css={{ mt: "$16" }}>Radius Scale</SectionTitle>
      <Row css={{ flexWrap: "wrap", gap: "$12" }}>
        {(["$0", "$4", "$8", "$12", "$pill", "$round"] as const).map(token => (
          <View key={token} style={{ alignItems: "center" }}>
            <RadiusSwatch css={{ radius: token as any }} />
            <ScaleLabel css={{ mt: "$4", mb: "$0" }}>{token}</ScaleLabel>
          </View>
        ))}
      </Row>
    </View>
  )
}

const RadiusSwatch = styled(View, {
  w: "$40",
  h: "$40",
  backgroundColor: "$primary6",
  dark: {
    backgroundColor: "$primary8",
  },
})
