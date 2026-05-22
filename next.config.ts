import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aspenmotos.com",
      },
      {
        protocol: "https",
        hostname: "cyclemotorshopar.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "aszisa.com.ar",
      },
      {
        protocol: "https",
        hostname: "www.honda.com.ar",
      },
      {
        protocol: "https",
        hostname: "www.yamaha-motor.com.ar",
      },
      {
        protocol: "https",
        hostname: "bajajauto.com.ar",
      },
      {
        protocol: "https",
        hostname: "zanella.com.ar",
      },
      {
        protocol: "https",
        hostname: "gilera.com.ar",
      },
      {
        protocol: "https",
        hostname: "corvenmotos.com.ar",
      },
    ],
  },
};

export default nextConfig;
