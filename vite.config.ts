/// <reference types="vitest" />
import {type Plugin, defineConfig, createFilter} from "vite";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";
import inject from "@rollup/plugin-inject";
import {type ParserBuildOptions, generate} from "peggy";

import {readFileSync} from "fs";
import {resolve} from "path";
import {execSync} from "child_process";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "./",
  optimizeDeps: {
    exclude: ["leaflet"]
  },
  build: {
    rollupOptions: {
      input: [
        resolve(__dirname, "index.html"),
        resolve(__dirname, "land.html"),
        resolve(__dirname, "map.html")
      ]
    }
  },
  define: {
  },
  plugins: [
    inject({
      exclude: /(css|pegjs)$/,
      $: "jquery",
      jQuery: "jquery"
    }),
    peggy(),
  ],
  // https://vitest.dev/config/
  test: {
    environment: "happy-dom",
    include: ["tests/test*.ts"]
  }
}));

function peggy(options: ParserBuildOptions = {}): Plugin {
  return {
    name: "peggy",
    transform(grammar, id) {
      const {include = ["*.pegjs", "**/*.pegjs"], exclude} = options;
      const filter = createFilter(include, exclude);
      if (!filter(id)) return null;
      const code = generate(grammar, {output: "source", ...options});
      return {
        code: `export default ${code};`,
        map: {mappings: ""}
      };
    }
  };
}
