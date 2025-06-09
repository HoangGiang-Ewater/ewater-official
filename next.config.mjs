/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "nraafmqsoraqthoyufzv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // new URL(
      //   "https://nraafmqsoraqthoyufzv.supabase.co/storage/v1/object/public/**"
      // ),
    ],
  },
};

export default nextConfig;
