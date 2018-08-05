import { StyleSheet } from 'react-native'
import { Colors, Metrics } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  photoGrid: {
    alignItems: 'center'
  },
  photo: {
   width: getResponsiveCSSFrom8(150).width,
   height: getResponsiveCSSFrom8(150).height,
   marginVertical: getResponsiveCSSFrom8(10).height,
  },
})
