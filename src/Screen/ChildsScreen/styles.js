
import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        Recommendations: {
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
            marginLeft: 20,
            marginBottom: 25,
        },
        tabtext: {
            color: theme.commontextgrey,
            alignSelf: "center",
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font20,
            marginTop: 10
        },

    })
}

export default styles;
