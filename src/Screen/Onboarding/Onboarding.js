import { View } from "react-native";
import CustomImageSlider from "./CustomImageSlider";

const App = () => {
    const images = [
        require("../../assets/image/Onboarding/onbording1.jpg"),
        require("../../assets/image/Onboarding/onbording4.png"),
        require("../../assets/image/Onboarding/onbording3.jpg"),
    ];

    return (
        <View style={{ flex: 1 }}>
            <CustomImageSlider images={images} />
        </View>
    );
};


export default App;
