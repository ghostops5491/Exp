import { StyleSheet } from 'react-native'
import { Colors } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  button: {
   width: getResponsiveCSSFrom8(46).width,
   height: getResponsiveCSSFrom8(46).height,
    backgroundColor: Colors.grayTwo,
  },
  buttonText: {
    width: "100%",
    fontWeight: 'bold',
   fontSize: getResponsiveCSSFrom8(35).width,
    color: Colors.midBlue,
   paddingTop: getResponsiveCSSFrom8(4).height,
   paddingLeft: getResponsiveCSSFrom8(14).width,
  }
})
