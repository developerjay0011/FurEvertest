import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from "../../../Theme";

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        Partner: {
            color: theme.commontext,
            fontFamily: fontFamily.FontMedium,
        },
        Recommendations: {
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
            marginLeft: 20,
            marginBottom: 12,
        },
    })
}

export default styles;
