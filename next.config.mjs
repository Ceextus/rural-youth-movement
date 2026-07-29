/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jjdyiefbcwhduonmzlon.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Allow image uploads through server actions (default is 1mb).
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
