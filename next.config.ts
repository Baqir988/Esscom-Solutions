import type { NextConfig } from "next";
import { publishedProducts } from "./src/data/products";
import { publishedProjects } from "./src/data/projects";

const nextConfig: NextConfig = {
  // Keep unapproved product/project templates undiscovered until records are publishable.
  pageExtensions: [
    "tsx",
    "ts",
    "jsx",
    "js",
    ...(publishedProducts.length ? ["product.tsx"] : []),
    ...(publishedProjects.length ? ["project.tsx"] : []),
  ],
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
