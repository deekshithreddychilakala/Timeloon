import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const FamilyTreeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
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
