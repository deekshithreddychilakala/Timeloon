import { StyleSheet } from 'react-native';
import colors from './colors';
import { Fonts } from '@/utils/fonts';

export const GlobalStyles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1
    },
    mainScreenTitleDescContainer: {
        paddingTop: 60,
        paddingBottom: 13,
        paddingHorizontal: 27,
        gap: 4,
        flexDirection: 'column',
        backgroundColor: colors.titleContainerBg,
        borderBottomWidth: 1,
        borderBottomColor: colors.purple01,
    },
    mainScreenTitle: {
        fontFamily: Fonts.heavy,
        fontSize: 20,
        letterSpacing: -0.4,
        color: colors.black,
    },
    mainScreenDescription: {
        fontFamily: Fonts.book,
        fontSize: 13,
        letterSpacing: -0.13,
        color: colors.black10,
    },
    BottomNavContainer: {
        paddingHorizontal: 27,
        gap: 24,
        marginBottom: 23,
    }
});
