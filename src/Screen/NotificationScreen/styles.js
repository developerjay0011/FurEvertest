import { StyleSheet } from "react-native";
import { useTheme } from "../../../Theme";
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback
        },
        Recommendations: {
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
            marginBottom: 25,
        },
        class2: {
            color: theme.black,
            fontFamily: fontFamily.FontMedium,
            textAlign: "center"
        },
        clear: {
            color: "#1AB65C",
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font18,
            marginBottom: 25,
        },
    })
}
export default styles