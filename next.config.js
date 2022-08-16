/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    domains: [
      'storage.googleapis.com',
      'hkshopu-images.s3.ap-east-1.amazonaws.com',
      'http.cat',
      'fakeimg.pl'
    ]
  },
  swcMinify: true
}

module.exports = nextConfig
