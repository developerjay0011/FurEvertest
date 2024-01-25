import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../Theme';
import { View } from 'react-native-animatable';
import check from "../assets/image/check.png";
import Styles from "../utils/Styles"

const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    return (
        <TouchableOpacity onPress={() => { props.onPress({ label: props.item.label, value: props.item.value }) }} style={{ flex: 1, paddingHorizontal: 20 }} >
            {/* <TouchableOpacity onPress={() => { props.onPress({ label: props.item.label, value: props.item.value }) }} style={{ backgroundColor: props?.values?.value == props.item.value ? "rgba(176, 204, 157, 0.5)" : null }}> */}
            <View style={Styles.spacebetween}>
                <Text numberOfLines={1} style={[themestyles.text, { fontSize: fontSize.font18, paddingVertical: 8, flex: 1 }]}>{props?.item?.label}</Text>
                {props?.values?.value == props.item.value ?
                    <Image source={check} style={themestyles.check} />
                    : null
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        text: {
            fontFamily: fontFamily.FontRegular,
            color: theme.textinput,
        },
        check: {
            height: width / 28,
            width: width / 28,
            resizeMode: "contain",
            tintColor: theme?.textinput
        },
    })
}

export default MyComponent;
