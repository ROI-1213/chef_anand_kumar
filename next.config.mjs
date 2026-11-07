import fs from 'node:fs';
import path from 'node:path';

// Load .env if not already loaded so ALLOWED_HOSTS is always mapped from .env
function getEnvAllowedHosts() {
  const raw = process.env.ALLOWED_HOSTS || 'localhost,127.0.0.1,chefanandkumar.com,www.chefanandkumar.com,*.chefanandkumar.com';
  return raw
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);
}

const allowedHosts = getEnvAllowedHosts();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: allowedHosts,
  experimental: {
    serverActions: {
      allowedOrigins: allowedHosts,
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.chefanandkumar.com',
      },
      {
        protocol: 'https',
        hostname: 'blog.chefanandkumar.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/portfolio.html',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/recipes.html',
        destination: '/recipes',
        permanent: true,
      },
      {
        source: '/video-archive.html',
        destination: '/video-archive',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
