import { StyleSheet, Dimensions } from "react-native"
import { getResponsiveCSSFrom8 } from "../../Lib/Utils"

const windowDims = Dimensions.get("window")
const { height } = windowDims

export default StyleSheet.create({
  container: {
    flex: 1
  },
  mainContent: {
    flex: 1,
    height: Dimensions.get('window').height
  },
  headerImageWrapper: {
    flex: 0.3
  },
  backgroundImage: {
    flex: 1
  },
  contentView: {
    flex: 0.7,
    padding: 10
  },
  logoContainer: {
    alignSelf: 'stretch',
    height: getResponsiveCSSFrom8(90).height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: getResponsiveCSSFrom8(20).width,
    marginHorizontal: getResponsiveCSSFrom8(20).width
  },
  logo: {
    height: getResponsiveCSSFrom8(80).height,
    width: getResponsiveCSSFrom8(280).width,
    marginHorizontal: getResponsiveCSSFrom8(20).width,
    resizeMode: 'contain'
  }
})
