/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { Text, SafeAreaView, View, Image, FlatList, ScrollView, TouchableOpacity, } from "react-native";
import styles from "./styles";
import Header from "../../Component/Header";
import { useNavigation } from "@react-navigation/native";
import Styles from "../../utils/Styles";
import Button from "../../Component/Button";
import moment from "moment";
import { connect } from "react-redux";
import { addReview, CancelBooking, GetFacilityStatusByDateBookingId, GetReview, Geturl, Showreview, } from "../../Redux/actions/user";
import ISActivities from "../../Component/Activitiestatus";
import ISMeals from "../../Component/Activitiestatus";
import Meals from "../../Component/Activities";
import Activities from "../../Component/Activities";
import Location from "../../assets/image/Location.png";
import female from "../../assets/image/female.png";
import male from "../../assets/image/male.png";
import Loader from "../../Component/Loader";
import { RefreshControl } from "react-native-gesture-handler";
import Review from "../../Component/Review";
import { useTheme } from "../../../Theme";
import { ImageSlider } from "react-native-image-slider-banner";

const MyComponent = (props) => {
  const { data } = props.route.params;
  const { theme } = useTheme();
  const themestyles = styles();
  const navigation = useNavigation();
  const [all, setAll] = useState(false);
  const [all2, setAll2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const currentDateTime = moment()
  const checkout = moment(data?.item?.checkoutDate).format("DD-MM-YYYY")
  const to = moment(data?.item?.bookingTo).format("DD-MM-YYYY")
  const toDate = moment(to, "DD-MM-YYYY")
  const date = moment(data?.item?.bookingFrom).format("DD-MM-YYYY")
  const time = data?.item?.fromTime
  const combinedDateTime = time ? moment(`${date} ${time}`, "DD-MM-YYYY hh:mm A") : moment(`${date}`, "DD-MM-YYYY");
  const Compare = (currentDateTime.isBefore(combinedDateTime) && data?.item?.status == "Upcoming") == true ? true : false




  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };
  useEffect(() => {
    if (refreshing) {
      props.GetFacilityStatusByDateBookingId(
        {
          bookingId: data?.item?.bookingId,
          date: moment(),
        },
        { item: true }
      );
    }
  }, [refreshing]);

  const Meal = ({ item, index }) => <Meals isActivities={false} index={index} item={item} />
  const Activitie = ({ item, index }) => <Activities isActivities={true} index={index} item={item} />

  const Mealstatus = ({ item, index }) => <ISMeals
    checkoutdate={data?.item?.checkoutDate ? moment(checkout, "DD-MM-YYYY") : ""}
    currentDate={currentDateTime}
    toDate={toDate}
    ischeckout={data?.item?.status == "History"}
    all={all}
    index={index} item={item} />

  const Activitiestatus = ({ item, index }) => <ISActivities
    checkoutdate={data?.item?.checkoutDate ? moment(checkout, "DD-MM-YYYY") : ""}
    currentDate={currentDateTime}
    toDate={toDate}
    ischeckout={data?.item?.status == "History"}
    all={all2}
    index={index} item={item}
  />

  return (
    <SafeAreaView style={themestyles.container}>
      <Loader loading={props?.loader} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%" }}>
          <ImageSlider
            data={data?.item?.centerImage?.split(",")?.map((item2, index) => ({ img: index == 0 ? item2 : "https://api.furever.in:7775/wwwroot/Images/" + item2 }))}
            caroselImageStyle={[themestyles.image]}
            timer={5000}
            autoPlay={true}
            showIndicator={true}
            indicatorContainerStyle={{ bottom: 0 }}
            inActiveIndicatorStyle={{ width: 10, height: 10, backgroundColor: "rgba(255,255,255,.3)" }}
            activeIndicatorStyle={{ width: 10, height: 10, backgroundColor: "white" }}
          />
          <Header onPress={() => navigation.goBack()} position={true} />
        </View>

        <View style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 15 }}>

          <View style={{ width: "100%" }}>
            <Text style={[themestyles.name2]}>
              {data?.item?.centerName}
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate("Roomlocation", { location: { address: data?.item?.centerAddress, hide: true } }) }} style={[Styles.flexrow, { marginTop: 8, alignItems: null }]}>
              <Image source={Location} style={themestyles.icon} />
              <Text style={[themestyles.loacation]}>
                {data?.item?.centerAddress}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={themestyles.grand}>
            <Text style={[themestyles.name3]}>
              Grand Total
            </Text>
            <Text style={[themestyles.name3]}>
              ₹ {data?.item?.price}
            </Text>
          </View>






          <Text style={[themestyles.name1, { marginBottom: 5, marginTop: 10 }]}>
            Booking Details
          </Text>


          <Text style={[themestyles.text, {}]}>{"Pet Name"}</Text>
          <View style={[themestyles.date3, Styles.spacebetween]} >
            <Text style={[themestyles.datetext]}>{data?.item?.childName}</Text>
            <Image source={data?.item?.childType == "Male" ? male : female} style={[themestyles.icon2, { tintColor: data?.item?.childType == "Male" ? "blue" : "pink" }]} />
          </View>

          <Text style={[themestyles.text, {}]}>{"Booking No"}</Text>
          <View style={[themestyles.date3]} >
            <Text style={[themestyles.datetext]}>{data?.item?.bookingNo}</Text>
          </View>


          <View style={[Styles.spacebetween, { alignItems: "center", marginBottom: 15 }]} >
            <View style={{ width: data?.item?.isHourlyBooking == 1 ? "40%" : '45%' }}>
              <Text style={[themestyles.text, {}]}>{data?.item?.isHourlyBooking == 1 ? "Booking Date" : "From"}</Text>
              <View style={[themestyles.date1, { width: "100%" }]} >
                <Text style={[themestyles.datetext]}>{moment(data?.item?.bookingFrom).format("DD-MM-YYYY")}</Text>
              </View>
            </View>
            <View style={{ width: data?.item?.isHourlyBooking == 1 ? "58%" : '45%' }}>
              <Text style={[themestyles.text, {}]}>{data?.item?.isHourlyBooking == 1 ? "Time Slot" : "To"}</Text>
              <View style={[themestyles.date1, { width: "100%" }]} >
                <Text style={[themestyles.datetext]}>{data?.item?.isHourlyBooking != 1 ? moment(data?.item?.bookingTo).format("DD-MM-YYYY") : data?.item?.fromTime + " - " + data?.item?.toTime} </Text>
              </View>
            </View>
          </View>



          <View style={[Styles.spacebetween, { alignItems: "center", marginBottom: 15, marginTop: 5 }]}>
            <Text style={[themestyles.name1]}>Meal</Text>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.item?.mealTiming}
            scrollEnabled={false}
            renderItem={Meal}
            contentContainerStyle={{
              paddingBottom: 10, borderBottomWidth: 1,
              marginBottom: 20, borderColor: theme?.bookingboder
            }}
          />

          {data?.item?.activitiesList?.length > 0 ?
            <>
              <View style={[Styles.spacebetween, { alignItems: "center", marginBottom: 15 }]}>
                <Text style={[themestyles.name1]}>Activities</Text>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data?.item?.activitiesList}
                scrollEnabled={false}
                renderItem={Activitie}
                contentContainerStyle={{
                  paddingBottom: 10, borderBottomWidth: 1,
                  marginBottom: 15, borderColor: theme?.bookingboder
                }}
              />
            </>
            :
            null
          }

          {data?.item?.checkInStatus == "Checkout" || data?.item?.checkInStatus == "Checked In" ?
            <>
              <View style={[Styles.spacebetween, { alignItems: "center", marginBottom: 15, marginTop: 5 }]}>
                <Text style={[themestyles.name1]}>Meal Status</Text>
                <TouchableOpacity onPress={() => { setAll(!all) }}>
                  <Text style={[themestyles.See]} >{all ? "See Less" : "See All"}</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={props?.MealStatus}
                scrollEnabled={false}
                renderItem={Mealstatus}
                contentContainerStyle={{ paddingBottom: 15, borderBottomWidth: 1, marginBottom: 20, borderColor: theme?.bookingboder }}
              />

              {props?.statusbooking?.length > 0 && data?.item?.activitiesList?.length > 0 ?
                <>
                  <View style={[Styles.spacebetween, { alignItems: "center", marginBottom: 15 }]}>
                    <Text style={[themestyles.name1]}>Activities Status</Text>
                    <TouchableOpacity onPress={() => { setAll2(!all2) }}>
                      <Text style={[themestyles.See]} >{all2 ? "See Less" : "See All"}</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props?.statusbooking}
                    scrollEnabled={false}
                    renderItem={Activitiestatus}
                    contentContainerStyle={{ paddingBottom: 15, borderBottomWidth: 1, marginBottom: 15, borderColor: theme?.bookingboder }}
                  />
                </>
                :
                null
              }
            </>
            :
            null
          }







          {data?.item?.isCancelled ? null : (
            <>
              {Compare && data?.item?.checkInStatus == "Pending" ?
                <Button
                  name={"Cancel"}
                  onPress={() => {
                    if (data?.item?.checkInStatus == "Pending") {
                      props.CancelBooking({
                        BookingId: Number(data?.item?.bookingId),
                        item: data?.item,
                      }, data);
                      return;
                    }
                  }}
                  button={themestyles.button}
                />
                :
                null
              }
              {data?.item?.checkInStatus != "Pending" ?
                data?.item?.checkInStatus == "Checked In" && data?.item?.status == "Current" ?
                  <Button
                    name={"Monitor Live"}
                    onPress={() => { props.Geturl(data?.item?.cameraSerialNo); }}
                    button={themestyles.button}
                  />
                  : data?.item?.status == "History" && (data?.item?.checkInStatus == "Checkout" || data?.item?.checkInStatus == "Checked In") ?
                    <Button
                      name={"Review & Rating"}
                      onPress={() => { props.GetReview(data?.item?.bookingId); }}
                      button={themestyles.button}
                    />
                    : null :
                null
              }
            </>
          )}
        </View>

      </ScrollView >


      <Review
        show2={props?.showreview}
        onPress={() => { props?.Showreview(!props?.showreview) }}
        add={props?.Review?.length > 0 && typeof props?.Review == "object" ? false : true}
        reviews={props?.Review != "not" ? props?.Review : []}
        Reviewsss={{
          centerName: data?.item?.centerName,
          bookingId: data?.item?.bookingId,
        }}
      />
    </SafeAreaView >
  );
};

const mapState = (state) => {
  return {
    showreview: state.booking.showreview,
    loader: state.user.loader,
    statusbooking: state.booking.statusbooking,
    MealStatus: state.booking.MealStatus,
    Review: state.booking.Review,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Showreview: (data) => dispatch(Showreview(data)),
    CancelBooking: (data, params) => dispatch(CancelBooking(data, params)),
    addReview: (data) => dispatch(addReview(data)),
    GetReview: (data) => dispatch(GetReview(data)),
    Geturl: (data) => dispatch(Geturl(data)),
    GetFacilityStatusByDateBookingId: (data, item) => dispatch(GetFacilityStatusByDateBookingId(data, item)),
  };
};

export default connect(mapState, mapDispatchToProps)(MyComponent);
