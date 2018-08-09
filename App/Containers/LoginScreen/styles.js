import { StyleSheet, Dimensions } from "react-native"
import { Metrics, ApplicationStyles, Colors, Fonts } from "App/Themes"
import { getResponsiveCSSFrom8 } from "../../Lib/Utils"

export default StyleSheet.create({
  hasError: {
    height: getResponsiveCSSFrom8(30).height
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
    width: "100%"
  },
  icon: {
    position: "absolute",
    paddingLeft: getResponsiveCSSFrom8(10).width,
  },
  rightIcon: {
    position: "absolute",
    right: getResponsiveCSSFrom8(13).width,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderWidth: getResponsiveCSSFrom8(1).width,
    borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
    width: "100%",
    height: getResponsiveCSSFrom8(44).height,
    fontSize: getResponsiveCSSFrom8(14).height,
    fontWeight: "400",
    fontFamily: Fonts.type.montserrat,
    color: Colors.darkSlateBlue,
    opacity: 0.6,
    paddingLeft: getResponsiveCSSFrom8(43).width,
    paddingRight: getResponsiveCSSFrom8(10).width,
  },
  passwordInput: {
    paddingRight: getResponsiveCSSFrom8(43).width,
  },
  loginButton: {
    width: "100%",
    marginTop: getResponsiveCSSFrom8(12).height
  },
  loginButtonText: {
    width: "100%",
    ...ApplicationStyles.buttonText
  },
  helpingText: {
    ...Fonts.style.label3,
    textAlign: "center",
    marginTop: getResponsiveCSSFrom8(11).height,
    textDecorationLine: "underline"
  },
  signUpLine: {
    ...Fonts.style.bodyText,
    fontSize: getResponsiveCSSFrom8(14).height,
    marginTop: getResponsiveCSSFrom8(24).height,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center"
  },
  signUpLink: {
    ...Fonts.style.bodyText,
    fontSize: getResponsiveCSSFrom8(14).height,
    lineHeight: getResponsiveCSSFrom8(18.0).height,
    textAlign: "center",
    color: Colors.midBlue,
    marginLeft: getResponsiveCSSFrom8(3).width,
    textDecorationLine: "underline"
  },
  signUpText: {
    ...Fonts.style.bodyText,
    fontSize: getResponsiveCSSFrom8(14).height,
    lineHeight: getResponsiveCSSFrom8(18.0).height,
    textAlign: "center",
    color: Colors.darkSlateBlue
  },
  activityIndicator: {
    height: getResponsiveCSSFrom8(20).height
  }
})
