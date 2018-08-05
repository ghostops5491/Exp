import { StyleSheet } from "react-native"
import { Metrics, ApplicationStyles, Colors, Fonts } from "App/Themes"
import { getResponsiveCSSFrom8 } from "../../Lib/Utils"

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.grayThree,
    flex: 1,
    marginTop: getResponsiveCSSFrom8(25).height
  }
})
