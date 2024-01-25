import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Styles from "../utils/Styles"
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    return (
        <View key={props?.index} style={[Styles.flexrow, { marginBottom: 5, width: "30%" }]}>
            <Text style={[themestyles.renderItemtext]}>{props?.item?.name}</Text>
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
