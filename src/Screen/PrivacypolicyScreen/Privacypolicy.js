
import React, { } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const navigation = useNavigation();
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name="Privacy policy" onPress={() => { navigation.goBack() }} />
                <View style={{ paddingHorizontal: 5 }}>
                    <Text style={[themestyles.Recommendations, { marginTop: 0 }]}>Privacy policy</Text>
                    <Text style={[themestyles.Partner, { fontSize: fontSize.font18, paddingHorizontal: 20 }]}>{props?.PrivacyPolicy?.privacy}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        PrivacyPolicy: state.common.PrivacyPolicy
    };
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
