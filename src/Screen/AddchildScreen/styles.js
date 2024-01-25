
import { StyleSheet } from 'react-native';
import Styles from "../../utils/Styles"
import { useTheme } from '../../../Theme';
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
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
        check: {
            height: width / 28,
            width: width / 28,
            resizeMode: "contain",
            tintColor: "white"
        },
        profile: {
            height: width / 2.5,
            width: width / 2.5,
            borderRadius: width,
            resizeMode: "contain"
        },
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        Recommendations: {
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
            marginBottom: 25,
            marginLeft: 5
        },
        placeholder: {
            color: theme.placeholder,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font18,
            marginTop: 5
        },
        box: {
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1.5,
            borderColor: theme.commongreen,
            height: width / 20,
            width: width / 20,
            borderRadius: 5
        },
        yes: {
            fontFamily: fontFamily.FontRegular,
            color: theme.commontext,
        },


        datetext: {
            fontFamily: fontFamily.FontRegular,
            fontSize: fontSize.font20,
            color: theme?.placeholder
        },
        date2: {
            backgroundColor: theme.white,
            borderColor: theme?.border,
            borderWidth: 1,
            borderRadius: 55,
            width: "100%",
            paddingHorizontal: 20,
            height: width / 8,
            backgroundColor: theme.white,
            marginTop: 10,
        }
    })
}

export default styles;
