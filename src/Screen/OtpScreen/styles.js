import { StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';

const styles = () => {
    const { theme, width, height, fontFamily } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundcolor,
            paddingHorizontal: 10
        },
        bottom: {
            marginTop: 30,
        },
        code: {
            height: width / 8,
            fontFamily: fontFamily.FontSemiBold,
            width: width / 8,
            borderRadius: 9,
            alignItems: "center",
            alignContent: "center",
            borderWidth: 1,
            borderColor: theme.skyblue,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 10,
            shadowColor: "black",
            backgroundColor: theme.textinputbackground,
            elevation: 5,
        },
        sing: {
            color: theme.singtextcolor,
            fontFamily: fontFamily.FontSemiBold,
        },
        account: {
            color: theme.black,
            fontFamily: fontFamily.FontRegular,
            alignSelf: "center",
            marginTop: 20,
        },
    })
}
export default styles;
