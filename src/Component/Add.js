import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Styles from '../utils/Styles';
import Add from "../assets/svg/add.svg"
import { connect } from 'react-redux';
import { AddEditChildDetail } from '../Redux/actions/user';
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    return (
        <TouchableOpacity onPress={() => { props?.onPress() }} style={[themestyles.container, props.style]}>
            {props?.delete == true ?
                <Text style={{ fontSize: 15, color: "white", fontFamily: fontFamily.FontBold }}>Clear</Text>
                : props?.width && props?.height ?
                    <Add height={props?.height} width={props?.width} />
                    :
                    <Add />
            }
        </TouchableOpacity>
    );
};
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            height: 48,
            width: 48,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.commongreen,
            ...Styles.up,
            position: "absolute",
            bottom: 30,
            right: 20
        },
    })
}

const mapState = (state) => {
    return {
        addchild: state.booking.addchild,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddEditChildDetail: (data) => dispatch(AddEditChildDetail(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);

