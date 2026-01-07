import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import CameraIcon from '../../assets/icons/camera.svg';
import PhotoLibraryIcon from '../../assets/icons/gallery.svg';
import FileIcon from '../../assets/icons/file.svg';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export type AttachmentSheetProps = {
    visible: boolean;
    onClose: () => void;
    onCamera: () => void;
    onLibrary: () => void;
    onFile: () => void;
};

const SHEET_HEIGHT = 280;

const AttachmentSheet: React.FC<AttachmentSheetProps> = ({ visible, onClose, onCamera, onLibrary, onFile }) => {
    const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(backdropOpacity, { toValue: 1, duration: 160, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
                Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(backdropOpacity, { toValue: 0, duration: 160, useNativeDriver: true, easing: Easing.in(Easing.quad) }),
                Animated.timing(translateY, { toValue: SHEET_HEIGHT, duration: 220, useNativeDriver: true, easing: Easing.in(Easing.cubic) }),
            ]).start();
        }
    }, [visible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(backdropOpacity, { toValue: 0, duration: 160, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: SHEET_HEIGHT, duration: 220, useNativeDriver: true }),
        ]).start(({ finished }) => finished && onClose());
    };

    return (
        <Modal transparent animationType="none" visible={visible} onRequestClose={handleClose}>
            <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
                <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
            </Pressable>

            <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
                <View style={styles.handleContainer}>
                    <View style={styles.handle} />
                </View>
                <Text style={styles.title}>Add an attachment</Text>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.option} activeOpacity={0.85} onPress={onCamera}>
                        <View style={styles.iconWrapper}><CameraIcon width={32} height={32} /></View>
                        <Text style={styles.optionLabel}>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} activeOpacity={0.85} onPress={onLibrary}>
                        <View style={styles.iconWrapper}><PhotoLibraryIcon width={32} height={32} /></View>
                        <Text style={styles.optionLabel}>Photo Library</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} activeOpacity={0.85} onPress={onFile}>
                        <View style={styles.iconWrapper}><FileIcon width={32} height={32} /></View>
                        <Text style={styles.optionLabel}>File</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 26,
        paddingTop: 12,
        paddingBottom: 28,
        // Subtle golden shadow glow
        shadowColor: colors.yellow01,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 16,
    },
    handleContainer: {
        alignItems: 'center',
        paddingTop: 8,
        marginBottom: 20
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 180,
        backgroundColor: colors.gray01,
    },
    title: {
        fontFamily: Fonts.light,
        fontSize: 18,
        letterSpacing: -0.4,
        color: colors.black,
        textAlign: 'center',
        marginBottom: 18,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    option: {
        flex: 1,
        height: 83.2,
        padding: 14,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.yellow01,
        borderRadius: 28,
        backgroundColor: colors.white,
        // subtle internal gradient sheen via shadow layering (iOS only typical)
        shadowColor: colors.yellow01,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 0,
    },
    iconWrapper: {
        width: 32.2,
        height: 32.2,
        flexShrink: 0,
    },
    optionLabel: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        letterSpacing: -0.119,
        color: colors.gray04,
        textAlign: 'center',
    }
});

export default AttachmentSheet;
