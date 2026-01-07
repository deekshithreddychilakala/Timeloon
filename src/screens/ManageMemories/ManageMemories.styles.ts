import { StyleSheet } from 'react-native';
import { Fonts } from '@/utils/fonts';
import colors from '@/styles/colors';

const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
};

export const ManageMemoriesStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: colors.surface,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 31,
        paddingBottom: 23,
    },
    card: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 24,
        ...cardShadow,
    },
    optionsSection: {
        width: '100%',
        gap: 20,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 12,
        gap: 20,
        ...cardShadow,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(140, 67, 255, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: '#8C43FF',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#8C43FF',
    },
    optionLabel: {
        fontFamily: Fonts.sfProTextRegular,
        fontSize: 18,
        color: colors.black,
    },
    buttonsSection: {
        width: '100%',
        gap: 16,
    },
});
