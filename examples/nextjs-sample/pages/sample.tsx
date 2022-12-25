import * as React from "react"
import type { NextPage } from "next"
import { appDarkTheme, appTheme } from "@/ui"
import { Cards } from "@/components/sample/Cards"
import { Tags } from "@/components/sample/Tags"
import { ButtonSamples } from "@/components/sample/ButtonSamples"
import { Inputs } from "@/components/sample/Inputs"
import { Statuses } from "@/components/sample/Statuses"
import Head from "next/head"
import {
  styled,
  Box,
  Column,
  Heading,
  SubHeading,
  Text,
  Anchor,
  Grid,
  Row,
  variants,
  useAnimation,
} from "@withneutron/quarks-react"
import { vars } from "@withneutron/quarks"
import { ReactNode, useEffect, useRef, useState } from "react"

const Base = styled(
  "aside",
  {
    color: "$secondaryText10",
    outline: "$secondary",
    radius: "$8",
    bg: {
      md: "$primary10",
      lg: "$primary7",
      xl: "$primary12",
      base: "$amber10",
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
    font: "$em",
    textDecoration: "$highlightError",
    pointerEvents: "all",
  },
  "Tertiary"
)

const BaseSection = styled(
  "section",
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
    border: "$primary",
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
    ":interact": {
      color: "$tomato3",
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
        linearGradient: `${vars.color.success3}, ${vars.color.success1}`,
        color: "$successText3",
        ":interact": {
          linearGradient: `${vars.color.success9}, ${vars.color.success6}`,
          color: "$primaryText9",
          border: "none",
          outlineColor: "$primaryMax",
        },
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
        ":interact": {
          bg: "$warning9",
          color: "$warningText9",
          borderColor: "transparent",
          outlineColor: "$tertiaryMax",
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
    ":even": {
      bg: "$secondary9",
      color: "$secondaryText9",
    },
    ":odd": {
      bg: "$primary9",
      color: "$primaryText9",
    },
    ":nth-child(-n+3)": {
      bg: "$secondary9",
      color: "$secondaryText9",
    },
    ":first": {
      bg: "$primary9",
      color: "$primaryText9",
    },
    ":last": {
      bg: {
        base: "$magenta9",
        md: "$grass9",
        lg: "$indigo9",
        xl: "$plum9",
      },
      color: "$magentaText9",
    },
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
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    // console.log("@@@ ref", ref.current)
  }, [ref.current])

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((current: number) => current + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

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
          <Heading css={{ type: "$majorTitle", animation: "$flashSize", width: "max-content" }}>Major Title</Heading>
          <Heading css={{ type: "$title" }}>Title</Heading>
          <SubHeading css={{ type: "$minorTitle", animation: cycle % 2 ? "$slideOutTop" : "$slideInTop" }}>
            Minor Title
          </SubHeading>
          <Heading.H3>Heading</Heading.H3>
          <SubHeading>Sub-Heading</SubHeading>
          <Text css={{ type: "$body", animation: "$bounceUp", textDecoration: "$highlightError" }}>Body</Text>
          <Text css={{ type: "$caption" }}>Caption</Text>
          {<SampleBox isVisible={cycle % 2 === 1}>Sample box</SampleBox>}
          <Tertiary
            style={{
              lineHeight: "200px",
            }}
          >
            Testing 3-level composition
          </Tertiary>
          <NuiSection isChunky kind="success" ref={ref} tabIndex={0} css={{ fontSize: "$36" }}>
            NUI-powered sample box
          </NuiSection>
          <NuiSection as="aside" kind="warning" tabIndex={0} css={{ h: "$200" }}>
            NUI-powered sample box
          </NuiSection>
          <SampleGrid>
            {Array.apply(null, Array(12)).map((_v, index: number) => (
              <GridBox
                key={index}
                index={index}
                length={12}
                css={{ outline: index === 1 ? "$secondaryMax" : undefined }}
              >
                {index + 1}
              </GridBox>
            ))}
          </SampleGrid>
        </>
      )}
      {!showSampleBox && sampleControls}
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
          // console.log("@@@ element", element)
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
