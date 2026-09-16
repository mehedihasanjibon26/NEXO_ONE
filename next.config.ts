import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "NEXO_ONE";

const basePath = isProd ? `/${repoName}` : "";

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
