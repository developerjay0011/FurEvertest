import { Dimensions, StyleSheet } from 'react-native';
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height
const styles = StyleSheet.create({
    icon: {
        height: 22,
        width: 22,
        marginLeft: 2,
        tintColor: "rgb(184,184,184)"
    },
    hw: {
        width: width,
        height: height
    },
    flexrow: {
        alignItems: "center",
        flexDirection: "row",
    },
    spacebetween: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    spacearound: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    up: {
        shadowOffset: { width: 0, height: 5, },
        shadowOpacity: 0.58,
        shadowRadius: 5.00,
        elevation: 5,
    }

});

export default styles;
