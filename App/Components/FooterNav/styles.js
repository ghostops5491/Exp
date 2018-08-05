import { StyleSheet, Platform } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default StyleSheet.create({
  footer: {
    borderWidth: 0,
    backgroundColor: '#fcfcfc',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: getResponsiveCSSFrom8(0).width,
      height: getResponsiveCSSFrom8(-2).height
    },
    shadowRadius: getResponsiveCSSFrom8(3).width,
    shadowOpacity: 1,
    ...ifIphoneX({
      height: getResponsiveCSSFrom8(30).height
    }, {
      height: getResponsiveCSSFrom8(70).height
    }),
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        zIndex: 1000
      },
      android: {
        elevation: 1000
      }
    })
  },
  badge: {
    position: 'absolute',
   right: getResponsiveCSSFrom8(35).width,
   top: getResponsiveCSSFrom8(5).height,
  },
  tabText: {
    textAlign: 'center',
    fontSize: getResponsiveCSSFrom8(9).height,
    flex: 1
  },
  footerTab: {
    alignItems: 'center',
    flex: 1
  },
  button: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginHorizontal: getResponsiveCSSFrom8(5).width
  }
})
