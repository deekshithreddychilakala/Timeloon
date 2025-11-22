// Babel config enabling module-resolver for `@/` imports.
// This maps `@/...` to `./src/...` which matches the `paths` in `tsconfig.json`.
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@/services': './src/services',
                        '@/store': './src/store',
                        '@/utils': './src/utils',
                        '@/hooks': './src/hooks',
                        '@/types': './src/types',
                        '@/styles': './src/styles'
                    }
                }
            ]
        ]
    };
};
