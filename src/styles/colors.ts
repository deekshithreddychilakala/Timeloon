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
    gradient: {
        // angle: 195deg approximately mapped to start/end points
        start: [0.983, 0.629] as [number, number],
        end: [0.017, 0.371] as [number, number],
        colors: ['#FFBB33', '#FFFFFF', '#FFE792'],
        locations: [0.0509, 0.4777, 0.9045],
    },
};

export type Colors = typeof colors;

export default colors;
