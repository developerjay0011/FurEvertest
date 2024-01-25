
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
        sing: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontRegular,
        },
        account: {
            color: theme.black,
            fontFamily: fontFamily.FontRegular,
            textAlign: "center"
        }
    })
}

export default styles;
