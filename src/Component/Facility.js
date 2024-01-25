/* eslint-disable */
import React, { } from "react";
import Styles from "../utils/Styles";
import { View, Text, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { useTheme } from "../../Theme";
import check from '../assets/image/check.png';

const MyComponent = (props) => {
  const { theme, width, height, fontFamily, fontSize } = useTheme();
  const themestyles = styles();
  var select = props.select?.filter((item2) => item2?.id == props.item.facilityId).length > 0
  return (
    <TouchableOpacity key={props?.index} onPress={() => { props.onPress(); }} style={[Styles.spacebetween, themestyles.date2, { minHeight: width / 9 },]}>
      <View style={[Styles.flexrow, { marginBottom: 0 }]}>
        <TouchableOpacity onPress={() => { props.onPress() }} style={[themestyles.box, { backgroundColor: select ? theme.commongreen : null },]}>
          {select ? (
            <Image source={check} style={themestyles.check} />
          ) : null}
        </TouchableOpacity>
        <Text style={[themestyles.datetext, { color: select ? "black" : theme?.placeholder }]}>
          {props?.item?.name + " - " + "Rs. " + String(props?.item?.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = () => {
  const { theme, width, height, fontFamily, fontSize } = useTheme();
  return StyleSheet.create({
    check: {
      height: width / 28,
      width: width / 28,
      resizeMode: "contain",
      tintColor: "white"
    },
    date2: {
      backgroundColor: theme.white,
      borderColor: theme?.border,
      borderWidth: 1,
      borderRadius: 55,
      width: "100%",
      paddingHorizontal: 20,
      height: width / 8,
      backgroundColor: theme.textinputbackground,
      marginBottom: 10,
    },
    box: {
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.commongreen,
      height: width / 22,
      width: width / 22,
      borderRadius: 5
    },
    datetext: {
      color: theme.darkgreen,
      fontFamily: fontFamily.FontRegular,
      fontSize: fontSize.font18,
      color: theme?.placeholder,
      flex: 1,
      paddingLeft: 10
    },
  })
}
export default MyComponent;
