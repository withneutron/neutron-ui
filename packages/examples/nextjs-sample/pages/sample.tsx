import * as React from "react"
import type { NextPage } from "next"
import { Box, Column, Heading, Text, Anchor, appDarkTheme, appTheme } from "@/ui"
import { Cards } from "@/components/sample/Cards"
import { Tags } from "@/components/sample/Tags"
import { ButtonSamples } from "@/components/sample/ButtonSamples"
import { Inputs } from "@/components/sample/Inputs"
import { Statuses } from "@/components/sample/Statuses"
import Head from "next/head"

const Sample: NextPage = () => {
  const showColorPalette = false
  const showTypography = false
  const showButtons = false
  const showInputs = true
  const showTags = true
  const showStatuses = true
  const showSampleBox = false

  const sampleControls = (
    <>
      {showColorPalette && (
        <Cards title="Color Palette" theme={appTheme} darkTheme={appDarkTheme} />
      )}
      <Box mt="6" maxWidth="25" mx="auto">
        {showTypography && (
          <>
            <Heading>
              <Anchor href="#">
                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit&quot;
              </Anchor>
            </Heading>
            <Text.p>
              Lorem &apos;ipsum&apos; dolor sit amet -- consectetur adipiscing elit. Donec
              scelerisque quis est non pharetra. &quot;Etiam&quot; at lacus arcu. Nullam vitae{" "}
              <Anchor href="#">varius nisl semper</Anchor> nulla ac ipsum ultricies hendrerit sit
              amet metus.
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
        <Box
          css={{
            bg: "$neutral10",
            color: "$textNeutral10",
            margin: "$2 $4 $2 $6",
            p: "$8 $8 $8 $4",
            borderRadius: "$2 $5 $1 $4",
            float: "left",
            maxWidth: "$20",
          }}
        >
          Sample box
        </Box>
      )}
      {!showSampleBox && sampleControls}
    </Column.article>
  )
}

export default Sample
