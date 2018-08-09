import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  hasError: {
   height: getResponsiveCSSFrom8(30).height,
  },
  errorText: {
    fontFamily: Fonts.type.montserrat,
    color: Colors.paleRed,
   fontSize: getResponsiveCSSFrom8(14).width,
  },
  formWrapper: {
   marginLeft: getResponsiveCSSFrom8(10).width,
   marginRight: getResponsiveCSSFrom8(10).width,
  },
  item: {
   marginLeft: getResponsiveCSSFrom8(0).width,
   marginBottom: getResponsiveCSSFrom8(15).height,
    width: '100%',
  },
  icon: {
    position: 'absolute',
   paddingLeft: getResponsiveCSSFrom8(10).width,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
    width: '100%',
   height: getResponsiveCSSFrom8(44).height,
   fontSize: getResponsiveCSSFrom8(14).width,
    fontWeight: "400",
    fontFamily: Fonts.type.montserrat,
    color: Colors.darkSlateBlue,
    opacity: 0.6,
   paddingLeft: getResponsiveCSSFrom8(43).width,
   paddingRight: getResponsiveCSSFrom8(10).width,
  },
  forgotPasswordButton: {
    width: '100%',
   marginTop: getResponsiveCSSFrom8(8).height,
  },
  forgotPasswordButtonText: {
    width: '100%',
    ...ApplicationStyles.buttonText,
  },
  helpingText: {
    ...Fonts.style.label3,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(11).height,
    textDecorationLine: 'underline',
  },
  signUpLine: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(14).width,
   marginTop: getResponsiveCSSFrom8(24).height,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  },
  signUpLink: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(14).width,
 lineHeight: getResponsiveCSSFrom8(18.0).height,
  	textAlign: "center",
  	color: Colors.midBlue,
   marginLeft: getResponsiveCSSFrom8(3).width,
    textDecorationLine: 'underline',
  },
  signUpText: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(14).width,
 lineHeight: getResponsiveCSSFrom8(18.0).height,
  	textAlign: "center",
  	color: Colors.darkSlateBlue,
  },
  activityIndicator: {
   height: getResponsiveCSSFrom8(20).height,
  },
  screenBody: {
   paddingBottom: getResponsiveCSSFrom8(21).height,
   paddingTop: getResponsiveCSSFrom8(25).height,
    flexDirection: 'column',
   minHeight: getResponsiveCSSFrom8(Metrics.screenHeight - 90).height,
    justifyContent: 'flex-start',
   padding: getResponsiveCSSFrom8(15).width,
    backgroundColor: "#fcfcfc",
  },
  nextButton: {
   height: getResponsiveCSSFrom8(48).height,
  },
  nextButtonText: {
    width: '100%',
    color: 'white',
   fontSize: getResponsiveCSSFrom8(16).width,
  },
  bodyTop: {
    flex: 30,
  },
  bodyBottom: {
    flex: 1,
   marginBottom: getResponsiveCSSFrom8(-5).height,
  },
  title:{
    textAlign: 'center',
    color: Colors.grayFour,
   height: getResponsiveCSSFrom8(40).height,
  },
  description: {
    textAlign: 'center',
    color: Colors.darkSlateBlue,
   fontSize: getResponsiveCSSFrom8(16).width,
   lineHeight: getResponsiveCSSFrom8(24).height,
  },
  d_container: {
    textAlign: 'center',
   paddingTop: getResponsiveCSSFrom8(20).height,
    width:'100%',
   height: getResponsiveCSSFrom8(100).height,
  }
})
