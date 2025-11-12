/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aarogyaaadhar.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },

  // 🚀 Disable ESLint blocking completely for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ (Optional) Disable type-checking errors during build too
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
