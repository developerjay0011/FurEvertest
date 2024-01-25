import React, { } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../utils/Styles"
import moment from 'moment';
import { useTheme } from '../../Theme';
// create a component
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();


    return (
        <TouchableOpacity onPress={() => { props?.GetBooking() }} style={[themestyles.container]}>
            <View style={Styles.spacebetween}>
                <Text style={[themestyles.name1, { fontFamily: fontFamily.FontSemiBold, textTransform: 'capitalize', width: "55%" }]}>{props?.item?.title}</Text>
                <Text style={[themestyles.name2, { textAlign: "right", width: "45%", fontFamily: fontFamily.FontMedium, }]}>{moment(props?.item?.createdDate).format("MMM DD,yyyy hh:mm a")}</Text>
            </View>
            <Text style={[themestyles.name2, { marginTop: 2 }]}>{props?.item?.message}</Text>
        </TouchableOpacity >
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            backgroundColor: "#E8ECF4",
            borderRadius: 100,
            paddingVertical: 15,
            paddingHorizontal: 15,
            marginBottom: 15,
            width: "99%",
            alignSelf: "center",
            ...Styles.up,
        },
        name1: {
            fontFamily: fontFamily.FontSemiBold,
            fontSize: fontSize.font16,
            color: theme.black,
            width: "100%"
        },
        name2: {
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font15,
            color: "#121212",
            width: "100%"
        },
    })
}

export default MyComponent;
