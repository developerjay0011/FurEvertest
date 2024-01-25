import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from '../utils/Styles';
import { useNavigation } from '@react-navigation/native';
import Back from "../assets/image/left-arrow.png"
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {
            if (props?.press == true) {
                props?.onPress()
            } else {
                navigation.goBack()
            }
        }} style={[themestyles.container, props?.style]}>
            <Image source={Back} style={[themestyles.icon2, { tintColor: "white" }]} />
        </TouchableOpacity>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            height: width / 12,
            width: width / 12,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.commongreen,
            marginBottom: 30,
            paddingRight: 5,
            ...Styles.up
        },
        icon2: {
            height: width / 25,
            width: width / 25,
            resizeMode: "contain",
            tintColor: theme?.drower
        }
    })
}

export default MyComponent;
