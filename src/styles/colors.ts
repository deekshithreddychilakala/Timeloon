/**
 * Central color tokens for Timeloon
 *
 * Purpose: Export shared colors and gradient configuration so styles can
 * reference a single source of truth. Replace these placeholders with
 * your brand values when ready.
 */

export const colors = {
    // Brand colors (placeholders)
    primary: '#FFBB33', // expanded from #FB3
    secondary: '#FFFFFF',
    tertiary: '#FFE792',

    // Surfaces & backgrounds
    background: '#FFFFFF',
    surface: '#F2F2F2',
    muted: '#E6E6E6',

    // Text
    textPrimary: '#000000',
    textSecondary: '#666666',
    textMuted: '#999999',

    // Gradient used on LandingScreen (matches Figma values)
    landingScreenBG_Gradient: {
        // angle: 195deg approximately mapped to start/end points
        start: { x: 1.35, y: 0.10 },
        end: { x: -0.25, y: 0.90 },
        colors: ['#FFBB33', '#FFFFFF', '#FFE792'],
        locations: [0.0509, 0.4777, 0.9045]
    },
};

export type Colors = typeof colors;

export default colors;
