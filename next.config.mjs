/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "caqluwvdkhymvrhxlyge.supabase.co",
      },
    ],
  },
};

export default nextConfig;
