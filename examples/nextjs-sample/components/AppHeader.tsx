import { useColors, Row, FlexList, FlexListItem, Anchor } from "@withneutron/quarks-react"
import Link from "next/link"
import { Button } from "./Button"
import Logo from "./Logo"
import { MoonIcon } from "./MoonIcon"
import { SunIcon } from "./SunIcon"

export function AppHeader() {
  const { isDark, toggleColorMode } = useColors()
  return (
    <Row.Header
      css={{
        bg: "$min",
        boxShadow: "$low",
        px: "$40",
        py: "$12",
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
      <Row.Nav css={{ gap: "$32", alignItems: "center" }}>
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
      </Row.Nav>
    </Row.Header>
  )
}
AppHeader.displayName = "AppHeader"
