import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  swcMinify: false,
  experimental: {
    viewTransition: true,
    serverComponentsExternalPackages: ["detect-libc"],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.remailer.eu",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.admin-test.spacecargo.ge",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "eu2.contabostorage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.old.spacecargo.ge",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.spacecargo.ge",
        port: "",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              titleProp: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },

};

export default nextConfig;
