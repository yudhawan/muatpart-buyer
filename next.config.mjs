/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "prd.place",
      },
      {
        hostname: "cdn-icons-png.flaticon.com"
      },
      {
        hostname: "placehold.co"
      }
    ]
  }
};

export default nextConfig;
