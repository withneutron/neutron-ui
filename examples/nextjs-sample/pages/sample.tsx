import * as React from "react"
import type { NextPage } from "next"
import { appDarkTheme, appTheme } from "@/ui"
import { Cards } from "@/components/sample/Cards"
import { Tags } from "@/components/sample/Tags"
import { ButtonSamples } from "@/components/sample/ButtonSamples"
import { Inputs } from "@/components/sample/Inputs"
import { Statuses } from "@/components/sample/Statuses"
import Head from "next/head"
import { styled, Box, Column, Heading, Text, Anchor, Grid, Row, variants } from "@withneutron/quarks-react"
import { vars } from "@withneutron/quarks"
import { useEffect, useRef } from "react"

const BaseSection = styled(
  "div",
  {
    h: "$80",
    width: `calc(100vw - ${vars.size[120]})`,
    bg: {
      sm: "$magenta1",
      md: "$amber1",
      lg: "$forest1",
      xl: "$aqua1",
      dark: "$primary4",
      base: "$tertiary3",
    },
    color: "$tertiaryText3",
    m: "$8",
    mb: "$20",
    ml: "$16",
    mr: "$12",
    p: "$32",
    pl: "$16",
    border: "$primaryMax",
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
      outline: "$primaryMax",
    },
    ":hover": {
      bg: "$primary9",
      color: "$primaryText9",
    },
  },
  "BaseSection"
)
const NuiSection = styled(
  BaseSection,
  {
    h: "$320",
    mx: "$56",
    sm: {
      color: "$magentaText1",
    },
    md: {
      color: "$amberText1",
    },
    lg: {
      color: "$forestText1",
    },
    xl: {
      color: "$aquaText1",
      mx: "$24",
    },
    dark: {
      outlineWidth: "$widthBase",
      color: "$aquaText1",
    },
    "!touch": {
      bg: "$aqua4",
    },
    motion: {
      animation: "none",
    },
  },
  variants({
    kind: {
      error: {
        bg: "$error3",
        color: "$errorText3",
      },
      success: {
        bg: "$success3",
        color: "$successText3",
      },
      warning: {
        bg: "$warning3",
        color: "$warningText3",
        px: {
          sm: "$12",
          md: "$16",
          lg: "$24",
          base: "$40",
        },
      },
    },
    isChunky: {
      true: { borderWidth: "$widthMax" },
    },
  }),
  "NuiSection"
)

const SampleGrid = styled(
  Grid,
  {
    bg: "$primary2",
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
    bg: "$primary4",
    color: "$primaryText4",
    p: "$12",
    fontSize: "$21",
    fontWeight: "$600",
    justifyContent: "center",
    alignItems: "center",
  },
  "GridBox"
)

const Sample: NextPage = () => {
  const showColorPalette = true
  const showTypography = true
  const showButtons = true
  const showInputs = true
  const showTags = true
  const showStatuses = true
  const showSampleBox = true
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log("@@@ ref", ref.current)
  }, [ref.current])

  const sampleControls = (
    <>
      {showColorPalette && <Cards title="Color Palette" theme={appTheme} darkTheme={appDarkTheme} />}
      <Box
        css={{
          mt: "$20",
          mx: "auto",
          maxWidth: "960rem",
        }}
      >
        {showTypography && (
          <>
            <Heading>
              <Anchor href="#">&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit&quot;</Anchor>
            </Heading>
            <Text>
              Lorem &apos;ipsum&apos; dolor sit amet -- consectetur adipiscing elit. Donec scelerisque quis est non
              pharetra. &quot;Etiam&quot; at lacus arcu. Nullam vitae <Anchor href="#">varius nisl semper</Anchor> nulla
              ac ipsum ultricies hendrerit sit amet metus.
            </Text>
          </>
        )}
        {showButtons && <ButtonSamples />}
        {showInputs && <Inputs />}
      </Box>
      {showTags && <Tags />}
      {showStatuses && <Statuses />}
    </>
  )
  return (
    <Column.Article>
      <Head>
        <title>UI Lib + Design System Sample</title>
        <meta name="description" content="Sample of various NeutronUI components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSampleBox && (
        <>
          <Heading.H2 css={{ type: "$majorTitle" }}>Major Title</Heading.H2>
          <Heading.H2 css={{ type: "$title" }}>Title</Heading.H2>
          <Heading.H2 css={{ type: "$minorTitle" }}>Minor Title</Heading.H2>
          <Heading.H2 css={{ type: "$heading" }}>Heading</Heading.H2>
          <Heading.H2 css={{ type: "$subHeading" }}>Sub-Heading</Heading.H2>
          <Text css={{ type: "$body" }}>Body</Text>
          <Text css={{ type: "$caption" }}>Caption</Text>
          <Box.Aside
            ref={(element: HTMLDivElement) => {
              console.log("@@@ element", element)
            }}
            css={{
              bg: "$primary10",
              color: "$primaryText10",
              mt: "$4",
              mr: "$12",
              mb: "$24",
              ml: "$20",
              p: "$32",
              pl: "$12",
              radiusTopLeft: "$3",
              radiusTopRight: "$8",
              radiusBottomRight: "$1",
              radiusBottomLeft: "$6",
              float: "left",
              maxWidth: "$480",
            }}
          >
            Sample box
          </Box.Aside>
          <NuiSection isChunky kind="success" ref={ref} tabIndex={0} css={{ fontSize: "$36" }}>
            NUI-powered sample box
          </NuiSection>
          <NuiSection.Aside kind="warning" tabIndex={0} css={{ h: "$200" }}>
            NUI-powered sample box
          </NuiSection.Aside>
          <SampleGrid>
            <GridBox>1</GridBox>
            <GridBox>2</GridBox>
            <GridBox>3</GridBox>
            <GridBox>4</GridBox>

            <GridBox>5</GridBox>
            <GridBox>6</GridBox>
            <GridBox>7</GridBox>
            <GridBox>8</GridBox>

            <GridBox>9</GridBox>
            <GridBox>10</GridBox>
            <GridBox>11</GridBox>
            <GridBox>12</GridBox>
          </SampleGrid>
        </>
      )}
      {!showSampleBox && sampleControls}
    </Column.Article>
  )
}

export default Sample
