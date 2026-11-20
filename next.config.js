/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dev-to-uploads.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: '*.dev.to',
            },
        ],
    },
    async redirects() {
        // Old title-derived project URLs → new short slugs
        return [
            // KoriAI was rebranded to Hengo
            { source: '/projects/koriai---intelligent-korean-language-ecosystem', destination: '/projects/hengo', permanent: true },
            { source: '/projects/koriai', destination: '/projects/hengo', permanent: true },
            // Dev Notes (Enterprise Learning Hub) removed from the portfolio
            { source: '/projects/enterprise-learning-hub---korea-standard-stack', destination: '/projects', permanent: true },
            { source: '/projects/enterprise-learning-hub', destination: '/projects', permanent: true },
            // Money Flow was rebuilt as Luyra, which was then merged into H-Space as its Finance area
            { source: '/projects/money-flow---precision-finance-engine', destination: '/projects/hengo', permanent: true },
            { source: '/projects/money-flow', destination: '/projects/hengo', permanent: true },
            { source: '/projects/luyra', destination: '/projects/hengo', permanent: true },
            // Dev Lab was replaced by the shipped VSTV Agent project
            { source: '/projects/dev-lab', destination: '/projects/vstv-agent', permanent: true },
            // WeBill365 removed from the portfolio — send old URLs to the projects list
            { source: '/projects/webill365---vietnam-fintech-ecosystem', destination: '/projects', permanent: true },
            { source: '/projects/webill365', destination: '/projects', permanent: true },
            // Warehouse Master was replaced by H-Phsar
            { source: '/projects/warehouse-master---b2b-supply-chain-platform', destination: '/projects/h-phsar', permanent: true },
            { source: '/projects/warehouse-master', destination: '/projects/h-phsar', permanent: true },
        ];
    },
};

module.exports = nextConfig;
