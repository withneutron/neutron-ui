import emotionStyled from "@emotion/styled"

function App() {
  return (
    <Wrapper>
      <Card>
        <Heading as="h1">Performance Test: Emotion</Heading>
        <ColorGrid as="ul">
          {Array(36)
            .fill(0)
            .map((_, index) => (
              <Square key={index} style={getColors(index)}>
                {index + 1}
              </Square>
            ))}
        </ColorGrid>
        <ColorGrid as="ul">
          {Array(36)
            .fill(0)
            .map((_, index) => (
              <Square key={index} style={getColors(35 - index)}>
                {index + 1}
              </Square>
            ))}
        </ColorGrid>
      </Card>
    </Wrapper>
  )
}

export default App

const Heading = emotionStyled.h1({
  color: "rgb(94, 94, 94)",
  fontFamily:
    'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: 30,
  fontWeight: 700,
  lineHeight: "normal",
})
const Wrapper = emotionStyled.main({
  padding: "40px",
  background: "#f1f1f1",
  minHeight: "100vh",
})
const Card = emotionStyled.section({
  display: "flex",
  flexDirection: "column",
  padding: "40px",
  gap: "40px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: `0px 1.8px 2.7px hsl(0 0% 0% / .08),
  0px 5.1px 7.7px hsl(0 0% 0% / .16)`,
})
const ColorGrid = emotionStyled.ul({
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gridAutoRows: "120px",
  marginBottom: 0,
  paddingLeft: 0,
})
const Square = emotionStyled.li({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#f1f1f1",
  borderRadius: "4px",
  listStyle: "none",
  fontFamily:
    'Montserrat, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: "21px",
  fontWeight: 600,
  lineHeight: 1.1,
})

const colors = [
  {
    color: "rgb(22, 106, 98)",
    backgroundColor: "rgb(244, 252, 251)",
  },
  {
    color: "rgb(17, 78, 71)",
    backgroundColor: "rgb(238, 251, 249)",
  },
  {
    color: "rgb(17, 78, 71)",
    backgroundColor: "rgb(221, 246, 243)",
  },
  {
    color: "rgb(9, 42, 39)",
    backgroundColor: "rgb(199, 240, 236)",
  },
  {
    color: "rgb(9, 42, 39)",
    backgroundColor: "rgb(174, 230, 224)",
  },
  {
    color: "rgb(9, 42, 39)",
    backgroundColor: "rgb(161, 224, 218)",
  },
  {
    color: "rgb(9, 42, 39)",
    backgroundColor: "rgb(135, 210, 203)",
  },
  {
    color: "rgb(9, 42, 39)",
    backgroundColor: "rgb(105, 192, 183)",
  },
  {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(27, 124, 114)",
  },
  {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(22, 106, 98)",
  },
  {
    color: "rgb(221, 246, 243)",
    backgroundColor: "rgb(17, 78, 71)",
  },
  {
    color: "rgb(174, 230, 224)",
    backgroundColor: "rgb(9, 42, 39)",
  },

  {
    color: "rgb(115, 65, 190)",
    backgroundColor: "rgb(252, 252, 253)",
  },
  {
    color: "rgb(85, 48, 141)",
    backgroundColor: "rgb(250, 248, 252)",
  },
  {
    color: "rgb(85, 48, 141)",
    backgroundColor: "rgb(244, 241, 249)",
  },
  {
    color: "rgb(46, 26, 76)",
    backgroundColor: "rgb(239, 234, 246)",
  },
  {
    color: "rgb(46, 26, 76)",
    backgroundColor: "rgb(228, 220, 239)",
  },
  {
    color: "rgb(46, 26, 76)",
    backgroundColor: "rgb(222, 212, 236)",
  },
  {
    color: "rgb(46, 26, 76)",
    backgroundColor: "rgb(206, 192, 226)",
  },
  {
    color: "rgb(46, 26, 76)",
    backgroundColor: "rgb(189, 171, 217)",
  },
  {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(132, 88, 198)",
  },
  {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(115, 65, 190)",
  },
  {
    color: "rgb(244, 241, 249)",
    backgroundColor: "rgb(85, 48, 141)",
  },
  {
    color: "rgb(228, 220, 239)",
    backgroundColor: "rgb(46, 26, 76)",
  },

  {
    color: "rgb(94, 94, 94)",
    backgroundColor: "rgb(250, 250, 250)",
  },
  {
    color: "rgb(69, 69, 69)",
    backgroundColor: "rgb(247, 247, 247)",
  },
  {
    color: "rgb(69, 69, 69)",
    backgroundColor: "rgb(242, 242, 242)",
  },
  {
    color: "rgb(38, 38, 38)",
    backgroundColor: "rgb(237, 237, 237)",
  },
  {
    color: "rgb(38, 38, 38)",
    backgroundColor: "rgb(227, 227, 227)",
  },
  {
    color: "rgb(38, 38, 38)",
    backgroundColor: "rgb(214, 214, 214)",
  },
  {
    color: "rgb(38, 38, 38)",
    backgroundColor: "rgb(199, 199, 199)",
  },
  {
    color: "rgb(38, 38, 38)",
    backgroundColor: "rgb(181, 181, 181)",
  },
  {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(112, 112, 112)",
  },
  {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(94, 94, 94)",
  },
  {
    color: "rgb(242, 242, 242)",
    backgroundColor: "rgb(69, 69, 69)",
  },
  {
    color: "rgb(227, 227, 227)",
    backgroundColor: "rgb(38, 38, 38)",
  },
]

function getColors(index: number) {
  return colors[index]
}
