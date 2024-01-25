import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import { useNavigation } from '@react-navigation/native';
import Styles from "../../utils/Styles"
import Button from "../../Component/Button"
import { connect } from 'react-redux';
import ImageView from "react-native-image-viewing";
import { AddEditChildDetail } from '../../Redux/actions/user';
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation()
    const [Vaccine, setVaccine] = useState(null);
    const [medical, Setmedical] = useState(null);
    const [visible, setIsVisible] = useState(false);
    const [visible1, setIsVisible1] = useState(false);
    const [visible2, setIsVisible2] = useState(false);
    useEffect(() => {
        setVaccine({ image: props?.Child?.vaccineCertificate })
        Setmedical({ image: props?.Child?.medicalCertificate })
    }, [props?.Child])
    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header onPress={() => navigation.goBack()} name={"Pet Details"} />
                <View style={{ height: width / 3.5, width: "100%", borderRadius: 10, backgroundColor: theme.Buttoncolor }}>
                    <TouchableOpacity onPress={() => setIsVisible1(true)} style={[{ marginTop: 30, alignSelf: "center" }]}>
                        <Image
                            source={{ uri: props?.Child?.childImage }}
                            style={[themestyles.image, {
                                width: width / 2.5,
                                borderRadius: width,
                                height: width / 2.5,
                            }]}
                        />
                    </TouchableOpacity>
                </View>


                <Text style={[themestyles.name2, { fontSize: fontSize.font25, marginTop: 30 - width / 3.5 + width / 2.5, textAlign: "center" }]}>{props?.Child?.name}</Text>
                <Text style={[themestyles.name2, { fontSize: fontSize.font20 }]}>Details :</Text>

                <View style={[Styles.spacebetween, { alignItems: "center" }]}>
                    <View style={[Styles.flexrow, { marginBottom: 2, width: "40%" }]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Age : <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.age} years</Text></Text>
                    </View>
                    <View style={[Styles.flexrow, { marginBottom: 2, width: "60%" }]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Vaccine status : <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.vaccinationStatus}</Text></Text>
                    </View>
                </View>

                <View style={[Styles.spacebetween, { alignItems: "center" }]}>
                    <View style={[Styles.flexrow, { marginBottom: 2, width: "40%" }]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Weight :  <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.weight}</Text></Text>
                    </View>
                    <View style={[Styles.flexrow, { marginBottom: 2, width: "60%" }]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Medical Condition : <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.medicalCondition}</Text></Text>
                    </View>
                </View>

                <View style={[Styles.spacebetween, { alignItems: "center" }]}>
                    <View style={[Styles.flexrow, themestyles.row]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Eye color : <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.eyeColor}</Text></Text>
                    </View>
                    <View style={[Styles.flexrow, { marginBottom: 2, width: "60%" }]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Breed : <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.identification}</Text></Text>
                    </View>
                </View>

                <View style={[Styles.spacebetween, { alignItems: "center" }]}>
                    <View style={[Styles.flexrow, themestyles.row]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Gender : <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.childType}</Text></Text>
                    </View>
                    <View style={[Styles.flexrow, { marginBottom: 2, width: "60%" }]}>
                        <View style={themestyles.dot}></View>
                        <Text style={[themestyles.renderItemtext, { fontSize: width / 30, }]}>Aggressive : <Text style={[{ fontFamily: fontFamily.FontRegular }]}>{props?.Child?.aggressive == true ? "Yes" : "No"}</Text></Text>
                    </View>
                </View>

                <View style={Styles.spacebetween}>
                    <View style={{ width: "48%" }}>
                        <Text style={[themestyles.name2, { fontSize: width / 30, marginTop: 10 }]}>Vaccine Certificate :</Text>
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <Image source={{ uri: Vaccine?.image }} resizeMode="stretch" style={themestyles.image2} />
                        </TouchableOpacity>
                    </View>
                    {medical?.image != "https://api.furever.in:7775/wwwroot/ChildMedicalCertificate/" ?
                        <View style={{ width: "48%" }}>
                            <Text style={[themestyles.name2, { fontSize: width / 30, marginTop: 10 }]}>Pet Registration Certificate :</Text>
                            <TouchableOpacity onPress={() => setIsVisible(true)}>
                                <Image source={{ uri: medical?.image }} resizeMode="stretch" style={themestyles.image2} />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                </View>

                <ImageView
                    images={[{ uri: Vaccine?.image }]}
                    imageIndex={0}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                />
                <ImageView
                    images={[{ uri: medical?.image }]}
                    imageIndex={0}
                    visible={visible2}
                    onRequestClose={() => setIsVisible2(false)}
                />
                <ImageView
                    images={[{ uri: props?.Child?.childImage }]}
                    imageIndex={0}
                    visible={visible1}
                    onRequestClose={() => setIsVisible1(false)}
                />
                <Button name="Edit" onPress={() => {
                    props.AddEditChildDetail(null),
                        navigation.navigate("Addchild", { edit: true, data: props?.Child })
                }} button={{ marginBottom: 20, marginTop: 40 }} />

            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        Child: state.booking.Child,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        ChildId: (data) => dispatch(ChildId(data)),
        AddEditChildDetail: (data) => dispatch(AddEditChildDetail(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);