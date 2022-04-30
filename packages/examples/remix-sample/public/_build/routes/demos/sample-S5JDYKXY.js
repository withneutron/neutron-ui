import {
  Anchor,
  Box,
  Button,
  Column,
  FlavorColorName,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  IconName,
  IconType,
  NumberField,
  Row,
  RowItem,
  Text,
  TextField,
  UITheme,
  animate,
  appDarkTheme,
  appTheme,
  capitalizeFirstLetter,
  enumKeys,
  styled,
  useColors,
  useTheme
} from "/build/_shared/chunk-KIIHWOTY.js";
import {
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-ZYAL4XLG.js";

// browser-route-module:/Users/lucas/Sites/neutron-ui/packages/examples/remix-sample/app/routes/demos/sample.tsx?browser
init_react();

// app/routes/demos/sample.tsx
init_react();
var React6 = __toESM(require_react());

// app/components/sample/Cards.tsx
init_react();
var React = __toESM(require_react());
var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var CardGrid = styled(Grid, {
  maxWidth: "calc($fullVw - $12)",
  gridTemplateColumns: "repeat(3, 1fr)",
  "@bp1": {
    gridTemplateColumns: "repeat(4, 1fr)"
  },
  "@bp3": {
    gridTemplateColumns: "repeat(6, 1fr)"
  },
  "@bp5": {
    gridTemplateColumns: "repeat(12, 1fr)"
  },
  overflow: "hidden",
  defaultVariants: {
    my: "6",
    radius: "4"
  }
});
var CardBox = styled(GridItem, {
  defaultVariants: {
    px: "5",
    py: "4"
  }
});
function Cards({ title, theme, darkTheme }) {
  const { isDark } = useColors();
  const showInverted = false;
  const getInner = (color) => /* @__PURE__ */ React.createElement(Column, null, /* @__PURE__ */ React.createElement(Heading.h2, {
    color,
    mb: "1",
    fontSize: "h4"
  }, "Abc"), /* @__PURE__ */ React.createElement(Text, {
    color,
    lineHeight: "heading",
    fontSize: "small"
  }, "Defg hi jklmnop"));
  const cards = /* @__PURE__ */ React.createElement(React.Fragment, null, keys.map((key) => /* @__PURE__ */ React.createElement(CardBox, {
    key,
    bg: `primary${key}`,
    color: `textPrimary${key}`
  }, getInner(`textPrimary${key}`))), keys.map((key) => /* @__PURE__ */ React.createElement(CardBox, {
    key,
    bg: `secondary${key}`,
    color: `textSecondary${key}`
  }, getInner(`textSecondary${key}`))), keys.map((key) => /* @__PURE__ */ React.createElement(CardBox, {
    key,
    bg: `neutral${key}`,
    color: `textNeutral${key}`
  }, getInner(`textNeutral${key}`))));
  return /* @__PURE__ */ React.createElement(Column, null, /* @__PURE__ */ React.createElement(UITheme, {
    theme,
    darkTheme
  }, /* @__PURE__ */ React.createElement(Row, {
    alignItems: "center"
  }, /* @__PURE__ */ React.createElement(Box, {
    h: "8",
    w: "7",
    bg: "primary10",
    radiusLeft: "4",
    mr: "px"
  }), /* @__PURE__ */ React.createElement(Box, {
    h: "8",
    w: "7",
    bg: "secondary8",
    radiusRight: "4",
    mr: "4"
  }), /* @__PURE__ */ React.createElement(Heading.h2, {
    flat: true,
    color: "primary10"
  }, title)), /* @__PURE__ */ React.createElement(CardGrid, null, cards), showInverted && /* @__PURE__ */ React.createElement(Box, {
    className: isDark ? theme.className : darkTheme.className
  }, /* @__PURE__ */ React.createElement(CardGrid, {
    bg: "neutral2",
    mb: "8"
  }, cards))));
}
Cards.displayName = "Cards";

// app/components/sample/Tags.tsx
init_react();
var React2 = __toESM(require_react());
var TagBox = styled(Column, {
  defaultVariants: {
    gap: "3"
  }
}, "TagBox");
var Tag = styled("em", Text, {
  fontFamily: "$button",
  px: "$4",
  py: "calc($2 + $1)",
  defaultVariants: {
    flat: true,
    radius: "field",
    borderWidth: "2",
    align: "center",
    fontWeight: "6",
    fontSize: "button"
  }
}, "Tag");
function Tags() {
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(Heading.h2, {
    mt: "6"
  }, "Tags"), /* @__PURE__ */ React2.createElement(Grid.article, {
    columnFit: "13",
    gap: "7"
  }, enumKeys(FlavorColorName).map((color) => /* @__PURE__ */ React2.createElement(TagBox, {
    key: color
  }, /* @__PURE__ */ React2.createElement(Tag, {
    bg: `${String(color)}3`,
    color: `text${capitalizeFirstLetter(color)}3`,
    focusButton: `${String(color)}4`,
    borderColor: `${String(color)}4`
  }, capitalizeFirstLetter(color)), /* @__PURE__ */ React2.createElement(Tag, {
    bg: `${String(color)}6`,
    color: `text${capitalizeFirstLetter(color)}6`,
    focusButton: `${String(color)}7`,
    borderColor: `${String(color)}7`
  }, capitalizeFirstLetter(color))))));
}
Tags.displayName = "Tags";

// app/components/sample/ButtonSamples.tsx
init_react();
var React3 = __toESM(require_react());
function ButtonSamples() {
  const getButtons = React3.useCallback((colorScheme = "primary") => /* @__PURE__ */ React3.createElement(RowItem, null, /* @__PURE__ */ React3.createElement(Heading.h2, null, capitalizeFirstLetter(colorScheme), " Buttons"), /* @__PURE__ */ React3.createElement(Column, {
    mb: "6"
  }, /* @__PURE__ */ React3.createElement(Heading.h3, {
    mb: "3",
    colorScheme: "neutral"
  }, "Variants"), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "tactile",
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "tactile"
  }, "Tactile"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "tactile",
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "solid",
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "solid"
  }, "Solid"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "solid",
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    variant: "outline",
    colorScheme,
    minWidth: "13",
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    variant: "outline",
    colorScheme,
    minWidth: "13"
  }, "Outline"), /* @__PURE__ */ React3.createElement(Button, {
    variant: "outline",
    colorScheme,
    minWidth: "13",
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "subtle",
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "subtle"
  }, "Subtle"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "subtle",
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "ghost",
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "ghost"
  }, "Ghost"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    minWidth: "13",
    variant: "ghost",
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    loading: true,
    hideTextWhenLoading: true,
    "aria-label": "Loading...",
    colorScheme,
    minWidth: "13",
    variant: "ghost",
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    loading: true,
    hideTextWhenLoading: true,
    "aria-label": "Loading...",
    colorScheme,
    minWidth: "13",
    variant: "ghost"
  }, "Ghost"), /* @__PURE__ */ React3.createElement(Button, {
    disabled: true,
    loading: true,
    hideTextWhenLoading: true,
    tooltip: "Sample disabled button",
    colorScheme,
    minWidth: "13",
    variant: "ghost"
  }, "Disabled"))), /* @__PURE__ */ React3.createElement(Column, {
    mb: "6"
  }, /* @__PURE__ */ React3.createElement(Heading.h3, {
    mb: "3",
    colorScheme: "neutral"
  }, "Icons"), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4"
  }, /* @__PURE__ */ React3.createElement(Button, {
    variant: "tactile",
    size: "small",
    minWidth: "13",
    colorScheme,
    prefixIconName: { ltr: IconName.arrowLeft, rtl: IconName.arrowRight },
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    variant: "tactile",
    size: "small",
    minWidth: "13",
    colorScheme,
    prefixIconName: { ltr: IconName.arrowLeft, rtl: IconName.arrowRight }
  }, "Back"), /* @__PURE__ */ React3.createElement(Button, {
    variant: "tactile",
    size: "small",
    minWidth: "13",
    colorScheme,
    prefixIconName: { ltr: IconName.arrowLeft, rtl: IconName.arrowRight },
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    size: "small",
    minWidth: "13",
    colorScheme,
    suffixIconName: { ltr: IconName.arrowRight, rtl: IconName.arrowLeft },
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    size: "small",
    minWidth: "13",
    colorScheme,
    suffixIconName: { ltr: IconName.arrowRight, rtl: IconName.arrowLeft }
  }, "Next"), /* @__PURE__ */ React3.createElement(Button, {
    size: "small",
    minWidth: "13",
    colorScheme,
    suffixIconName: { ltr: IconName.arrowRight, rtl: IconName.arrowLeft },
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(Button, {
    loading: true,
    "aria-label": "Loading...",
    size: "small",
    minWidth: "13",
    colorScheme,
    suffixIconName: { ltr: IconName.arrowRight, rtl: IconName.arrowLeft },
    active: true
  }, "Active"), /* @__PURE__ */ React3.createElement(Button, {
    loading: true,
    tooltip: "Loading...",
    size: "small",
    minWidth: "13",
    colorScheme,
    suffixIconName: { ltr: IconName.arrowRight, rtl: IconName.arrowLeft }
  }, "Next"), /* @__PURE__ */ React3.createElement(Button, {
    loading: true,
    size: "small",
    minWidth: "13",
    colorScheme,
    suffixIconName: { ltr: IconName.arrowRight, rtl: IconName.arrowLeft },
    disabled: true,
    tooltip: "Sample disabled button"
  }, "Disabled")), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(IconButton, {
    variant: "tactile",
    square: true,
    colorScheme,
    iconName: IconName.folderTransfer,
    active: true,
    tooltip: "Initiate a file transfer"
  }), /* @__PURE__ */ React3.createElement(IconButton, {
    variant: "tactile",
    square: true,
    colorScheme,
    iconName: IconName.folderTransfer,
    tooltip: "Initiate a file transfer"
  }), /* @__PURE__ */ React3.createElement(IconButton, {
    variant: "tactile",
    square: true,
    colorScheme,
    iconName: IconName.folderTransfer,
    disabled: true,
    tooltip: "Select one or more files to initiate a file transfer"
  }), /* @__PURE__ */ React3.createElement(IconButton, {
    variant: "tactile",
    square: true,
    colorScheme,
    iconName: IconName.folderTransfer,
    loading: true,
    tooltip: "Select one or more files to initiate a file transfer"
  })), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    mt: "6"
  }, /* @__PURE__ */ React3.createElement(IconButton, {
    square: true,
    variant: "ghost",
    colorScheme,
    iconName: IconName.folderTransfer,
    active: true,
    tooltip: "Initiate a file transfer"
  }), /* @__PURE__ */ React3.createElement(IconButton, {
    square: true,
    variant: "ghost",
    colorScheme,
    iconName: IconName.folderTransfer,
    tooltip: "Initiate a file transfer"
  }), /* @__PURE__ */ React3.createElement(IconButton, {
    square: true,
    variant: "ghost",
    colorScheme,
    iconName: IconName.folderTransfer,
    disabled: true,
    tooltip: "Select one or more files to initiate a file transfer"
  }), /* @__PURE__ */ React3.createElement(IconButton, {
    square: true,
    variant: "ghost",
    colorScheme,
    iconName: IconName.folderTransfer,
    loading: true,
    tooltip: "Select one or more files to initiate a file transfer"
  }))), /* @__PURE__ */ React3.createElement(Column, {
    mb: "6"
  }, /* @__PURE__ */ React3.createElement(Heading.h3, {
    mb: "3",
    colorScheme: "neutral"
  }, "Sizes"), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4",
    alignItems: "end"
  }, /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    size: "large"
  }, "Large"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme
  }, "Medium"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    size: "small"
  }, "Small"), /* @__PURE__ */ React3.createElement(Button, {
    colorScheme,
    size: "tiny"
  }, "Tiny"))), /* @__PURE__ */ React3.createElement(Column, {
    mb: "6"
  }, /* @__PURE__ */ React3.createElement(Heading.h3, {
    mb: "3",
    colorScheme: "neutral"
  }, "Shapes"), /* @__PURE__ */ React3.createElement(Row, {
    wrap: true,
    gap: "4"
  }, /* @__PURE__ */ React3.createElement(Button, {
    minWidth: "13",
    size: "small",
    colorScheme,
    shape: "rectangular"
  }, "Rect."), /* @__PURE__ */ React3.createElement(Button, {
    minWidth: "13",
    size: "small",
    colorScheme,
    shape: "pill"
  }, "Pill"), /* @__PURE__ */ React3.createElement(Button, {
    minWidth: "13",
    size: "small",
    colorScheme,
    shape: "rounded"
  }, "Rounded")))), []);
  return /* @__PURE__ */ React3.createElement(Row.article, {
    wrap: true,
    gap: 12,
    mt: "9"
  }, getButtons(), getButtons("secondary"));
}
ButtonSamples.displayName = "ButtonSamples";

// app/components/sample/Inputs.tsx
init_react();
var React4 = __toESM(require_react());
function Inputs() {
  const { darkTheme } = useTheme();
  const variant = "nested";
  return /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement(Heading.h2, {
    mt: "9"
  }, "Text Fields"), false, /* @__PURE__ */ React4.createElement(Grid, {
    columnFit: "18",
    columnGap: "5"
  }, /* @__PURE__ */ React4.createElement(TextField, {
    variant,
    label: "Primary"
  }), /* @__PURE__ */ React4.createElement(TextField, {
    loading: true,
    variant,
    label: "Label for loading field",
    tooltip: "Info on why this field is loading"
  }), /* @__PURE__ */ React4.createElement(TextField, {
    disabled: true,
    variant,
    label: "Disabled (w/ value)",
    tooltip: "Info on how to enable this field",
    defaultValue: "Disabled value"
  }), /* @__PURE__ */ React4.createElement(TextField, {
    defaultValue: "Default value",
    borderless: true,
    variant,
    label: "Primary (borderless)"
  }), /* @__PURE__ */ React4.createElement(TextField, {
    variant,
    label: "Primary (w/ description)",
    description: "Must contain a number, a symbol, and an uppercase letter"
  }), /* @__PURE__ */ React4.createElement(TextField, {
    variant,
    label: "Primary (w/ error)",
    error: "Erroneous error",
    defaultValue: "Wrong value",
    tooltip: "Info on how to fix the issue"
  }), /* @__PURE__ */ React4.createElement(TextField, {
    contrast: "low",
    colorScheme: "secondary",
    variant,
    label: "Secondary (low contrast)"
  }), /* @__PURE__ */ React4.createElement(TextField, {
    contrast: "high",
    variant,
    label: "Secondary (high contrast)"
  }), /* @__PURE__ */ React4.createElement(NumberField, {
    variant,
    label: "Number (currency)",
    formatOptions: { style: "currency", currency: "CAD" },
    defaultValue: 10,
    minValue: 0,
    step: 5
  }), /* @__PURE__ */ React4.createElement(NumberField, {
    variant,
    label: "Number (secondary)",
    colorScheme: "secondary",
    maxValue: 360,
    minValue: 0,
    step: 5
  })));
}
Inputs.displayName = "Inputs";

// app/components/sample/Statuses.tsx
init_react();
var React5 = __toESM(require_react());
var StatusRow = styled(Grid, {
  gridTemplateColumns: "repeat(1, 1fr)",
  "@bp1": {
    gridTemplateColumns: "repeat(2, 1fr)"
  },
  "@bp4": {
    gridTemplateColumns: "repeat(4, 1fr)"
  }
}, "StatusRow");
var Status = styled(Row, {
  alignItems: "center",
  defaultVariants: {
    px: "7",
    py: "6",
    radius: "4"
  }
}, "Status");
var Toast = styled(Status, {
  ...animate({
    "0%": {
      opacity: "0",
      transform: "translate3d(100%, 0, 0)"
    },
    "100%": {
      opacity: "1",
      transform: "translate3d(0, 0, 0)"
    }
  }),
  boxShadow: "$medium"
}, "Toast");
function Statuses() {
  const textProps = {
    fontFamily: "button",
    fontWeight: "bold",
    lineHeight: "heading",
    fontSize: "h6"
  };
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement(Heading.h2, {
    mt: "9"
  }, "Status Boxes"), /* @__PURE__ */ React5.createElement(StatusRow, {
    gap: "4"
  }, /* @__PURE__ */ React5.createElement(Status, {
    bg: "errorMin",
    color: "textErrorMin"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.alert,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline error indicator")), /* @__PURE__ */ React5.createElement(Status, {
    bg: "warningMin",
    color: "textWarningMin"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.alarmWarning,
    mt: "minus2",
    type: IconType.line,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline warning indicator")), /* @__PURE__ */ React5.createElement(Status, {
    bg: "successMin",
    color: "textSuccessMin"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.check,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline success indicator")), /* @__PURE__ */ React5.createElement(Status, {
    bg: "infoMin",
    color: "textInfoMin"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.information,
    type: IconType.line,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline info indicator"))), /* @__PURE__ */ React5.createElement(StatusRow, {
    gap: "4",
    mt: "3"
  }, /* @__PURE__ */ React5.createElement(Status, {
    bg: "errorMin",
    color: "textErrorMin",
    borderWidth: "2",
    borderColor: "error"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.alert,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline error indicator")), /* @__PURE__ */ React5.createElement(Status, {
    bg: "warningMin",
    color: "textWarningMin",
    borderWidth: "2",
    borderColor: "warning"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.alarmWarning,
    mt: "minus2",
    type: IconType.line,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline warning indicator")), /* @__PURE__ */ React5.createElement(Status, {
    bg: "successMin",
    color: "textSuccessMin",
    borderWidth: "2",
    borderColor: "success"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.check,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline success indicator")), /* @__PURE__ */ React5.createElement(Status, {
    bg: "infoMin",
    color: "textInfoMin",
    borderWidth: "2",
    borderColor: "info"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.information,
    type: IconType.line,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an inline info indicator"))), /* @__PURE__ */ React5.createElement(StatusRow, {
    gap: "4",
    mt: "3"
  }, /* @__PURE__ */ React5.createElement(Toast, {
    bg: "error",
    color: "textError",
    focusButton: "errorMax"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.alert,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an error toast")), /* @__PURE__ */ React5.createElement(Toast, {
    bg: "warning",
    color: "textWarning",
    focusButton: "warningMax"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.alarmWarning,
    mt: "minus2",
    type: IconType.line,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is a warning toast")), /* @__PURE__ */ React5.createElement(Toast, {
    bg: "success",
    color: "textSuccess",
    focusButton: "successMax"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.check,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is a success toast")), /* @__PURE__ */ React5.createElement(Toast, {
    bg: "info",
    color: "textInfo",
    focusButton: "infoMax"
  }, /* @__PURE__ */ React5.createElement(Icon, {
    name: IconName.information,
    type: IconType.line,
    size: "9",
    padded: "large"
  }), /* @__PURE__ */ React5.createElement(Text, {
    ...textProps
  }, "This is an info toast"))));
}
Statuses.displayName = "Statuses";

// app/routes/demos/sample.tsx
var meta = () => ({ title: "UI Lib + Code Gen Sample" });
function Index() {
  const showColorPalette = true;
  const showTypography = true;
  const showButtons = true;
  const showInputs = true;
  const showTags = true;
  const showStatuses = true;
  const showSampleBox = false;
  const sampleControls = /* @__PURE__ */ React6.createElement(React6.Fragment, null, showColorPalette && /* @__PURE__ */ React6.createElement(Cards, {
    title: "Color Palette",
    theme: appTheme,
    darkTheme: appDarkTheme
  }), /* @__PURE__ */ React6.createElement(Box, {
    mt: "6",
    maxWidth: "25",
    mx: "auto"
  }, showTypography && /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement(Heading, null, /* @__PURE__ */ React6.createElement(Anchor, {
    href: "#"
  }, '"Lorem ipsum dolor sit amet, consectetur adipiscing elit"')), /* @__PURE__ */ React6.createElement(Text.p, null, `Lorem 'ipsum' dolor sit amet -- consectetur adipiscing elit. Donec scelerisque quis est non pharetra. "Etiam" at lacus arcu. Nullam vitae`, " ", /* @__PURE__ */ React6.createElement(Anchor, {
    href: "#"
  }, "varius nisl semper"), " nulla ac ipsum ultricies hendrerit sit amet metus.")), showButtons && /* @__PURE__ */ React6.createElement(ButtonSamples, null), showInputs && /* @__PURE__ */ React6.createElement(Inputs, null)), showTags && /* @__PURE__ */ React6.createElement(Tags, null), showStatuses && /* @__PURE__ */ React6.createElement(Statuses, null));
  return /* @__PURE__ */ React6.createElement(Column.article, null, showSampleBox && /* @__PURE__ */ React6.createElement(Box, {
    css: {
      bg: "$neutral10",
      color: "$textNeutral10",
      margin: "$2 $4 $2 $6",
      p: "$8 $8 $8 $4",
      borderRadius: "$2 $5 $1 $4",
      float: "left",
      maxWidth: "$20"
    }
  }, "Sample box"), !showSampleBox && sampleControls);
}
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/demos/sample-S5JDYKXY.js.map
