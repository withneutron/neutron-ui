// SEMANTIC HTML //////////////////////////////////////////////////////////////
export type SemanticLayoutPrimitive<T> = T & {
  /** ARTICLE: Defines independent, self-contained content */
  article: T
  /** ASIDE: Defines content aside from, but related to, the main content */
  aside: T
  /** DIALOG: Defines an overlaying box or window, such as a modal */
  dialog: T
  /** DIV: Defines a generic, block-rendered section in a document */
  div: T
  /** FOOTER: Defines an area at the foot of a document or section */
  footer: T
  /** HEADER: Defines an area at the head of a document or section */
  header: T
  /** LABEL: Identifies and links to an <input> element */
  label: T
  /** MAIN: Specifies the main content of a document */
  main: T
  /** NAV: Defines navigation links */
  nav: T
  /** SECTION: Defines a generic, block-rendered section in a document */
  section: T
  // /** DETAILS: Defines additional details that the user can view or hide */
  // details: T
  // /** FIGURE: Specifies self-contained content, like illustrations, diagrams, photos, code listings, etc */
  // figure: T
  // /** SPAN: Defines a generic, inline-rendered section in a document */
  // span: T
}
export type SemanticTextPrimitive<T> = T & {
  /** BLOCKQUOTE: Defines a section that is quoted from another source */
  blockquote: T
  /** CODE: Defines a piece of computer code */
  code: T
  /** DEL: Defines text that has been deleted from a document */
  del: T
  /** EM: Defines emphasized text */
  em: T
  /** I: Defines a part of text in an alternate voice or mood */
  i: T
  /** INS: Defines a text that has been inserted into a document */
  ins: T
  /** LABEL: Identifies and links to an <input> element */
  label: T
  /** P: Defines a paragraph */
  p: T
  /** PRE: Defines preformatted text */
  pre: T
  /** SMALL: Defines smaller text, or a footnote */
  small: T
  /** SPAN: Defines a generic, inline-rendered section in a document */
  span: T
  /** STRONG: Defines important text */
  strong: T
  /** TIME: Defines a date/time */
  time: T
  // abbr: T
  // address: T
  // b: T
  // bdi: T
  // bdo: T
  // cite: T
  // dfn: T
  // /** FIGCAPTION: Defines a caption for a <figure> element */
  // figcaption: T
  // ins: T
  // kbd: T
  // /** MARK: Defines marked/highlighted text */
  // mark: T
  // meter: T
  // progress: T
  // q: T
  // rp: T
  // rt: T
  // ruby: T
  // s: T
  // samp: T
  // sub: T
  // /** SUMMARY: Defines a visible heading for a <details> element */
  // summary: T
  // sup: T
  // template: T
  // u: T
  // var: T
  // wbr: T
}

export type SemanticHeadingPrimitive<T> = T & {
  /** H1: Defines a primary heading */
  h1: T
  /** H2: Defines a secondary heading */
  h2: T
  /** H3: Defines a tertiary heading */
  h3: T
  /** H4: Defines a heading nested 4 levels deep */
  h4: T
  /** H5: Defines a heading nested 5 levels deep */
  h5: T
  /** H6: Defines a heading nested 6 levels deep */
  h6: T
}
