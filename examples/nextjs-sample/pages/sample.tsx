import * as React from "react"
import type { NextPage } from "next"
import { Box, Column, Heading, Text, Anchor, appDarkTheme, appTheme, keyframes, useColors, getTheme, style } from "@/ui"
import { Cards } from "@/components/sample/Cards"
import { Tags } from "@/components/sample/Tags"
import { ButtonSamples } from "@/components/sample/ButtonSamples"
import { Inputs } from "@/components/sample/Inputs"
import { Statuses } from "@/components/sample/Statuses"
import Head from "next/head"

const nuiProps = style(
  {
    bg: {
      base: "$neutral3",
      sm: "$amber3",
      md: "$forest3",
      lg: "$indigo3",
      xl: "$primary3",
      dark: "$primary4",
      light: "$secondary4",
    },
    color: "$textNeutral3",
    m: "$8",
    mb: "$20",
    ml: "$16",
    mr: "$12",
    p: "$32",
    pl: "$16",
    border: "$primaryMax",
    // outline: "$primary",
    // fontFamily: "$code",
    radius: "$1",
    radiusTopRight: "$8",
    radiusBottomLeft: "$6",
    radiusBottomRight: "$2",
    float: "left",
    maxWidth: "$480",
    fontWeight: "$600",
    fontSize: "$h3",
    ":active": {
      // bg: "$primary10",
      color: "$textPrimary10",
    },
    ":focus-visible": {
      color: "$textNeutral10",
      // bg: "$warningMax",
    },
    ":hover": {
      // bg: "$primary9",
      color: "$textPrimary9",
    },
    dark: {
      outlineWidth: "$widthBase",
    },
    motion: {
      animation: "none",
    },
  },
  {
    // sm: true,
    // md: true,
    // lg: true,
    xl: true,
    // "!sm": true,
    // "!md": true,
    // "!lg": true,
    // "!xl": true,
    // contrast: true,
    // motion: true,
    // data: true,
    // touch: true,
    // pointer: true,
    // tv: true,
    // "!contrast": true,
    // "!motion": true,
    // "!data": true,
    // "!touch": true,
    // "!pointer": true,
    // "!tv": true,
    // light: true,
    // dark: true,
    debug: true,
  },
  "SampleBox"
)
console.log("nuiProps", nuiProps)

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
          <div {...nuiProps}>NUI-powered sample box</div>
          <div {...nuiProps}>NUI-powered sample box</div>
        </>
      )}
      {!showSampleBox && sampleControls}
    </Column.article>
  )
}

export default Sample
