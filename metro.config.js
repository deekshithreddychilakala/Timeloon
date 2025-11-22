const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/**
 * Simplified Metro configuration
 *
 * This config does two things:
 * 1. Enables the SVG transformer so you can import `.svg` as React components.
 * 2. Leaves the default Expo resolver alone (no custom `resolveRequest` or
 *    extraNodeModules mappings) to avoid complex resolution issues.
 *
 * If you hit a specific module resolution problem again, prefer resolving the
 * root cause (mismatched package versions) or add a small, well-scoped fix
 * rather than a broad resolver override.
 */

module.exports = (async () => {
    const config = await getDefaultConfig(__dirname);

    // Keep the default transformer and resolver, but add support for SVG files
    const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        // Use the community svg transformer so imports like `import Logo from './logo.svg'`
        // work and produce a React component.
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    };

    config.resolver = {
        ...resolver,
        // Treat .svg as source so the svg transformer receives it.
        assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...resolver.sourceExts, 'svg'],
    };

    // Note: We intentionally avoid extraNodeModules/resolveRequest hacks here.
    // Those workarounds can mask real dependency/version mismatches and cause
    // subtle bundling issues. If needed, add a targeted mapping for a single
    // problematic module later.

    return config;
})();
