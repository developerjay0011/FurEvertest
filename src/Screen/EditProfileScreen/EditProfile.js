import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import Imagepicker from "../../Component/Imagepicker"
import showToast from '../../utils/Toast';
import { Edituser, Userpic } from '../../Redux/actions/auth';
import { useRef } from 'react';
import { useTheme } from '../../../Theme';
import editimage from '../../assets/image/Profile/editimage.png';



const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation();
    const [name, setName] = useState(null)
    const [number, setNumber] = useState(null)
    const [email, setEmail] = useState(null)
    const [address, setAddress] = useState(null)
    const [url, seturl] = useState(null)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const image = useRef()
    useEffect(() => {
        if (props?.user) {
            setName(props?.user?.name)
            setEmail(props?.user?.email)
            setNumber(props?.user?.mobile)
            setAddress(props?.user?.address)
            seturl(props?.user?.image ? { uri: props?.user?.image } : require("../../assets/image/pimage.png"))
        }
    }, [props?.user])

    const uri = (text) => {
        if (text?.includes("No such file or directory")) {
            seturl(require("../../assets/image/pimage.png"))
            return
        } else {
            seturl({ uri: props?.user?.image })
        }
    }

    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name="Edit Profile" onPress={() => { navigation.goBack() }} />
                <View style={{ width: "100%", paddingHorizontal: 20 }}>
                    <Text style={[themestyles.sing]}>Edit Profile</Text>
                    <View style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 30 }}>
                        <Image onError={(e) => { uri(e?.nativeEvent?.error) }} source={url} style={themestyles.profile} />
                        <TouchableOpacity onPress={() => image.current.open()} style={themestyles.edit}>
                            <Image source={editimage} style={themestyles.icon} />
                        </TouchableOpacity>
                    </View>

                    <Textinput bottom={10} value={name} placeholder={"Enter Your Name"} onChangeText={(text) => { setName(text) }} />
                    <Textinput bottom={10} maxLength={10} keyboardType="number-pad" value={number} placeholder={"Enter Your Phone No."} onChangeText={(text) => { setNumber(text) }} />
                    <Textinput bottom={10} value={email} placeholder={"Enter Your E-mail"} onChangeText={(text) => { setEmail(text) }} />
                    <Textinput bottom={10} value={address} placeholder={"Enter Your Address"} onChangeText={(text) => { setAddress(text) }} />

                    <Button
                        loader={props?.loader}
                        button={{ marginBottom: 10, width: "90%", marginTop: 30 }}
                        onPress={() => {
                            if (name == "" || name == null) {
                                showToast("Please enter password")
                                return
                            }
                            if (reg.test(email) === false) {
                                showToast("Please enter a valid email address.")
                                return
                            }
                            if (number == "" || number == null) {
                                showToast("Please enter number")
                                return
                            }
                            if (address == "" || address == null) {
                                showToast("Please enter password")
                                return
                            }
                            props.Edituser({
                                "userId": global.id,
                                "name": name,
                                "mobile": number,
                                "email": email,
                                "address": address,
                            })
                        }}
                        name="Save"
                    />
                </View>
            </ScrollView>
            <Imagepicker
                open={image}
                refs={image}
                crop={true}
                size={{ height: width / 1.2, width: width / 1.2, circle: true }}
                setopen={() => { image.current.close() }}
                upload={(item) => {
                    props.Userpic({
                        "userId": global.id,
                        "image": item
                    })
                }}
            />
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        loader: state.user.loader,
        user: state.user.user
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Edituser: (data) => dispatch(Edituser(data)),
        Userpic: (data) => dispatch(Userpic(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
