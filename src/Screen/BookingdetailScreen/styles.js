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
        review: {
            borderWidth: 1,
            paddingVertical: 10,
            borderColor: theme.bordercolor,
            borderRadius: 5,
        },
        button: {
            width: '90%',
            marginBottom: 20, marginTop: 10,
        },
        popup: {
            alignSelf: 'center',
            backgroundColor: theme.appback,
            width: '90%',
            borderRadius: 5,
            ...Styles.up,
            paddingHorizontal: 20,
        },
        class2: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.black,
            fontSize: 15,
            textAlign: 'center',
        },
        Modalview: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
        },
        dot: {
            height: 4,
            width: 4,
            borderRadius: 5,
            backgroundColor: theme.black,
            marginLeft: 20,
        },
        image: {
            alignSelf: 'center',
            width: width,
            height: width / 1.3,
            resizeMode: "cover"
        },
        renderItemtext: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.black,
            marginLeft: 8,
            width: '80%',
        },
        date1: {
            borderColor: theme?.border,
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 55,
            width: '47%',
            alignItems: 'center',
            paddingHorizontal: 5,
            height: width / 8,
            backgroundColor: theme.textinputbackground,
        },
        datetext: {
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font20,
            color: theme?.placeholder,
        },
        text: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontSemiBold,
            marginBottom: 5,
            fontSize: fontSize.font18,
            marginTop: 10
        },
        date2: {
            borderColor: theme?.border,
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 55,
            width: '100%',
            paddingHorizontal: 20,
            height: width / 8,
            backgroundColor: theme.textinputbackground,
            marginTop: 10,
        },
        date3: {
            borderColor: theme?.border,
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 55,
            width: '100%',
            paddingHorizontal: 20,
            height: width / 8,
            backgroundColor: theme.textinputbackground,
        },
        grand: {
            borderTopWidth: .5,
            borderBottomWidth: .5,
            paddingVertical: 15,
            borderColor: theme.commontextgrey,
            marginTop: 25,
            marginBottom: 15,
            paddingHorizontal: 5,
            ...Styles.spacebetween,
        },
        name3: {
            color: theme.commontextgrey,
            fontFamily: fontFamily.FontSemiBold,
            fontSize: fontSize.font22,
        },
        See: {
            color: theme.selected,
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
            height: width / 22,
            width: width / 22,
            resizeMode: 'contain',
        },
    });
};

export default styles;
