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
        backgroundColor: colors.black09,
        borderBottomWidth: 1,
        borderBottomColor: colors.yellow01,
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
    }
});
