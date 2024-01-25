import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const font = () => {
    const { width } = Dimensions.get("screen")
    const { height } = Dimensions.get("screen")
    const [bannerWidth, setBannerWidth] = useState(width)
    const [bannerHeigth, setBannerHeigth] = useState(height)
    useEffect(() => {
        const remove = Dimensions.addEventListener("change", status => {
            setBannerWidth(status.window.width)
            setBannerHeigth(status.window.height)
        })
        return () => {
            remove.remove()
        }
    }, [])
    const fontSize = {
        height: bannerHeigth,
        width: bannerWidth,
        font22: bannerWidth / 22,
        font20: bannerWidth / 24,
        font25: bannerWidth / 18,
        font27: bannerWidth / 16,
        font18: bannerWidth / 26,
        font16: bannerWidth / 30,
        font15: bannerWidth / 32,
        font12: bannerWidth / 35,
        font10: bannerWidth / 40,
        font30: bannerWidth / 15,
    }
    return fontSize
}


export default font;