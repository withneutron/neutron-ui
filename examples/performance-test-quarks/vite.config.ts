import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { getThemeFonts } from "@withneutron/quarks"

const { links } = getThemeFonts()
const linkTags = links.map(({ rel, href }) => `<link rel="${rel}" href="${href}" />`).join("\n\t")

const hash = Math.floor(Math.random() * 90000) + 10000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [linksPlugin(), react()],
  build: {
    minify: true,
    reportCompressedSize: true,
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    // rollupOptions: {
    //   output: {
    //     entryFileNames: `[name]` + hash + `.js`,
    //     chunkFileNames: `[name]` + hash + `.js`,
    //     assetFileNames: `[name]` + hash + `.[ext]`,
    //   },
    // },
  },
  resolve: {
    preserveSymlinks: true,
  },
})

function linksPlugin() {
  return {
    name: "typo-links",
    transformIndexHtml(html: string) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>Performance Test</title>\n\t${linkTags}`)
    },
  }
}
