/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['localhost']
  },
  env: {
    APP_URL: "http://localhost:3000",
    API_URL: "http://localhost:4000",
  },
};

module.exports = nextConfig;
