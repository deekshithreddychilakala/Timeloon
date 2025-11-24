/**
 * Central color tokens for Timeloon
 *
 * Purpose: Export shared colors and gradient configuration so styles can
 * reference a single source of truth. Replace these placeholders with
 * your brand values when ready.
 */

import { Fonts } from "@/utils/fonts";
import { ViewStyle } from "react-native";

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
    black08: 'rgba(0, 0, 0, 0.55)',
    textUnderlineColor: 'rgba(42, 42, 44, 0.15)',

    yellow01: '#FFDFA6',
    activeTabIcon: '#E5AB47',

    // Gradient used on LandingScreen (matches Figma values)
    landingScreenBG_Gradient: {
        // angle: 195deg approximately mapped to start/end points
        start: { x: 1.35, y: 0.10 },
        end: { x: -0.25, y: 0.90 },
        colors: ['#FFBB33', '#FFFFFF', '#FFE792'],
        locations: [0.0509, 0.4777, 0.9045]
    },

    commonScreensBGElement: {
        flex: 1,
        height: '100%',
        padding: 26
    } as ViewStyle,

    commonScreensBGConfig: {
        colors: ['#FAFAFA', '#FAFAFA'],
        start: { x: 0.5, y: 1 },
        end: { x: 0.5, y: 0 }
    },
};

export const commonScreenStyles = {
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    } as ViewStyle,
    logoElement: {
        position: 'absolute'
    } as ViewStyle,
    title: {
        color: colors.black,
        fontFamily: Fonts.heavy,
        fontSize: 32,
        letterSpacing: -.64,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center'
    } as ViewStyle,
    description: {
        color: colors.black03,
        fontFamily: Fonts.book,
        fontSize: 16,
        letterSpacing: -.16,
        fontWeight: '500',
        marginBottom: 98,
        textAlign: 'center'
    } as ViewStyle,
}

export type Colors = typeof colors;
export type CommonStyles = typeof commonScreenStyles;

export default colors;
