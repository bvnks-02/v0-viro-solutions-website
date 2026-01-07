/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this section to stop Next.js from breaking Nodemailer
  serverExternalPackages: ["nodemailer"], 
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
