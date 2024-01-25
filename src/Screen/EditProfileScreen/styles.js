import { StyleSheet } from "react-native";
import Styles from "../../utils/Styles";
import { useTheme } from "../../../Theme";


const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        sing: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontMedium,
            textAlign: "center",
            fontSize: fontSize.font22,
            marginBottom: 20
        },
        edit: {
            height: width / 12,
            width: width / 12,
            backgroundColor: theme.white,
            position: "absolute",
            borderRadius: width,
            alignItems: "center",
            justifyContent: "center",
            right: width / 50,
            bottom: 10,
        },
        icon: {
            height: width / 20,
            width: width / 20,
            resizeMode: "contain"
        },
        profile: {
            height: width / 2.4,
            width: width / 2.4,
            borderRadius: width,
            resizeMode: "contain"
        },
    });
}
export default styles;
