/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds:true
  },
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
      },
      {
        hostname:'azlogistik.s3.ap-southeast-3.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;
