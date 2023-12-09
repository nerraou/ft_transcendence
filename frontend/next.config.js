/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.pongboy.me",
        pathname: "/assets/images/*",
      },
    ],
  },
};

module.exports = nextConfig;
