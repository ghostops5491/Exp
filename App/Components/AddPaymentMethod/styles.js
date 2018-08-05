import { Colors, Metrics, ApplicationStyles } from 'App/Themes'

import { StyleSheet } from 'react-native';
import { getResponsiveCSSFrom8 } from '../../Lib/Utils';

export default StyleSheet.create({
  container: {
    paddingVertical: 35,
    paddingHorizontal: 15
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  darkBlueText: {
    color: Colors.darkSlateBlue,
    fontSize: getResponsiveCSSFrom8(18).width,
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: getResponsiveCSSFrom8(30).height
  },
  buttonText: {
    ...ApplicationStyles.buttonText,
    textAlign: 'center'
  },
  closeButton: {
    alignItems: 'flex-end',
    paddingHorizontal: 15
  },
  closeButtonText: {
    color: '#555',
    fontSize: getResponsiveCSSFrom8(20).width
  },
  errorSignleLine:{
    width: '100%',
    color: '#ef6940',
   marginTop: getResponsiveCSSFrom8(5).height,
   fontSize: getResponsiveCSSFrom8(16).width,
  },
  scanButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: getResponsiveCSSFrom8(15).height
  },
  scanButtonText: {
    color: '#fff'
  }
});
