import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Styles from '../utils/Styles';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import { Delete } from '../Redux/actions/auth';
const MyComponent = (props) => {
    const navigation = useNavigation()
    const { theme } = useTheme();
    const themestyles = styles()
    const dispatch = useDispatch()
    const logout = async () => {
        global.token = null
        messaging().deleteToken();
        await AsyncStorage.removeItem('token')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <View key={props.index} style={themestyles.flatList}>
            <TouchableOpacity onPress={() => {
                if (props?.item?.name == "Logout") {
                    logout()
                } if (props?.item?.name == "Delete account") {
                    dispatch(Delete())
                }
                else {
                    navigation.navigate(props?.item.nav)
                }
            }} style={[Styles.flexrow, { marginVertical: 16 }]}>
                {props?.item?.name == "Delete account" ?
                    <Image source={props?.item?.image} style={[themestyles.icon2, { tintColor: !props?.item?.isred == true ? theme.commontextgrey : "#E74C3C" }]} />
                    :
                    <Image source={props?.item?.image} style={[themestyles.icon, { tintColor: !props?.item?.isred == true ? theme.commontextgrey : "#E74C3C" }]} />
                }
                <Text style={[themestyles.name, { color: !props?.item?.isred == true ? theme.commontextgrey : "#E74C3C" }]}>{props?.item.name}</Text>
            </TouchableOpacity>
            {props?.item?.name != "Delete account" ?
                <View style={themestyles?.line} />
                :
                null
            }
        </View>
    );
};


const styles = () => {
    const { theme, width, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        name: {
            color: theme.commontextgrey,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
            marginLeft: 13,
        },
        line: {
            borderTopColor: theme?.searchtext,
            borderWidth: .5,
            width: "100%"
        },
        icon: {
            height: width / 22,
            width: width / 18,
            resizeMode: "contain"
        },
        icon2: {
            height: width / 18,
            width: width / 18,
            resizeMode: "contain"
        }
    })
}

//make this component available to the app
export default MyComponent;
