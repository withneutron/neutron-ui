import path from "path"
import { defineConfig } from "vite"
import dts from "vite-dts"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import pkg from "./package.json"

export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: format => `neutron-ui.${format}.js`,
    },
    outDir: path.resolve(__dirname, "./dist"),
    emptyOutDir: false,
    reportCompressedSize: false,
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
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
  plugins: [dts(), vanillaExtractPlugin({ identifiers: "short" })],
  // resolve: {
  //   alias: {
  //     "@polaris/tokens": path.resolve(__dirname, "../tokens/src/index.ts"),
  //   },
  // },
})
