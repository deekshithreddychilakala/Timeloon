/**
 * Example expo app config exposing Supabase keys via `extra`.
 *
 * Note: Keep real secrets out of source control. Use environment variables
 * injected by your CI or local `.env` loading during development.
 *
 * Access these values in the app via `expo-constants`:
 * import Constants from 'expo-constants';
 * const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.manifest?.extra || {};
 */

module.exports = ({ config }) => {
    return {
        ...config,
        extra: {
            SUPABASE_URL: process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co',
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'your-anon-key'
        }
    };
};
