import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import { ChangePassword } from '../../Redux/actions/auth';
import showToast from '../../utils/Toast';
import { useTheme } from '../../../Theme';
import Logo from "../../assets/svg/Icons/logo.svg"
import Styles from '../../utils/Styles';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation();
    const [currentpass, setCurrentpass] = useState(null)
    const [newpass, setNewpass] = useState(null)
    const [confirmpass, setConfirmpass] = useState(null)
    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name="Change Password" onPress={() => { navigation.goBack() }} icon={false} />
                <Logo height={Styles.hw.width / 2.8} width={Styles.hw.width / 3} style={{ alignSelf: "center" }} />
                <Text style={[themestyles.sing, { marginTop: 20, }]}>Change Password</Text>
                <View style={{ width: "100%", paddingBottom: 20, marginTop: 20, paddingHorizontal: 20 }}>
                    <Textinput value={currentpass} password={true} label="Current Password" placeholder={"Enter Current Password"} onChangeText={(text) => { setCurrentpass(text) }} />
                    <Textinput value={newpass} password={true} label="New Password" placeholder={"Enter New Password"} onChangeText={(text) => { setNewpass(text) }} />
                    <Textinput value={confirmpass} password={true} label="Confirm Password" placeholder={"Enter Confirm Password"} onChangeText={(text) => { setConfirmpass(text) }} />

                    <Button
                        onPress={() => {
                            if (currentpass == "" || currentpass == null) {
                                showToast("Please enter password")
                                return
                            }
                            if (confirmpass !== newpass) {
                                showToast("The password confirmation does not match.")
                                return
                            }
                            props.ChangePassword({
                                "userId": global.id,
                                "oldPassword": currentpass,
                                "password": confirmpass
                            })
                        }}
                        name="Submit"
                        loader={props?.loader}
                        button={{ marginTop: 30, marginBottom: 10, width: "90%" }}
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
        ChangePassword: (param) => dispatch(ChangePassword(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
