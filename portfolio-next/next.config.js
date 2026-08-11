/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dharmendralaxkar.vercel.app',
      },
    ],
  },
}

module.exports = nextConfig
