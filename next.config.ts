import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
  // /* config options here */
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   })
  //
  //   // Optimize module resolution
  //   config.resolve = {
  //     ...config.resolve,
  //     cache: true,
  //     symlinks: true,
  //   }
  //
  //   config.watchOptions = {
  //     aggregateTimeout: 300,
  //     poll: 1000,
  //     ignored: /node_modules/,
  //   }
  //   return config
  // },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'www.diloop.com',
      port: '',
      pathname: '/storage/**',
    }],
  },
}

export default nextConfig
