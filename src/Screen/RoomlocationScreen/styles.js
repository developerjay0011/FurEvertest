import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        bottom: {
            marginTop: 30,
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            overflow: "hidden",
            width: "100%",
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 10,
            shadowColor: "black",
            backgroundColor: theme.white,
            elevation: 5,
        },
        back: {
            position: "absolute",
            margin: 20
        },
        Partner: {
            color: theme.commontext,
            width: "90%",
            fontFamily: fontFamily.FontSemiBold,
            marginLeft: 10,
        },
    })
}
export default styles;
