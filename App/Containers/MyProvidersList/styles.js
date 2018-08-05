import { StyleSheet } from "react-native"
import { Metrics, ApplicationStyles, Colors, Fonts } from "App/Themes"
import { getResponsiveCSSFrom8 } from "../../Lib/Utils"

export default StyleSheet.create({
  searchRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  searchInnerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  searchBar: {
    width: "75%"
  },
  shareButton: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  successMessage: {
    ...Fonts.style.activeMenuItem,
    textAlign: "center",
   fontSize: getResponsiveCSSFrom8(18).width,
   marginVertical: getResponsiveCSSFrom8(10).height,
  },
  input: {
    borderColor: Colors.grayFive,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: "300",
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
    flex: 1
  },
  sections: {
    ...Fonts.style.bodyText,
   height: getResponsiveCSSFrom8(42).height,
  },
  shareText: {
    ...Fonts.style.bodyText,
    textAlign: "center",
    fontSize: getResponsiveCSSFrom8(10).width,
   marginBottom: getResponsiveCSSFrom8(-5).height,
  },
  shareIcon: {
    textAlign: "center"
  },
  categoryText: {
    textAlign: "center",
    fontSize: getResponsiveCSSFrom8(20).width,
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
    flexDirection: "row",
   shadowRadius: getResponsiveCSSFrom8(1).width,
    shadowOpacity: 1
  },
  userInfo: {
    display: "flex",
   marginLeft: getResponsiveCSSFrom8(10).width,
    flexDirection: "column"
  },
  providerName: {
   marginLeft: getResponsiveCSSFrom8(2).width,
    fontFamily: "Roboto-Medium",
   fontSize: getResponsiveCSSFrom8(16).width,
  },
  activityIndicator: {
    height: getResponsiveCSSFrom8(20).height,
  },
  buttonsContainer: {
    flex: 2,
    marginTop: getResponsiveCSSFrom8(10).height,
    marginBottom: getResponsiveCSSFrom8(10).height,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonNext: {
    height: 50,
    margin: getResponsiveCSSFrom8(10).width,
    width: '45%',
    justifyContent: "center",
  },

  buttonCancel: {
    height: 50,
    margin: getResponsiveCSSFrom8(10).width,
    backgroundColor: 'grey',
    width: '45%',
    justifyContent: "center",
  },

  buttonsText: {
    ...Fonts.style.buttonText,
    fontSize: getResponsiveCSSFrom8(20).width,
    alignSelf: "stretch",
    textAlignVertical: "center",
    width: '100%'
  },
})
