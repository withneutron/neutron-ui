import { useColors, Row, FlexList, FlexListItem, Anchor } from "@withneutron/quarks-react"
import Link from "next/link"
import { Button } from "./Button"
import Logo from "./Logo"
import { MoonIcon } from "./MoonIcon"
import { SunIcon } from "./SunIcon"

export function AppHeader() {
  const { isDark, toggleColorMode } = useColors()
  return (
    <Row
      as="header"
      css={{
        bg: "$min",
        boxShadow: "$low",
        px: "$40",
        py: "$12",
        minHeight: "$80",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "$16",
        xs: {
          flexDirection: "column",
          justifyContent: "center",
          py: "$24",
        },
      }}
    >
      <Logo />
      <Row as="nav" css={{ gap: "$32", alignItems: "center" }}>
        <FlexList css={{ gap: "$24" }}>
          <FlexListItem>
            <Anchor as={Link} href="/">
              Home
            </Anchor>
          </FlexListItem>
          <FlexListItem>
            <Anchor as={Link} href="/kitchen-sink">
              Kitchen Sink
            </Anchor>
          </FlexListItem>
          <FlexListItem>
            <Anchor as={Link} href="/shorthands">
              Shorthands
            </Anchor>
          </FlexListItem>
        </FlexList>
        <Button
          onClick={toggleColorMode}
          css={{
            fontSize: "$18",
            lineHeight: "$min",
            size: "$32",
            minWidth: "unset",
            p: "$4",
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Row>
    </Row>
  )
}
AppHeader.displayName = "AppHeader"
