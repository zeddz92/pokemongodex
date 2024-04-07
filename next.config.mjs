/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_URL: "/",
  },
  images: {
    domains: ["www.example.com"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokemon.gishan.cc",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.serebii.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pvpoke.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
