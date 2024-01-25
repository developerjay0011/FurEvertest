import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../utils/Styles';
import { useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import { useTheme } from "../../Theme";
import contact from '../assets/image/Profile/contact.png';
import eye from '../assets/image/Profile/eye.png';
import user from '../assets/image/Profile/user.png';
import child from '../assets/image/Bottomtab/child.png';
import book from '../assets/image/Bottomtab/book.png';
import logout from '../assets/image/Profile/logout.png';


const DATA = [
  {
    title: "Profile",
    show: "My Profile",
    icon: user
  },
  {
    title: "Childs",
    show: "Pets",
    icon: child
  },
  {
    title: "Bookings",
    show: "Booking Details",
    icon: book
  },
  {
    show: "Contact us",
    title: "Contactus",
    icon: contact
  },
  {
    title: "Changepass",
    show: "Change password",
    icon: eye
  },
  {
    title: "Login",
    show: "Logout",
    icon: logout
  },
];
const MyComponent = (props) => {
  const navigation = useNavigation()
  const { theme, width, height, fontFamily, fontSize } = useTheme();
  const themestyles = styles();
  const [url, seturl] = useState(null)
  const logout = async () => {
    messaging().deleteToken();
    await AsyncStorage.removeItem('token')
    navigation.replace("Login")
  }

  useEffect(() => {
    if (props?.user) {
      seturl(props?.user?.image ? { uri: props?.user?.image } : require("../assets/image/pimage.png"))
    }
  }, [props?.user])
  const uri = (text) => {
    if (text?.includes("No such file or directory")) {
      seturl(require("../assets/image/pimage.png"))
      return
    } else {
      seturl({ uri: props?.user?.image })
    }
  }


  const renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        item.title == "Login" ? logout() :
          item.title != "" ? navigation.navigate(item.title) : null
      }} style={[Styles.spacebetween, { marginVertical: 10, paddingLeft: 15 }]}>
        <View style={[Styles.flexrow]}>
          <Image source={item?.icon} style={[themestyles.icon, { tintColor: item?.show != "Logout" ? theme.commontextgrey : "#E74C3C" }]} />
          <Text style={[themestyles.text, { color: item?.show != "Logout" ? theme.commontextgrey : "#E74C3C" }]}>{item?.show}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
      <View style={themestyles.container}>
        <View style={[themestyles.top, { height: width / 2.1 }]}>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image
              onError={(e) => { uri(e?.nativeEvent?.error) }}
              source={url}
              style={{ height: width / 3, width: width / 3, borderRadius: width }} />
            <Text style={[themestyles.text2, { fontSize: width / 20, }]}>{props?.user?.name}</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={DATA}
            renderItem={renderItem2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 20, paddingHorizontal: 10 }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
const styles = () => {
  const { theme, width, height, fontFamily, fontSize } = useTheme();
  return StyleSheet.create({
    arrowr: {
      transform: [{ rotate: '-90deg' }],
      marginRight: 21,
    },
    container: {
      height: "100%",
      width: "100%",
      marginTop: -5,
      backgroundColor: theme.white,
    },
    top: {
      paddingVertical: 15,
      width: "100%",
      marginBottom: 15,
      alignItems: "center",
      justifyContent: "center"
    },
    text2: {
      color: theme.black,
      marginTop: 10,
      fontFamily: fontFamily.FontSemiBold,
    },
    text: {
      color: theme.black,
      marginLeft: 10,
      fontFamily: fontFamily.FontMedium,
    },
    icon: {
      width: width / 20,
      height: width / 20,
      resizeMode: "contain"
    }
  })
}
const mapState = (state) => {
  return {
    user: state.user.user
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapState, mapDispatchToProps)(MyComponent);
