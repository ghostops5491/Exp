import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from 'App/Themes'
import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default StyleSheet.create({
  applicationView: {
    flex: 1,
    ...ifIphoneX({
      marginTop: -40
    })
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
   fontSize: getResponsiveCSSFrom8(20).width,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
   margin: getResponsiveCSSFrom8(Metrics.baseMargin).width,
  },
  myImage: {
   width: getResponsiveCSSFrom8(200).width,
   height: getResponsiveCSSFrom8(200).height,
    alignSelf: 'center'
  }
})
