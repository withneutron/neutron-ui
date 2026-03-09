import { styled, Box, Column, Row, useTransition, SubHeading } from "@withneutron/quarks-react"
import { Button } from "../components/Button"
import { ReactNode, useEffect } from "react"

interface SidePanelProps {
  children: ReactNode
  onClose: () => void
  onApply: (filters: string[]) => void
  isVisible?: boolean
}

export function SidePanel(props: SidePanelProps) {
  const { onClose, isVisible } = props
  const bg = useTransition(!!props.isVisible, { enter: 500, exit: 500 })
  const panel = useTransition(!!props.isVisible)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEsc, true)

    if (!isVisible) {
      document.removeEventListener("keydown", handleEsc, true)
    }

    return () => document.removeEventListener("keydown", handleEsc, true)
  }, [onClose, isVisible])

  return !bg.mounted || !panel.mounted ? null : (
    <Box css={{ position: "fixed", top: "$0", bottom: "$0", left: "$0", right: "$0" }}>
      <Box
        onClick={props.onClose}
        style={bg.style}
        css={{
          bg: "$maxAlpha5",
          size: "100%",
          position: "absolute",
          top: "$0",
          left: "$0",
        }}
      />
      <Panel
        as="aside"
        style={panel.style}
        css={{
          maxWidth: "$480",
          w: "100%",
          h: "100%",
          position: "absolute",
          left: "$0",
        }}
      >
        <Row.Header>
          <SubHeading>Filters</SubHeading>
        </Row.Header>
        <Column css={{ flex: "1" }}>{props.children}</Column>
        <Row.Footer css={{ gap: "$16", justifyContent: "end" }}>
          <Button variant="ghost" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            onClick={() => {
              props.onClose()
              props.onApply(["Date", "Location", "Type"])
            }}
          >
            Apply Filters
          </Button>
        </Row.Footer>
      </Panel>
    </Box>
  )
}
SidePanel.displayName = "SidePanel"

const Panel = styled(
  Column,
  {
    bg: "$min",
    boxShadow: "$high",
    p: "$24",
  },
  "Panel"
)
