import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import { Forgotpassword } from '../../Redux/actions/auth';
import Back from "../../Component/Back"
import { useTheme } from '../../../Theme';

const MyComponent = (props) => {
    const [password, setPassword] = useState(null)
    const [cpassword, setCpassword] = useState(null)
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                <View style={[{ marginTop: 40, marginBottom: 10 }]}>
                    <Back />
                    <Text style={[themestyles.sing, { fontSize: fontSize.font30 }]}>Reset Password</Text>
                    <Text style={[themestyles.sing, { fontFamily: fontFamily.FontRegular, marginVertical: 20, fontSize: fontSize.font18, color: theme.black }]}>Your new password must be unique from those
                        previously used.</Text>
                </View>

                <View style={[themestyles.bottom,]}>

                    <Textinput bottom={0}
                        value={password} password={true} label="New Password" placeholder={"Enter Password"} onChangeText={(text) => { setPassword(text) }} />
                    <Textinput bottom={20} value={cpassword} password={true} label="Confirm Password" placeholder={"Enter Confirm Password"} onChangeText={(text) => { setCpassword(text) }} />

                    <Button
                        button={{ marginVertical: 10, }}
                        loader={props?.loader}
                        onPress={() => {
                            if (password == "" || password == null) {
                                showToast("Please enter password")
                                return
                            }
                            if (password !== cpassword) {
                                showToast("The password confirmation does not match.")
                                return
                            }
                            props?.Forgotpassword({
                                "mobile": props?.route?.params?.param?.mobile,
                                "password": password
                            })
                        }}
                        name="Set New Password"
                    />

                </View>

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
        Forgotpassword: (data) => dispatch(Forgotpassword(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
