import React, { useState } from "react"
import { Animated, SafeAreaView, View, Text as RNText, Pressable as RNPressable } from "react-native"
import {
  QuarksProvider,
  styled,
  ScrollView,
  Box,
  Row as QRow,
  Column,
  Grid,
  Text,
  Heading,
  SubHeading,
  Image,
  Pressable,
  Link,
  List,
  ListItem,
  useColorMode,
  useConditions,
  useTokens,
  useRTL,
  useMediaQuery,
  useTransition,
} from "@withneutron/quarks-react-native"
import {
  Screen,
  Card,
  Title,
  SectionTitle,
  Body,
  Caption,
  Mono,
  Button,
  ButtonText,
  Badge,
  BadgeText,
  Row,
  Spacer,
  Divider,
} from "./components/ui"
import { TokenDemo } from "./components/TokenDemo"

// ---------------------------------------------------------------------------
// Dark mode toggle
// ---------------------------------------------------------------------------

const ToggleButton = styled(RNPressable, {
  backgroundColor: "$tertiary3",
  radius: "$pill",
  px: "$12",
  py: "$8",
  dark: {
    backgroundColor: "$tertiary5",
  },
  pressed: {
    opacity: "0.7",
  },
})

const ToggleText = styled(RNText, {
  fontSize: "$14",
  fontWeight: "$semiBold",
  color: "$tertiary9",
  dark: {
    color: "$tertiary3",
  },
})

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Grid demo items
// ---------------------------------------------------------------------------

const GridCell = styled(View, {
  backgroundColor: "$primary3",
  radius: "$8",
  p: "$12",
  alignItems: "center",
  justifyContent: "center",
  dark: {
    backgroundColor: "$primary9",
  },
})

const GridCellText = styled(RNText, {
  fontSize: "$14",
  fontWeight: "$semiBold",
  color: "$primary11",
  dark: {
    color: "$primary3",
  },
})

// ---------------------------------------------------------------------------
// List demo items
// ---------------------------------------------------------------------------

const StyledListItem = styled(View, {
  py: "$12",
  px: "$12",
  backgroundColor: "$tertiary2",
  dark: {
    backgroundColor: "$tertiary4",
  },
  first: {
    radiusTop: "$8",
  },
  last: {
    radiusBottom: "$8",
  },
  even: {
    backgroundColor: "$tertiary3",
    dark: {
      backgroundColor: "$tertiary5",
    },
  },
})

const ListItemText = styled(RNText, {
  fontSize: "$14",
  color: "$defaultBody",
})

const ListBullet = styled(RNText, {
  fontSize: "$14",
  fontWeight: "$bold",
  color: "$primary9",
  mr: "$8",
  dark: {
    color: "$primary5",
  },
})

// ---------------------------------------------------------------------------
// Link demo
// ---------------------------------------------------------------------------

const LinkText = styled(RNText, {
  fontSize: "$16",
  fontWeight: "$semiBold",
  color: "$info9",
  textDecorationLine: "underline",
  dark: {
    color: "$info5",
  },
})

// ---------------------------------------------------------------------------
// Hooks panel
// ---------------------------------------------------------------------------

const HookLabel = styled(RNText, {
  fontSize: "$12",
  fontWeight: "$semiBold",
  color: "$tertiary9",
  mb: "$2",
  dark: {
    color: "$tertiary5",
  },
})

const HookValue = styled(RNText, {
  fontSize: "$14",
  fontFamily: "$systemMono",
  color: "$defaultBody",
  mb: "$8",
})

const FadeBox = styled(View, {
  backgroundColor: "$success3",
  radius: "$8",
  p: "$12",
  dark: {
    backgroundColor: "$success9",
  },
})

const FadeBoxText = styled(RNText, {
  fontSize: "$14",
  fontWeight: "$semiBold",
  color: "$success11",
  dark: {
    color: "$success3",
  },
})

// ---------------------------------------------------------------------------
// Hooks Demo component
// ---------------------------------------------------------------------------

function HooksDemo() {
  const conditions = useConditions()
  const { tokenValue } = useTokens()
  const direction = useRTL("RTL", "LTR")
  const isWide = useMediaQuery("(min-width: 600px)", false)
  const [showFade, setShowFade] = useState(false)
  const fade = useTransition(showFade, { enter: 300, exit: 300 })

  const activeConditions = Object.entries(conditions)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(", ")

  return (
    <View>
      <HookLabel>useConditions()</HookLabel>
      <HookValue>{activeConditions || "none"}</HookValue>

      <HookLabel>useMediaQuery("min-width: 600px")</HookLabel>
      <HookValue>{isWide ? "true (wide)" : "false (narrow)"}</HookValue>

      <HookLabel>useRTL()</HookLabel>
      <HookValue>Direction: {direction}</HookValue>

      <HookLabel>useTokens()</HookLabel>
      <HookValue>Token map keys: {tokenValue ? Object.keys(tokenValue).length : 0}</HookValue>

      <Divider />

      <HookLabel>useTransition()</HookLabel>
      <Button
        css={{ mb: "$8", alignSelf: "flex-start" }}
        onPress={() => setShowFade(v => !v)}
      >
        <ButtonText>{showFade ? "Hide" : "Show"} Transition</ButtonText>
      </Button>

      {fade.mounted && (
        <Animated.View style={fade.style}>
          <FadeBox>
            <FadeBoxText>
              Fading {fade.active ? "in" : "out"}
            </FadeBoxText>
          </FadeBox>
        </Animated.View>
      )}
    </View>
  )
}

// ---------------------------------------------------------------------------
// Main content
// ---------------------------------------------------------------------------

function AppContent() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Screen css={{ pt: "$40" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Row css={{ mb: "$4" }}>
            <Title>Quarks RN</Title>
            <Spacer />
            <ToggleButton onPress={toggleColorMode}>
              <ToggleText>{colorMode === "light" ? "Dark" : "Light"}</ToggleText>
            </ToggleButton>
          </Row>

          {/* Hero */}
          <Card>
            <Heading css={{ mb: "$4" }}>Unified API</Heading>
            <SubHeading css={{ mb: "$8", color: "$tertiary8", dark: { color: "$tertiary6" } }}>
              quarks-react-native primitives, hooks & styling
            </SubHeading>
            <Body>
              A practical demo of the shared quarks API surface — same component names, same
              token system, same condition model across web and native.
            </Body>
          </Card>

          {/* Styled Components Demo */}
          <Section title="Typography Primitives">
            <Heading css={{ mb: "$4" }}>Heading</Heading>
            <SubHeading css={{ mb: "$4" }}>SubHeading</SubHeading>
            <Body css={{ mb: "$4" }}>Body text with default styling from the Text primitive.</Body>
            <Caption>Caption text with lighter weight</Caption>
            <Mono css={{ mt: "$4" }}>Monospace font family</Mono>
          </Section>

          {/* Button Variants */}
          <Section title="Button Variants">
            <Caption css={{ mb: "$8" }}>intent variants (press to see interaction states)</Caption>
            <Row css={{ mb: "$12", flexWrap: "wrap" }}>
              <Button>
                <ButtonText>Primary</ButtonText>
              </Button>
              <Button intent="secondary">
                <ButtonText intent="secondary">Secondary</ButtonText>
              </Button>
              <Button intent="outline">
                <ButtonText intent="outline">Outline</ButtonText>
              </Button>
            </Row>

            <Caption css={{ mb: "$8" }}>size variants</Caption>
            <Row css={{ flexWrap: "wrap" }}>
              <Button size="sm">
                <ButtonText>Small</ButtonText>
              </Button>
              <Button>
                <ButtonText>Default</ButtonText>
              </Button>
              <Button size="lg">
                <ButtonText>Large</ButtonText>
              </Button>
            </Row>
          </Section>

          {/* Badges */}
          <Section title="Badges & CSS Overrides">
            <Row css={{ flexWrap: "wrap", gap: "$8", mb: "$12" }}>
              <Badge css={{ backgroundColor: "$tertiary3", dark: { backgroundColor: "$tertiary8" } }}>
                <BadgeText css={{ color: "$tertiary9", dark: { color: "$tertiary3" } }}>Default</BadgeText>
              </Badge>
              <Badge css={{ backgroundColor: "$info2", dark: { backgroundColor: "$info10" } }}>
                <BadgeText css={{ color: "$info9", dark: { color: "$info3" } }}>Info</BadgeText>
              </Badge>
              <Badge css={{ backgroundColor: "$success2", dark: { backgroundColor: "$success10" } }}>
                <BadgeText css={{ color: "$success9", dark: { color: "$success3" } }}>Success</BadgeText>
              </Badge>
              <Badge css={{ backgroundColor: "$warning2", dark: { backgroundColor: "$warning10" } }}>
                <BadgeText css={{ color: "$warning9", dark: { color: "$warning3" } }}>Warning</BadgeText>
              </Badge>
              <Badge css={{ backgroundColor: "$error2", dark: { backgroundColor: "$error10" } }}>
                <BadgeText css={{ color: "$error9", dark: { color: "$error3" } }}>Error</BadgeText>
              </Badge>
            </Row>
            <Caption>Each badge above uses the css prop for one-off color overrides.</Caption>
          </Section>

          {/* Grid Demo */}
          <Section title="Grid (columns + gap)">
            <Caption css={{ mb: "$8" }}>2-column grid with 8px gap</Caption>
            <Grid columns={2} gap={8}>
              {["A", "B", "C", "D", "E", "F"].map(label => (
                <GridCell key={label}>
                  <GridCellText>{label}</GridCellText>
                </GridCell>
              ))}
            </Grid>

            <Caption css={{ mt: "$12", mb: "$8" }}>3-column grid with 8px gap</Caption>
            <Grid columns={3} gap={8}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <GridCell key={n} css={{ backgroundColor: "$secondary3", dark: { backgroundColor: "$secondary9" } }}>
                  <GridCellText css={{ color: "$secondary11", dark: { color: "$secondary3" } }}>{n}</GridCellText>
                </GridCell>
              ))}
            </Grid>
          </Section>

          {/* List Demo */}
          <Section title="List with nth-child">
            <Caption css={{ mb: "$8" }}>
              Using index/length props for first/last/even/odd styling
            </Caption>
            <List>
              {["Design tokens", "Condition system", "Variant API", "CSS prop overrides", "Interaction states"].map(
                (item, i, arr) => (
                  <StyledListItem key={item} index={i} length={arr.length}>
                    <Row>
                      <ListBullet>{i + 1}.</ListBullet>
                      <ListItemText>{item}</ListItemText>
                    </Row>
                  </StyledListItem>
                ),
              )}
            </List>
          </Section>

          {/* Link Demo */}
          <Section title="Link">
            <Link href="https://github.com/nicksrandall/quarks">
              <LinkText>Open quarks on GitHub</LinkText>
            </Link>
            <Caption css={{ mt: "$4" }}>
              Link wraps Pressable and opens URLs via Linking.openURL
            </Caption>
          </Section>

          <Divider />

          {/* Hooks Demo */}
          <Section title="Hooks">
            <HooksDemo />
          </Section>

          <Divider />

          {/* Token Demo */}
          <Card>
            <TokenDemo />
          </Card>

          {/* Footer spacer */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </Screen>
    </SafeAreaView>
  )
}

export function App() {
  return (
    <QuarksProvider>
      <AppContent />
    </QuarksProvider>
  )
}
