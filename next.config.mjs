import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.travelinyourpocket.com",
      },
      process.env.NODE_ENV === "development"
        ? {
            protocol: "http",
            hostname: "localhost",
          }
        : {
            protocol: "https",
            hostname: "cms.travelinyourpocket.com",
          },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|woff2|ico)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
    ];
  },
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};
export default withPWA({
  dest: "public", // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(withNextIntl(nextConfig));
