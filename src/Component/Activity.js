import React, { useEffect, useState } from "react";
import Styles from "../utils/Styles";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, } from "react-native";
import moment from "moment";
import Dropdown from "./Dropdown";
import Textinput from "./TextInput";
import SelectTime from "./SelectTime";
import showToast from "../utils/Toast";
import { useTheme } from "../../Theme";
import check from '../assets/image/check.png';

const MyComponent = (props) => {
  const { theme, width, height, fontFamily, fontSize } = useTheme();
  const themestyles = styles();
  const [bath, setBath] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeaday, setTimeaday] = useState(null);
  const items = [
    { label: "30 Min", value: "1" },
    { label: "1 Hours", value: "2" },
    { label: "2 Hours", value: "3" },
  ];
  const [value, setValue] = useState(null);
  const [time2, setTime] = useState(null);
  const [nodate, setnodate] = useState([]);
  var isselect = props?.selectlist?.filter((item2) => item2?.id == props?.item?.activityId)?.length > 0
  var isactiveselect = props?.selectlist?.filter((item2) => item2?.id == props?.item?.activityId).length > 0


  useEffect(() => {
    setBath(props?.Datess);
    if (props?.item?.name == "Walk & Play" && props?.update == true) {
      setTimeaday(props?.woking?.times ? String(props?.woking?.times) : null);
      setValue(items?.filter((item) => item?.label == props?.woking?.hours)?.length > 0 ? items?.filter((item) => item?.label == props?.woking?.hours)[0] : null);
    }
  }, [props?.Datess]);
  useEffect(() => {
    setTimeout(() => {
      if (props?.statetime?.length > 0 && props?.update == true) {
        var time = props?.statetime?.filter(
          (item2) => item2?.id == props?.item?.activityId
        )[0]?.time;
        if (
          props?.statetime?.filter((item2) => item2?.name == "Walk & Play")
            ?.length == 0
        ) {
          var walking = [];
          setTime(walking);
          props?.onTimes(
            walking,
            props?.statetime?.filter(
              (item2) => item2?.id == props?.item?.activityId
            )?.length > 0
          );
          setnodate([]);
          return;
        }
        if (
          props?.statetime?.filter((item2) => item2?.name == "Walk & Play")
            ?.length > 0
        ) {
          var walking = time?.length > 0 ? time?.split(",") : [time];
          setTime(walking);
          props?.onTimes(
            walking,
            props?.statetime?.filter(
              (item2) => item2?.id == props?.item?.activityId
            )?.length > 0
          );
          setnodate(walking?.map((item) => ({ time: item })));
        } else {
          setTime(time ? time : null);
          props?.onTimes(
            time ? time : null,
            props?.statetime?.filter(
              (item2) => item2?.id == props?.item?.activityId
            )?.length > 0
          );
        }
      }
    }, 2000);
  }, [props?.statetime?.length]);
  useEffect(() => {
    setValue(null)
    setTime(null)
    setTimeaday(null)
  }, [props?.fromTime + props?.toTime])





  const Select = (select, id) => {
    var data = [...bath];
    data[0].bath = select;
    setBath(data);
    props?.OnBath(data, select, id, props?.item);
  }


  const WalkingArray = (timeinday) => {
    var times = [];
    for (let i = 0; i < timeinday?.length; i++) {
      times.push({ time: null });
    }
    setnodate(times);
  };

  const renderItem1 = ({ index, item }) => (
    <SelectTime
      item={item}
      index={index}
      fromTime={props?.fromTime}
      toTime={props?.toTime}
      ifHour={props?.ifHour}
      onTime={(time) => {
        var times = [...nodate];
        times[index].time = time;
        setnodate(times);
        props?.onTimes(times, props?.selectlist?.filter((item2) => item2?.id == props?.item?.activityId)?.length > 0);
      }}
    />
  );
  const renderItem2 = ({ index, item }) => (
    <View style={{ width: "33.3%", justifyContent: "center", marginBottom: 10 }}>
      <TouchableOpacity key={index}
        onPress={() => {
          var data = [...bath];
          data[index].bath = !item?.bath;
          setBath(data);
          props?.OnBath(data, true, props?.item?.activityId, props?.item);
        }} style={[Styles.spacebetween, themestyles?.date3, { width: "95%" }]}>
        <Text style={[themestyles.datetext2, { color: "black" }]}>
          {moment(item?.date).format("DD-MM-YYYY")}
        </Text>
        <View style={[themestyles.box, { backgroundColor: item?.bath ? theme.commongreen : null, height: width / 25, width: width / 25, },]}>
          {item?.bath ? <Image source={check} style={themestyles.check} /> : null}
        </View>
      </TouchableOpacity>
    </View>
  );

  const SelectActi = () => {
    var selectornot = !isactiveselect
    if (props?.item?.name == "Walk & Play" || props?.item?.name == "Bath") {
      props?.onPress();
    }
    if (props?.item?.name == "Bath") {
      if (props?.ifHour) {
        Select(selectornot, props?.item?.activityId)
      } else {
        if (selectornot == false) {
          props?.OnBath(bath?.map(item => ({ date: item?.date, bath: false })), false, null, null);
          setBath(bath?.map(item => ({ date: item?.date, bath: false })));
        }
      }
    }
    if (props?.item?.name == "Walk & Play") {
      props?.OnWalking(value?.value, timeaday, selectornot);
    }
    if (props?.item?.name != "Walk & Play" && props?.item?.name != "Bath") {
      props?.onPress(selectornot);
    }
  }

  return (
    <View key={props?.index} style={[{ minHeight: width / 9, justifyContent: "center" },]}>

      <TouchableOpacity onPress={() => { if (props?.from) { SelectActi() } else { props?.onAlert() } }} style={[Styles.spacebetween, themestyles?.date2]}>
        <View style={[Styles.flexrow, { marginBottom: 0, paddingVertical: 5 }]}>
          <View style={[themestyles.box, { marginRight: 8, backgroundColor: isactiveselect ? theme.commongreen : null }]}>
            {isactiveselect ? (<Image source={check} style={themestyles.check} />) : null}
          </View>
          <Text style={[themestyles.datetext, { color: isactiveselect ? "black" : theme?.placeholder }]}>
            {props?.item?.name + " - " + " Rs. " + String(props?.item?.price) + " / " + (props?.item?.name == "Walk & Play" ? "30 min" : "1 day")}
          </Text>
        </View>
      </TouchableOpacity>

      {isselect && props?.item?.name == "Bath" && props?.ifHour == false ?
        <View >
          <FlatList
            renderItem={renderItem2}
            data={bath}
            scrollEnabled={false}
            key={3}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
        : isselect && props?.item?.name == "Walk & Play" ? (
          <View style={[Styles.spacebetween, { marginBottom: 10 }]}>
            <Dropdown
              open={open}
              value={value}
              items={items}
              setOpen={() => setOpen(!open)}
              setValue={(value) => { setValue(value); props?.OnWalking(value?.value, timeaday, true); }}
              placeholder={"Walking time"}
              style={{ width: "49%" }}
              container={{ height: width / 10, borderRadius: 100, paddingHorizontal: 15 }}
              text={themestyles?.text}
            />
            <Textinput
              keyboardType="number-pad"
              editable={value?.value ? true : false}
              value={timeaday}
              placeholder={"Time in a day"}
              width="49%"
              style={[themestyles?.text, { borderRadius: 100, height: width / 10, }]}
              bottom={0}
              fromTime={props?.fromTime}
              toTime={props?.toTime}
              inbetween={true}
              check={props?.ifHour}
              onChangeText={(text) => {
                if (value?.value) {
                  setTimeaday(text);
                  props?.OnWalking(value?.value, text, true);
                  WalkingArray([...Array.from({ length: text }, (_, i) => i + 1)]);
                } else {
                  showToast("Select Walk & Play time");
                  setTimeaday("");
                }
              }}
            />
          </View>
        ) : null
      }
      {isselect && props?.item?.name != "Walk & Play" && props?.item?.name != "Bath" ? (
        <Textinput
          type="time"
          datetype={0}
          style={{ width: "33%", marginBottom: 10 }}
          placeholder="Time"
          format={null}
          value={time2}
          small={true}
          multiple={true}
          fromTime={props?.fromTime}
          toTime={props?.toTime}
          inbetween={true}
          check={props?.ifHour}
          onChangeText={(time) => {
            setTime(moment(time).format("hh:mm A"));
            props?.onTimes(moment(time).format("hh:mm A"), props?.selectlist?.filter((item2) => item2?.id == props?.item?.activityId)?.length > 0);
          }}
        />
      ) :
        isselect && props?.item?.name == "Walk & Play" && timeaday != null ? (
          <FlatList
            renderItem={renderItem1}
            data={nodate}
            scrollEnabled={false}
            key={3}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        ) : null
      }
    </View>
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
    datetext2: {
      color: theme.darkgreen,
      fontFamily: fontFamily.FontRegular,
      fontSize: fontSize.font15,
      width: "90%",
      flex: 1
    },
    date3: {
      backgroundColor: theme.white,
      borderColor: theme?.border,
      borderWidth: 1,
      borderRadius: 55,
      width: "100%",
      paddingHorizontal: 10,
      height: width / 10,
      backgroundColor: theme.textinputbackground,
    },
    date: {
      borderWidth: 1,
      borderColor: theme.bordercolor,
      borderRadius: 100,
      width: "40%",
      alignSelf: "flex-end",
      paddingHorizontal: 5,
      marginBottom: 5,
      backgroundColor: theme.white,
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
      color: theme.black,
      marginLeft: 5,
      fontFamily: fontFamily.FontRegular,
      fontSize: fontSize.font18,
    },
    text: {
      fontFamily: fontFamily.FontRegular,
      fontSize: fontSize.font15,
      width: "90%",
      flex: 1
    }
  })
}
export default MyComponent;
