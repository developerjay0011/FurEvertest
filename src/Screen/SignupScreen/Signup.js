import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import { CheckUserExists, Singup } from '../../Redux/actions/auth';
import showToast from '../../utils/Toast';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Back from "../../Component/Back"
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const navigation = useNavigation();
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [address, setAddress] = useState(null)
    const [password, setPassword] = useState(null)
    const [cpassword, setCpassword] = useState(null)
    const [fcm, setFcm] = useState(null)
    const [id, setid] = useState(null)
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    useEffect(() => {
        const backAction = () => {
            navigation.replace("Options");
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    useEffect(() => {
        fcmtoken()
    }, [])
    const fcmtoken = async () => {
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setid(uniqueId)
        });
        await messaging()
            .requestPermission()
            .then(async () => {
                await messaging()
                    .getToken()
                    .then(async (token) => {
                        setFcm(token)
                        global.fcmtoken = token
                        await AsyncStorage.setItem("fcmtoken", String(token))
                    })
            })
            .catch((error) => {
                console.error('Error initializing FCM:', error);
            });
    }
    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "space-between", flexDirection: "column", flexGrow: 1, paddingHorizontal: 15 }}>

                <View style={themestyles.bottom}>
                    <Back press={true} onPress={() => navigation.navigate("Options")} />
                    <Text style={[themestyles.sing, { fontSize: fontSize.font30 }]}>{"Hello! Register to get \nstarted"}</Text>
                    <Textinput bottom={0}
                        label="Name"
                        value={name} placeholder={"Enter Name"} onChangeText={(text) => { setName(text) }} />
                    <Textinput
                        label="Phone No."
                        bottom={0} maxLength={10} keyboardType="number-pad" value={phone} placeholder={"Enter Phone No."} onChangeText={(text) => { setPhone(text) }} />
                    <Textinput
                        label="E-mail"
                        bottom={0} value={email} placeholder={"Enter E-mail"} onChangeText={(text) => { setEmail(text) }} />
                    <Textinput label="Address" bottom={0} value={address} placeholder={"Enter Address"} onChangeText={(text) => { setAddress(text) }} />
                    <Textinput label="Password" bottom={0} value={password} password={true} placeholder={"Enter Password"} onChangeText={(text) => { setPassword(text) }} />
                    <Textinput label="Confirm Password" bottom={0} value={cpassword} password={true} placeholder={"Enter Confirm Password"} onChangeText={(text) => { setCpassword(text) }} />

                    <Button
                        onPress={() => {
                            if (name == "" || name == null) {
                                showToast("Please enter name")
                                return
                            }
                            if (reg.test(email) === false) {
                                showToast("Please enter a valid email address.")
                                return
                            }
                            if (phone == "" || phone == null) {
                                showToast("Please enter phone no.")
                                return
                            }
                            if (password == "" || password == null) {
                                showToast("Please enter password")
                                return
                            }
                            if (password !== cpassword) {
                                showToast("The password confirmation does not match.")
                                return
                            }
                            if (address == "" || address == null) {
                                showToast("Please enter address")
                                return
                            }
                            props.CheckUserExists({
                                "userId": 0,
                                "roleId": 0,
                                "name": name,
                                "mobile": phone,
                                "email": email,
                                "address": address,
                                "password": password,
                                "token": {
                                    "deviceId": id,
                                    "token": fcm
                                },
                                "login": "sign"
                            })
                        }}
                        loader={props?.loader}
                        name="Sign Up"
                    />
                </View>
                <Text onPress={() => { navigation.navigate("Login") }} style={[themestyles.account, { fontSize: fontSize.font18 }]}>Already have an account?<Text style={{ color: theme.commongreen, fontFamily: fontFamily.FontSemiBold }}> Login</Text></Text>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        loader: state.user.loader,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Singup: (param) => dispatch(Singup(param)),
        CheckUserExists: (param) => dispatch(CheckUserExists(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
