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
        backgroundColor: 'transparent',
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 31,
        paddingBottom: 23,
    },
    card: {
        flex: 1,
        padding: 20,
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
    radioIcon: {
        width: 20,
        height: 20,
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
