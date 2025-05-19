import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/", // Ajusta si tu chatbot está en otra ruta
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors https://asteroidweb.vercel.app/ https://www.asteroidtechs.com https://backoffice.asteroidtechs.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
