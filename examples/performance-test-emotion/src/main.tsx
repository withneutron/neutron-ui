import React from "react"
import ReactDOM from "react-dom/client"
import { Global } from "@emotion/react"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global
      styles={{
        "html, body": {
          margin: 0,
          padding: 0,
        },
        html: {
          fontSize: "6.25%",
          "@media": {
            "not all and (min-resolution:.001dpcm)": {
              "@supports": {
                "(-webkit-appearance:none)": {
                  fontSize: "1px",
                },
              },
            },
          },
        },
        body: {
          background: "#f1f1f1",
          color: "#666",
          fontSize: "16em",
          fontWeight: 400,
          lineHeight: 1.65,
        },
        "*": {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          boxSizing: "border-box",
        },
        "*::placeholder": {
          color: "#888",
        },
        "body, a, p, li, strong, em, b, i, button": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        button: {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        "button:focus": {
          outline: "none",
        },
        "pre, code": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        code: {
          background: "#efefef",
          color: "black",
          fontWeight: 500,
        },
        blockquote: {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 24,
          lineHeight: 1.25,
          fontStyle: "italic",
        },
        ul: {
          listStyleType: "circle",
        },
        "a, p, li, pre, code, strong, em, b, i, blockquote": {
          fontSize: 14,
        },
        p: {
          marginBlockStart: "0",
          marginBlockEnd: "16px",
        },
        "p:last-child": {
          marginBlockEnd: "0",
        },
        a: {
          color: "#2B6",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: `inset 0 -3px 0 #2B6`,
          transitionProperty: "box-shadow, color",
          transitionDuration: `.25s, .25s`,
        },
        "a:focus-visible": {
          boxShadow: `inset 0 1.25em 0 #2B6`,
          outline: "none",
        },
        "a:hover": {
          boxShadow: `inset 0 1.25em 0 #2B6`,
          color: "#",
          transitionDuration: `.5s, .5s`,
        },
        "a:focus-visible, a:focus-visible code": {
          color: "#2B6",
        },
        "li > a, nav a, button a, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a": {
          boxShadow: "none",
        },
        "blockquote, pre": {
          background: "#efefef",
          color: "#444",
          marginInline: "0",
          paddingInline: "32px",
          paddingBlock: "20px",
          borderRadius: "6px",
        },
        "h1, h2": {
          marginBlockStart: "24px",
          marginBlockEnd: "8px",
        },
        "h3, h4, h5, h6": {
          marginBlockStart: "16px",
          marginBlockEnd: "8px",
        },
        "h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child,  h1 + h2,  h1 + h3,  h1 + h4,  h1 + h5,  h1 + h6,  h2 + h3,  h2 + h4,  h2 + h5,  h2 + h6,  h3 + h4,  h3 + h5,  h3 + h6,  h4 + h5,  h4 + h6,  h5 + h6":
          {
            marginBlockStart: "0",
          },
        "h1, h1 > a, h1 > span": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 27,
          fontWeight: 300,
        },
        "h2, h2 > a, h2 > span": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 24,
          fontWeight: 600,
        },
        "h3, h3 > a, h3 > span": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 21,
          fontWeight: 300,
        },
        "h4, h4 > a, h4 > span": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 19,
          fontWeight: 600,
        },
        "h5, h5 > a, h5 > span": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 18,
          fontWeight: 300,
        },
        "h6, h6 > a, h6 > span": {
          fontFamily:
            'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: 16,
          fontWeight: 600,
        },
        em: {
          fontStyle: "normal",
        },
        strong: {
          fontWeight: 600,
        },
        "::selection": {
          background: "#2B6",
          color: "#fff",
        },
      }}
    />
    <App />
  </React.StrictMode>
)
