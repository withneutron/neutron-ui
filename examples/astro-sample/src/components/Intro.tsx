import Card from "../components/Card.astro"
import { Column, Heading, Text } from "@withneutron/quarks-react"

export function Intro() {
  return (
    <>
      <Heading css={{ color: "$secondary8" }}>Welcome to Astro</Heading>
      <Text css={{ color: "$secondary9" }}>
        To get started, open the directory <code>src/pages</code> in your project.
        <br />
        <strong>Code Challenge:</strong> Tweak the "Welcome to Astro" message above.
      </Text>
      <ul role="list" class="link-card-grid">
        <Card
          href="https://docs.astro.build/"
          title="Documentation"
          body="Learn how Astro works and explore the official API docs."
        />
        <Card
          href="https://astro.build/integrations/"
          title="Integrations"
          body="Supercharge your project with new frameworks and libraries."
        />
        <Card
          href="https://astro.build/themes/"
          title="Themes"
          body="Explore a galaxy of community-built starter themes."
        />
        <Card
          href="https://astro.build/chat/"
          title="Community"
          body="Come say hi to our amazing Discord community. ❤️"
        />
      </ul>
    </>
  )
}
