import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from 'App/Themes'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'

export default StyleSheet.create({
  successMessage: {
    ...Fonts.style.activeMenuItem,
    textAlign: 'center',
    fontSize: getResponsiveCSSFrom8(18).height,
    marginVertical: getResponsiveCSSFrom8(10).height
  },
  buttonText: {
    ...ApplicationStyles.buttonText
  },
  hasError: {
    ...ApplicationStyles.hasError
  },
  errorText: {
    ...ApplicationStyles.errorText
  },
  cameraButton: {
    height: getResponsiveCSSFrom8(130).height,
    marginHorizontal: '34%'
  },
  alertTitleText: {
    ...Fonts.style.bodyText,
    textAlign: 'center',
    color: Colors.paleRed,
   marginTop: getResponsiveCSSFrom8(10).height,
  },
  avatar: {
    width: getResponsiveCSSFrom8(120).width,
    height: getResponsiveCSSFrom8(120).width,
   borderWidth: getResponsiveCSSFrom8(1).width,
    borderRadius: getResponsiveCSSFrom8(60).width,
    borderColor: Colors.grayThree
  },
  avatarContainer: {
    ...Platform.select({
      ios: { zIndex: 1000 },
      android: { elevation: 1000 }
    })
  },
  editProfile: {
    position: 'absolute',
   left: getResponsiveCSSFrom8(1).width,
    borderRadius: getResponsiveCSSFrom8(60).width,
    width: getResponsiveCSSFrom8(120).width,
    height: getResponsiveCSSFrom8(120).width,
    backgroundColor: Colors.midBlueTranslucent
  },
  editProfileText: {
    paddingTop: getResponsiveCSSFrom8(48).height,
    paddingLeft: getResponsiveCSSFrom8(20).width,
    height: getResponsiveCSSFrom8(120).height,
    zIndex: 10,
    ...Platform.select({
      ios: {
        zIndex: 1000
      },
      android: {
        elevation: 1000
      }
    }),
    color: 'white'
  },
  container: {
    marginTop: getResponsiveCSSFrom8(-70).height,
    marginHorizontal: getResponsiveCSSFrom8(10).width,
    paddingTop: getResponsiveCSSFrom8(100).height
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.00)',
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.grayFive,
    height: getResponsiveCSSFrom8(42).height,
    fontSize: getResponsiveCSSFrom8(16).height,
    fontWeight: '400',
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
    marginTop: getResponsiveCSSFrom8(6).height
  },
  mainProvidersTitle: {
    ...Fonts.style.bodyText,
    marginTop: getResponsiveCSSFrom8(15).height
  },
  headerStyle: {
    marginTop: getResponsiveCSSFrom8(26).height
  },
  header: {
    ...Fonts.style.header2,
    marginLeft: getResponsiveCSSFrom8(15).width
  },
  addProvider: {
    marginLeft: getResponsiveCSSFrom8(-15).width,
    marginTop: getResponsiveCSSFrom8(20).height,
    marginBottom: getResponsiveCSSFrom8(15).height
  },
  addButton: {
    height: getResponsiveCSSFrom8(14).height,
    marginBottom: getResponsiveCSSFrom8(10).height
  },
  button: {
    marginTop: getResponsiveCSSFrom8(10).height
  },
  closeButton: {
    position: 'absolute',
    top: getResponsiveCSSFrom8(5).height,
    right: getResponsiveCSSFrom8(5).width
  },
  item: {
   marginLeft: getResponsiveCSSFrom8(0).width,
    marginBottom: getResponsiveCSSFrom8(8).height,
    width: '100%'
  },
  jobAddressTitle: {
    ...Fonts.style.header2,
    marginBottom: getResponsiveCSSFrom8(6).height,
    marginTop: getResponsiveCSSFrom8(25).height,
    paddingLeft: getResponsiveCSSFrom8(10).width,
    fontSize: getResponsiveCSSFrom8(12).height
  },
  addressRow: {
    flexDirection: 'row',
    display: 'flex'
  },
  addressCity: {
   marginLeft: getResponsiveCSSFrom8(0).width,
    flex: 2
  },
  addressZip: {
    marginLeft: getResponsiveCSSFrom8(6).width,
    flex: 1
  },
  actionButtons: {
    marginTop: getResponsiveCSSFrom8(10).height
  },
  activityIndicator: {
    height: getResponsiveCSSFrom8(30).height,
    marginTop: getResponsiveCSSFrom8(25).height
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.9)'
  },
  modal: {
    backgroundColor: 'white',
   borderRadius: getResponsiveCSSFrom8(2).width,
    marginTop: getResponsiveCSSFrom8(150).height,
    marginHorizontal: getResponsiveCSSFrom8(20).width
  },
  modalInnerContainer: {
    margin: getResponsiveCSSFrom8(10).width
  },
  modalTitle: {
    ...Fonts.style.header1,
    textAlign: 'center',
    marginTop: getResponsiveCSSFrom8(20).height
  },
  termsConditionsModal: {
    textAlign: 'center',
    color: Colors.midBlue,
   margin: getResponsiveCSSFrom8(5).width,
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
