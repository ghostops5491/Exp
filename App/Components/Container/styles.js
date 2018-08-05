import { StyleSheet } from 'react-native'
import { Colors } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
   borderRadius: getResponsiveCSSFrom8(2).width,
  	borderStyle: "solid",
 borderWidth: getResponsiveCSSFrom8(1).width,
  	borderColor: Colors.graySix,
   marginBottom: getResponsiveCSSFrom8(3).height,
    flex: 1,
   margin: getResponsiveCSSFrom8(5).width,
    shadowColor: "rgba(0, 0, 0, 0.1)",
  	shadowOffset: {
 width: getResponsiveCSSFrom8(0).width,
 height: getResponsiveCSSFrom8(0).height,
  	},
 shadowRadius: getResponsiveCSSFrom8(2).width,
  	shadowOpacity: 1
  }
})
