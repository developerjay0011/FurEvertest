
import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        tabtext: {
            color: theme.black,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font18
        },
        Recommendations: {
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
            marginLeft: 20,
        },
        tabIndicator: {
            backgroundColor: 'blue',
            height: 2,
        },
    })
}

export default styles;
