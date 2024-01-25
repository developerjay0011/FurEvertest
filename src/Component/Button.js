import React, { } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '../../Theme';
const Button = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    return (
        <TouchableOpacity disabled={props.loader == true ? true : false} style={[themestyles.container, { height: width / 7.8 }, props.button]} activeOpacity={.5} onPress={() => props.onPress()}>
            {props.loader ?
                <ActivityIndicator size={fontSize.font20} color={"white"} />
                :
                <Text style={[themestyles.name, { fontSize: fontSize.font22 }, props.text]}>{props.name}</Text>
            }
        </TouchableOpacity>
    );
};
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.Buttoncolor,
            width: "100%",
            borderRadius: 1000,
            alignSelf: "center",
            marginTop: 20,
            overflow: "hidden",
            shadowColor: theme.black,
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.58,
            shadowRadius: 5.00,
            elevation: 3,
        },
        name: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.white,
            alignSelf: "center",
            textAlign: "center",
        }
    })
}
export default Button;
