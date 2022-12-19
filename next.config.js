/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          subsets: ['latin'],
        },
      },
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/thumb/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.iconscout.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'expressjs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pngfind.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn4.iconfinder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'git-scm.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'personal-portfolio-db.fly.dev',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
