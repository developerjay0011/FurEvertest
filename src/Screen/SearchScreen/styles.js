
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
            paddingHorizontal: 10
        },
        textinput: {
            fontFamily: fontFamily.FontRegular,
            color: theme.textinput,
            borderColor: theme.bordercolor,
            borderWidth: 1,
            height: null,
            paddingHorizontal: 10,
            paddingRight: 65,
            borderRadius: 30,
            alignSelf: "center",
            width: "100%",
        },
        Explore: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontBold,
            marginBottom: 15
        },
        Recommendations: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontBold,
            marginVertical: 20,
        },
        datetext: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontRegular
        },
        date: {
            borderRadius: 30,
            width: "49%",
            paddingHorizontal: 10,
            backgroundColor: theme.white,
            borderWidth: 1,
            borderColor: theme.bordercolor
        },
    })
}
export default styles;
