import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const FamilyTreeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 27,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default FamilyTreeStyles;
