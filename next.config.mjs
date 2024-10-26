import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cms.travelinyourpocket.com",
            },
            process.env.NODE_ENV === "development" ? {
                protocol: "http",
                hostname: "localhost",
            } : {
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
};
 
export default withNextIntl(nextConfig);