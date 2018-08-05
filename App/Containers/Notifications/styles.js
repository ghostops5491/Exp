import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.grayThree,
    flex: 1
  },
  header: {
   borderBottomWidth: getResponsiveCSSFrom8(1).width,
    borderBottomColor: Colors.midBlue,
    alignItems: 'center',
    alignSelf : 'center',
   paddingBottom: getResponsiveCSSFrom8(5).height,
   marginTop: getResponsiveCSSFrom8(10).height,
    width : getResponsiveCSSFrom8(150).width
  },
  headerText: {
   fontSize: getResponsiveCSSFrom8(14).width,
    color: Colors.midBlue,
    fontFamily: 'Montserrat-Medium'
  },
  titleText: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(16).width,
   paddingRight: getResponsiveCSSFrom8(10).width,
  },
  unread: {
    fontFamily: 'Montserrat-Medium',
    color: Colors.paleRed,
   fontSize: getResponsiveCSSFrom8(9).width,
    opacity: 0.9,
    // marginLeft: -7,
   paddingTop: getResponsiveCSSFrom8(5).height,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: getResponsiveCSSFrom8(40).height,
  },
  clearView: {
    position: 'absolute',
    right: getResponsiveCSSFrom8(10).width,
    top: getResponsiveCSSFrom8(12).height
  },
  clearText: {
    fontSize: getResponsiveCSSFrom8(12).width,
    color: '#a3a3a3'
  }
})
