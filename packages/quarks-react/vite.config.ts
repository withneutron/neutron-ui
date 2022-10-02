import path from "path"
import { defineConfig } from "vite"
import dts from "vite-dts"
import pkg from "./package.json"

export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  build: {
    emptyOutDir: false,
    reportCompressedSize: false,
    outDir: path.resolve(__dirname, "./dist"),
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: format => (format === "cjs" ? "quarks-react.js" : `quarks-react.${format}.js`),
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        assetFileNames: ({ name }: Record<string, any>) => {
          if (name === "style.css") return "quarks-react.css"
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
  ssr: {
    noExternal: true,
  },
  plugins: [dts()],
})
