import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Modal, Animated, Easing } from 'react-native';
import LoaderKit from 'react-native-loader-kit'
import { useTheme } from '../../Theme';

const Loader = ({ loading, ...attributes }) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();


    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={loading}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <View style={styles.dotsContainer}>
                        <LoaderKit
                            style={{ width: 40, height: 40 }}
                            name={'BallSpinFadeLoader'}
                            color={"#3F5629"}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    loader: {
        width: 20,
        height: 20,
        backgroundColor: '#0074D9',
        borderRadius: 10,
    },
    ball: {
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: 2,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    circle: {
        marginHorizontal: 5,
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
