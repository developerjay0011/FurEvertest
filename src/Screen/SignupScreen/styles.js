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
            marginTop: 40
        },
        sing: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontSemiBold,
            marginBottom: 30
        },
        account: {
            fontFamily: fontFamily.FontRegular,
            color: theme.black,
            alignSelf: "center",
            marginVertical: 20,
            marginBottom: 60,
        },
    })
}

export default styles;
