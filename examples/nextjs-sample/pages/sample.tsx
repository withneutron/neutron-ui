import type { NextPage } from "next"
import Head from "next/head"
import { styled, Column, Heading, SubHeading, Grid, Row, ListItem, List } from "@withneutron/quarks-react"
import { Button } from "../components/Button"
import { token } from "@withneutron/quarks"
import { useState } from "react"
import { SidePanel } from "../components/SidePanel"

const Sample: NextPage = () => {
  const [isFiltersPanelVisible, setIsFiltersPanelVisible] = useState(false)
  const [filters, setFilters] = useState<string[]>([])
  return (
    <Column
      css={{
        p: {
          base: "$40",
          md: "$20",
        },
        flex: "1",
      }}
    >
      <Head>
        <title>Neutron UI — Style Lib + Design System Sample</title>
        <meta name="description" content="Sample of various NeutronUI components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
        css={{
          gap: "$24",
          gtColumns: {
            base: `2fr minmax(${token.column.$320}, ${token.column.$320})`,
            md: "$1",
          },
        }}
      >
        <Card as="article" css={{ gap: "$16" }}>
          <Column.Header>
            <Heading>Your Personalized List</Heading>
            <SubHeading css={{ fontWeight: "$500" }}>Of Cool Doodads</SubHeading>
          </Column.Header>

          <Grid as="ul" css={{ gap: "$16", gtColumns: "$fit120", gridAutoRows: "$120", m: "$0", p: "$0" }}>
            {Array(36)
              .fill(0)
              .map((_, index) => (
                <Doodad key={index} css={getColors(index)}>
                  {index + 1}
                </Doodad>
              ))}
          </Grid>
        </Card>

        <Card as="aside" css={{ gap: "$16", minHeight: "$320" }}>
          <Row.Header css={{ gap: "$16", justifyContent: "space-between", alignItems: "center" }}>
            <SubHeading.H3 flat>Filtering By</SubHeading.H3>
            <Button variant="ghost" size="minimal" onClick={() => setIsFiltersPanelVisible(true)}>
              Edit
            </Button>
          </Row.Header>
          <List column>
            {filters.map(filter => (
              <ListItem key={filter}>{filter}</ListItem>
            ))}
          </List>
        </Card>
      </Grid>

      <SidePanel
        isVisible={isFiltersPanelVisible}
        onClose={() => setIsFiltersPanelVisible(false)}
        onApply={filters => setFilters(filters)}
      >
        [Filters placeholder text]
      </SidePanel>
    </Column>
  )
}

export default Sample

const Card = styled(
  Column,
  {
    bg: "$min",
    radius: "$8",
    boxShadow: "$low",
    p: "$24",
  },
  "Card"
)

const Doodad = styled("li", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  bg: "$tertiary3",
  radius: "$4",
  listStyle: "unset",
  typo: "$subHeading",
})

const colorKey = {
  0: "primary",
  1: "secondary",
  2: "tertiary",
} as const

function getColors(index: number) {
  const key = Math.floor(index / 12)
  const number = (index % 12) + 1
  const name = colorKey[key as keyof typeof colorKey]
  const bg = name ? `$${name}${number}` : "$tertiary3"
  const color = name ? `$${name}Text${number}` : "$tertiaryText3"
  return { bg, color }
}
