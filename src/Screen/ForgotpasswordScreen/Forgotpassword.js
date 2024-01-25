import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import { SendLoginOtp } from '../../Redux/actions/auth';
import Back from "../../Component/Back"
import Forgot from "../../assets/svg/Icons/forgot.svg"
import { useTheme } from "../../../Theme";

const MyComponent = (props) => {
    const [email, setEmail] = useState(null)
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, flexGrow: 1 }}>

                <View style={[{ marginTop: 40, marginBottom: 20, }]}>
                    <Back />
                    <Text style={[themestyles.sing, { fontSize: fontSize.font30, fontFamily: fontFamily.FontSemiBold, }]}>{"Forgot Password?"}</Text>
                    <Text style={[themestyles.sing, { marginTop: 20, color: theme.black, fontSize: fontSize.font18, }]}>Don’t worry ! It happens. Please enter the phone number we will send the OTP.</Text>
                </View>

                <Textinput label="Phone no." maxLength={10} keyboardType="number-pad" style={{ fontSize: fontSize.font18, }} value={email} placeholder={"Enter Phone no."} onChangeText={(text) => { setEmail(text) }} />

                <Button
                    button={{ marginVertical: 30, width: "100%", }}
                    loader={props?.loader}
                    onPress={() => {
                        if (email == "" || email == null) {
                            showToast("Please enter Phone no.")
                            return
                        }
                        props.SendLoginOtp({
                            mobile: email,
                            login: "forgot"
                        })
                    }}
                    name="Send Code"
                />
                <Forgot style={{ alignSelf: "center" }} />
                <Text onPress={() => { props.navigation.navigate("Login") }} style={[themestyles.account, { fontSize: fontSize.font18, marginBottom: 40, marginTop: 20 }]}>Remember Password? <Text style={{ color: theme.commongreen, fontFamily: fontFamily.FontSemiBold, }}>Login</Text></Text>
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
        SendLoginOtp: (param) => dispatch(SendLoginOtp(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
