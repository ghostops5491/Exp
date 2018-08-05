import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
   paddingBottom: getResponsiveCSSFrom8(Metrics.baseMargin).height,
  },
  logo: {
   marginTop: getResponsiveCSSFrom8(Metrics.doubleSection).height,
   height: getResponsiveCSSFrom8(Metrics.images.logo).height,
   width: getResponsiveCSSFrom8(Metrics.images.logo).width,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  button: {
   width: getResponsiveCSSFrom8(280).width,
 height: getResponsiveCSSFrom8(46).height,
 borderRadius: getResponsiveCSSFrom8(2).width,
  	backgroundColor: Colors.midBlue,
  },
  buttonText: {
    width: '100%',
 height: getResponsiveCSSFrom8(18).height,
  	fontFamily: "Roboto-Regular",
 fontSize: getResponsiveCSSFrom8(14).width,
  	fontWeight: "200",
  	textAlign: "center",
  	color: Colors.white,
  },
  buttonInactive: {
   width: getResponsiveCSSFrom8(280).width,
 height: getResponsiveCSSFrom8(46).height,
 borderRadius: getResponsiveCSSFrom8(2).width,
  	backgroundColor: Colors.midBlue,
    color: Colors.white,
    opacity: 0.6,
  },
  buttonSecondry: {
   width: getResponsiveCSSFrom8(280).width,
 height: getResponsiveCSSFrom8(48).height,
 borderRadius: getResponsiveCSSFrom8(2).width,
  	backgroundColor: Colors.warmGrey,
  },
  buttonSecondryInactive: {
   width: getResponsiveCSSFrom8(280).width,
 height: getResponsiveCSSFrom8(48).height,
 borderRadius: getResponsiveCSSFrom8(2).width,
  	backgroundColor: Colors.warmGrey,
    opacity: 0.6,
  },
  buttonCarpet: {
   width: getResponsiveCSSFrom8(130).width,
 height: getResponsiveCSSFrom8(60).height,
 borderRadius: getResponsiveCSSFrom8(2).width,
  	backgroundColor: Colors.midBlue
  },
  buttonCarpetInactive: {
   width: getResponsiveCSSFrom8(130).width,
 height: getResponsiveCSSFrom8(60).height,
 borderRadius: getResponsiveCSSFrom8(2).width,
  	backgroundColor: Colors.midBlue,
    opacity: 0.6,
  },
})
