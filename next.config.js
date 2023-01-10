const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ],
  },
  
}

module.exports = nextConfig
 