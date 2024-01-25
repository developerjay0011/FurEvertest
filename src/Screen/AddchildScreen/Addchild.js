import React, { useEffect, useRef, useState } from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import { useNavigation } from '@react-navigation/native';
import Styles from "../../utils/Styles"
import Imagepicker from "../../Component/Imagepicker"
import Button from "../../Component/Button"
import Textinput from "../../Component/TextInput"
import Dropdown from "../../Component/Dropdown"
import { connect } from 'react-redux';
import { AddEditChildDetail, EditChildimage, EditChildVaccine, MedicalCertificate } from "../../Redux/actions/user"
import editimage from '../../assets/image/Profile/editimage.png';
import check from '../../assets/image/check.png';
import addimage from '../../assets/image/addimage.png';
import showToast from '../../utils/Toast';
import SuccessModal from "../../Component/Modal"
import { useTheme } from '../../../Theme';


const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    const navigation = useNavigation()
    const edit = props.route.params
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState(null);
    const [name, setName] = useState(null);
    const [openmodal, setopenmodal] = useState(false);
    const [age, setAge] = useState(null);
    const [ecolor, setEcolor] = useState(null);
    const [weight, setWeight] = useState(null);
    const [Vaccine, setVaccine] = useState(null);
    const [images, setImage] = useState(null);
    const [images2, setImage2] = useState(null);
    const [currently, setcurrently] = useState(null);
    const image = useRef()


    useEffect(() => {
        if (edit?.data) {
            setVaccine({ image: edit?.data?.vaccineCertificate })
            setImage({ image: edit?.data?.childImage })
            setImage2({ image: edit?.data?.medicalCertificate })
            setName(edit?.data?.name)
            setValue({ label: edit?.data?.childType })
            setAge(edit?.data?.age.toString())
            setWeight(edit?.data?.weight)
            setcurrently(edit?.data?.aggressive)
            setEcolor(edit?.data?.eyeColor)
            setValue2(edit?.data?.identification)
            setValue3({ label: edit?.data?.vaccinationStatus })
            setValue4({ label: edit?.data?.medicalCondition })
        }
        if (props.addchild == null) {
            setopenmodal(false)
        } else {
            setopenmodal(true)
        }
    }, [props.addchild])


    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header onPress={() => navigation.goBack()} name={"Add Pet"} />
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={[themestyles.Recommendations]}>{edit?.data?.childId ? "Pet Profile" : "Add Pet Profile"} </Text>

                    <View style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 30 }}>
                        {edit?.data?.childId || images?.image ?
                            <Image source={{ uri: images?.image }} style={[themestyles.profile]} />
                            :
                            <TouchableOpacity onPress={() => { image.current.open() }} activeOpacity={.5} style={[themestyles.profile, { borderWidth: 1, backgroundColor: theme.textinputbackground, borderColor: theme?.border, justifyContent: "center", alignItems: "center" }]}>
                                <Image source={images?.image ? images?.image : addimage} style={[themestyles.icon, { tintColor: theme?.placeholder }]} />
                                <Text style={[themestyles.placeholder]}>Add Pet Pic</Text>
                            </TouchableOpacity>
                        }
                        {edit?.data?.childId || images?.image ?
                            <TouchableOpacity onPress={() => { image.current.open() }} activeOpacity={.5} style={themestyles.edit}>
                                <Image source={editimage} style={themestyles.icon} />
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>

                    <Textinput value={name}
                        label="Pet Name"
                        placeholder={"Enter Pet Name"} bottom={10} onChangeText={(text) => { setName(text) }} />

                    <Dropdown
                        open={open}
                        value={value}
                        items={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                        setOpen={() => setOpen(!open)}
                        setValue={(value) => setValue(value)}
                        placeholder={"Pet Gender"}
                        label="Pet Gender"
                    />

                    <View style={[Styles.spacebetween, { marginBottom: 0 }]}>
                        <Textinput
                            label="Age"
                            keyboardType="number-pad" bottom={0} value={age} placeholder={"Age"} width="49%" onChangeText={(text) => { setAge(text) }} />
                        <Textinput label="Weight" bottom={0} value={weight} placeholder={"Weight"} width="49%" onChangeText={(text) => { setWeight(text) }} />
                    </View>

                    <View style={[Styles.spacebetween, { marginBottom: 0 }]}>
                        <Textinput label="Eye color" value={ecolor} bottom={0} placeholder={"Eye color"} width="49%" onChangeText={(text) => { setEcolor(text) }} />
                        <Textinput label="Breed" value={value2} bottom={0} placeholder={"Breed"} width="49%" onChangeText={(text) => { setValue2(text) }} />
                    </View>

                    <Dropdown
                        open={open3}
                        value={value3}
                        items={props?.vaccination}
                        setOpen={() => setOpen3(!open3)}
                        setValue={(value) => setValue3(value)}
                        placeholder={"Vaccination Status"}
                        label="Vaccination Status"
                    />
                    <Dropdown
                        open={open4}
                        value={value4}
                        items={props?.medicalConditions}
                        setOpen={() => setOpen4(!open4)}
                        setValue={(value) => setValue4(value)}
                        placeholder={"Medical Condition"}
                        label="Medical Condition"
                    />


                    <Textinput
                        label="Vaccine Certificate"
                        type="upload" value={Vaccine} placeholder={"Vaccine Certificate"} onChangeText={(text) => {
                            setVaccine(text)
                            if (edit?.data?.childId) {
                                props.EditChildVaccine({
                                    ChildId: edit?.data?.childId ? edit?.data?.childId : 0,
                                    UserId: global.id,
                                    VaccineCertificate: text
                                })
                            }
                        }} />

                    <Textinput
                        label="Pet Registration Certificate (Optional)"
                        type="upload" value={images2} placeholder={"Pet Registration Certificate (Optional)"} onChangeText={(text) => {
                            setImage2(text)
                            if (edit?.data?.childId) {
                                props.MedicalCertificate({
                                    ChildId: edit?.data?.childId ? edit?.data?.childId : 0,
                                    UserId: global.id,
                                    MedicalCertificate: text,
                                })
                            }
                        }} />


                    <View style={[Styles.spacebetween, themestyles.date2]} >
                        <Text style={[themestyles.datetext, { width: "60%" }]}>Is your pet Aggressive?</Text>
                        <View style={[Styles.flexrow]}>
                            <TouchableOpacity onPress={() => { setcurrently(true) }} style={[themestyles.box, { marginLeft: 13, marginRight: 8, backgroundColor: currently == true ? theme.commongreen : null }]}>
                                {currently == true ? <Image source={check} style={themestyles.check} /> : null}
                            </TouchableOpacity>
                            <Text style={[themestyles.datetext]}>Yes</Text>
                            <TouchableOpacity onPress={() => { setcurrently(false) }} style={[themestyles.box, { marginLeft: 13, marginRight: 8, backgroundColor: currently == false ? theme.commongreen : null }]}>
                                {currently == false ? <Image source={check} style={themestyles.check} /> : null}
                            </TouchableOpacity>
                            <Text style={[themestyles.datetext]}>No</Text>
                        </View>
                    </View>
                    <Button name={edit?.data?.childId ? "Update" : "Save"}
                        onPress={() => {
                            if (name == "" || name == null) {
                                showToast("Please enter name")
                                return
                            }
                            if (value == "" || value == null) {
                                showToast("Please enter pet gender")
                                return
                            }
                            if (age == "" || age == null) {
                                showToast("Please enter pet age")
                                return
                            }
                            if (weight == "" || weight == null) {
                                showToast("Please enter pet weight")
                                return
                            }
                            if (ecolor == "" || ecolor == null) {
                                showToast("Please enter pet eye color")
                                return
                            }
                            if (value3 == "" || value3 == null) {
                                showToast("Please enter pet vaccine status")
                                return
                            }
                            if (value3?.label == "Not vaccinated") {
                                showToast("Please vaccinate your pet")
                                return
                            }
                            if (Vaccine == "" || Vaccine == null) {
                                showToast("Please enter vaccine certificate")
                                return
                            }
                            if (images == "" || images == null) {
                                showToast("Please enter pet image")
                                return
                            }
                            if (currently == null) {
                                showToast("Please select pet is aggressive or not aggressive")
                                return
                            }
                            if (edit?.data?.childId) {
                                props.AddEditChildDetail({
                                    ChildId: edit?.data?.childId,
                                    UserId: global.id,
                                    Name: name,
                                    ChildType: value?.label,
                                    Age: age,
                                    Weight: weight,
                                    Identification: value2,
                                    VaccinationStatus: value3?.label,
                                    MedicalCondition: value4?.label,
                                    ecolor: ecolor,
                                    Aggressive: currently
                                })
                            } else {
                                props.AddEditChildDetail({
                                    ChildId: 0,
                                    UserId: global.id,
                                    Name: name,
                                    ChildType: value?.label,
                                    Age: age,
                                    Weight: weight,
                                    Identification: value2,
                                    VaccinationStatus: value3?.label,
                                    MedicalCondition: value4?.label,
                                    VaccineCertificate: Vaccine,
                                    MedicalCertificate: images2,
                                    ChildImage: images,
                                    ecolor: ecolor,
                                    Aggressive: currently
                                })
                            }
                        }}
                        button={{ marginBottom: 20, marginTop: 30, width: "90%" }} />



                </View>
            </ScrollView>
            <Imagepicker
                open={image}
                refs={image}
                crop={true}
                size={{ height: width / 1.2, width: width / 1.2, circle: true }}
                setopen={() => { image.current.close() }}
                upload={(item) => {
                    setImage(item)
                    if (edit?.data?.childId) {
                        props.EditChildimage({
                            ChildId: edit?.data?.childId ? edit?.data?.childId : 0,
                            UserId: global.id,
                            ChildImage: item,
                        })
                    }
                }}
            />
            <SuccessModal
                openmodal={openmodal}
                success={props?.addchild}
                text={"Add Pet failed.\nPlease try again."}
                Stitletext="Success"
                stext={"Pet added Successfully.\nThank you"}
                Ftitletext="Failed"
                onPress={() => { setopenmodal(!openmodal); }}
                Okay={() => { setopenmodal(!openmodal), navigation.goBack() }}
                Cancel={() => { setopenmodal(!openmodal) }}
                Tryagain={() => {
                    setopenmodal(!openmodal)
                    props.AddEditChildDetail({
                        ChildId: 0,
                        UserId: global.id,
                        Name: name,
                        ChildType: value?.label,
                        Age: age,
                        Weight: weight,
                        Identification: value2,
                        VaccinationStatus: value3?.label,
                        MedicalCondition: value4?.label,
                        VaccineCertificate: Vaccine,
                        MedicalCertificate: images2,
                        ChildImage: images,
                        ecolor: ecolor,
                        Aggressive: currently
                    })
                }}
            />

        </SafeAreaView>
    );
};



const mapState = (state) => {
    return {
        addchild: state.booking.addchild,
        loader: state.user.loader,
        medicalConditions: state.common.medicalConditions,
        vaccination: state.common.vaccination
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddEditChildDetail: (data) => dispatch(AddEditChildDetail(data)),
        EditChildVaccine: (data) => dispatch(EditChildVaccine(data)),
        MedicalCertificate: (data) => dispatch(MedicalCertificate(data)),
        EditChildimage: (data) => dispatch(EditChildimage(data)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);