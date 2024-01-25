
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
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
            marginTop: 15
        },
        flatlist: {
            paddingHorizontal: 20,
            marginTop: 15
        }
    })
}

export default styles;
