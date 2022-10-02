import type { NextPage } from "next"
import Link from "next/link"
import { Grid, Column, Heading, List, ListItem, Text, Anchor, Box, useColor } from "../config/ui"

const Home: NextPage = () => {
  return (
    <>
      <Grid
        gap="11"
        maxWidth="27"
        mx="auto"
        horizontalPanel={{
          "@initial": "stacked",
          "@bp3": "right-17",
          "@bp4": "right-18",
          "@bp5": "right-19",
        }}
      >
        <Column.article>
          <Heading>Build and scale ecommerce apps in hours, not weeks.</Heading>
          <Text>Lorem ipsum dolor sit amet &quot;consectetur&quot;.</Text>
          <Text>
            Duis at vestibulum dui. Proin accumsan, quam vitae congue tempor, tortor nisi dapibus
            magna, a porta urna ligula at odio. Nunc lobortis sapien quis nunc rhoncus, et finibus
            est pretium. Integer faucibus vitae quam sed dapibus.
          </Text>
          <Text.blockquote>
            &quot;Lorem ipsum dolor sit amet consectetur adipiscing elit.&quot;
          </Text.blockquote>
          <Text>
            Check out all the demos in this starter, and then just delete the{" "}
            <code>app/routes/demos</code> and <code>app/styles/demos</code> folders when you&apos;re
            ready to turn this into your next project.
          </Text>
          <Column
            w="full"
            px="11"
            py="9"
            mt="4"
            mb="9"
            radius="4"
            bg={useColor("secondary7", "secondary9")}
            color={useColor("textSecondary7", "textSecondary9")}
          >
            <Heading color={useColor("textSecondary7", "textSecondary9")}>
              Data at your fingertips
            </Heading>
            <Text>
              Don&apos;t waste any time integrating third party APIs -- we&apos;ve done it for you!
              Gadget provides built-in connections to ecommerce platforms and ERPs, giving you a
              two-way data sync with one click.
            </Text>
          </Column>
          {Array(2)
            .fill(0)
            .map((x, key) =>
              key % 2 ? (
                <Text key={key}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut est maximus,
                  volutpat metus vitae, dictum diam. Proin elementum libero enim, quis porta est
                  facilisis tristique. Donec dignissim vitae nisi quis bibendum. Nam urna tellus,
                  egestas ac est quis, tristique condimentum ante. Pellentesque viverra eu urna id
                  tristique. Duis molestie gravida lorem eget malesuada. Vestibulum ante ipsum
                  primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam pellentesque
                  vulputate volutpat. Donec sit amet nisi ac tortor elementum blandit ut sit amet
                  neque. Praesent sit amet ipsum vel nulla auctor molestie at ac enim. Ut diam dui,
                  accumsan vitae justo a, molestie laoreet magna.
                </Text>
              ) : (
                <Box key={key} mb="6">
                  <Text>
                    Duis at vestibulum dui. Proin accumsan, quam vitae congue tempor, tortor nisi
                    dapibus magna, a porta urna ligula at odio. Nunc lobortis sapien quis nunc
                    rhoncus, et finibus est pretium. Integer faucibus vitae quam sed dapibus.
                    Praesent hendrerit sodales congue. In hendrerit erat sodales risus volutpat
                    interdum.
                  </Text>
                  <Text>
                    Donec tincidunt at ante in consectetur. Duis vitae neque tristique, convallis
                    purus et, tincidunt libero. Donec aliquet ligula scelerisque auctor laoreet.
                    Maecenas non tellus id dui facilisis sollicitudin. Fusce vehicula nisl et est
                    volutpat, at viverra tellus varius. Proin ultrices purus felis, at vulputate
                    lacus molestie vel. Nunc blandit turpis a erat tristique suscipit. Morbi
                    lobortis semper lobortis. Cras faucibus molestie leo nec dignissim. In quis
                    pulvinar arcu.
                  </Text>
                </Box>
              )
            )}
          <Column
            w="full"
            px="11"
            py="10"
            mt="4"
            mb="9"
            radius="4"
            bg="neutral11"
            color="textPrimary11"
          >
            <Heading flat color="textPrimary11" fontSize="9" fontWeight="1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut est maximus!
            </Heading>
          </Column>
          {Array(2)
            .fill(0)
            .map((x, key) =>
              key % 2 ? (
                <Text key={key}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut est maximus,
                  volutpat metus vitae, dictum diam. Proin elementum libero enim, quis porta est
                  facilisis tristique. Donec dignissim vitae nisi quis bibendum. Nam urna tellus,
                  egestas ac est quis, tristique condimentum ante. Pellentesque viverra eu urna id
                  tristique. Duis molestie gravida lorem eget malesuada. Vestibulum ante ipsum
                  primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam pellentesque
                  vulputate volutpat. Donec sit amet nisi ac tortor elementum blandit ut sit amet
                  neque. Praesent sit amet ipsum vel nulla auctor molestie at ac enim. Ut diam dui,
                  accumsan vitae justo a, molestie laoreet magna.
                </Text>
              ) : (
                <Box key={key} mb="6">
                  <Text>
                    Duis at vestibulum dui. Proin accumsan, quam vitae congue tempor, tortor nisi
                    dapibus magna, a porta urna ligula at odio. Nunc lobortis sapien quis nunc
                    rhoncus, et finibus est pretium. Integer faucibus vitae quam sed dapibus.
                    Praesent hendrerit sodales congue. In hendrerit erat sodales risus volutpat
                    interdum.
                  </Text>
                  <Text>
                    Donec tincidunt at ante in consectetur. Duis vitae neque tristique, convallis
                    purus et, tincidunt libero. Donec aliquet ligula scelerisque auctor laoreet.
                    Maecenas non tellus id dui facilisis sollicitudin. Fusce vehicula nisl et est
                    volutpat, at viverra tellus varius. Proin ultrices purus felis, at vulputate
                    lacus molestie vel. Nunc blandit turpis a erat tristique suscipit. Morbi
                    lobortis semper lobortis. Cras faucibus molestie leo nec dignissim. In quis
                    pulvinar arcu.
                  </Text>
                </Box>
              )
            )}
        </Column.article>
        <Column.aside
          overflowY="auto"
          stickyBottom={{ "@<bp3": true }}
          h={{ "@<bp3": "12" }}
          py={{ "@<bp3": "7" }}
          bg={{ "@<bp3": "neutral2" }}
        >
          <Heading.h2>Demos In This App</Heading.h2>
          <List gap="4">
            <ListItem>
              <Link href="/sample">
                <Anchor href="#">Sample</Anchor>
              </Link>
            </ListItem>
          </List>
          <Heading.h2>Resources</Heading.h2>
          <List gap="4">
            <ListItem>
              <Anchor href="https://nextjs.org/docs">Documentation &rarr;</Anchor>
            </ListItem>
            <ListItem>
              <Anchor href="https://nextjs.org/learn">Learn &rarr;</Anchor>
            </ListItem>
            <ListItem>
              <Anchor href="https://github.com/vercel/next.js/tree/canary/examples">
                Examples &rarr;
              </Anchor>
            </ListItem>
            <ListItem>
              <Anchor href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template">
                Deploy &rarr;
              </Anchor>
            </ListItem>
          </List>
        </Column.aside>
      </Grid>
    </>
  )
}

export default Home
