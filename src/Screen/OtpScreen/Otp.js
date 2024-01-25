import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Button from "../../Component/Button"
import OtpInputs from 'react-native-otp-inputs';
import { resend, resendL, VerifyOtp } from '../../Redux/actions/auth';
import Back from "../../Component/Back"
import OTP from "../../assets/svg/Icons/OTP.svg"
import showToast from '../../utils/Toast';
import { useTheme } from '../../../Theme';

const MyComponent = (props) => {
    const otpRef = useRef();
    const { param } = props?.route?.params
    const [otp, setOtp] = useState(null)
    const [counter, setcounter] = React.useState(120);
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    const [bannerWidth, setBannerWidth] = useState(width)
    useEffect(() => {
        const remove = Dimensions.addEventListener("change", status => { setBannerWidth(status.window.width) })
        return () => { remove.remove() }
    }, [])
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setcounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    const resetOTP = () => {
        otpRef.current.reset();
    };
    const handleResend = async (user) => {
        try {
            setcounter(120)
        } catch (e) {
        }
    }
    function secondsToTime(e) {
        const m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(e % 60).toString().padStart(2, '0');

        return m + ' : ' + s;
    }
    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, justifyContent: "space-between", flexGrow: 1 }}>
                <View style={[{ marginTop: 40 }]}>
                    <Back />
                    <Text style={[themestyles.sing, { fontSize: fontSize.font30 }]}>OTP Verification</Text>
                    <Text style={[themestyles.sing, { fontFamily: fontFamily.FontRegular, marginTop: 20, color: theme.black, fontSize: fontSize.font18 }]}>Enter the verification code we just sent on your phone no. <Text style={{ fontFamily: fontFamily.FontSemiBold, }}>{param?.mobile}</Text></Text>
                </View>

                <View style={{ width: width / 1.2, alignSelf: "center", marginVertical: 20 }}>
                    <OtpInputs
                        handleChange={text => setOtp(text)}
                        autofillFromClipboard={false}
                        numberOfInputs={6}
                        inputContainerStyles={themestyles.code}
                        autoFocus={true}
                        color={theme.black}
                        ref={otpRef}
                        fontSize={fontSize.font20}
                        clearTextOnFocus={true}
                        autoFocusOnLoad={true}
                        inputStyles={{ fontFamily: fontFamily.FontSemiBold }}
                        textAlign="center"
                        keyboardType="phone-pad"
                    />
                </View>

                <Button
                    button={{ marginBottom: 20, width: "90%" }}
                    onPress={() => {
                        if (otp?.length == 6) {
                            props.VerifyOtp({
                                ...param,
                                otp: otp,
                                param: param,
                            })
                        } else {
                            showToast("Please enter OTP")
                        }
                    }}
                    name="Verify"
                    loader={props?.loader}
                />
                <OTP />


                {counter == 0 ?
                    <Text onPress={() => {
                        if (param?.password) {
                            resetOTP(), props?.resend({ mobile: param?.mobile }), handleResend()
                        } else {
                            resetOTP(), props?.resendL({ mobile: param?.mobile }), handleResend()
                        }
                    }} style={[themestyles.account, { fontSize: bannerWidth / 24, marginBottom: 40 }]}>Don’t receive code ?<Text style={{ color: theme.commongreen, fontFamily: fontFamily.FontSemiBold, }}> Re-send</Text></Text>
                    :
                    <Text style={[themestyles.account, { fontSize: bannerWidth / 24, marginBottom: 40 }]}>{secondsToTime(counter)} Sec</Text>
                }

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
        VerifyOtp: (param) => dispatch(VerifyOtp(param)),
        resend: (param) => dispatch(resend(param)),
        resendL: (param) => dispatch(resendL(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
