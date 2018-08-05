import React, { Component } from "react"
import { View, StatusBar, AsyncStorage, Platform } from "react-native"
import ReduxNavigation from "App/Navigation/ReduxNavigation"
import { connect } from "react-redux"
import { get, includes, isEmpty } from "lodash"
import Actions from "App/Redux/Actions"
import ReduxPersist from "App/Config/ReduxPersist"
import { StyleProvider, Content } from "native-base"
import getTheme from "App/Themes/components"
import { MainContainer, HeaderNav, FooterNav } from "App/Components"
import styles from "./styles"
import { removeUserFromLocalStorage } from "App/Lib/Auth"

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.getNavigator = this.getNavigator.bind(this)
    this.state = { navigator: null }
  }

  componentWillMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    // removeUserFromLocalStorage()
    AsyncStorage.getItem("currentUser").then(user => {
      this.props.saveUser(JSON.parse(user))
    })
  }

  getNavigator(navigator) {
    this.setState({ navigator })
  }

  goToProviderFound() {
    const navigator = this.state.navigator
    navigator && navigator.props.navigation.navigate("ProviderFound")
  }

  goToProviderNotFound() {
    const navigator = this.state.navigator
    navigator && navigator.props.navigation.navigate("ProviderNotFound")
  }

  goToQuoteOffer() {
    const navigator = this.state.navigator
    navigator && navigator.props.navigation.navigate('QuoteConfirmScreen')
  }

  render() {
    const headerlessRoutes = [
      "SplashScreen",
      "LoginScreen",
      "SignupScreen",
      "ForgotPasswordScreen",
      "ForgotPasswordProcessing"
    ]
    const backlessRoutes = [
      "Dashboard",
      "FindProvider",
      "ProviderFound",
      "JobCategories",
      "ProviderNotFound",
      "PreferredProviderNotFound",
      "Notifications",
      "ProfileTabs",
      "QuoteConfirmScreen",
      "ForgotPasswordProcessing"
    ]

    const currentRoute = this.props.nav.currentRoute
    const isHeaderlessRoute = includes(headerlessRoutes, currentRoute)
    const isBacklessRoute = includes(backlessRoutes, currentRoute)

    if (!isEmpty(this.props.recentContractorMatches)) {
      currentRoute !== "ProviderFound" && this.goToProviderFound()
    }

    if (this.props.showNoneContractorMatch) {
      currentRoute !== "ProviderNotFound" && this.goToProviderNotFound()
    }

    if (this.props.quoteOfferedForJob) {
      if (currentRoute !== 'QuoteConfirmScreen') {
        this.goToQuoteOffer()
      } else {
        this.props.dismissQuoteOfferScreen()
      }
    }

    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.applicationView}>
          <StatusBar barStyle="light-content" />
          {isHeaderlessRoute ? (
            <ReduxNavigation getNavigator={this.getNavigator} />
          ) : (
            <MainContainer>
              <HeaderNav
                navigator={this.state.navigator}
                showBackButton={!isBacklessRoute}
              />
              <ReduxNavigation getNavigator={this.getNavigator} />
              <FooterNav
                navigator={this.state.navigator}
                currentRoute={currentRoute}
                showNotiBadge={this.props.showNotiBadge}
                activeTab={get(this, "props.nav.activeTab")}
                profileComplete={this.props.profileComplete}
                paymentMethodExists={this.props.paymentMethodExists}
              />
            </MainContainer>
          )}
        </View>
      </StyleProvider>
    )
  }
}

const mapStateToProps = state => ({
  nav: get(state, "nav"),
  recentContractorMatches: get(state, "job.recentContractorMatches"),
  showNoneContractorMatch: get(state, "job.showNoneContractorMatch"),
  quoteOfferedForJob: get(state, "job.quoteOfferedForJob"),
  showNotiBadge: get(state, "notification.showNotiBadge"),
  paymentMethodExists: get(state, "payments.paymentMethodExists"),
  profileComplete: get(state, "auth.profileComplete")
})

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(Actions.startup()),
  saveUser: user => dispatch(Actions.saveUser(user)),
  dismissQuoteOfferScreen: () => dispatch(Actions.dismissQuoteOfferScreen()),
  dismissNotificationsScreen: () => dispatch(Actions.dismissNotificationsScreen())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
