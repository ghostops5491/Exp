import { StackNavigator } from 'react-navigation'
import styles from './Styles/NavigationStyles'
import { reduce } from 'lodash'

// Manifest of possible screens
const Screens = {
  SplashScreen: { screen: require('App/Containers/SplashScreen').default },
  LaunchScreen: { screen: require('App/Containers/LaunchScreen').default },
  LoginScreen: { screen: require('App/Containers/LoginScreen').default },
  SignupScreen: { screen: require('App/Containers/SignupScreen').default },
  ForgotPasswordScreen: {
    screen: require('App/Containers/ForgotPasswordScreen').default
  },
  ForgotPasswordProcessing: {
    screen: require('App/Containers/ForgotPasswordScreen/ForgotPasswordProcessing')
      .default
  },
  Dashboard: { screen: require('App/Containers/Dashboard').default },
  ScheduleJob: { screen: require('App/Containers/ScheduleJob').default },
  JobDetails: { screen: require('App/Containers/JobDetails').default },
  JobEstimates: { screen: require('App/Containers/JobEstimates').default },
  JobCategories: { screen: require('App/Containers/JobCategories').default },
  PreferredProvider: {
    screen: require('App/Containers/PreferredProvider').default
  },
  JobTimeline: { screen: require('App/Containers/JobTimeline').default },
  UpdateBilling: { screen: require('App/Containers/UpdateBilling').default },
  MyProvidersList: {
    screen: require('App/Containers/MyProvidersList').default
  },
  InviteProviders: {
    screen: require('App/Containers/InviteProviders').default
  },
  FindProvider: { screen: require('App/Containers/FindProvider').default },
  FindingProvider: {
    screen: require('App/Containers/FindingProvider').default
  },
  ProviderNotFound: {
    screen: require('App/Containers/ProviderNotFound').default
  },
  PreferredProviderNotFound: {
    screen: require('App/Containers/PreferredProviderNotFound').default
  },
  PreferredProviderDetails: {
    screen: require('App/Containers/PreferredProviderDetails').default
  },
  ProviderFound: { screen: require('App/Containers/ProviderFound').default },
  PreferredProviderDetails: {
    screen: require('App/Containers/PreferredProviderDetails').default
  },
  JobCompleted: { screen: require('App/Containers/JobCompleted').default },
  Payments: { screen: require('App/Containers/Payments').default },
  PaymentSource: { screen: require('App/Containers/PaymentSource').default },
  ProvidersTabs: { screen: require('App/Containers/ProvidersTabs').default },
  ProfileTabs: { screen: require('App/Containers/ProfileTabs').default },
  Profile: { screen: require('App/Containers/Profile').default },
  Notifications: { screen: require('App/Containers/Notifications').default },
  QuoteConfirmScreen: { screen: require('App/Containers/QuoteConfirmScreen').default },
  SharedProvidersList: { screen: require('App/Containers/SharedProvidersList').default },
  DisputePaymentsScreen: {
    screen: require('App/Containers/DisputePaymentsScreen').default
  }
}

export const SCREEN_NAMES = reduce(
  Screens,
  (names, screenInfo, name) => {
    names[name] = name
    return names
  },
  {}
)

const INITIAL_ROUTE_NAME = SCREEN_NAMES.SplashScreen; //SplashScreen
const PrimaryNav = StackNavigator(Screens, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: INITIAL_ROUTE_NAME,
  navigationOptions: {
    headerStyle: styles.header,
    gesturesEnabled: false
  }
  // navigationOptions: {
  //   headers: ({navigate, transitioning}) => ({
  //       right:
  //         <Button
  //           icon="ios-settings-outline"
  //           disabled={transitioning}
  //           onPress={() => navigate('Settings')}
  //         />,
  //     })
  //   },
})

export default PrimaryNav
