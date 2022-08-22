import * as React from "react"
import type { NextPage } from "next"
import {
  Box,
  Column,
  Heading,
  Text,
  Anchor,
  appDarkTheme,
  appTheme,
  keyframes,
  useColors,
  getTheme,
  style,
  styledNUI,
} from "@/ui"
import { Cards } from "@/components/sample/Cards"
import { Tags } from "@/components/sample/Tags"
import { ButtonSamples } from "@/components/sample/ButtonSamples"
import { Inputs } from "@/components/sample/Inputs"
import { Statuses } from "@/components/sample/Statuses"
import Head from "next/head"

function Pos(props: {
  children: React.ReactNode
  position?: "fixed" | "absolute" | "relative"
  tabIndex?: number
  className?: string
  style?: Record<string, any>
}) {
  console.log("position", props.position)
  return (
    <section tabIndex={props.tabIndex} className={props.className} style={props.style}>
      {props.children}
    </section>
  )
}

const BaseSection = styledNUI(
  Pos,
  {
    h: "$80",
    bg: {
      sm: "$magenta1",
      md: "$amber1",
      lg: "$forest1",
      xl: "$aqua1",
      dark: "$primary4",
      base: "$neutral3",
    },
    color: "$textNeutral3",
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
    maxWidth: "$480",
    fontWeight: "$600",
    fontSize: "$h3",
    ":active": {
      bg: "$primary10",
      color: "$textPrimary10",
    },
    ":focus-visible": {
      color: "$textPrimary9",
      bg: "$primary9",
      outline: "$primaryMax",
    },
    ":hover": {
      bg: "$primary9",
      color: "$textPrimary9",
    },
  },
  "BaseSection"
)
const NuiSection = styledNUI(
  BaseSection,
  {
    h: "$320",
    sm: {
      color: "$textMagenta1",
    },
    md: {
      color: "$textAmber1",
    },
    lg: {
      color: "$textForest1",
    },
    xl: {
      color: "$textAqua1",
    },
    dark: {
      outlineWidth: "$widthBase",
      color: "$textAqua1",
    },
    motion: {
      animation: "none",
    },
  },
  "NuiSection"
)

const Sample: NextPage = () => {
  const showColorPalette = true
  const showTypography = true
  const showButtons = true
  const showInputs = true
  const showTags = true
  const showStatuses = true
  const showSampleBox = true

  const sampleControls = (
    <>
      {showColorPalette && <Cards title="Color Palette" theme={appTheme} darkTheme={appDarkTheme} />}
      <Box mt="6" maxWidth="25" mx="auto">
        {showTypography && (
          <>
            <Heading>
              <Anchor href="#">&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit&quot;</Anchor>
            </Heading>
            <Text.p>
              Lorem &apos;ipsum&apos; dolor sit amet -- consectetur adipiscing elit. Donec scelerisque quis est non
              pharetra. &quot;Etiam&quot; at lacus arcu. Nullam vitae <Anchor href="#">varius nisl semper</Anchor> nulla
              ac ipsum ultricies hendrerit sit amet metus.
            </Text.p>
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
    <Column.article>
      <Head>
        <title>UI Lib + Design System Sample</title>
        <meta name="description" content="Sample of various NeutronUI components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSampleBox && (
        <>
          <Box
            css={{
              bg: "$neutral10",
              color: "$textNeutral10",
              margin: "$2 $4 $7 $6",
              p: "$8 $8 $8 $4",
              borderRadius: "$2 $5 $1 $4",
              float: "left",
              maxWidth: "$20",
            }}
          >
            Sample box
          </Box>
          <NuiSection tabIndex={0} css={{ fontSize: "$36" }} position="relative">
            NUI-powered sample box
          </NuiSection>
          <NuiSection tabIndex={0} css={{ h: "$200" }} position="fixed">
            NUI-powered sample box
          </NuiSection>
        </>
      )}
      {!showSampleBox && sampleControls}
    </Column.article>
  )
}

export default Sample
