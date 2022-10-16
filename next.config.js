/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['komic.s3.ap-south-1.amazonaws.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig
