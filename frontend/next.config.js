/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined, // remove static export
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;

