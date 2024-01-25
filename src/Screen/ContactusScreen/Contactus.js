import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, Text, } from 'react-native';
import Header from "../../Component/Header"
import Button from "../../Component/Button"
import Textinput from "../../Component/TextInput"
import { connect } from 'react-redux';
import Toast from '../../utils/Toast';
import { navigationRef } from '../../Navigation/RootNavigation';
import { Contactus } from '../../Redux/actions/user';
import Logo from "../../assets/svg/Icons/logo.svg"
import Styles from '../../utils/Styles';
import styles from './styles';
import { useTheme } from '../../../Theme';
import { useNavigation } from "@react-navigation/native";
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const [Message, setMessage] = useState(null)
    const [Email, setEmail] = useState(null)
    const [fname, setFname] = useState(null)
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const themestyles = styles();

    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name={"Contact us"} onPress={() => { navigationRef.goBack() }} icon={false} />
                <Logo height={Styles.hw.width / 2.8} width={Styles.hw.width / 3.2} style={{ alignSelf: "center" }} />
                <Text style={[themestyles.sing, { marginVertical: 20, }]}>Get in touch</Text>
                <View style={{ marginBottom: 20, justifyContent: "center", width: "100%", paddingHorizontal: 20, marginTop: 5, }}>
                    <Textinput bottom={10} value={fname} onChangeText={(text) => { setFname(text) }} placeholder={"Full Name"} />
                    <Textinput bottom={10} value={Email} onChangeText={(text) => { setEmail(text) }} placeholder={"Email Address"} />
                    <Textinput bottom={10} value={Message}
                        multiline={true}
                        onChangeText={(text) => { setMessage(text) }} placeholder={"Message"} style={[{ height: width / 2, textAlignVertical: "top", borderRadius: 25, paddingTop: 15 }]} />

                    <Button
                        name={"Send"}
                        button={{ marginBottom: 10, width: "90%", marginTop: 30 }}
                        onPress={() => {
                            if (fname == null || fname == "") {
                                Toast("Please enter full name")
                                return
                            }
                            if (reg.test(Email) === false) {
                                Toast("Please enter email address")
                                return
                            }
                            if (Message == null || Message == "") {
                                Toast("Please enter message")
                                return
                            }
                            props.Contactus({
                                "name": fname,
                                "email": Email,
                                "message": Message
                            })
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const mapState = (state) => {
    return {

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Contactus: (data) => dispatch(Contactus(data))
    }
}
export default connect(mapState, mapDispatchToProps)(MyComponent);
