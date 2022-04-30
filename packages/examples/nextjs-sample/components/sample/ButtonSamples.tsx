import * as React from "react"
import {
  Button,
  capitalizeFirstLetter,
  Column,
  Heading,
  IconButton,
  IconName,
  Row,
  RowItem,
} from "../../config/ui"

export function ButtonSamples(): React.ReactElement {
  const getButtons = React.useCallback(
    (colorScheme: "secondary" | "primary" = "primary") => (
      <RowItem>
        <Heading.h2>{capitalizeFirstLetter(colorScheme)} Buttons</Heading.h2>
        <Column mb="6">
          <Heading.h3 mb="3" colorScheme="neutral">
            Variants
          </Heading.h3>
          <Row wrap gap="4" mt="6">
            <Button colorScheme={colorScheme} minWidth="13" variant="tactile" active>
              Active
            </Button>
            <Button colorScheme={colorScheme} minWidth="13" variant="tactile">
              Tactile
            </Button>
            <Button
              colorScheme={colorScheme}
              minWidth="13"
              variant="tactile"
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <Button colorScheme={colorScheme} minWidth="13" variant="solid" active>
              Active
            </Button>
            <Button colorScheme={colorScheme} minWidth="13" variant="solid">
              Solid
            </Button>
            <Button
              colorScheme={colorScheme}
              minWidth="13"
              variant="solid"
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <Button variant="outline" colorScheme={colorScheme} minWidth="13" active>
              Active
            </Button>
            <Button variant="outline" colorScheme={colorScheme} minWidth="13">
              Outline
            </Button>
            <Button
              variant="outline"
              colorScheme={colorScheme}
              minWidth="13"
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <Button colorScheme={colorScheme} minWidth="13" variant="subtle" active>
              Active
            </Button>
            <Button colorScheme={colorScheme} minWidth="13" variant="subtle">
              Subtle
            </Button>
            <Button
              colorScheme={colorScheme}
              minWidth="13"
              variant="subtle"
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <Button colorScheme={colorScheme} minWidth="13" variant="ghost" active>
              Active
            </Button>
            <Button colorScheme={colorScheme} minWidth="13" variant="ghost">
              Ghost
            </Button>
            <Button
              colorScheme={colorScheme}
              minWidth="13"
              variant="ghost"
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <Button
              loading
              hideTextWhenLoading
              aria-label="Loading..."
              colorScheme={colorScheme}
              minWidth="13"
              variant="ghost"
              active
            >
              Active
            </Button>
            <Button
              loading
              hideTextWhenLoading
              aria-label="Loading..."
              colorScheme={colorScheme}
              minWidth="13"
              variant="ghost"
            >
              Ghost
            </Button>
            <Button
              disabled
              loading
              hideTextWhenLoading
              tooltip="Sample disabled button"
              colorScheme={colorScheme}
              minWidth="13"
              variant="ghost"
            >
              Disabled
            </Button>
          </Row>
        </Column>
        <Column mb="6">
          <Heading.h3 mb="3" colorScheme="neutral">
            Icons
          </Heading.h3>
          <Row wrap gap="4">
            <Button
              variant="tactile"
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              prefixIconName={{ ltr: IconName.arrowLeft, rtl: IconName.arrowRight }}
              active
            >
              Active
            </Button>
            <Button
              variant="tactile"
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              prefixIconName={{ ltr: IconName.arrowLeft, rtl: IconName.arrowRight }}
            >
              Back
            </Button>
            <Button
              variant="tactile"
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              prefixIconName={{ ltr: IconName.arrowLeft, rtl: IconName.arrowRight }}
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <Button
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              suffixIconName={{ ltr: IconName.arrowRight, rtl: IconName.arrowLeft }}
              active
            >
              Active
            </Button>
            <Button
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              suffixIconName={{ ltr: IconName.arrowRight, rtl: IconName.arrowLeft }}
            >
              Next
            </Button>
            <Button
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              suffixIconName={{ ltr: IconName.arrowRight, rtl: IconName.arrowLeft }}
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <Button
              loading
              aria-label="Loading..."
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              suffixIconName={{ ltr: IconName.arrowRight, rtl: IconName.arrowLeft }}
              active
            >
              Active
            </Button>
            <Button
              loading
              tooltip="Loading..."
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              suffixIconName={{ ltr: IconName.arrowRight, rtl: IconName.arrowLeft }}
            >
              Next
            </Button>
            <Button
              loading
              size="small"
              minWidth="13"
              colorScheme={colorScheme}
              suffixIconName={{ ltr: IconName.arrowRight, rtl: IconName.arrowLeft }}
              disabled
              tooltip="Sample disabled button"
            >
              Disabled
            </Button>
          </Row>
          <Row wrap gap="4" mt="6">
            <IconButton
              variant="tactile"
              square
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              active
              tooltip="Initiate a file transfer"
            />
            <IconButton
              variant="tactile"
              square
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              tooltip="Initiate a file transfer"
            />
            <IconButton
              variant="tactile"
              square
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              disabled
              tooltip="Select one or more files to initiate a file transfer"
            />
            <IconButton
              variant="tactile"
              square
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              loading
              tooltip="Select one or more files to initiate a file transfer"
            />
          </Row>
          <Row wrap gap="4" mt="6">
            <IconButton
              square
              variant="ghost"
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              active
              tooltip="Initiate a file transfer"
            />
            <IconButton
              square
              variant="ghost"
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              tooltip="Initiate a file transfer"
            />
            <IconButton
              square
              variant="ghost"
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              disabled
              tooltip="Select one or more files to initiate a file transfer"
            />
            <IconButton
              square
              variant="ghost"
              colorScheme={colorScheme}
              iconName={IconName.folderTransfer}
              loading
              tooltip="Select one or more files to initiate a file transfer"
            />
          </Row>
        </Column>
        <Column mb="6">
          <Heading.h3 mb="3" colorScheme="neutral">
            Sizes
          </Heading.h3>
          <Row wrap gap="4" alignItems="end">
            <Button colorScheme={colorScheme} size="large">
              Large
            </Button>
            <Button colorScheme={colorScheme}>Medium</Button>
            <Button colorScheme={colorScheme} size="small">
              Small
            </Button>
            <Button colorScheme={colorScheme} size="tiny">
              Tiny
            </Button>
          </Row>
        </Column>
        <Column mb="6">
          <Heading.h3 mb="3" colorScheme="neutral">
            Shapes
          </Heading.h3>
          <Row wrap gap="4">
            <Button minWidth="13" size="small" colorScheme={colorScheme} shape="rectangular">
              Rect.
            </Button>
            <Button minWidth="13" size="small" colorScheme={colorScheme} shape="pill">
              Pill
            </Button>
            <Button minWidth="13" size="small" colorScheme={colorScheme} shape="rounded">
              Rounded
            </Button>
          </Row>
        </Column>
      </RowItem>
    ),
    []
  )
  return (
    <Row.article wrap gap={12} mt="9">
      {getButtons()}
      {getButtons("secondary")}
    </Row.article>
  )
}
ButtonSamples.displayName = "ButtonSamples"
