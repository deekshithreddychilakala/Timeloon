import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const FamilyTreeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.white
    },
    scrollContent: {
        flexGrow: 1,
    },
    treeContainer: {
        position: 'relative',
        minWidth: 400,
        minHeight: 800,
        paddingBottom: 100,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 200,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 200,
        gap: 8,
    },
    emptyText: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: colors.black03,
        textAlign: 'center',
    },
    emptySubtext: {
        fontFamily: Fonts.book,
        fontSize: 14,
        color: colors.black10,
        textAlign: 'center',
    },

    // Avatar positioning
    avatarContainer: {
        position: 'absolute',
    },

    // Outer purple glow SVG container
    outerGlowContainer: {
        position: 'absolute',
        width: 342,
        height: 342,
        pointerEvents: 'none', // Don't block touches on other entities
    },

    // White blur SVG container
    whiteBlurContainer: {
        position: 'absolute',
        width: 204,
        height: 204,
        pointerEvents: 'none', // Don't block touches on other entities
    },

    // Inner glow container (overlay on avatar)
    innerGlowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
    },

    // Avatar border
    avatarBorder: {
        width: '100%',
        height: '100%',
        borderRadius: 1000,
        borderWidth: 3,
        borderColor: colors.white,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: colors.white,
    },
    centerAvatarBorder: {
        borderWidth: 4,
    },

    // Avatar content
    avatarContent: {
        width: '100%',
        height: '100%',
        borderRadius: 1000,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Legacy styles (keeping for backward compatibility)
    content: {
        flex: 1,
        padding: 27.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: colors.black04,
        textAlign: 'center',
    },
});

export default FamilyTreeStyles;
