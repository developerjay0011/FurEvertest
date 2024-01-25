import React from "react";
import { View, StyleSheet, Image, ImageBackground, } from "react-native";
import Button from "../../Component/Button";
import { useTheme } from "../../../Theme";
import Logo from "../../assets/svg/Icons/logo.svg"

const MyComponent = (props) => {
    const { theme, width, height } = useTheme();
    const themestyles = styles(theme, width, height);

    return (
        <View style={themestyles.container}>
            <ImageBackground source={require("../../assets/image/Usedimage/choose.jpg")} style={themestyles.imge}>
                {/* <Image source={require("../../assets/image//Usedimage/Overlay2.png")} style={themestyles.bottom} /> */}
                <Image source={require("../../assets/image/Logo/whiteLogo.png")} style={themestyles.logo} />
                <Button name="Login" onPress={() => { props.navigation.replace("Login"); }} text={{ color: theme.white }} button={themestyles.login} />
                <Button name="Register" onPress={() => { props.navigation.replace("Signup"); }} text={{ color: theme.black }} button={themestyles.signup} />
            </ImageBackground>
        </View>
    );
};

const styles = (theme, width, height) => {
    return StyleSheet.create({
        login: {
            backgroundColor: theme.darkgreen,
            width: "80%",
            marginBottom: 0,
            marginTop: 50,
        },
        signup: {
            backgroundColor: theme.white,
            width: "80%", marginBottom: 50
        },
        container: {
            flex: 1,
        },
        imge: {
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
        },
        logo: {
            height: width / 3,
            width: width / 4,
        },
        bottom: {
            height: "80%",
            width: "100%",
            position: "absolute",
            bottom: 0,
        },
    });
};

export default MyComponent;
