import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  
};
module.exports = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
