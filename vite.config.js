import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { transform } from "esbuild";

function jsxInJs() {
  return {
    name: "jsx-in-js",
    enforce: "pre",
    async transform(code, id) {
      if (!id.includes("/src/") && !id.includes("\\src\\")) return;
      if (!id.endsWith(".js")) return;

      const result = await transform(code, {
        loader: "jsx",
        jsx: "automatic",
        sourcemap: true,
        sourcefile: id,
      });

      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}

export default defineConfig({
  plugins: [jsxInJs(), tailwindcss(), react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
