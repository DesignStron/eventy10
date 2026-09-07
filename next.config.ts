import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qbcjyecssttdmvmtswcy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "scontent-waw2-2.xx.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent-*.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fbcdn.net",
        pathname: "/**",
      },
    ],
    deviceSizes: [320, 400, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
