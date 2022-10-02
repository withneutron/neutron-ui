import * as React from "react"
import type { MetaFunction } from "remix"
import { Box, Column, Heading, Text, Anchor } from "~ui"
import { appDarkTheme, appTheme } from "~ui"
import { Cards } from "~components/sample/Cards"
import { Tags } from "~components/sample/Tags"
import { ButtonSamples } from "~components/sample/ButtonSamples"
import { Inputs } from "~components/sample/Inputs"
import { Statuses } from "~components/sample/Statuses"

export let meta: MetaFunction = () => ({ title: "UI Lib + Code Gen Sample" })

export default function Index() {
  const showColorPalette = true
  const showTypography = true
  const showButtons = true
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
              <Anchor href="#">"Lorem ipsum dolor sit amet, consectetur adipiscing elit"</Anchor>
            </Heading>
            <Text.p>
              Lorem 'ipsum' dolor sit amet -- consectetur adipiscing elit. Donec scelerisque quis
              est non pharetra. "Etiam" at lacus arcu. Nullam vitae{" "}
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
