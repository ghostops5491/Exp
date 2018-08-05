import {  Platform, StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: "#fcfcfc",
    justifyContent: 'space-around',
    marginBottom: getResponsiveCSSFrom8(5).height,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: getResponsiveCSSFrom8(0).width,
      height: getResponsiveCSSFrom8(1).height,
    },
    shadowRadius: getResponsiveCSSFrom8(1).width,
    shadowOpacity: 1,
  },
  innerBody: {
    width: '100%',
    height: getResponsiveCSSFrom8(50).height
  },
  logoContainer: {
    width: getResponsiveCSSFrom8(150).width,
    height: '100%',
    alignSelf: 'center'
  },
  logo: {
    flex: 1,
    width: getResponsiveCSSFrom8(null).width,
    resizeMode: 'contain'
  }
})
