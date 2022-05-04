import type { ReactElement } from "react"
import { HtmlHeadLink } from "../../shared/models"

interface FontLinksProps {
  links: HtmlHeadLink[]
}

export function FontLinks({ links }: FontLinksProps): ReactElement {
  return (
    <>
      {links.map((font, index) => (
        <link
          key={index}
          href={font.href}
          rel={font.rel}
          crossOrigin={font.crossOrigin}
          as={font.as}
        />
      ))}
    </>
  )
}
FontLinks.displayName = "FontLinks"
