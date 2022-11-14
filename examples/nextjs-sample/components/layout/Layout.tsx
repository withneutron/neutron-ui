import Link from "next/link"
import Logo from "@/components/layout/Logo"
import { useHtml, Button, IconButton, IconName, useColors } from "@/ui"
import { Column, Heading, FlexList, FlexListItem, Text, Grid, Row } from "@withneutron/quarks-react"

function Layout({ children }: { children: React.ReactNode }) {
  const { toggleColorMode, isDark } = useColors()

  // Hook to manage HTML props, because Next doesn't let us make changes to <html> on the client-side
  useHtml()

  return (
    <section>
      <Grid
        css={{
          h: "100vh",
          gtRows: "96rem auto",
        }}
      >
        <Row.Header
          css={{
            alignItems: "center",
            px: "$40",
            bg: "$primary3",
            flexWrap: "wrap",
            boxShadow: "$highSoft",
            justifyContent: {
              base: "space-between",
              sm: "center",
            },
          }}
        >
          <Heading.H1
            css={{
              lineHeight: "$min",
              p: "$8",
              mb: "$0",
              ml: { base: "-8rem", sm: "initial" },
              w: { sm: "100%" },
              textAlign: { sm: "center" },
            }}
          >
            <Logo />
          </Heading.H1>
          <Row.Nav
            css={{
              alignItems: "center",
              gap: "$12",
              w: { sm: "100%" },
              justifyContent: { sm: "center" },
            }}
          >
            <Row
              aria-label="Main navigation"
              css={{
                alignItems: "center",
              }}
            >
              <FlexList css={{ gap: "$8" }}>
                <FlexListItem>
                  <Link passHref href="/">
                    <Button size="small" variant="ghost">
                      Home
                    </Button>
                  </Link>
                </FlexListItem>
                <FlexListItem>
                  <Link passHref href="/sample">
                    <Button size="small" variant="ghost">
                      Sample
                    </Button>
                  </Link>
                </FlexListItem>
              </FlexList>
            </Row>
            <IconButton
              square
              variant="subtle"
              size="small"
              onPress={toggleColorMode}
              iconName={isDark ? IconName.sun : IconName.moon}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            />
          </Row.Nav>
        </Row.Header>
        <Column.Main
          css={{
            p: "$40",
            pb: "$56",
          }}
        >
          {children}
        </Column.Main>
        <Row.Footer
          css={{
            alignItems: "center",
            justifyContent: "center",
            px: "$40",
            bg: "$primary3",
          }}
        >
          <Text>&copy; Neutron</Text>
        </Row.Footer>
      </Grid>
    </section>
  )
}
Layout.displayName = "Layout"

export default Layout
