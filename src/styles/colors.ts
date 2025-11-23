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

    // colors
    black: '#000000',
    black02: 'rgba(28, 28, 30, 0.70)',
    black03: '#1C1C1E',
    black04: 'rgba(28, 28, 30, 0.75)',
    black05: 'rgba(28, 28, 30, 0.85)',
    black06: 'rgba(28, 28, 30, 0.40)',
    black07: 'rgba(28, 28, 30, 0.50)',
    textUnderlineColor: 'rgba(42, 42, 44, 0.15)',

    yellow01: '#FFDFA6',

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
