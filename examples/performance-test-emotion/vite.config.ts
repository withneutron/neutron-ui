import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const linkTags = `
\t<link rel="preconnect" href="https://fonts.googleapis.com" />
\t<link rel="preconnect" href="https://fonts.gstatic.com" />
\t<link rel="preload" href="https://fonts.googleapis.com/css2?display=auto&family=Source+Sans Pro:ital,wght@0,300;0,400;0,600;0,900;1,300;1,400;1,600;1,900&family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Fira+Code:ital,wght@0,300;0,400;0,600;1,400" />
\t<link rel="stylesheet" href="https://fonts.googleapis.com/css2?display=auto&family=Source+Sans Pro:ital,wght@0,300;0,400;0,600;0,900;1,300;1,400;1,600;1,900&family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Fira+Code:ital,wght@0,300;0,400;0,600;1,400" />`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [linksPlugin(), react()],
  build: {
    minify: true,
    reportCompressedSize: true,
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
  },
  server: {
    port: 3001,
  },
  resolve: {
    preserveSymlinks: true,
  },
})

function linksPlugin() {
  return {
    name: "typo-links",
    transformIndexHtml(html: string) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>Performance Test</title>${linkTags}`)
    },
  }
}
