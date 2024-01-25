import { StyleSheet } from 'react-native';
import Styles from '../../utils/Styles';
import { useTheme } from '../../../Theme';

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.appback,
        },
        Pay: {
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#707070',
            width: '100%',
            marginTop: 25,
            ...Styles.up,
            ...Styles.spacebetween,
        },
        Paybutton: {
            marginTop: 0,
            height: width / 9,
            width: '60%',
            backgroundColor: '#1AB65C',
        },
        Modalview: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .3)',
        },
        ModalItem1: {
            backgroundColor: theme.white,
            padding: 10,
            width: '93%',
            maxHeight: '80%',
            borderRadius: 5,
            ...Styles.up,
        },
        image: {
            alignSelf: 'center',
            width: width,
            height: width / 1.3,
            resizeMode: 'cover',
        },
        box: {
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.commongreen,
            height: width / 22,
            width: width / 22,
            marginRight: 10,
            borderRadius: 5
        },
        yes: {
            color: theme.commontextgrey,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font18,
        },
        line: {
            borderTopWidth: 0.5,
            width: '100%',
            borderColor: '#707070',
        },
        grand: {
            paddingVertical: 5,
            borderColor: theme.commontextgrey,
            paddingHorizontal: 5,
            ...Styles.spacebetween,
        },
        check: {
            height: width / 28,
            width: width / 28,
            resizeMode: "contain",
            tintColor: "white"
        },
        name3: {
            color: theme.commontextgrey,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font20,
        },
        name1: {
            color: theme.centername,
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font22,
        },
        name2: {
            color: theme.centername,
            fontFamily: fontFamily.FontSemiBold,
            fontSize: fontSize.font30,
        },
        loacation: {
            color: theme.centername,
            fontFamily: fontFamily.FontRegular,
            fontSize: fontSize.font20,
        },
        icon: {
            height: width / 20,
            width: width / 20,
            resizeMode: 'contain',
        },
        icon2: {
            height: width / 25,
            width: width / 25,
            resizeMode: 'contain',
        },
    });
};
export default styles;
