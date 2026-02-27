import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  transpilePackages: ["three"],
  turbopack: {},
};

export default nextConfig;
