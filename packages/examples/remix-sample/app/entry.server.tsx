import { renderToString } from "react-dom/server"
import { RemixServer } from "remix"
import type { EntryContext } from "remix"
import { getStyledMarkup } from "~ui"

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  responseHeaders.set("Content-Type", "text/html")
  // Tell the client the server accepts the `Sec-CH-Prefers-Color-Scheme` client hint…
  responseHeaders.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme")
  // …and that the server's response will vary based on its value…
  responseHeaders.set("Vary", "Sec-CH-Prefers-Color-Scheme")
  // …and that the server considers this client hint a _critical_ client hint.
  responseHeaders.set("Critical-CH", "Sec-CH-Prefers-Color-Scheme")

  const markup = getStyledMarkup(() =>
    renderToString(<RemixServer context={remixContext} url={request.url} />)
  )
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}

// Optional export that modifies the response of data requests
/*
export const handleDataRequest: HandleDataRequestFunction =
  (
    response: Response,
    // same args that get passed to the action or loader that was called
    { request, params, context }
  ) => {
    response.headers.set("x-custom", "yay!")
    return response
  }
*/
