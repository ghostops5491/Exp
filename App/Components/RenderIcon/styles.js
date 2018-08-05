import { StyleSheet } from "react-native"
import { Colors } from "App/Themes"
import { getResponsiveCSSFrom8 } from "../../Lib/Utils"

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    flex: 1,
    width: getResponsiveCSSFrom8(25).width,
    resizeMode: "contain"
  }
})
