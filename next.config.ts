import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
