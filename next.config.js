/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['komic.s3.ap-south-1.amazonaws.com', 'fakeimg.pl', 'komic.tk'],
  },
  swcMinify: true,
}

module.exports = nextConfig
