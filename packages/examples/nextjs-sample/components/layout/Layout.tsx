import Link from "next/link"
import Logo from "@/components/layout/Logo"
import {
  useHtml,
  Button,
  Column,
  FlexList,
  FlexListItem,
  Grid,
  Heading,
  IconButton,
  IconName,
  Row,
  Text,
  useColors,
} from "@/ui"

function Layout({ children }: { children: React.ReactNode }) {
  const { toggleColorMode, isDark } = useColors()

  // Hook to manage HTML props, because Next doesn't let us make changes to <html> on the client-side
  useHtml()

  return (
    <section>
      <Grid h="fullVh" verticalPanels={{ "@initial": "14-11", "@bp1": "12-11" }}>
        <Row.header
          alignItems="center"
          px="9"
          bg="neutral3"
          wrap
          shadow="highSoft"
          justifyContent={{ "@initial": "spaceBetween", "@<bp1": "center" }}
        >
          <Heading.h1
            lineHeight="min"
            flat
            p="2"
            ml={{ "@bp1": "minus2" }}
            w={{ "@<bp1": "full" }}
            align={{ "@<bp1": "center" }}
          >
            <Logo />
          </Heading.h1>
          <Row.nav
            alignItems="center"
            gap="6"
            w={{ "@<bp1": "full" }}
            justifyContent={{ "@<bp1": "center" }}
          >
            <Row aria-label="Main navigation" alignItems="center">
              <FlexList gap="2">
                <FlexListItem>
                  <Link href="/">
                    <Button size="small" variant="ghost">
                      Home
                    </Button>
                  </Link>
                </FlexListItem>
                <FlexListItem>
                  <Link href="/sample">
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
          </Row.nav>
        </Row.header>
        <Column.main p="9" pb="13">
          {children}
        </Column.main>
        <Row.footer alignItems="center" justifyContent="center" px="9" bg="neutral3">
          <Text>&copy; Neutron</Text>
        </Row.footer>
      </Grid>
    </section>
  )
}
Layout.displayName = "Layout"

export default Layout
