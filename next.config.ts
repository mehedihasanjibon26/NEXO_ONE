import type { NextConfig } from "next";

// Set BASE_PATH (e.g. "/NEXO_ONE") only when hosting under a sub-path such as GitHub Pages.
const basePath = (process.env.BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",

  basePath,

  assetPrefix: basePath,

  trailingSlash: true,

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
