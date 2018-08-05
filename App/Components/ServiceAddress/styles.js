import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  headerText: {
    ...Fonts.style.header1,
   marginLeft: getResponsiveCSSFrom8(10).width,
   fontSize: getResponsiveCSSFrom8(12).width,
    width: '50%',
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.00)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.graySix,
   height: getResponsiveCSSFrom8(42).height,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: '400',
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
   marginTop: getResponsiveCSSFrom8(6).height,
  },
  inputOpaque: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.graySix,
   height: getResponsiveCSSFrom8(42).height,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: '400',
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
   marginTop: getResponsiveCSSFrom8(6).height,
  },
  item: {
    width: '100%',
  },
})
