import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../Theme';
import Styles from "../utils/Styles"

const CustomSlider = ({ min = 0, max = 15000, fromValue, toValue, onValuesChange }) => {
    const { theme, width } = useTheme();
    const themestyles = styles()
    const [fromThumbValue, setFromThumbValue] = useState(0);
    const [toThumbValue, setToThumbValue] = useState(1);

    // Adjust this scaling factor to control the sensitivity of thumb movement
    const sensitivity = 100;

    const panResponderFrom = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const newValue = Math.max(min, Math.min(toThumbValue, fromThumbValue + gestureState.dx * sensitivity));
            setFromThumbValue(Math.round(newValue));
            if (toThumbValue - fromThumbValue < 10) {
                return
            }
            onValuesChange(fromThumbValue, Math.round(newValue));
        },
    });

    const panResponderTo = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const newValue = Math.min(max, Math.max(fromThumbValue, toThumbValue + gestureState.dx * sensitivity));
            setToThumbValue(Math.round(newValue));
            if (toThumbValue - fromThumbValue < 10) {
                return
            }
            onValuesChange(fromThumbValue, Math.round(newValue));
        },
    });

    const trackWidth = '100%';
    const thumbSize = width / 30;

    const trackStyle = { width: trackWidth, };

    const thumbStyle = {
        width: thumbSize,
        height: thumbSize,
        borderRadius: thumbSize / 2,
        marginLeft: -(thumbSize / 2),
        position: 'absolute',
    };

    const fromThumbPosition = {
        left: `${((fromThumbValue - min) / (max - min)) * 100}%`,
        top: -(thumbSize / 2) + 1,
    };

    const toThumbPosition = {
        left: `${((toThumbValue - min) / (max - min)) * 100}%`,
        top: -(thumbSize / 2) + 1,
    };

    return (
        <>
            <View style={themestyles.slider}>
                <View style={[themestyles.track, trackStyle]}>
                    <View style={{ backgroundColor: theme?.homebar, height: '100%', width: `${((toThumbValue - fromThumbValue) / (max - min)) * 100}%`, left: `${((fromThumbValue - min) / (max - min)) * 100}%`, }} />
                </View>
                <View {...panResponderFrom.panHandlers} style={[themestyles.thumb, thumbStyle, fromThumbPosition]} />
                <View {...panResponderTo.panHandlers} style={[themestyles.thumb, thumbStyle, toThumbPosition]} />
            </View>
            <View style={[Styles.spacebetween]}>
                <Text style={[themestyles.range]}>₹ {fromThumbValue}</Text>
                <Text style={[themestyles.range, { marginRight: 5 }]}>₹ {toThumbValue}</Text>
            </View>
        </>
    );
};



const styles = () => {
    const { theme, width, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        range: {
            color: theme.homefrom,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font15
        },
        slider: {
            width: '95%',
            height: width / 30,
            position: 'relative',
            alignSelf: "center"
        },
        track: {
            height: 2,
            backgroundColor: '#ddd',
            borderRadius: 20,
            position: 'relative',
        },
        thumb: {
            height: width / 30,
            width: width / 30,
            borderRadius: width / 25,
            backgroundColor: theme?.homebar,
            position: 'absolute',
        },
    })
}

export default CustomSlider