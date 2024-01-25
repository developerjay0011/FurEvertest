import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text, ScrollView, RefreshControl } from "react-native";
import styles from "./styles";
import Header from "../../Component/Header"
import Notification from "../../Component/Notification"
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ClearNotifications, GetNotifications } from "../../Redux/actions/common";
import { useTheme } from "../../../Theme";
import Styles from "../../utils/Styles"
import { GetBooking } from "../../Redux/actions/user";
const MyComponent = (props) => {
  const { theme, width, height, fontFamily, fontSize } = useTheme();
  const themestyles = styles();
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  useEffect(() => {
    if (refreshing) {
      props.GetNotifications()
    }
  }, [refreshing])
  const renderItem2 = ({ item, index }) => (
    <Notification
      index={index}
      GetBooking={() => {
        props?.GetBooking({
          id: item?.bookingId, ...item,
          open: item?.open == false ? "false" : "true"
        })
      }}
      item={item}
    />
  )
  return (
    <SafeAreaView style={themestyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Header onPress={() => { navigation.goBack() }} name="Notifications" />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={[Styles.spacebetween]}>
            <Text style={[themestyles.Recommendations]}>Notifications</Text>
            {props?.notifications?.length > 0 ?
              <Text onPress={() => { props?.ClearNotifications() }} style={[themestyles.clear]}>Clear All</Text>
              :
              null}
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={renderItem2}
            data={props?.notifications}
            style={{ marginTop: 5 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapState = (state) => {
  return {
    notifications: state.common.notifications,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetNotifications: (data) => dispatch(GetNotifications(data)),
    ClearNotifications: () => dispatch(ClearNotifications()),
    GetBooking: (data) => dispatch(GetBooking(data)),
  }
}
export default connect(mapState, mapDispatchToProps)(MyComponent);

