/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: "/alicerce-platform", // importante para GitHub Pages
};

module.exports = nextConfig;
