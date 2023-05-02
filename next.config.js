/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakeimg.pl', 'komic.tk'],
  },
  swcMinify: true,
}

module.exports = nextConfig
