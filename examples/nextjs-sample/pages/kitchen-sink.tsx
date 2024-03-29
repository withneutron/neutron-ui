import * as React from "react"
import type { NextPage } from "next"
import Head from "next/head"
import {
  styled,
  Box,
  Column,
  Heading,
  SubHeading,
  Text,
  Grid,
  Row,
  useAnimation,
  useRTL,
} from "@withneutron/quarks-react"
import { token } from "@withneutron/quarks"
import { ReactNode, useEffect, useRef, useState } from "react"

const Base = styled(
  "aside",
  {
    color: "$secondaryText10",
    outline: "$secondary",
    radius: "$8",
    bg: {
      base: "$amber10",
      xl: "$tertiary12",
      lg: "$tertiary7",
      md: "$tertiary10",
    },
    backgroundColor: "$amber10",
  },
  "Base"
)
const Secondary = styled(
  Base,
  {
    backgroundColor: "$amber10",
    color: "$amber2",
  },
  "Secondary"
)
const Tertiary = styled(
  Secondary,
  {
    outline: "none",
    bg: "$secondary9",
    p: "$32",
    fontWeight: "$500",
    textDecoration: "$highlightError",
    pointerEvents: "all",
    rtl: {
      bg: { xl: "$secondary9", lg: "$tomato9", md: "$amber9" },
    },
    ltr: {
      bg: "$indigo10",
      outline: "none",
      xl: {
        bg: "$primary10",
        outline: "$primary",
      },
      lg: {
        bg: "$secondary10",
        outline: "$secondary",
      },
      md: {
        bg: "$tertiary10",
        outline: "$tertiary",
      },
    },
  },
  "Tertiary"
)

const BaseSection = styled(
  "section",
  {
    h: "$80",
    width: `calc(100vw - ${token.size.$120})`,
    bg: {
      base: "$tertiary3",
      dark: "$primary4",
      xl: "$aqua1",
      lg: "$forest1",
      md: "$amber1",
      sm: "$magenta1",
    },
    color: "$tertiaryText3",
    m: "$8",
    mb: "$20",
    ml: "$16",
    mr: "$12",
    p: "$32",
    pl: "$16",
    border: "$tertiary",
    borderTopColor: "$secondaryMin",
    borderBottomColor: "$tertiaryMax",
    fontFamily: "$code",
    radius: "$1",
    radiusTopRight: "$8",
    radiusBottomLeft: "$6",
    radiusBottomRight: "$2",
    float: "left",
    maxWidth: "$640",
    fontWeight: "$600",
    fontSize: "$h3",
    ":active": {
      bg: "$primary10",
      color: "$primaryText10",
    },
    ":focus-visible": {
      color: "$primaryText9",
      bg: "$primary9",
      outline: "$secondaryMax",
    },
    ":hover": {
      bg: "$primary9",
      color: "$primaryText9",
    },
    ":interact": {
      borderColor: "$secondaryMax",
    },
  },
  "BaseSection"
)
const NuiSection = styled(
  BaseSection,
  {
    h: "$320",
    mx: "$56",
    xl: {
      color: "$aquaText1",
      mx: "$24",
    },
    lg: {
      color: "$forestText1",
    },
    md: {
      color: "$amberText1",
    },
    sm: {
      color: "$magentaText1",
    },
    dark: {
      outlineWidth: "$widthBase",
      color: "$aquaText1",
    },
    lowMotion: {
      animation: "none",
    },
    ":interact": {
      color: "$tomato3",
    },
  },
  {
    kind: {
      error: {
        bg: "$error3",
        color: "$errorText3",
      },
      success: {
        bg: "$success3",
        // linearGradient: `${token.color.$success3}, ${token.color.$success1}`,
        color: "$successText3",
        ":interact": {
          bg: "$tertiary9",
          // linearGradient: `${token.color.$success9}, ${token.color.$success6}`,
          color: "$tertiaryText9",
          border: "none",
          outlineColor: "$tertiaryMax",
        },
      },
      warning: {
        bg: "$warning3",
        color: "$warningText3",
        px: {
          base: "$40",
          lg: "$24",
          md: "$16",
          sm: "$12",
        },
        ":interact": {
          bg: "$warning9",
          color: "$warningText9",
          borderColor: "transparent",
          outlineColor: token.color.$warning9,
          outlineWidth: "$widthMax",
        },
      },
    },
    isChunky: {
      true: {
        borderWidth: "$widthMax",
        ":focus-visible": {
          outlineWidth: "$widthMax",
        },
      },
    },
  },
  "NuiSection"
)

const SampleGrid = styled(
  Grid,
  {
    bg: "$tertiary2",
    gtColumns: "$fit200",
    autoRows: "$80",
    gap: "$12",
    p: "$12",
  },
  "SampleGrid"
)
const GridBox = styled(
  Row,
  {
    bg: "$tertiary4",
    color: "$tertiaryText4",
    p: "$12",
    fontSize: "$21",
    fontWeight: "$600",
    justifyContent: "center",
    alignItems: "center",
    ":even": {
      bg: "$secondary9",
      color: "$secondaryText9",
    },
    ":odd": {
      bg: "$tertiary9",
      color: "$tertiaryText9",
    },
    ":nth-child(-n+3)": {
      bg: "$secondary9",
      color: "$secondaryText9",
    },
    ":first": {
      bg: "$tertiary9",
      color: "$tertiaryText9",
    },
    ":last": {
      bg: {
        base: "$magenta9",
        xl: "$plum9",
        lg: "$indigo9",
        md: "$grass9",
      },
      color: "$magentaText9",
    },
  },
  "GridBox"
)

const MediaQueryName = styled(Text, { display: "none" }, "MediaQueryName")

const Sample: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [cycle, setCycle] = useState(0)
  const arrow = useRTL("⇦", "⇨")

  useEffect(() => {
    console.debug("@@@ ref", ref.current)
  }, [ref.current])

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((current: number) => current + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Column.Article
      css={{
        flex: "1",
        p: {
          base: "$80",
          md: "$40",
          sm: "$20",
        },
        backgroundImage: `url("https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2803&q=80")`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Head>
        <title>UI Lib + Design System Sample</title>
        <meta name="description" content="Sample of various NeutronUI components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row.Header
        css={{
          gap: "$8",
        }}
      >
        <SubHeading>BP:</SubHeading>
        <MediaQueryName css={{ display: { base: "inline-block", xl: "none" } }}>Base (base)</MediaQueryName>
        <MediaQueryName css={{ display: { xl: "inline-block", lg: "none" } }}>Extra Large (xl)</MediaQueryName>
        <MediaQueryName css={{ display: { lg: "inline-block", md: "none" } }}>Large (lg)</MediaQueryName>
        <MediaQueryName css={{ display: { md: "inline-block", sm: "none" } }}>Medium (md)</MediaQueryName>
        <MediaQueryName css={{ display: { sm: "inline-block", xs: "none" } }}>Small (sm)</MediaQueryName>
        <MediaQueryName css={{ display: { xs: "inline-block" } }}>Extra Small (xs)</MediaQueryName>
      </Row.Header>

      <header>
        <Heading css={{ typo: "$mainHeading", animation: "$flashSize", width: "max-content" }}>Main Heading</Heading>
        <Heading.H2>Heading</Heading.H2>
      </header>
      <SubHeading.H3 css={{ animation: cycle % 2 ? "$slideOutTop" : "$slideInTop" }}>Sub-Heading</SubHeading.H3>
      <SubHeading.H4 css={{ typo: "$minorHeading" }}>Minor Heading</SubHeading.H4>
      <Text css={{ typo: "$body", animation: "$bounceUp", textDecoration: "$highlightError" }}>Body</Text>
      <Text css={{ typo: "$caption" }}>Caption</Text>
      <SampleBox isVisible={cycle % 2 === 1}>Sample box</SampleBox>
      <Tertiary
        style={{
          lineHeight: "200px",
        }}
      >
        Testing 3-level composition
        <Box.Span css={{ float: "left", mr: "$12" }}>{arrow}</Box.Span>
      </Tertiary>
      <NuiSection
        isChunky
        kind="success"
        ref={ref}
        tabIndex={0}
        css={{
          fontSize: "$36",
          md: {
            bg: "$primary9",
            color: "$primaryText9",
          },
          "!md": {
            bg: "$secondary9",
            color: "$secondaryText9",
          },
        }}
      >
        NUI-powered sample box
      </NuiSection>
      <NuiSection as="aside" kind="warning" tabIndex={0} css={{ h: "$200" }}>
        NUI-powered sample box
      </NuiSection>
      <SampleGrid>
        {Array.apply(null, Array(12)).map((_v, index: number) => (
          <GridBox key={index} index={index} length={12} css={{ outline: index === 1 ? "$secondaryMax" : undefined }}>
            {index + 1}
          </GridBox>
        ))}
      </SampleGrid>
    </Column.Article>
  )
}

export default Sample

interface SampleBoxProps {
  children: ReactNode
  isVisible?: boolean
}

function SampleBox(props: SampleBoxProps) {
  const { animation, isVisible } = useAnimation("$slideOutBottom", "$slideInBottom", props.isVisible)
  return !isVisible ? null : (
    <Row
      css={{
        animation,
        position: "fixed",
        bottom: "$24",
        justifyContent: "center",
        w: "100%",
      }}
    >
      <Box.Aside
        ref={(element: HTMLDivElement) => {
          console.debug("@@@ element", element)
        }}
        css={{
          bg: "$primary10",
          color: "$primaryText10",
          p: "$32",
          radiusTopLeft: "$3",
          radiusTopRight: "$8",
          radiusBottomRight: "$1",
          radiusBottomLeft: "$6",
          minWidth: "$320",
          maxWidth: "$480",
          boxShadow: "$medium",
        }}
      >
        {props.children}
      </Box.Aside>
    </Row>
  )
}
SampleBox.displayName = "SampleBox"
