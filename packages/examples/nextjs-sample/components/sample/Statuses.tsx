import * as React from "react"
import { animate, Grid, Heading, Icon, IconName, IconType, Row, styled, Text } from "@/ui"

const StatusRow = styled(
  Grid,
  {
    gridTemplateColumns: "repeat(1, 1fr)",
    "@bp1": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@bp4": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  "StatusRow"
)
const Status = styled(
  Row,
  {
    alignItems: "center",
    defaultVariants: {
      px: "7",
      py: "6",
      radius: "4",
    },
  },
  "Status"
)
const Toast = styled(
  Status,
  {
    ...animate({
      "0%": {
        opacity: "0",
        transform: "translate3d(100%, 0, 0)",
      },
      "100%": {
        opacity: "1",
        transform: "translate3d(0, 0, 0)",
      },
    }),
    boxShadow: "$medium",
  },
  "Toast"
)

export function Statuses(): React.ReactElement {
  const textProps: any = {
    fontFamily: "button",
    fontWeight: "bold",
    lineHeight: "heading",
    fontSize: "h6",
  }
  return (
    <>
      <Heading.h2 mt="9">Status Boxes</Heading.h2>
      <StatusRow gap="4">
        <Status bg="errorMin" color="textErrorMin">
          <Icon name={IconName.alert} size="9" padded="large" />
          <Text {...textProps}>This is an inline error indicator</Text>
        </Status>
        <Status bg="warningMin" color="textWarningMin">
          <Icon
            name={IconName.alarmWarning}
            mt="minus2"
            type={IconType.line}
            size="9"
            padded="large"
          />
          <Text {...textProps}>This is an inline warning indicator</Text>
        </Status>
        <Status bg="successMin" color="textSuccessMin">
          <Icon name={IconName.check} size="9" padded="large" />
          <Text {...textProps}>This is an inline success indicator</Text>
        </Status>
        <Status bg="infoMin" color="textInfoMin">
          <Icon name={IconName.information} type={IconType.line} size="9" padded="large" />
          <Text {...textProps}>This is an inline info indicator</Text>
        </Status>
      </StatusRow>
      <StatusRow gap="4" mt="3">
        <Status bg="errorMin" color="textErrorMin" borderWidth="2" borderColor="error">
          <Icon name={IconName.alert} size="9" padded="large" />
          <Text {...textProps}>This is an inline error indicator</Text>
        </Status>
        <Status bg="warningMin" color="textWarningMin" borderWidth="2" borderColor="warning">
          <Icon
            name={IconName.alarmWarning}
            mt="minus2"
            type={IconType.line}
            size="9"
            padded="large"
          />
          <Text {...textProps}>This is an inline warning indicator</Text>
        </Status>
        <Status bg="successMin" color="textSuccessMin" borderWidth="2" borderColor="success">
          <Icon name={IconName.check} size="9" padded="large" />
          <Text {...textProps}>This is an inline success indicator</Text>
        </Status>
        <Status bg="infoMin" color="textInfoMin" borderWidth="2" borderColor="info">
          <Icon name={IconName.information} type={IconType.line} size="9" padded="large" />
          <Text {...textProps}>This is an inline info indicator</Text>
        </Status>
      </StatusRow>
      <StatusRow gap="4" mt="3">
        <Toast bg="error" color="textError" focusButton="errorMax">
          <Icon name={IconName.alert} size="9" padded="large" />
          <Text {...textProps}>This is an error toast</Text>
        </Toast>
        <Toast bg="warning" color="textWarning" focusButton="warningMax">
          <Icon
            name={IconName.alarmWarning}
            mt="minus2"
            type={IconType.line}
            size="9"
            padded="large"
          />
          <Text {...textProps}>This is a warning toast</Text>
        </Toast>
        <Toast bg="success" color="textSuccess" focusButton="successMax">
          <Icon name={IconName.check} size="9" padded="large" />
          <Text {...textProps}>This is a success toast</Text>
        </Toast>
        <Toast bg="info" color="textInfo" focusButton="infoMax">
          <Icon name={IconName.information} type={IconType.line} size="9" padded="large" />
          <Text {...textProps}>This is an info toast</Text>
        </Toast>
      </StatusRow>
    </>
  )
}
Statuses.displayName = "Statuses"
