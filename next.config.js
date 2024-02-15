/** @type {import('next').NextConfig} */
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')([
  '@react95/core',
  '@react95/icons',
]);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = withTM(withFonts(nextConfig));
