import { View, Text as RNText, Pressable as RNPressable } from "react-native"
import { styled, Box, Row as QRow, Column, Text, Heading, SubHeading } from "@withneutron/quarks-react-native"

// RE-EXPORTS from primitives
export { Box, Column, Text, Heading, SubHeading }

// LAYOUT //////////////////////////////////////////////////////////////////////

export const Screen = styled(View, {
  flexGrow: "1",
  backgroundColor: "$tertiary1",
  p: "$16",
  dark: {
    backgroundColor: "$tertiary2",
  },
})

export const Card = styled(
  View,
  {
    backgroundColor: "$min",
    radius: "$8",
    p: "$16",
    mb: "$12",
    dark: {
      backgroundColor: "$tertiary3",
    },
  },
  "Card",
)

export const Divider = styled(View, {
  height: "1",
  backgroundColor: "$tertiary4",
  my: "$12",
  dark: {
    backgroundColor: "$tertiary5",
  },
})

// TYPOGRAPHY //////////////////////////////////////////////////////////////////

export const Title = styled(
  RNText,
  {
    fontSize: "$h2",
    fontWeight: "$bold",
    color: "$defaultHeading",
    mb: "$8",
    dark: {
      color: "$primary3",
    },
  },
  "Title",
)

export const SectionTitle = styled(
  RNText,
  {
    fontSize: "$h5",
    fontWeight: "$semiBold",
    color: "$primary9",
    mb: "$8",
    dark: {
      color: "$primary5",
    },
  },
  "SectionTitle",
)

export const Body = styled(
  RNText,
  {
    fontSize: "$p",
    fontWeight: "$regular",
    color: "$defaultBody",
    lineHeight: "$body",
  },
  "Body",
)

export const Caption = styled(
  RNText,
  {
    fontSize: "$14",
    fontWeight: "$light",
    color: "$tertiary9",
    dark: {
      color: "$tertiary5",
    },
  },
  "Caption",
)

export const Mono = styled(
  RNText,
  {
    fontFamily: "$systemMono",
    fontSize: "$14",
    color: "$secondary9",
    dark: {
      color: "$secondary5",
    },
  },
  "Mono",
)

// INTERACTIVE /////////////////////////////////////////////////////////////////

export const Button = styled(
  RNPressable,
  {
    backgroundColor: "$primary9",
    radius: "$button",
    px: "$buttonBasePx",
    py: "$buttonBasePy",
    alignItems: "center",
    justifyContent: "center",
    dark: {
      backgroundColor: "$primary7",
    },
    hovered: {
      opacity: "0.85",
    },
    pressed: {
      opacity: "0.7",
    },
  },
  {
    intent: {
      secondary: {
        backgroundColor: "$secondary9",
        dark: {
          backgroundColor: "$secondary7",
        },
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: "2",
        borderColor: "$primary9",
        dark: {
          borderColor: "$primary5",
        },
      },
    },
    size: {
      sm: {
        px: "$8",
        py: "$4",
        fontSize: "$14",
      },
      lg: {
        px: "$20",
        py: "$12",
        fontSize: "$18",
      },
    },
  },
  "Button",
)

export const ButtonText = styled(
  RNText,
  {
    color: "$min",
    fontWeight: "$semiBold",
    fontSize: "$button",
  },
  {
    intent: {
      secondary: {},
      outline: {
        color: "$primary9",
        dark: {
          color: "$primary5",
        },
      },
    },
  },
  "ButtonText",
)

// BADGES //////////////////////////////////////////////////////////////////////

export const Badge = styled(
  View,
  {
    radius: "$pill",
    px: "$8",
    py: "$4",
    backgroundColor: "$primary2",
    dark: {
      backgroundColor: "$primary10",
    },
  },
  "Badge",
)

export const BadgeText = styled(
  RNText,
  {
    fontSize: "$12",
    fontWeight: "$semiBold",
    color: "$primary9",
    dark: {
      color: "$primary3",
    },
  },
  "BadgeText",
)

// LAYOUT HELPERS //////////////////////////////////////////////////////////////

export const Row = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: "$8",
})

export const Spacer = styled(View, {
  flexGrow: "1",
})
