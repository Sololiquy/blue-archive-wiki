import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: "/",
    assetPrefix: "/",
    output: "export",

    images: {
        unoptimized: true,
    },
    reactStrictMode: true,

    async rewrites() {
        return [
            {
                source: "/studentList",
                destination: "/layout/studentList",
            },
            {
                source: "/studentDetail/:id",
                destination: "/layout/studentDetail/:id",
            },
            {
                source: "/enemyDetail",
                destination: "/layout/enemyDetail",
            },
        ];
    },
};

export default nextConfig;
