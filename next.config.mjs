/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer, buildId, dev, defaultLoaders, webpack }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
    env: {
        CUSTOM_KEY: 'my-value',
    },
};

export default nextConfig;
