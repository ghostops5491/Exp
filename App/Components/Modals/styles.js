import { Platform, StyleSheet } from 'react-native'
import { Colors, Fonts } from 'App/Themes'

import { getResponsiveCSSFrom8 } from 'App/Lib/Utils'

export default StyleSheet.create({
  flexFlow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
   marginTop: getResponsiveCSSFrom8(20).height,
   marginBottom: getResponsiveCSSFrom8(20).height,
  },
  underLineText: {
    ...Fonts.style.bodyText,
   fontSize: getResponsiveCSSFrom8(12).width,
    color: Colors.midBlue,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(5).height,
  },
  separator: {
    borderColor: Colors.graySix,
   borderLeftWidth: getResponsiveCSSFrom8(1).width,
  },
  icon: {
   paddingLeft: getResponsiveCSSFrom8(6).width,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
   borderWidth: getResponsiveCSSFrom8(1).width,
   borderRadius: getResponsiveCSSFrom8(2).width,
    borderColor: Colors.graySix,
   height: getResponsiveCSSFrom8(42).height,
   fontSize: getResponsiveCSSFrom8(16).width,
    fontWeight: '400',
    fontFamily: Fonts.type.roboto,
    color: Colors.darkSlateBlue,
   marginTop: getResponsiveCSSFrom8(6).height,
  },
  item: {
   marginLeft: getResponsiveCSSFrom8(0).width,
   marginBottom: getResponsiveCSSFrom8(8).height,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor:'rgba(1,1,1,0.8)',
    flexDirection: 'column',
  },
  termsModalContainer: {
    flex: 1,
    backgroundColor:'#fff',
    flexDirection: 'column',
   padding: getResponsiveCSSFrom8(10).width,
  },
  modal: {
    backgroundColor: 'white',
   borderRadius: getResponsiveCSSFrom8(2).width,
   marginLeft: getResponsiveCSSFrom8(5).width,
   marginRight: getResponsiveCSSFrom8(5).width,
  },
  modalInnerContainer: {
   marginLeft: getResponsiveCSSFrom8(15).width,
   marginRight: getResponsiveCSSFrom8(15).width,
  },
  modalTitle: {
    ...Fonts.style.header1,
    textAlign: 'center',
   marginTop: getResponsiveCSSFrom8(20).height,
   marginBottom: getResponsiveCSSFrom8(20).height,
  },
  modalDescriptionText: {
    ...Fonts.style.bodyText,
    textAlign: 'left',
   marginTop: getResponsiveCSSFrom8(28).height,
  },
  contactModalFlow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
   height: getResponsiveCSSFrom8(70).height,
   marginTop: getResponsiveCSSFrom8(20).height,
   marginBottom: getResponsiveCSSFrom8(20).height,
  },
  vacantSpaceCall: {
    backgroundColor:'rgba(1,1,1,0.8)',
   height: getResponsiveCSSFrom8(250).height,
  },
  button: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginBottom: getResponsiveCSSFrom8(15).height,
   marginTop: getResponsiveCSSFrom8(10).height,
  },
  acceptButton: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginBottom: getResponsiveCSSFrom8(5).height,
   marginTop: getResponsiveCSSFrom8(5).height,
    backgroundColor: Colors.turtleGreen
  },
  declineButton: {
    width: '100%',
   height: getResponsiveCSSFrom8(48).height,
   marginBottom: getResponsiveCSSFrom8(5).height,
   marginTop: getResponsiveCSSFrom8(5).height,
    backgroundColor: Colors.paleRed
  },
  termsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  terms: {
   padding: getResponsiveCSSFrom8(10).width,
   width: getResponsiveCSSFrom8(340).width,
    flex: 1
  },
  vacantSpaceBilling: {
    backgroundColor:'rgba(1,1,1,0.8)',
   height: getResponsiveCSSFrom8(160).height,
  },
  add: {
   marginLeft: getResponsiveCSSFrom8(-5).width,
   marginBottom: getResponsiveCSSFrom8(25).height,
  },
  addButton: {
   height: getResponsiveCSSFrom8(14).height,
   marginTop: getResponsiveCSSFrom8(10).height,
   marginBottom: getResponsiveCSSFrom8(10).height,
    marginLeft: '-2%',
  },
  closeButton: {
    position: 'absolute',
   top: getResponsiveCSSFrom8(5).height,
   right: getResponsiveCSSFrom8(5).width,
   ...Platform.select({
     ios : { zIndex : 1000 },
     android: { zIndex : 1000 }
   })
  },
  vacantSpaceShare: {
    backgroundColor:'rgba(1,1,1,0.8)',
   height: getResponsiveCSSFrom8(100).height,
  },
})
