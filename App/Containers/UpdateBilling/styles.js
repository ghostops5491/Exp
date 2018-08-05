import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  screenBody: {
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    ...Fonts.style.label2,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(32).height,
   fontSize: getResponsiveCSSFrom8(14).width,
  },
  descriptionText: {
    ...Fonts.style.bodyText,
    textAlign: 'left',
   marginTop: getResponsiveCSSFrom8(28).height,
  },
  item: {
   marginLeft: getResponsiveCSSFrom8(0).width,
    width: '100%',
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
   height: getResponsiveCSSFrom8(42).height,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: "300",
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
    opacity: 0.6,
   marginTop: getResponsiveCSSFrom8(20).height,
  },
  updateButton: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginTop: getResponsiveCSSFrom8(40).height,
  },
})
