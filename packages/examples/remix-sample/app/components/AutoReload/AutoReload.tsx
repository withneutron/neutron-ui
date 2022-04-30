export function AutoReload({ port = 8002 }: { port?: number }) {
  const env = process.env.NODE_ENV || ""
  if (!["development", "testing"].includes(env)) {
    return null
  }
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          const ws${port} = new WebSocket("ws://localhost:${port}/socket");
          ws${port}.onmessage = message => {
            let event = JSON.parse(message.data);
            if (event.type === "LOG") {
              console.log(event.message);
            }
            if (event.type === "RELOAD") {
              console.log("💿 Reloading window ...");
              if (event.message && event.message.length > 0) {
                console.log(event.message);
              }
              window.location.reload();
            }
          };
          ws${port}.onerror = error => {
            console.log("Remix dev asset server web socket error:");
            console.warn(error);
          };  
        `,
      }}
    />
  )
}
