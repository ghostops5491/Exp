import { Platform, StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from "App/Themes"
import { getResponsiveCSSFrom8 } from "../../Lib/Utils"

export default StyleSheet.create({
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  container: {
    ...ApplicationStyles.screen.container
  },
  titleText: {
    ...Fonts.style.header1,
    textAlign: "center",
    marginTop: getResponsiveCSSFrom8(32).height
  },
  scheduleJobText: {
    ...Fonts.style.bodyText,
    marginTop: getResponsiveCSSFrom8(29).height
  },
  subheadingTitleText: {
    ...Fonts.style.header2,
    marginTop: getResponsiveCSSFrom8(26).height,
    marginBottom: getResponsiveCSSFrom8(6).height
  },
  item: {
   marginLeft: getResponsiveCSSFrom8(0).width,
    width: "100%"
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
    minHeight: getResponsiveCSSFrom8(42).height,
    fontSize: getResponsiveCSSFrom8(16).height,
    fontWeight: "300",
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
    opacity: 0.6,
    width: "100%"
  },
  nextButton: {
    width: "100%",
    height: getResponsiveCSSFrom8(46).height,
    marginTop: getResponsiveCSSFrom8(25).height
  },
  photoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  photo: {
    width: getResponsiveCSSFrom8(150).width,
    height: getResponsiveCSSFrom8(150).width,
    marginVertical: getResponsiveCSSFrom8(10).height
  },
  photoButton: {
    backgroundColor: "#eeefef",
    height: getResponsiveCSSFrom8(70).width,
    width: getResponsiveCSSFrom8(70).width,
    marginTop: getResponsiveCSSFrom8(10).height
  },
  buttonImage: {
    marginHorizontal: getResponsiveCSSFrom8(12).height
  },
  problemCategoryDropdownTextStyle: {
    backgroundColor: "transparent",
    fontSize: getResponsiveCSSFrom8(16).height,
   width: getResponsiveCSSFrom8(331).width,
    color: Colors.darkSlateBlue,
    padding: getResponsiveCSSFrom8(10).width
  },
  problemCategoryDropdownDropdownStyle: {
    width: "88.8%",
   marginLeft: getResponsiveCSSFrom8(-1).width,
    marginTop: (Platform.OS === 'android') ? getResponsiveCSSFrom8(-15).height : 0
  },
  dropdownRow: {
    flexDirection: "row",
    height: getResponsiveCSSFrom8(40).height,
    alignItems: "center"
  },
  dropdownRowText: {
   marginHorizontal: getResponsiveCSSFrom8(11).width,
    fontSize: getResponsiveCSSFrom8(16).height,
    color: Colors.darkSlateBlue,
    textAlignVertical: "center"
  },
  hasError: {
    ...ApplicationStyles.hasError
  },
  errorText: {
    ...ApplicationStyles.errorText
  },
  notesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  notesCounter: {
    color: '#d3d3d3',
    fontSize: getResponsiveCSSFrom8(12).height,
    marginBottom: getResponsiveCSSFrom8(6).height
  }
})
