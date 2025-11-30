import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const FamilyTreeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 100, // space for bottom tab
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 27.3,
        paddingBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: colors.tertiary,
    },
    title: {
        fontFamily: Fonts.heavy,
        fontSize: 20,
        letterSpacing: -0.4,
        color: colors.black,
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: Fonts.book,
        fontSize: 13,
        letterSpacing: -0.13,
        color: colors.black02,
    },
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
