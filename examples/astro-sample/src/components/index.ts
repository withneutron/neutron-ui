import StyledCard from "../components/Card.astro"
import CardSection from "../components/Card.Section.astro"

type Named<T extends (_props: any) => any> = (_props: Omit<Parameters<T>[0], "as">) => any
const Card = StyledCard as typeof StyledCard & { Section: Named<typeof StyledCard> }
Card.Section = CardSection as Named<typeof StyledCard>

export { Card }
