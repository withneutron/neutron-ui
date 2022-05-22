import * as React from "react"
import { MetaFunction } from "remix"
import {
  Column,
  Heading,
  styled,
  Text,
  Grid,
  enumKeys,
  FlavorColorName,
  capitalizeFirstLetter,
  TextColorNameKeys,
  BGColorNameKeys,
} from "~ui"

export let meta: MetaFunction = () => {
  return {
    title: "UI Lib + Code Gen Sample",
  }
}

const TagBox = styled(
  Column,
  {
    defaultVariants: {
      gap: "3",
    },
  },
  "TagBox"
)

const Tag = styled(
  "em",
  Text,
  {
    fontFamily: "$button",
    px: "$4",
    py: "calc($2 + $1)",
    defaultVariants: {
      flat: true,
      radius: "field",
      borderWidth: "2",
      align: "center",
      fontWeight: "6",
      fontSize: "button",
    },
  },
  "Tag"
)

export function Tags(): React.ReactElement {
  return (
    <>
      <Heading.h2 mt="6">Tags</Heading.h2>
      <Grid.article columnFit="13" gap="7">
        {enumKeys(FlavorColorName).map((color: keyof typeof FlavorColorName) => (
          <TagBox key={color}>
            <Tag
              bg={`${String(color)}3` as BGColorNameKeys}
              color={`text${capitalizeFirstLetter(color)}3` as TextColorNameKeys}
              focusButton={`${String(color)}4` as BGColorNameKeys}
              borderColor={`${String(color)}4` as BGColorNameKeys}
            >
              {capitalizeFirstLetter(color)}
            </Tag>
            <Tag
              bg={`${String(color)}6` as BGColorNameKeys}
              color={`text${capitalizeFirstLetter(color)}6` as TextColorNameKeys}
              focusButton={`${String(color)}7` as BGColorNameKeys}
              borderColor={`${String(color)}7` as BGColorNameKeys}
            >
              {capitalizeFirstLetter(color)}
            </Tag>
          </TagBox>
        ))}
      </Grid.article>
    </>
  )
}
Tags.displayName = "Tags"
