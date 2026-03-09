import * as React from "react"
import type { NextPage } from "next"
import Head from "next/head"
import NextLink from "next/link"
import {
  styled,
  Box,
  Row,
  Column,
  Grid,
  Text,
  Heading,
  SubHeading,
  Link,
  Image,
  Pressable,
  ScrollView,
  List,
  OList,
  ListItem,
  FlexList,
  FlexListItem,
  useColorMode,
  useConditions,
  useTokens,
  useRTL,
  useMediaQuery,
  useTransition,
  useLayout,
  useMutationObserver,
} from "@withneutron/quarks-react"
import { useCallback, useRef, useState } from "react"
import { Button } from "../components/Button"

// ─── Styled Components ────────────────────────────────────────────────

const Section = styled(
  Column,
  {
    bg: "$min",
    radius: "$8",
    boxShadow: "$low",
    p: "$24",
    gap: "$16",
  },
  "Section"
)

const SectionTitle = styled(
  SubHeading,
  {
    color: "$primary9",
    borderBottom: "$primary",
    borderBottomWidth: "$widthBase",
    pb: "$8",
  },
  "SectionTitle"
)

const Badge = styled(
  "span",
  {
    display: "inline-flex",
    alignItems: "center",
    px: "$8",
    py: "$2",
    radius: "$4",
    typo: "$caption",
    fontWeight: "$600",
    bg: "$tertiary3",
    color: "$tertiaryText3",
  },
  {
    tone: {
      primary: { bg: "$primary3", color: "$primaryText3" },
      secondary: { bg: "$secondary3", color: "$secondaryText3" },
      success: { bg: "$success3", color: "$successText3" },
      warning: { bg: "$warning3", color: "$warningText3" },
      error: { bg: "$error3", color: "$errorText3" },
    },
  },
  "Badge"
)

const InteractiveBox = styled(
  Pressable,
  {
    p: "$16",
    radius: "$6",
    bg: "$tertiary3",
    color: "$tertiaryText3",
    typo: "$body",
    fontWeight: "$500",
    ":hover": {
      bg: "$primary9",
      color: "$primaryText9",
    },
    ":active": {
      bg: "$primary10",
      color: "$primaryText10",
    },
    ":focus-visible": {
      outline: "$primaryMax",
      bg: "$primary3",
      color: "$primaryText3",
    },
  },
  "InteractiveBox"
)

const NthChildItem = styled(
  ListItem,
  {
    p: "$12",
    radius: "$4",
    bg: "$tertiary3",
    color: "$tertiaryText3",
    ":first": {
      bg: "$primary3",
      color: "$primaryText3",
      fontWeight: "$600",
    },
    ":last": {
      bg: "$secondary3",
      color: "$secondaryText3",
      fontWeight: "$600",
    },
    ":even": {
      bg: "$tertiary2",
    },
    ":odd": {
      bg: "$tertiary4",
    },
  },
  "NthChildItem"
)

const StatusDot = styled(
  "span",
  {
    display: "inline-block",
    size: "$12",
    radius: "$8",
  },
  {
    active: {
      true: { bg: "$success9" },
      false: { bg: "$error9" },
    },
  },
  "StatusDot"
)

// ─── Page ─────────────────────────────────────────────────────────────

const Showcase: NextPage = () => {
  return (
    <Column
      css={{
        p: { base: "$40", md: "$20", sm: "$12" },
        gap: "$32",
        flex: "1",
      }}
    >
      <Head>
        <title>Neutron UI — API Showcase</title>
        <meta name="description" content="Comprehensive showcase of the quarks-react API" />
      </Head>

      <Column as="header" css={{ gap: "$8" }}>
        <Heading>API Showcase</Heading>
        <Text css={{ color: "$tertiaryText6", typo: "$body" }}>
          Demonstrating all 16 primitives, 8 hooks, and styled API features.
        </Text>
      </Column>

      <Grid
        css={{
          gap: "$24",
          gtColumns: { base: "$2", md: "$1" },
        }}
      >
        <TypographySection />
        <LayoutSection />
        <InteractiveSection />
        <ListSection />
        <ScrollViewSection />
        <HooksDashboard />
      </Grid>
    </Column>
  )
}

export default Showcase

// ─── Typography ───────────────────────────────────────────────────────

function TypographySection() {
  return (
    <Section>
      <SectionTitle as="h3">Typography</SectionTitle>
      <Heading>Heading (h1)</Heading>
      <Heading as="h2">Heading as h2</Heading>
      <SubHeading>SubHeading (h3)</SubHeading>
      <SubHeading as="h4" css={{ typo: "$minorHeading" }}>SubHeading as h4 — minor</SubHeading>
      <Text css={{ typo: "$body" }}>Body text using the Text primitive with $body typography.</Text>
      <Text css={{ typo: "$caption", color: "$tertiaryText6" }}>
        Caption text — smaller, muted.
      </Text>
      <Text as="blockquote" css={{ borderLeft: "$primary", pl: "$16", fontStyle: "italic", color: "$tertiaryText8" }}>
        Text rendered as a blockquote via the `as` prop (polymorphism).
      </Text>
    </Section>
  )
}
TypographySection.displayName = "TypographySection"

// ─── Layout ───────────────────────────────────────────────────────────

function LayoutSection() {
  return (
    <Section>
      <SectionTitle as="h3">Layout</SectionTitle>

      <Text css={{ fontWeight: "$600" }}>Box</Text>
      <Box css={{ bg: "$tertiary3", p: "$16", radius: "$4" }}>
        <Text>A simple Box container.</Text>
      </Box>

      <Text css={{ fontWeight: "$600" }}>Row</Text>
      <Row css={{ gap: "$8" }}>
        <Badge tone="primary">Item 1</Badge>
        <Badge tone="secondary">Item 2</Badge>
        <Badge tone="success">Item 3</Badge>
      </Row>

      <Text css={{ fontWeight: "$600" }}>Column</Text>
      <Column css={{ gap: "$4" }}>
        <Badge tone="warning">Stacked A</Badge>
        <Badge tone="error">Stacked B</Badge>
        <Badge>Stacked C</Badge>
      </Column>

      <Text css={{ fontWeight: "$600" }}>Grid (columns + gap)</Text>
      <Grid columns={3} gap="$12">
        {Array.from({ length: 6 }, (_, i) => (
          <Box
            key={i}
            css={{
              bg: i % 2 === 0 ? "$primary3" : "$secondary3",
              color: i % 2 === 0 ? "$primaryText3" : "$secondaryText3",
              p: "$12",
              radius: "$4",
              textAlign: "center",
              fontWeight: "$500",
            }}
          >
            {i + 1}
          </Box>
        ))}
      </Grid>

      <Text css={{ fontWeight: "$600" }}>Image</Text>
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
        alt="Mountain landscape"
        css={{ radius: "$6", maxHeight: "$200", objectFit: "cover", w: "100%" }}
      />
    </Section>
  )
}
LayoutSection.displayName = "LayoutSection"

// ─── Interactive ──────────────────────────────────────────────────────

function InteractiveSection() {
  const [pressCount, setPressCount] = useState(0)

  return (
    <Section>
      <SectionTitle as="h3">Interactive</SectionTitle>

      <Text css={{ fontWeight: "$600" }}>Pressable — hover / pressed / focused states</Text>
      <Row css={{ gap: "$12", flexWrap: "wrap" }}>
        <InteractiveBox onClick={() => setPressCount(c => c + 1)}>
          Press me ({pressCount})
        </InteractiveBox>
        <InteractiveBox
          css={{
            bg: "$secondary3",
            color: "$secondaryText3",
            ":hover": { bg: "$secondary9", color: "$secondaryText9" },
            ":active": { bg: "$secondary10", color: "$secondaryText10" },
            ":focus-visible": { outline: "$secondaryMax", bg: "$secondary3" },
          }}
        >
          Secondary style
        </InteractiveBox>
      </Row>

      <Text css={{ fontWeight: "$600" }}>Link</Text>
      <Row css={{ gap: "$16" }}>
        <Link href="https://github.com" css={{ color: "$primary9", ":hover": { color: "$primary10" } }}>
          External link
        </Link>
        <Link as={NextLink} href="/" css={{ color: "$secondary9", ":hover": { color: "$secondary10" } }}>
          Internal link (as NextLink)
        </Link>
      </Row>

      <Text css={{ fontWeight: "$600" }}>Styled variants</Text>
      <Row css={{ gap: "$8", flexWrap: "wrap" }}>
        <Button>Default</Button>
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="subtle">Subtle</Button>
      </Row>

      <Text css={{ fontWeight: "$600" }}>css prop override</Text>
      <Button css={{ bg: "$success9", color: "$successText9", borderColor: "transparent" }}>
        Custom via css
      </Button>
    </Section>
  )
}
InteractiveSection.displayName = "InteractiveSection"

// ─── Lists ────────────────────────────────────────────────────────────

function ListSection() {
  const items = ["First item (styled)", "Second item", "Third item", "Fourth item", "Last item (styled)"]

  return (
    <Section>
      <SectionTitle as="h3">Lists</SectionTitle>

      <Text css={{ fontWeight: "$600" }}>List (ul) — nth-child styling</Text>
      <List column>
        {items.map((item, i) => (
          <NthChildItem key={i} index={i} length={items.length}>
            {item}
          </NthChildItem>
        ))}
      </List>

      <Text css={{ fontWeight: "$600" }}>OList (ol)</Text>
      <OList column>
        <ListItem>Ordered item one</ListItem>
        <ListItem>Ordered item two</ListItem>
        <ListItem>Ordered item three</ListItem>
      </OList>

      <Text css={{ fontWeight: "$600" }}>FlexList + FlexListItem</Text>
      <FlexList css={{ gap: "$12", flexWrap: "wrap" }}>
        {["React", "TypeScript", "vanilla-extract", "quarks"].map(tag => (
          <FlexListItem key={tag}>
            <Badge tone="primary">{tag}</Badge>
          </FlexListItem>
        ))}
      </FlexList>
    </Section>
  )
}
ListSection.displayName = "ListSection"

// ─── ScrollView ───────────────────────────────────────────────────────

function ScrollViewSection() {
  return (
    <Section>
      <SectionTitle as="h3">ScrollView</SectionTitle>
      <ScrollView css={{ maxHeight: "$200", radius: "$4", border: "$tertiary", p: "$12" }}>
        <Column css={{ gap: "$12" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <Row
              key={i}
              css={{
                p: "$12",
                bg: i % 2 === 0 ? "$tertiary2" : "$tertiary3",
                radius: "$4",
                justifyContent: "space-between",
              }}
            >
              <Text>Scrollable row {i + 1}</Text>
              <Badge tone={i % 3 === 0 ? "success" : i % 3 === 1 ? "warning" : "primary"}>
                {i % 3 === 0 ? "Done" : i % 3 === 1 ? "Pending" : "Active"}
              </Badge>
            </Row>
          ))}
        </Column>
      </ScrollView>
    </Section>
  )
}
ScrollViewSection.displayName = "ScrollViewSection"

// ─── Hooks Dashboard ──────────────────────────────────────────────────

function HooksDashboard() {
  // useColorMode
  const { colorMode, isDark, toggleColorMode } = useColorMode()

  // useConditions
  const conditions = useConditions()

  // useTokens
  const { tokenValue } = useTokens()

  // useRTL
  const direction = useRTL("RTL", "LTR")

  // useMediaQuery
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion)", false)

  // useTransition
  const [showBanner, setShowBanner] = useState(false)
  const transition = useTransition(showBanner)

  // useLayout
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 })
  useLayout(
    layoutRef,
    useCallback((size: { width: number; height: number }) => setLayoutSize(size), [])
  )

  // useMutationObserver
  const [mutationCount, setMutationCount] = useState(0)
  const mutationRef = useRef<HTMLDivElement | null>(null)
  useMutationObserver(
    mutationRef,
    useCallback(() => setMutationCount(c => c + 1), []),
    { attributes: true, childList: true, subtree: false }
  )

  const activeBreakpoints = (["xl", "lg", "md", "sm", "xs"] as const)
    .filter(bp => conditions[bp])

  return (
    <Section css={{ gridColumn: { base: "1 / -1", md: "auto" } }}>
      <SectionTitle as="h3">Hooks Dashboard</SectionTitle>

      <Grid columns={2} gap="$16" css={{ md: { gtColumns: "$1" } }}>
        {/* useColorMode */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useColorMode</Text>
          <Row css={{ gap: "$8", alignItems: "center" }}>
            <StatusDot active={isDark} />
            <Text>Mode: {colorMode}</Text>
          </Row>
          <Button size="minimal" onClick={toggleColorMode}>
            Toggle
          </Button>
        </Column>

        {/* useConditions */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useConditions</Text>
          <Row css={{ gap: "$4", flexWrap: "wrap" }}>
            {activeBreakpoints.length > 0 ? (
              activeBreakpoints.map(bp => (
                <Badge key={bp} tone="primary">{bp}</Badge>
              ))
            ) : (
              <Badge>base (no breakpoint active)</Badge>
            )}
          </Row>
          <Row css={{ gap: "$4", flexWrap: "wrap" }}>
            <Badge tone={conditions.touch ? "success" : "secondary"}>
              touch: {String(conditions.touch)}
            </Badge>
            <Badge tone={conditions.pointer ? "success" : "secondary"}>
              pointer: {String(conditions.pointer)}
            </Badge>
          </Row>
        </Column>

        {/* useTokens */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useTokens</Text>
          <Text css={{ typo: "$caption" }}>
            tokenValue exposes resolved CSS variable references for all {Object.keys(tokenValue).length} scale categories.
          </Text>
          <Row css={{ gap: "$4", flexWrap: "wrap" }}>
            {Object.keys(tokenValue).slice(0, 6).map(key => (
              <Badge key={key}>{key}</Badge>
            ))}
            <Badge tone="secondary">+{Object.keys(tokenValue).length - 6} more</Badge>
          </Row>
        </Column>

        {/* useRTL */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useRTL</Text>
          <Text>
            Direction: <Badge tone="primary">{direction}</Badge>
          </Text>
        </Column>

        {/* useMediaQuery */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useMediaQuery</Text>
          <Row css={{ gap: "$8", alignItems: "center" }}>
            <StatusDot active={prefersReducedMotion} />
            <Text>prefers-reduced-motion: {String(prefersReducedMotion)}</Text>
          </Row>
        </Column>

        {/* useTransition */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useTransition</Text>
          <Button size="minimal" onClick={() => setShowBanner(v => !v)}>
            {showBanner ? "Hide" : "Show"} Banner
          </Button>
          {transition.mounted && (
            <Box
              style={transition.style}
              css={{ bg: "$success3", color: "$successText3", p: "$12", radius: "$4" }}
            >
              <Text>Animated banner (mounted: {String(transition.mounted)}, active: {String(transition.active)})</Text>
            </Box>
          )}
        </Column>

        {/* useLayout */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useLayout</Text>
          <Box ref={layoutRef} css={{ bg: "$tertiary4", p: "$12", radius: "$4", resize: "horizontal", overflow: "auto" }}>
            <Text css={{ typo: "$caption" }}>
              Resize me — {Math.round(layoutSize.width)}px x {Math.round(layoutSize.height)}px
            </Text>
          </Box>
        </Column>

        {/* useMutationObserver */}
        <Column css={{ gap: "$8", p: "$16", bg: "$tertiary2", radius: "$6" }}>
          <Text css={{ fontWeight: "$600" }}>useMutationObserver</Text>
          <Box ref={mutationRef} css={{ bg: "$tertiary4", p: "$12", radius: "$4" }}>
            <Text css={{ typo: "$caption" }}>Observed element</Text>
          </Box>
          <Row css={{ gap: "$8", alignItems: "center" }}>
            <Text>Mutations detected: {mutationCount}</Text>
            <Button
              size="minimal"
              onClick={() => {
                if (mutationRef.current) {
                  mutationRef.current.setAttribute("data-tick", String(Date.now()))
                }
              }}
            >
              Trigger
            </Button>
          </Row>
        </Column>
      </Grid>
    </Section>
  )
}
HooksDashboard.displayName = "HooksDashboard"
