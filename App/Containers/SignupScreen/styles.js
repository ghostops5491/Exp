import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  hasError: {
   marginBottom: getResponsiveCSSFrom8(12).height,
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
   borderWidth: getResponsiveCSSFrom8(1).width,
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
   fontSize: getResponsiveCSSFrom8(12).width,
   fontSize: getResponsiveCSSFrom8(14).width,
    fontWeight: "400",
    fontFamily: Fonts.type.montserrat,
    color: Colors.darkSlateBlue,
    opacity: 0.6,
   paddingLeft: getResponsiveCSSFrom8(43).width,
   paddingRight: getResponsiveCSSFrom8(10).width,
  },
  loginButton: {
    width: '100%',
    marginTop: getResponsiveCSSFrom8(12).height,
  },
  loginButtonText: {
    width: '100%',
    ...ApplicationStyles.buttonText,
  },
  signInLine: {
    marginTop: getResponsiveCSSFrom8(12).height,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  },
  signInLink: {
    fontFamily: Fonts.type.roboto,
 fontSize: getResponsiveCSSFrom8(14).width,
 lineHeight: getResponsiveCSSFrom8(18.0).height,
  	textAlign: "center",
  	color: Colors.midBlue,
   marginLeft: getResponsiveCSSFrom8(3).width,
    textDecorationLine: 'underline',
  },
  signInText: {
    fontFamily: Fonts.type.roboto,
 fontSize: getResponsiveCSSFrom8(14).width,
 lineHeight: getResponsiveCSSFrom8(18.0).height,
  	textAlign: "center",
  	color: Colors.darkSlateBlue,
  },
  activityIndicator: {
    height: getResponsiveCSSFrom8(20).height
  },
  infoMessage: {
    fontSize: 12,
  	lineHeight: 18.0,
    marginBottom: 5,
  	textAlign: "center",
  	color: Colors.warmGreyTwo,
  }
})
