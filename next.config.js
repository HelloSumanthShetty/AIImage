/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Disabled to support API routes and Auth
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

module.exports = nextConfig;
