/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'cureclinica.com.br']
    }
  },
  images: {
    domains: ['uploadthing.com', 'utfs.io', 'cureclinica.com.br'],
    formats: ['image/webp', 'image/avif']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig