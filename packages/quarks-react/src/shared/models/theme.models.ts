// SEMANTIC HTML //////////////////////////////////////////////////////////////
export type SemanticLayoutPrimitive<T> = T & {
  /** ARTICLE: Defines independent, self-contained content */
  Article: T
  /** ASIDE: Defines content aside from, but related to, the main content */
  Aside: T
  /** DIALOG: Defines an overlaying box or window, such as a modal */
  Dialog: T
  /** DIV: Defines a generic, block-rendered section in a document */
  Div: T
  /** FOOTER: Defines an area at the foot of a document or section */
  Footer: T
  /** HEADER: Defines an area at the head of a document or section */
  Header: T
  /** LABEL: Identifies and links to an <input> element */
  Label: T
  /** MAIN: Specifies the main content of a document */
  Main: T
  /** NAV: Defines navigation links */
  Nav: T
  /** SECTION: Defines a generic, block-rendered section in a document */
  Section: T
  // /** DETAILS: Defines additional details that the user can view or hide */
  // Details: T
  // /** FIGURE: Specifies self-contained content, like illustrations, diagrams, photos, code listings, etc */
  // Figure: T
  // /** SPAN: Defines a generic, inline-rendered section in a document */
  // Span: T
}
export type SemanticTextPrimitive<T> = T & {
  /** BLOCKQUOTE: Defines a section that is quoted from another source */
  Blockquote: T
  /** CODE: Defines a piece of computer code */
  Code: T
  /** DEL: Defines text that has been deleted from a document */
  Del: T
  /** EM: Defines emphasized text */
  Em: T
  /** I: Defines a part of text in an alternate voice or mood */
  I: T
  /** INS: Defines a text that has been inserted into a document */
  Ins: T
  /** LABEL: Identifies and links to an <input> element */
  Label: T
  /** P: Defines a paragraph */
  P: T
  /** PRE: Defines preformatted text */
  Pre: T
  /** SMALL: Defines smaller text, or a footnote */
  Small: T
  /** SPAN: Defines a generic, inline-rendered section in a document */
  Span: T
  /** STRONG: Defines important text */
  Strong: T
  /** TIME: Defines a date/time */
  Time: T
  // Abbr: T
  // Address: T
  // B: T
  // Bdi: T
  // Bdo: T
  // Cite: T
  // Dfn: T
  // /** FIGCAPTION: Defines a caption for a <figure> element */
  // Figcaption: T
  // Ins: T
  // Kbd: T
  // /** MARK: Defines marked/highlighted text */
  // Mark: T
  // Meter: T
  // Progress: T
  // Q: T
  // Rp: T
  // Rt: T
  // Ruby: T
  // S: T
  // Samp: T
  // Sub: T
  // /** SUMMARY: Defines a visible heading for a <details> element */
  // Summary: T
  // Sup: T
  // Template: T
  // U: T
  // Var: T
  // Wbr: T
}

export type SemanticHeadingPrimitive<T> = T & {
  /** H1: Defines a primary heading */
  H1: T
  /** H2: Defines a secondary heading */
  H2: T
  /** H3: Defines a tertiary heading */
  H3: T
  /** H4: Defines a heading nested 4 levels deep */
  H4: T
  /** H5: Defines a heading nested 5 levels deep */
  H5: T
  /** H6: Defines a heading nested 6 levels deep */
  H6: T
}
