import { StyleSheet } from 'react-native'
import { Colors, Fonts, ApplicationStyles, Metrics } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  titleText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(25).height,
  },
  alertTitleText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
    color: Colors.paleRed,
   marginTop: getResponsiveCSSFrom8(25).height,
  },
  button: {
    width: '100%',
   height: getResponsiveCSSFrom8(46).height,
   marginTop: getResponsiveCSSFrom8(10).height,
    backgroundColor: 'rgb(43,91,170)',
  },
  subheadingText: {
    ...Fonts.style.header1,
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
   marginTop: getResponsiveCSSFrom8(20).height,
  },
  cards: {
    ...Fonts.style.bodyText,
  },
  cardsDirectionControl :{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullScreen: {
    flex: 1,
   height: getResponsiveCSSFrom8(Metrics.screenHeight).height,
  }

})
