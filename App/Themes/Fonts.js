import Colors from './Colors';
import { getResponsiveCSSFrom8 } from '../Lib/Utils';

const type = {
  roboto: 'Roboto',
  montserrat: 'Montserrat',
}

const fontWeight = {
  regular: 'normal',
  semibold: '500',
  bold: 'bold',
  light: '300',
}

const style = {
  nameFont: {
    fontFamily: 'Roboto-Medium',
  	fontSize: 20,
  	color: Colors.darkSlateBlue,
  },
  dashboardFont: {
    fontFamily: 'Roboto-Regular',
  	fontSize: 28,
  	color: Colors.darkSlateBlue,
  },
  cta: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  	textAlign: "center",
  	color: Colors.white,
  },
  label4: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    fontWeight: fontWeight.semibold,
  	textAlign: "center",
  	color: Colors.white,
  },
  activeMenuItem: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: fontWeight.semibold,
    fontSize: 14,
    color: Colors.midBlue,
  },
  bodyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: getResponsiveCSSFrom8(18).width,
    color: Colors.darkSlateBlue,
    lineHeight: getResponsiveCSSFrom8(24).height,
  },
  header1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: Colors.grayFour,
  },
  header2: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: Colors.grayFour,
  },
  label1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: Colors.grayFour,
  },
  label2: {
    fontFamily: 'Montserrat-Light',
    fontWeight: fontWeight.light,
    fontSize: 12,
    color: Colors.grayFour,
  },
  label3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: Colors.midBlue,
  },
}

export default {
  type,
  style,
  weight: fontWeight,
}
