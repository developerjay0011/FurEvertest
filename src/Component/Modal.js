//import liraries
import React, { } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Styles from "../utils/Styles"
import Success from "../assets/svg/success.svg"
import Failed from "../assets/svg/failed.svg"
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { success, openmodal, Stitletext, stext, text, Ftitletext, } = props;
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    return (
        <Modal animationType="none" transparent={true} visible={openmodal}>
            <View style={themestyles.Modalview}>
                {success ?
                    <View style={themestyles.ModalItem}>
                        <Success style={themestyles.Success} />
                        <Text style={[themestyles.Successtext]}>{Stitletext}</Text>
                        <Text style={[themestyles.Thank]}>{stext}</Text>
                        <View style={[Styles.spacebetween, { marginTop: 20, width: "90%", alignSelf: "center", justifyContent: "center" }]}>
                            <TouchableOpacity onPress={() => { props?.Okay() }} style={[themestyles.Cancel, { backgroundColor: theme.Buttoncolor }]}>
                                <Text style={[themestyles.btext]}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={themestyles.ModalItem}>
                        <Failed style={[themestyles.Success]} />
                        <Text style={[themestyles.Successtext]}>{Ftitletext}</Text>
                        <Text style={[themestyles.Thank]}>{text}</Text>
                        <View style={[Styles.spacebetween, { marginTop: 20, width: "90%", alignSelf: "center" }]}>
                            <TouchableOpacity onPress={() => { props?.Cancel() }} style={themestyles.Cancel}>
                                <Text style={[themestyles.btext, { color: "rgba(155, 169, 185, 1)" }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { props?.Tryagain() }}
                                style={[themestyles.Cancel, { backgroundColor: "rgba(251, 75, 75, 1)" }]}>
                                <Text style={[themestyles.btext]}>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </Modal>
    );
};


const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        Modalview: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, .3)"
        },
        Cancel: {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 8,
            borderRadius: 10,
            width: "45%",
            backgroundColor: "rgba(208, 222, 235, 1)"
        },
        btext: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.white,
            fontSize: fontSize.font16
        },
        ModalItem: {
            backgroundColor: theme.white,
            paddingBottom: 14, paddingTop: 50,
            width: "93%",
            borderRadius: 20,
            paddingHorizontal: 10,
            ...Styles.up
        },
        ModalItem1: {
            backgroundColor: theme.white,
            padding: 10,
            width: "93%",
            maxHeight: "80%",
            borderRadius: 5,
            ...Styles.up
        },
        Successtext: {
            color: theme.commontext,
            fontFamily: fontFamily.FontSemiBold,
            alignSelf: "center",
            fontSize: fontSize.font22,
            marginTop: 10
        },
        Thank: {
            fontFamily: fontFamily.FontMedium,
            color: theme.black,
            marginTop: 5,
            alignSelf: "center",
            textAlign: "center",
            fontSize: fontSize.font20
        },
        Success: {
            alignSelf: "center",
            position: "absolute",
            top: -50
        },
        image: {
            alignSelf: "center",
            width: "90%",
            height: 220,
            borderRadius: 5,
        },
    })
}
export default MyComponent;
