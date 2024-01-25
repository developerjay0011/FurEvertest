
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        Explore: {
            color: theme.heading,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
            marginLeft: 20,
            marginBottom: 10,
        },
    })
}

export default styles;
