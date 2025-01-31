import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: "/",
    output: "export",

    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
};

export default nextConfig;
