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
    white: '#FFFFFF',
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
    black09: 'rgba(255,255,255,0.95)',
    black10: 'rgba(28, 28, 30, 0.60)',
    black11: 'rgba(28, 28, 30, 0.20)',
    black12: 'rgba(218, 218, 218, 0.40)',
    textUnderlineColor: 'rgba(42, 42, 44, 0.15)',

    yellow01: '#FFDFA6',
    activeTabIcon: '#8C43FF',
    purple01: '#A475EF',
    titleContainerBg: 'rgba(255, 255, 255, 0.95)',

    // Additional UI colors
    gray01: '#E1E1E1',
    gray02: '#F6F6F6',
    gray03: '#545050',
    gray04: '#ADADAD',
    timestampColor: 'rgba(0,0,0,0.45)',

    // Tab nav specific colors
    tabNavGlassBorder: 'rgba(255,255,255,0.25)',
    tabNavGlassBackground: 'rgba(255,255,255,0.04)',
    tabNavInnerBorder: 'rgba(255,255,255,0.5)',
    tabNavGradient: ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.08)'],

    // Primary button colors
    buttonBackground: '#252525',
    buttonText: '#FFFFFF',
    buttonGradient: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.0)'],

    // Message bubble gradients
    messageBubbleUserColors: ['rgba(244, 237, 255, 0.90)', 'rgba(197, 161, 255, 0.55)'],
    messageBubbleAssistantColors: ['rgba(250, 247, 255, 1)', 'rgba(245, 240, 255, 1)'],

    // Input gradient
    inputGradientColors: ['#FFF7EA', '#FFF'],

    // Upload component gradient
    uploadLogoGradient: ['rgba(255, 223, 166, 0.30)', 'rgba(255, 223, 166, 0.15)'],

    // Gradient used on LandingScreen (matches Figma values)
    landingScreenBG_Gradient: {
        // 359deg gradient (nearly vertical, bottom to top)
        start: { x: 0.5, y: 1 },
        end: { x: 0.5, y: 0 },
        colors: ['#A166FF', '#FFFFFF', '#F5EFFF', '#E8D9FF'],
        locations: [0.0388, 0.3455, 0.7932, 0.9915]
    },

    commonScreensBGElement: {
        flex: 1,
        height: '100%',
        padding: 26
    } as ViewStyle,

    mainScreensBGElement: {
        flex: 1,
        height: '100%',
        padding: 0
    } as ViewStyle,

    commonScreensBGConfig: {
        colors: ['transparent', 'transparent'],
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
