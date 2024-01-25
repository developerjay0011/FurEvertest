
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../Theme';
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
            paddingHorizontal: 10
        },
        row: {
            marginBottom: 2,
            width: "40%"
        },
        dot: {
            height: 4,
            width: 4,
            borderRadius: 5,
            backgroundColor: theme.black,
            marginLeft: 6
        },
        image: {
            alignSelf: "center",
            width: "90%",
            borderRadius: 5,
        },
        image2: {
            marginTop: 5,
            width: "96%",
            height: 200,
            borderRadius: 5,
        },
        renderItemtext: {
            color: theme.black,
            fontFamily: fontFamily.FontBold,
            marginLeft: 8,
            width: "90%",
        },
        name2: {
            color: theme.black,
            fontFamily: fontFamily.FontBold,
            marginBottom: 7
        },
    });
}
export default styles;
