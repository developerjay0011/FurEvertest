import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
            alignItems: "center",
            justifyContent: "center"
        },
        video: {
            alignSelf: "center",
            justifyContent: "center",
            transform: [{ rotate: "90deg" }]
        },
        back: {
            width: 40,
            height: 40,
            borderRadius: 5,
            top: 24,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 15,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 10,
            shadowColor: "black",
            backgroundColor: theme.white,
            elevation: 12,
            transform: [{ rotate: "90deg" }]

        },
    });
}
export default styles;
