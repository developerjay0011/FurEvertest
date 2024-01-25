
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundcolor,
            alignItems: "center",
            justifyContent: "center"
        },
        logoContainer: {
            alignItems: 'center',
        },
    })
}

export default styles;
