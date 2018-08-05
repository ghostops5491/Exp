import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
     width: getResponsiveCSSFrom8(0).width,
     height: getResponsiveCSSFrom8(0).height,
    },
   shadowRadius: getResponsiveCSSFrom8(2).width,
    shadowOpacity: 1,
  },
  sectionBody: {
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
   marginBottom: getResponsiveCSSFrom8(11).height,
   marginTop: getResponsiveCSSFrom8(11).height,
  },
  titleText:{
    ...Fonts.style.header1,
  },
  title: {
   marginTop: getResponsiveCSSFrom8(20).height,
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginBottom: getResponsiveCSSFrom8(10).height,
  }
})
