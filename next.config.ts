import type { NextConfig } from "next";
import { publishedProducts } from "./src/data/products";
import { publishedProjects } from "./src/data/projects";

const nextConfig: NextConfig = {
  // Next 16 static export requires nonempty params for every discovered dynamic
  // route. Enable record templates only when approved records can be exported.
  pageExtensions: [
    "tsx",
    "ts",
    "jsx",
    "js",
    ...(publishedProducts.length ? ["product.tsx"] : []),
    ...(publishedProjects.length ? ["project.tsx"] : []),
  ],
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
