import React, { } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Headerlogo from "../assets/svg/headerlogo.svg"
import hamburger from "../assets/image/hamburger.png"
import Back from "../assets/image/left-arrow.png"
import Styles from '../utils/Styles';
import { useTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import Backarrow from "../Component/Back"
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    const navigation = useNavigation()

    return props?.home ? (
        <View style={[Styles.spacebetween, themestyles.container, { alignItems: "center", }]}>
            <TouchableOpacity onPress={() => props.onPress()} >
                <Image source={hamburger} style={themestyles.icon} />
            </TouchableOpacity>
            <View style={[Styles.flexrow, { alignItems: "center" }]}>
                <Headerlogo height={width / 11} width={width / 11} />
                <Text style={[themestyles.name, { fontSize: width / 11, paddingHorizontal: width / 100 }]}>{props.name}</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("Notification") }}>
                <Image source={require("../assets/image/noti.png")} resizeMode="contain" style={{ height: width / 20, width: width / 20, tintColor: theme?.notification }} />
            </TouchableOpacity>
        </View>
    ) : props?.position == true ? (
        <View style={[Styles.spacebetween, themestyles.container, { position: "absolute", height: width / 12, marginTop: 15 }]}>
            {props?.icon == false ?
                <Backarrow />
                :
                <TouchableOpacity onPress={() => props.onPress()}>
                    {props?.tab ?
                        <Image source={hamburger} style={themestyles.icon} />
                        :
                        <Image source={Back} style={[themestyles.icon2, { tintColor: theme?.notification }]} />
                    }
                </TouchableOpacity>
            }
        </View>
    ) : (
        <View style={[Styles.spacebetween, themestyles.container, { marginBottom: 20 }]}>
            {props?.icon == false ?
                <Backarrow />
                :
                <TouchableOpacity onPress={() => props.onPress()}>
                    {props?.tab ?
                        <Image source={hamburger} style={themestyles.icon} />
                        :
                        <Image source={Back} style={[themestyles.icon2, { tintColor: theme?.notification }]} />
                    }
                </TouchableOpacity>
            }
            {props?.icon == false ?
                null
                :
                <Headerlogo height={width / 11} width={width / 11} />
            }
        </View>
    )
}

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            marginVertical: 10,
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20
        },
        name: {
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
        },
        icon: {
            height: width / 22,
            width: width / 22,
            resizeMode: "contain",
            tintColor: theme?.drower
        },
        icon2: {
            height: width / 22,
            width: width / 22,
            resizeMode: "contain",
            tintColor: theme?.drower
        }
    })
}
export default MyComponent;
