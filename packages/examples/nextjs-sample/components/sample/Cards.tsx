import * as React from "react"
import {
  Box,
  Column,
  Heading,
  Row,
  styled,
  Text,
  Grid,
  GridItem,
  ColorNumberKey,
  useColors,
  TextColorNameKeys,
  Theme,
  UITheme,
} from "../../config/ui"

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const CardGrid = styled(Grid, {
  maxWidth: "calc($fullVw - $12)",
  gridTemplateColumns: "repeat(3, 1fr)",
  "@bp1": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  "@bp3": {
    gridTemplateColumns: "repeat(6, 1fr)",
  },
  "@bp5": {
    gridTemplateColumns: "repeat(12, 1fr)",
  },
  overflow: "hidden",
  defaultVariants: {
    my: "6",
    radius: "4",
  },
})

const CardBox = styled(GridItem, {
  defaultVariants: {
    px: "5",
    py: "4",
  },
})

interface CardsProps {
  title: string
  theme: Theme
  darkTheme: Theme
}

export function Cards({ title, theme, darkTheme }: CardsProps): React.ReactElement {
  const { isDark } = useColors()
  const showInverted = false
  const getInner = (color: TextColorNameKeys) => (
    <Column>
      <Heading.h2 color={color} mb="1" fontSize="h4">
        Abc
      </Heading.h2>
      <Text color={color} lineHeight="heading" fontSize="small">
        Defg hi jklmnop
      </Text>
    </Column>
  )
  const cards = (
    <>
      {keys.map((key: number) => (
        <CardBox
          key={key}
          bg={`primary${key as ColorNumberKey}`}
          color={`textPrimary${key as ColorNumberKey}`}
        >
          {getInner(`textPrimary${key as ColorNumberKey}`)}
        </CardBox>
      ))}
      {keys.map((key: number) => (
        <CardBox
          key={key}
          bg={`secondary${key as ColorNumberKey}`}
          color={`textSecondary${key as ColorNumberKey}`}
        >
          {getInner(`textSecondary${key as ColorNumberKey}`)}
        </CardBox>
      ))}
      {keys.map((key: number) => (
        <CardBox
          key={key}
          bg={`neutral${key as ColorNumberKey}`}
          color={`textNeutral${key as ColorNumberKey}`}
        >
          {getInner(`textNeutral${key as ColorNumberKey}`)}
        </CardBox>
      ))}
      {/* {enumKeys(FlavorColorName).reduce((output: React.ReactElement[], color: keyof typeof FlavorColorName) => {
        keys.forEach((key: number) => {
          output.push(
            <CardBox
              key={`${color}-${key}`}
              bg={`${FlavorColorName[color]}${key as ColorNumberKey}`}
              color={`${FlavorTextColorName[color]}${key as ColorNumberKey}`}
            >
              {getInner(`${FlavorTextColorName[color]}${key as ColorNumberKey}`)}
            </CardBox>
          )
        })
        return output
      }, [] as React.ReactElement[])} */}
    </>
  )

  return (
    <Column>
      <UITheme theme={theme} darkTheme={darkTheme}>
        <Row alignItems="center">
          <Box h="8" w="7" bg="primary10" radiusLeft="4" mr="px" />
          <Box h="8" w="7" bg="secondary8" radiusRight="4" mr="4" />
          <Heading.h2 flat color="primary10">
            {title}
          </Heading.h2>
        </Row>
        <CardGrid>{cards}</CardGrid>
        {showInverted && (
          <Box className={isDark ? theme.className : darkTheme.className}>
            <CardGrid bg="neutral2" mb="8">
              {cards}
            </CardGrid>
          </Box>
        )}
      </UITheme>
    </Column>
  )
}
Cards.displayName = "Cards"
