import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import font from '../utils/CustomFont';
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    return (
        <TouchableOpacity onPress={() => props.onPress()} style={[themestyles.container, { width: width / 2.2, marginLeft: props.index == 0 ? 10 : null, marginRight: 10 }]}>
            <Image source={{ uri: props?.item?.image?.length > 0 ? props?.item?.image[0] : "" }} resizeMode="stretch" style={{ borderRadius: 5, width: "100%", height: width / 3, }} />
            <Text style={[themestyles.name, { marginTop: 12, fontSize: fontSize.font16, }]}>{props?.item?.centerName}</Text>
            <Text numberOfLines={1} style={[themestyles.name, { marginVertical: 2, fontSize: fontSize.font15, fontFamily: fontFamily.FontRegular, color: "#1E1F4B" }]}>{props?.item?.address}</Text>
        </TouchableOpacity>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            backgroundColor: theme.homerow,
            borderRadius: 5,
            paddingBottom: 15,
            marginBottom: 15,
            overflow: "hidden",
            marginRight: 10
        },
        name: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.homerowtext,
            marginHorizontal: 5,
            marginLeft: 10
        },
    })
}
export default MyComponent;
