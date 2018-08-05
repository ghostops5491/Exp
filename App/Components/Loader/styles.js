import { StyleSheet } from 'react-native'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default StyleSheet.create({
  loader: {
    height: getResponsiveCSSFrom8(20).height
  },
  loaderContainer: {
    position: 'absolute',
   top: getResponsiveCSSFrom8(0).height,
   left: getResponsiveCSSFrom8(0).width,
   right: getResponsiveCSSFrom8(0).width,
   bottom: getResponsiveCSSFrom8(0).height,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center'
  }
})
