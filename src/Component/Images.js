import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../Theme';
// create a component
const Images = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    return (
        <View style={themestyles.image} key={props?.index}>
            <Image source={{ uri: props?.item?.img }} style={{ height: "100%", width: "100%", borderRadius: 20, resizeMode: "cover" }} />
        </View>
    );
};


const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        image: {
            height: width / 3.3,
            width: width / 2.74,
            borderRadius: 20,
            marginRight: 15,
            overflow: "hidden",
        },
    })
}

export default Images;
