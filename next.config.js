/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");
const withTM = require("next-transpile-modules")([
  "@react95/core",
  "@react95/icons",
]);

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = withTM(withFonts(nextConfig));
