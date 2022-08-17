import * as React from "react"
import type { NextPage } from "next"
import { Box, Column, Heading, Text, Anchor, appDarkTheme, appTheme, keyframes, useColors, getTheme, style } from "@/ui"
import { Cards } from "@/components/sample/Cards"
import { Tags } from "@/components/sample/Tags"
import { ButtonSamples } from "@/components/sample/ButtonSamples"
import { Inputs } from "@/components/sample/Inputs"
import { Statuses } from "@/components/sample/Statuses"
import Head from "next/head"

const Sample: NextPage = () => {
  const showColorPalette = true
  const showTypography = true
  const showButtons = true
  const showInputs = true
  const showTags = true
  const showStatuses = true
  const showSampleBox = true

  const nuiProps = style(
    {
      bg: "$neutral3",
      color: "$textNeutral3",
      m: "$8",
      mb: "$20",
      ml: "$16",
      mr: "$12",
      p: "$32",
      pl: "$16",
      border: "$primaryMax",
      radius: "$1",
      radiusTopRight: "$8",
      radiusBottomLeft: "$6",
      radiusBottomRight: "$2",
      float: "left",
      maxWidth: "$480",
      fontWeight: "$600",
      fontSize: "$h3",
      // animation: "$spin",
      // animation: "$spinAndPause",
      // animation: "$flashSize",
      // animation: "$bounceTop",
      // animation: "$bounceRight",
      // animation: "$bounceBottom",
      // animation: "$bounceLeft",
      // animation: "$slideInTop",
      // animation: "$slideOutTop",
      // animation: "$slideInRight",
      // animation: "$slideOutRight",
      // animation: "$slideInBottom",
      // animation: "$slideOutBottom",
      // animation: "$slideInLeft",
      // animation: "$slideOutLeft",
      // animation: "$fadeIn",
      // animation: "$fadeOut",
      // animation: "$zoomIn",
      // animation: "$zoomOut",
      ":active": {
        bg: "$primary10",
        color: "$textPrimary10",
      },
      ":focus-visible": {
        color: "$textNeutral10",
        bg: "$warningMax",
      },
      ":hover": {
        bg: "$primary9",
        color: "$textPrimary9",
      },
      "@dark": {
        outlineWidth: "$widthBase",
      },
      "@reducedMotion": {
        animation: "none",
      },
    },
    {
      "@sm": false,
      "@md": false,
      "@lg": false,
      "@xl": false,
      "!sm": false,
      "!md": false,
      "!lg": false,
      "!xl": false,
      "@highContrast": false,
      "@reducedMotion": false,
      "@reducedData": false,
      "@touch": false,
      "@pointer": false,
      "@tv": false,
      "!highContrast": false,
      "!reducedMotion": false,
      "!reducedData": false,
      "!touch": false,
      "!pointer": false,
      "!tv": false,
      "@light": false,
      "@dark": false,
      debug: true,
    },
    "SampleBox"
  )
  console.log("nuiProps", nuiProps)

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
