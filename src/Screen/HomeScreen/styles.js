import { StyleSheet } from "react-native";
import Styles from "../../utils/Styles";
import { useTheme } from "../../../Theme";

const styles = () => {
  const { theme, width, height, fontFamily, fontSize } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appback,
    },
    option: {
      fontFamily: fontFamily.FontSemiBold,
      color: theme.black,
      fontSize: fontSize.font15,
    },
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: "gray",
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    active: {
      height: width / 35,
      width: width / 35,
      borderRadius: width / 25,
      backgroundColor: theme?.homebar
    },
    icon2: {
      height: width / 40,
      width: width / 40,
      tintColor: "white"
    },
    unactive: {
      height: width / 35,
      width: width / 35,
      borderRadius: width / 28,
      backgroundColor: theme?.homebar
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

    review: {
      borderWidth: 1,
      paddingVertical: 10,
      borderColor: theme.bordercolor,
      borderRadius: 5,
    },
    popup: {
      alignSelf: "center",
      backgroundColor: theme.backgroundcolor,
      width: "90%",
      borderRadius: 5,
      ...Styles.up,
      paddingHorizontal: 20,
    },
    class2: {
      fontFamily: fontFamily.FontBold,
      color: theme.black,
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
    },
    class1: {
      fontFamily: fontFamily.FontSemiBold,
      color: theme.black,
      fontSize: 15,
      marginVertical: 5,
    },
    textinput: {
      fontFamily: fontFamily.FontRegular,
      backgroundColor: theme.textinputbackground,
      color: theme.hometextplace,
      height: null,
      borderRadius: 1000,
      alignSelf: "center",
      paddingLeft: 15,
      paddingRight: width / 20 + 20,
      width: "100%",
      borderWidth: 1,
      borderColor: theme?.border,
    },
    Explore: {
      color: theme.black,
      fontFamily: fontFamily.FontSemiBold,
      marginBottom: 10,
    },
    Recommendations: {
      color: theme.heading,
      fontFamily: fontFamily.FontMedium,
      fontSize: fontSize.font22,
      marginLeft: 20,
      marginBottom: 12,
    },
    flat: {
      paddingBottom: 20,
      paddingLeft: 20,
    },
    list: {
      zIndex: 16, //To popover the component outwards
      position: 'absolute',
      backgroundColor: theme?.textinputbackground,
      width: "100%",
      ...Styles.up,
      borderRadius: 10,
      top: width / 8,
      overflow: "hidden"
    },
    datetext: {
      color: theme.homefrom,
      fontFamily: fontFamily.FontMedium,
      textAlign: "center",
      width: "48%",
      fontSize: fontSize.font18
    },
    boxadd: {
      width: width / 20,
      height: width / 20,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.homebar,
      ...Styles.up
    },
    date: {
      width: "42%",
      backgroundColor: theme.white,
    },
    line: {
      height: "90%",
      borderLeftColor: theme.homefrom,
      borderLeftWidth: .5,
    },
    range: {
      color: theme.homefrom,
      fontFamily: fontFamily.FontMedium,
      fontSize: fontSize.font15
    },
    search: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.selected,
      borderRadius: width,
      height: width / 11,
      width: width / 11,
      ...Styles.up
    },
  });
};
export default styles;
