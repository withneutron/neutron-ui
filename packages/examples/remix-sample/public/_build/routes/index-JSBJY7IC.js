import {
  Link,
  useLoaderData
} from "/build/_shared/chunk-NPNDG4Z5.js";
import {
  Anchor,
  Box,
  Column,
  Grid,
  Heading,
  List,
  ListItem,
  Text,
  useColor
} from "/build/_shared/chunk-KIIHWOTY.js";
import {
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-ZYAL4XLG.js";

// browser-route-module:/Users/lucas/Sites/neutron-ui/packages/examples/remix-sample/app/routes/index.tsx?browser
init_react();

// app/routes/index.tsx
init_react();
var React = __toESM(require_react());
var meta = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to Neutron"
  };
};
function Index() {
  let data = useLoaderData();
  return /* @__PURE__ */ React.createElement(Grid, {
    gap: "11",
    maxWidth: "27",
    mx: "auto",
    horizontalPanel: {
      "@initial": "stacked",
      "@bp3": "right-17",
      "@bp4": "right-18",
      "@bp5": "right-19"
    }
  }, /* @__PURE__ */ React.createElement(Column.article, null, /* @__PURE__ */ React.createElement(Heading, null, "Build and scale ecommerce apps in hours, not weeks."), /* @__PURE__ */ React.createElement(Text, null, 'Lorem ipsum dolor sit amet "consectetur".'), /* @__PURE__ */ React.createElement(Text, null, "Duis at vestibulum dui. Proin accumsan, quam vitae congue tempor, tortor nisi dapibus magna, a porta urna ligula at odio. Nunc lobortis sapien quis nunc rhoncus, et finibus est pretium. Integer faucibus vitae quam sed dapibus."), /* @__PURE__ */ React.createElement(Text.blockquote, null, '"Lorem ipsum dolor sit amet consectetur adipiscing elit."'), /* @__PURE__ */ React.createElement(Text, null, "Check out all the demos in this starter, and then just delete the", " ", /* @__PURE__ */ React.createElement("code", null, "app/routes/demos"), " and ", /* @__PURE__ */ React.createElement("code", null, "app/styles/demos"), " folders when you're ready to turn this into your next project."), /* @__PURE__ */ React.createElement(Column, {
    w: "full",
    px: "11",
    py: "9",
    mt: "4",
    mb: "9",
    radius: "4",
    bg: useColor("secondary7", "secondary9"),
    color: useColor("textSecondary7", "textSecondary9")
  }, /* @__PURE__ */ React.createElement(Heading, {
    color: useColor("textSecondary7", "textSecondary9")
  }, "Data at your fingertips"), /* @__PURE__ */ React.createElement(Text, null, "Don't waste any time integrating third party APIs -- we've done it for you! Gadget provides built-in connections to ecommerce platforms and ERPs, giving you a two-way data sync with one click.")), Array(2).fill(0).map((x, key) => key % 2 ? /* @__PURE__ */ React.createElement(Text, {
    key
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut est maximus, volutpat metus vitae, dictum diam. Proin elementum libero enim, quis porta est facilisis tristique. Donec dignissim vitae nisi quis bibendum. Nam urna tellus, egestas ac est quis, tristique condimentum ante. Pellentesque viverra eu urna id tristique. Duis molestie gravida lorem eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam pellentesque vulputate volutpat. Donec sit amet nisi ac tortor elementum blandit ut sit amet neque. Praesent sit amet ipsum vel nulla auctor molestie at ac enim. Ut diam dui, accumsan vitae justo a, molestie laoreet magna.") : /* @__PURE__ */ React.createElement(Box, {
    key,
    mb: "6"
  }, /* @__PURE__ */ React.createElement(Text, null, "Duis at vestibulum dui. Proin accumsan, quam vitae congue tempor, tortor nisi dapibus magna, a porta urna ligula at odio. Nunc lobortis sapien quis nunc rhoncus, et finibus est pretium. Integer faucibus vitae quam sed dapibus. Praesent hendrerit sodales congue. In hendrerit erat sodales risus volutpat interdum."), /* @__PURE__ */ React.createElement(Text, null, "Donec tincidunt at ante in consectetur. Duis vitae neque tristique, convallis purus et, tincidunt libero. Donec aliquet ligula scelerisque auctor laoreet. Maecenas non tellus id dui facilisis sollicitudin. Fusce vehicula nisl et est volutpat, at viverra tellus varius. Proin ultrices purus felis, at vulputate lacus molestie vel. Nunc blandit turpis a erat tristique suscipit. Morbi lobortis semper lobortis. Cras faucibus molestie leo nec dignissim. In quis pulvinar arcu."))), /* @__PURE__ */ React.createElement(Column, {
    w: "full",
    px: "11",
    py: "10",
    mt: "4",
    mb: "9",
    radius: "4",
    bg: "neutral11",
    color: "textPrimary11"
  }, /* @__PURE__ */ React.createElement(Heading, {
    flat: true,
    color: "textPrimary11",
    fontSize: "9",
    fontWeight: "1"
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut est maximus!")), Array(2).fill(0).map((x, key) => key % 2 ? /* @__PURE__ */ React.createElement(Text, {
    key
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut est maximus, volutpat metus vitae, dictum diam. Proin elementum libero enim, quis porta est facilisis tristique. Donec dignissim vitae nisi quis bibendum. Nam urna tellus, egestas ac est quis, tristique condimentum ante. Pellentesque viverra eu urna id tristique. Duis molestie gravida lorem eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam pellentesque vulputate volutpat. Donec sit amet nisi ac tortor elementum blandit ut sit amet neque. Praesent sit amet ipsum vel nulla auctor molestie at ac enim. Ut diam dui, accumsan vitae justo a, molestie laoreet magna.") : /* @__PURE__ */ React.createElement(Box, {
    key,
    mb: "6"
  }, /* @__PURE__ */ React.createElement(Text, null, "Duis at vestibulum dui. Proin accumsan, quam vitae congue tempor, tortor nisi dapibus magna, a porta urna ligula at odio. Nunc lobortis sapien quis nunc rhoncus, et finibus est pretium. Integer faucibus vitae quam sed dapibus. Praesent hendrerit sodales congue. In hendrerit erat sodales risus volutpat interdum."), /* @__PURE__ */ React.createElement(Text, null, "Donec tincidunt at ante in consectetur. Duis vitae neque tristique, convallis purus et, tincidunt libero. Donec aliquet ligula scelerisque auctor laoreet. Maecenas non tellus id dui facilisis sollicitudin. Fusce vehicula nisl et est volutpat, at viverra tellus varius. Proin ultrices purus felis, at vulputate lacus molestie vel. Nunc blandit turpis a erat tristique suscipit. Morbi lobortis semper lobortis. Cras faucibus molestie leo nec dignissim. In quis pulvinar arcu.")))), /* @__PURE__ */ React.createElement(Column.aside, {
    overflowY: "auto",
    stickyBottom: { "@<bp3": true },
    h: { "@<bp3": "12" },
    py: { "@<bp3": "7" },
    bg: { "@<bp3": "neutral2" }
  }, /* @__PURE__ */ React.createElement(Heading.h2, null, "Demos In This App"), /* @__PURE__ */ React.createElement(List, {
    gap: "4"
  }, data.demos.map((demo) => /* @__PURE__ */ React.createElement(ListItem, {
    key: demo.to
  }, /* @__PURE__ */ React.createElement(Anchor, {
    as: Link,
    to: demo.to,
    prefetch: "intent"
  }, demo.name)))), /* @__PURE__ */ React.createElement(Heading.h2, null, "Resources"), /* @__PURE__ */ React.createElement(List, {
    gap: "4"
  }, data.resources.map((resource) => /* @__PURE__ */ React.createElement(ListItem, {
    key: resource.url
  }, /* @__PURE__ */ React.createElement(Anchor, {
    href: resource.url
  }, resource.name))))));
}
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/index-JSBJY7IC.js.map
