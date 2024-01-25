import React, { useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, Text, RefreshControl, ScrollView } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import Childsrow from "../../Component/Childsrow"
import { connect } from 'react-redux';
import { AddEditChildDetail, ChildId, GetUserChilds } from '../../Redux/actions/user';
import Loader from "../../Component/Loader"
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const navigation = useNavigation()
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = () => { return new Promise(resolve => setTimeout(resolve, 2000)); }
    useEffect(() => {
        if (refreshing) { props.GetUserChilds() }
    }, [refreshing])


    const renderItem = ({ item, index }) => (
        <Childsrow
            item={item}
            index={index}
            onPress={() => props.ChildId({ id: item.childId })}
        />
    )
    return (
        <SafeAreaView style={themestyles.container} >
            <Loader loading={props?.loader} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Header tab={true} onPress={() => { navigation.toggleDrawer() }} name={"Pets"} />
                <Text style={[themestyles.Recommendations]}>Pet Profile</Text>

                <View style={{ paddingHorizontal: 20 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={props?.Childs}
                        scrollEnabled={false}
                        renderItem={renderItem}
                    />
                    <Text onPress={() => { props.AddEditChildDetail(null) }} style={themestyles.tabtext}>+ Add more</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        Childs: state.booking.Childs,
        loader: state.user.loader,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        ChildId: (data) => dispatch(ChildId(data)),
        AddEditChildDetail: (data) => dispatch(AddEditChildDetail(data)),
        GetUserChilds: (data) => dispatch(GetUserChilds(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);