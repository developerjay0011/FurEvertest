import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Styles from "../utils/Styles"
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    return (
        <View style={[Styles.spacebetween, { marginBottom: 5, width: "100%", paddingHorizontal: 5 }]} key={props?.index}>
            <Text style={[themestyles.renderItemtext, { width: "65%" }]}>{props?.item?.title}</Text>
            <Text style={[themestyles.renderItemtext, { width: "33%", textAlign: "right" }]}>₹ {props?.item?.add + " X " + props?.item?.mainprice}</Text>
        </View>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        renderItemtext: {
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font20,
            color: theme.commontextgrey,
        },
    })
}

export default MyComponent;
