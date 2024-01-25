import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../utils/Styles"
import { useTheme } from '../../Theme';
// create a component
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    return (
        <TouchableOpacity disabled={true} style={[Styles.flexrow, { marginBottom: 2 }]}>
            <Text style={[themestyles.renderItemtext, { fontSize: fontSize.font15, }]}>{props?.item?.mealName} - {props?.item?.timing}</Text>
        </TouchableOpacity>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        renderItemtext: {
            color: theme.black,
            marginLeft: 35,
            fontFamily: fontFamily.FontRegular,
            width: "80%",
        },
    });
}

export default MyComponent;
