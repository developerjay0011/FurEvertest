import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Styles from '../utils/Styles';
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    return (
        <TouchableOpacity key={props?.index} onPress={() => { props.onPress() }} style={[themestyles.container, Styles.spacebetween]}>
            <Image source={{ uri: props?.item?.childImage }} resizeMode='contain' style={{ height: width / 4.2, width: width / 4.2, borderRadius: width }} />
            <View style={{ width: "69%", paddingRight: "2%" }}>
                <View style={[Styles.spacebetween]}>
                    <Text style={[themestyles.name]}>{props?.item?.name}</Text>
                    <Text style={[themestyles.name2, { marginTop: 0 }]}>Edit</Text>
                </View>
                <Text style={[themestyles.name2]}>{props?.item?.identification}</Text>
                <Text style={[themestyles.name2]}>Age - {props?.item?.age} Years</Text>
                <Text style={[themestyles.name2]}>Weight - {props?.item?.weight}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            borderRadius: 5,
            marginBottom: 10,
            paddingBottom: 20,
            overflow: "hidden",
            width: "100%",
            borderBottomWidth: 1,
            borderColor: theme.commontextgrey,
        },
        name: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.commontextgrey,
            fontSize: fontSize.font20,
        },
        name2: {
            fontFamily: fontFamily.FontMedium,
            color: theme.commontextgrey,
            fontSize: fontSize.font18,
            marginTop: 4
        },
    })
}
export default MyComponent;
