import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  avatar: {
   width: getResponsiveCSSFrom8(50).width,
   height: getResponsiveCSSFrom8(50).width,
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(26).width,
    borderColor: 'white',
    overflow: 'hidden',
  },
  providerName: {
    ...Fonts.style.activeMenuItem,
   fontSize: getResponsiveCSSFrom8(16).width,
  },
  ratingInteger: {
    ...Fonts.style.label1,
   fontSize: getResponsiveCSSFrom8(10).width,
   marginTop: getResponsiveCSSFrom8(7).height,
  },
})
