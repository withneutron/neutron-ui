import * as React from "react"
import {
  Button,
  Column,
  Grid,
  Heading,
  NumberField,
  Row,
  TextField,
  useTheme,
} from "../../config/ui"

export function Inputs(): React.ReactElement {
  const { darkTheme } = useTheme()
  const variant = "nested"
  return (
    <>
      <Heading.h2 mt="9">Text Fields</Heading.h2>
      {false && (
        <Column bg="primary4" p="10" className={darkTheme?.className}>
          <TextField variant={variant} label="Email Address" contrast="low" />
          <TextField variant={variant} label="Request a feature" contrast="low" />
          <Row gap="4">
            <Button variant="ghost">Cancel</Button>
            <Button>Submit</Button>
          </Row>
        </Column>
      )}
      <Grid columnFit="18" columnGap="5">
        <TextField variant={variant} label="Primary" />
        <TextField
          loading
          variant={variant}
          label="Label for loading field"
          tooltip="Info on why this field is loading"
        />
        <TextField
          disabled
          variant={variant}
          label="Disabled (w/ value)"
          tooltip="Info on how to enable this field"
          defaultValue="Disabled value"
        />
        <TextField
          defaultValue="Default value"
          borderless
          variant={variant}
          label="Primary (borderless)"
        />
        <TextField
          variant={variant}
          label="Primary (w/ description)"
          description="Must contain a number, a symbol, and an uppercase letter"
        />
        <TextField
          variant={variant}
          label="Primary (w/ error)"
          error="Erroneous error"
          defaultValue="Wrong value"
          tooltip="Info on how to fix the issue"
        />
        <TextField
          contrast="low"
          colorScheme="secondary"
          variant={variant}
          label="Secondary (low contrast)"
        />
        <TextField
          contrast="high"
          // colorScheme="secondary"
          variant={variant}
          label="Secondary (high contrast)"
        />
        <NumberField
          variant={variant}
          label="Number (currency)"
          formatOptions={{ style: "currency", currency: "CAD" }}
          defaultValue={10}
          minValue={0}
          step={5}
        />
        <NumberField
          variant={variant}
          label="Number (secondary)"
          colorScheme="secondary"
          maxValue={360}
          minValue={0}
          step={5}
        />
        {/* <NumberField
          disabled
          label="Number (disabled)"
          variant={variant}
          colorScheme="secondary"
          contrast="low"
          maxValue={360}
          minValue={0}
          step={5}
          tooltip="Currently disabled"
        />
        <NumberField
          loading
          label="Number (loading)"
          variant={variant}
          defaultValue={90}
          colorScheme="secondary"
          contrast="high"
          maxValue={360}
          minValue={0}
          step={5}
          tooltip="Currently loading..."
        /> */}
        {/* SIZES */}
        {/* <TextField
          loading
          tooltip="Info on why this field is loading"
          size="tiny"
          defaultValue="Tiny"
          label="Primary (tiny)"
          variant={variant}
        />
        <TextField
          loading
          tooltip="Info on why this field is loading"
          size="small"
          defaultValue="Small"
          label="Primary (small)"
          variant={variant}
        />
        <TextField
          loading
          tooltip="Info on why this field is loading"
          size="medium"
          defaultValue="Medium"
          label="Primary (medium)"
          variant={variant}
        />
        <TextField
          loading
          tooltip="Info on why this field is loading"
          size="large"
          defaultValue="Large"
          label="Primary (large)"
          variant={variant}
        /> */}
      </Grid>
    </>
  )
}
Inputs.displayName = "Inputs"
