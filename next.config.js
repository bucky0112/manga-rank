/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakeimg.pl', 'komic.site'],
  },
  swcMinify: true,
}

module.exports = nextConfig
