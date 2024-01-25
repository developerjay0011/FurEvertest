import { StyleSheet } from 'react-native';
import { useTheme } from "../../../Theme";

const styles = () => {
    const { theme, width, height, fontFamily } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundcolor,
            paddingHorizontal: 10
        },
        bottom: {
            marginTop: 20
        },
        text: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontSemiBold,
            marginBottom: 5,
            marginTop: 10
        },
        sing: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontSemiBold,
            textAlign: "center"
        },
        Partner: {
            color: theme.commongreen,
            marginLeft: 13,
            fontFamily: fontFamily.FontBold,
        },
        account: {
            color: theme.black,
            fontFamily: fontFamily.FontRegular,
            alignSelf: "center",
            marginTop: 10,
        },
        icon: {
            height: 25,
            width: 25,
            tintColor: theme.commongreen,
            marginLeft: 10
        }
    })
}
export default styles;
