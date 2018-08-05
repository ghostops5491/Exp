import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({

  starControl: {
   paddingTop: getResponsiveCSSFrom8(3).height,
    display: 'flex',
    flexDirection: 'row',
  },
  star: {
   marginHorizontal: getResponsiveCSSFrom8(3.7).width,
   width: getResponsiveCSSFrom8(12.5).width,
   height: getResponsiveCSSFrom8(12.5).height,
  },
  rating: {
   marginLeft: getResponsiveCSSFrom8(10).width,
    color: Colors.graySix,
    fontFamily: 'Roboto-Medium',
   fontSize: getResponsiveCSSFrom8(12).width,
  }

})