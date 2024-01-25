import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import { Login, Userpics } from '../../Redux/actions/auth';
import showToast from '../../utils/Toast';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Styles from '../../utils/Styles';
import Group from "../../assets/svg/Icons/Group.svg"
import Logo from "../../assets/svg/Icons/logo.svg"
import { useTheme } from "../../../Theme";
const MyComponent = (props) => {
    const navigation = useNavigation();
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [fcm, setFcm] = useState(null)
    const [id, setid] = useState(null)
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
                        console.log(token)
                        setFcm(token)
                        global.fcmtoken = token
                        await AsyncStorage.setItem("fcmtoken", String(token))
                    })
            })
            .catch((error) => {
                console.error('Error initializing FCM:', error);
            });
    }
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



    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "flex-end", flexGrow: 1, paddingHorizontal: 15 }}>
                <Logo height={Styles.hw.width / 2.8} width={Styles.hw.width / 3} style={{ alignSelf: "center", marginTop: 10 }} />

                <View style={[{ marginTop: 20, alignSelf: "center" }]}>
                    <Text style={[themestyles.sing, { fontSize: fontSize.font30 }]}>Welcome Back</Text>
                    <Text style={[themestyles.sing, { fontFamily: fontFamily.FontRegular, marginTop: 3, fontSize: fontSize.font20 }]}>To Your Favorite Book qpp.</Text>
                </View>

                <View style={themestyles.bottom}>

                    <Textinput bottom={3} label="Your Email / Phone no." style={themestyles.textinput} value={email} placeholder={"Enter Email / Phone no."} onChangeText={(text) => { setEmail(text) }} />
                    <Textinput bottom={3} label="Your Password" style={themestyles.textinput} password={true} value={password} placeholder={"Enter Password"} onChangeText={(text) => { setPassword(text) }} />
                    <Text onPress={() => navigation.navigate("Forgotpassword")} style={{ alignSelf: "flex-end", fontFamily: fontFamily.FontSemiBold, color: theme.forgot2, fontSize: fontSize.font18, marginTop: 20 }}>Forgot Password ?</Text>

                    <Button
                        button={{ marginTop: 30, width: "90%" }}
                        loader={props?.loader}
                        onPress={() => {
                            if (email == "" || email == null) {
                                showToast("Please enter email address/phone no.")
                                return
                            }
                            if (password == "" || password == null) {
                                showToast("Please enter password")
                                return
                            }
                            props.Login({
                                "email": email,
                                "password": password,
                                "token": {
                                    "deviceId": id,
                                    "token": fcm
                                }
                            })
                        }}
                        name="Sign In"
                    />
                    <Text onPress={() => { navigation.navigate("Signup") }} style={[themestyles.account, { fontSize: fontSize.font18 }]}>Don’t have an account ?<Text style={{ color: theme.commongreen, fontFamily: fontFamily.FontSemiBold }}> Sign Up</Text></Text>

                    <Group style={{ alignSelf: "center", marginBottom: 10 }} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};


const mapState = (state) => {
    return {
        loader: state.user.loader,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Login: (param) => dispatch(Login(param)),
        Userpics: (param) => dispatch(Userpics(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
