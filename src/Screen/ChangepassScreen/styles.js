import { StyleSheet } from "react-native";
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
            fontFamily: fontFamily.FontSemiBold,
            textAlign: "center",
            fontSize: fontSize.font30
        },
    })
}

export default styles;
