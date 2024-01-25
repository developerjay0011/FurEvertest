import React, { useEffect, useRef, useState } from 'react';
import { Text, SafeAreaView, FlatList, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import edit from '../../assets/image/edit.png';
import Commonprofile from '../../Component/Commonprofile';
import Imagepicker from "../../Component/Imagepicker"
import { Userpic } from '../../Redux/actions/auth';
import { useTheme } from '../../../Theme';
import contact from '../../assets/image/Profile/contact.png';
import eye from '../../assets/image/Profile/eye.png';
import privacy from '../../assets/image/Profile/privacy.png';
import user from '../../assets/image/Profile/user.png';
import child from '../../assets/image/Bottomtab/child.png';
import book from '../../assets/image/Bottomtab/book.png';
import logout from '../../assets/image/Profile/logout.png';
import removeac from '../../assets/image/Profile/remove-user.png';

const MyComponent = (props) => {
    const navigation = useNavigation()
    const [url, seturl] = useState(null)
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    const data = [
        {
            name: "My Profile",
            nav: "EditProfile",
            image: user
        },
        {
            name: "Pets",
            nav: "Childs",
            image: child

        },
        {
            name: "Booking Details",
            nav: "Bookings",
            image: book
        },
        {
            name: "Contact us",
            nav: "Contactus",
            image: contact
        },
        {
            name: "Change Password",
            nav: "Changepass",
            image: eye
        },
        {
            name: "Privacy policy",
            nav: "Privacypolicy",
            image: privacy
        },
        {
            name: "Logout",
            nav: "Logout",
            image: logout,
            isred: true
        },
        {
            name: "Delete account",
            nav: "Logout",
            image: removeac,
            isred: true
        }
    ]
    const image = useRef()
    const renderItem = ({ item, index }) => (
        <Commonprofile item={item} index={index} />
    )
    const uri = (text) => {
        if (text?.includes("No such file or directory")) {
            seturl(require("../../assets/image/pimage.png"))
            return
        } else {
            seturl({ uri: props?.user?.image })
        }
    }
    useEffect(() => {
        if (props?.user) {
            seturl(props?.user?.image ? { uri: props?.user?.image } : require("../../assets/image/pimage.png"))
        }
    }, [props?.user])



    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header tab={true} name="Profile" onPress={() => navigation.toggleDrawer()} />
                <View style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", marginTop: 20 }}>
                    <Image onError={(e) => { uri(e?.nativeEvent?.error) }} source={url} style={themestyles.profile} />
                    <TouchableOpacity onPress={() => { image.current.open() }} style={themestyles.edit}>
                        <Image source={edit} style={themestyles.icon} />
                    </TouchableOpacity>
                </View>

                <Text style={[themestyles.time]}>{props?.user?.name}</Text>
                <Text style={[themestyles.month]}>{props?.user?.email} | {props?.user?.mobile}</Text>

                <FlatList
                    data={data}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: 25, marginTop: 20 }}
                />

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
        user: state.user.user
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Userpic: (data) => dispatch(Userpic(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
