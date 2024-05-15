import * as React from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { styled, Column } from "@withneutron/quarks-react"

const Base = styled(
  "section",
  {
    color: "$secondaryText10",
    textDecorationColor: "$errorColor",
    textDecorationLine: "$highlightType",
    textDecorationStyle: "$strikeStyle",
    textDecorationThickness: "$altThickness",
  },
  "Base"
)
const Secondary = styled(
  Base,
  {
    color: "$indigo11",
    fontSize: "$21",
    fontWeight: "$500",
  },
  "Secondary"
)
const Tertiary = styled(
  Secondary,
  {
    textDecoration: "green wavy underline",
  },
  "Tertiary"
)

const Sample: NextPage = () => {
  return (
    <Column.Article
      css={{
        flex: "1",
        p: {
          base: "$80",
          md: "$40",
          sm: "$20",
        },
      }}
    >
      <Head>
        <title>UI Lib + Design System Sample</title>
        <meta name="description" content="Sample of various NeutronUI components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Tertiary>Testing 3-level composition</Tertiary>
    </Column.Article>
  )
}
export default Sample
