import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, useWindowDimensions, Animated, ScrollView, RefreshControl } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Historybooking from "./Historybooking"
import Upcomingbooking from "./Upcomingbooking"
import Currentbooking from "./Currentbooking"
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../Theme';
import { connect } from 'react-redux';
import { GetBookingHistory, GetCurrentBooking, GetUpcomingBooking } from '../../Redux/actions/user';

const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const barno = props.route.params;
    const [routes] = React.useState([
        { key: 'Upcomingbooking', title: ' Upcoming' },
        { key: 'Currentbooking', title: ' Current' },
        { key: 'Historybooking', title: ' History' },
    ]);
    const [index, setIndex] = React.useState(0);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        if (barno?.barno == 1) {
            setIndex(0)
            return
        }
        if (barno?.barno == 2) {
            setIndex(1)
            return
        }
        if (barno?.barno == 3) {
            setIndex(2)
            return
        }
    }, [barno?.barno])
    const TabContent1 = () => {
        const wait = () => new Promise(resolve => setTimeout(resolve, 2000));

        const onRefresh = async () => {
            setRefreshing(true);
            await wait();
            setRefreshing(false);
            props.GetUpcomingBooking();
        };

        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                <Upcomingbooking />
            </ScrollView>
        );
    };

    const TabContent2 = () => {
        const wait = () => new Promise(resolve => setTimeout(resolve, 2000));

        const onRefresh = async () => {
            setRefreshing(true);
            await wait();
            setRefreshing(false);
            props.GetCurrentBooking();
        };

        return (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false}>
                <Currentbooking />
            </ScrollView>
        );
    };

    const TabContent3 = () => {
        const wait = () => new Promise(resolve => setTimeout(resolve, 2000));

        const onRefresh = async () => {
            setRefreshing(true);
            await wait();
            setRefreshing(false);
            props.GetBookingHistory();
        };

        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                <Historybooking />
            </ScrollView>
        );
    };

    const renderScene = SceneMap({
        Upcomingbooking: TabContent1,
        Currentbooking: TabContent2,
        Historybooking: TabContent3,
    });

    const TabBarCustom = (props) => (
        <View style={{ paddingHorizontal: 20 }}>
            <TabBar
                {...props}
                style={{ backgroundColor: theme.appback, borderBottomColor: theme?.commontextgrey, borderBottomWidth: .5, elevation: 0 }}
                tabStyle={{ width: "auto", margin: 0, padding: 0, paddingRight: 20, minHeight: 0, marginTop: 15, paddingBottom: 10, minWidth: "20%" }}
                renderLabel={({ route, focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <Text style={[themestyles.tabtext, { color: focused ? theme.heading : theme.grey }]}>
                            {route.title}
                        </Text>
                        {focused && (
                            <Animated.View style={[themestyles.tabIndicator, { width: '80%', backgroundColor: theme.heading, position: "absolute", bottom: -10.5 }]} />
                        )}
                    </View>
                )}
                renderIndicator={({ navigationState, position }) => <Animated.View style={[{ height: 0 }]} />}
            />
        </View >
    );

    return (
        <SafeAreaView style={themestyles.container}>
            <Header tab={true} onPress={() => navigation.toggleDrawer()} name={"Bookings"} />
            <Text style={[themestyles.Recommendations]}>Bookings</Text>
            <View style={{ flex: 1, flexGrow: 1, }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderTabBar={(props) => <TabBarCustom {...props} />}
                    renderScene={renderScene}
                    onIndexChange={(index) => setIndex(index)}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </SafeAreaView>
    );
};

const mapState = (state) => {
    return {
        currentBooking: state.booking.currentBooking,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetUpcomingBooking: () => dispatch(GetUpcomingBooking()),
        GetBookingHistory: () => dispatch(GetBookingHistory()),
        GetCurrentBooking: () => dispatch(GetCurrentBooking()),
    };
};

export default connect(mapState, mapDispatchToProps)(MyComponent);
