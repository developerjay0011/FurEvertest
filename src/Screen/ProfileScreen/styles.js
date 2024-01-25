import { StyleSheet } from "react-native";
import { useTheme } from "../../../Theme";

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        time: {
            color: theme.black,
            marginTop: 15,
            fontFamily: fontFamily.FontSemiBold,
            alignSelf: "center",
            fontSize: fontSize.font30
        },
        icon: {
            height: width / 15,
            width: width / 15,
            resizeMode: "contain",
        },
        edit: {
            position: "absolute",
            right: -35,
            bottom: 5
        },
        profile: {
            height: width / 3,
            width: width / 3,
            borderRadius: width,
            resizeMode: "contain"
        },
        month: {
            color: theme.black,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font18,
            alignSelf: "center",
            marginBottom: 20,
            marginTop: 10
        },
    })
}
export default styles;
