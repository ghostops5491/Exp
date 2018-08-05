import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    //flexDirection: 'column',
    // width: Metrics.screenWidth,
    // height: Metrics.screenHeight,
    backgroundColor: Colors.white,
    // fontFamily: 'Montserrat-Light',
  },

  paddedContainer: {
   paddingHorizontal: getResponsiveCSSFrom8(20).width,
   marginTop: getResponsiveCSSFrom8(30).height,

    // width: Metrics.screenWidth,
    //flexDirection: 'column',
  },
  headingText: {
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 2,
   marginTop: getResponsiveCSSFrom8(30).height,
   marginBottom: getResponsiveCSSFrom8(30).height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // fontFamily: 'Montserrat-Medium',
  },
  acceptButton: {
   height: getResponsiveCSSFrom8(50).height,
    borderColor: Colors.turtleGreen,
    backgroundColor: 'white',
    width: '45%',
  },

  rejectButton: {
   height: getResponsiveCSSFrom8(50).height,
    borderColor: Colors.paleRed,
    backgroundColor: 'white',
    width: '45%',
  },

  buttonsText: {
    fontFamily: 'Montserrat-SemiBold',
    width: '100%'
  },
  scrollList: {
    justifyContent: 'flex-start',
  },
  successMessage: {
    ...Fonts.style.activeMenuItem,
    textAlign: 'center',
   fontSize: getResponsiveCSSFrom8(18).width,
   marginVertical: getResponsiveCSSFrom8(10).height,
  },
  input: {
    borderColor: Colors.grayFive,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: "300",
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue
  },
  sections: {
    ...Fonts.style.bodyText,
   height: getResponsiveCSSFrom8(42).height,
  },
  rowContainer: {
    backgroundColor: Colors.white,
   borderRadius: getResponsiveCSSFrom8(2).width,
   paddingHorizontal: getResponsiveCSSFrom8(14).width,
   paddingVertical: getResponsiveCSSFrom8(13).height,
   marginBottom: getResponsiveCSSFrom8(6).height,
   margin: getResponsiveCSSFrom8(10).width,
    shadowColor: "rgba(0, 0, 0, 0.1)",
  	shadowOffset: {
 width: getResponsiveCSSFrom8(0).width,
 height: getResponsiveCSSFrom8(0).height,
    },
    flexDirection: 'row',
    alignItems: 'stretch',
 shadowRadius: getResponsiveCSSFrom8(1).width,
    shadowOpacity: 1,
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
  },
  userInfo: {
    display: 'flex',
   marginLeft: getResponsiveCSSFrom8(10).width,
    flexDirection: 'column',
  },
  providerName: {
   marginLeft: getResponsiveCSSFrom8(2).width,
    fontFamily: 'Roboto-Medium',
   fontSize: getResponsiveCSSFrom8(16).width,
  },
  checkBoxOuter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  activityIndicator: {
   height: getResponsiveCSSFrom8(20).height,
  },
})
