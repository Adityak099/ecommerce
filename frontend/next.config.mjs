/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com", "res.cloudinary.com"],
  },
  optimizeFonts: true,
  trailingSlash: true,
};

export default nextConfig;
