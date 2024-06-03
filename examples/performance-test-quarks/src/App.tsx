import "@withneutron/quarks/styles"
import { Column, Grid, Heading, QuarksProvider, styled } from "@withneutron/quarks-react"
import { CSS } from "../../../packages/quarks/src"

function App() {
  return (
    <QuarksProvider isDebugMode defaultColorMode="light">
      <Wrapper>
        <Card>
          {/* <Column css={{ size: "$20", bg: "$amber9" }} /> */}
          <Heading as="h1">Performance Test</Heading>
          <ColorGrid as="ul">
            {Array(36)
              .fill(0)
              .map((_, index) => (
                <Square key={index} css={getColors(index)}>
                  {index + 1}
                </Square>
              ))}
          </ColorGrid>
        </Card>
      </Wrapper>
    </QuarksProvider>
  )
}

export default App

const Wrapper = styled("main", { p: "$40", bg: "$tertiary3", minHeight: "100vh" }, "Wrapper")
const Card = styled(
  Column,
  {
    p: "$40",
    bg: "$min",
    radius: "$8",
    boxShadow: "$medium",
  },
  "Card"
)
const ColorGrid = styled(
  Grid,
  {
    gap: "$16",
    gtColumns: "$fill120",
    autoRows: "$120",
    mb: "$0",
    pl: "$0",
  },
  "ColorGrid"
)
const Square = styled(
  "li",
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bg: "$tertiary3",
    radius: "$4",
    listStyle: "none",
    typo: "$subHeading",
  },
  "Square"
)

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
  return { bg, color } as CSS
}
