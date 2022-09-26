import path from "path"
import { defineConfig } from "vite"
import dts from "vite-dts"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"

export default defineConfig({
  build: {
    emptyOutDir: false,
    reportCompressedSize: false,
    outDir: path.resolve(__dirname, "./dist"),
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: format => (format === "cjs" ? "quarks.js" : `quarks.${format}.js`),
    },
    rollupOptions: {
      output: {
        assetFileNames: ({ name }: Record<string, any>) => {
          if (name === "style.css") return "quarks.css"
          return name ?? "custom.js"
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      keepNames: true,
    },
  },
  plugins: [dts(), vanillaExtractPlugin({ identifiers: "short" })],
})
