import { StyleSheet } from 'react-native'
import { Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  logoOuterContainer: {
   marginTop: getResponsiveCSSFrom8(50).height,
    width: '100%',
   height: getResponsiveCSSFrom8(400).height,
  },
  logoContainer: {
   padding: getResponsiveCSSFrom8(88).width,
    flex: 1,
    alignItems: 'stretch',
  },
  logo: {
    flex: 0.68,
   width: getResponsiveCSSFrom8(null).width,
    resizeMode: 'contain'
  },
  bodyText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(-40).height,
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
  },
})
