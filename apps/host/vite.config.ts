import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { fileURLToPath, URL } from "node:url";

const hostRoot = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: hostRoot,
  cacheDir: "../../node_modules/.vite/host",
  plugins: [
    react(),
    federation({
      name: "host",
      dts: false,
      remotes: {
        header: {
          type: "module",
          name: "header",
          entry: "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "header",
          shareScope: "default",
        },
        footer: {
          type: "module",
          name: "footer",
          entry: "http://localhost:3002/remoteEntry.js",
          entryGlobalName: "footer",
          shareScope: "default",
        },
        products: {
          type: "module",
          name: "products",
          entry: "http://localhost:3003/remoteEntry.js",
          entryGlobalName: "products",
          shareScope: "default",
        },
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        zustand: {
          singleton: true,
        },
        "@microfrontend/shared": {
          singleton: true,
        },
        "@tanstack/react-query": {
          singleton: true,
        },
      },
    }),
  ],
  server: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    hmr: {
      host: "localhost",
      protocol: "ws",
      clientPort: 3000,
    },
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "esnext",
    outDir: "../../dist/host",
    emptyOutDir: true,
    manifest: true,
    modulePreload: false,
  },
});
