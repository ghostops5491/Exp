import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container, Text } from 'native-base'
import { get, isEmpty } from 'lodash'
import { selectToken, removeUserFromLocalStorage } from 'App/Lib/Auth'
import Actions from 'App/Redux/Actions'
import { Images } from 'App/Themes'
import styles from './styles'

class SplashScreen extends Component {
  componentDidMount() {
    const {
      navigation: { navigate },
      nav: { currentRoute },
      deviceToken,
    } = this.props
    this.props.fetchAppSettings()
    this.props.fetchPaymentMethods()
    if (currentRoute === 'ForgotPasswordProcessing') return // do not verify token

    selectToken().then(token => {
      if(isEmpty(token)) {
        if (currentRoute !== 'LoginScreen') {
          removeUserFromLocalStorage()
          navigate('LoginScreen')
        }
      } else {
        this.props.verifyToken(token).then(() => {

              if (currentRoute !== 'JobCategories')
                 navigate('JobCategories')

          })
          .catch(e => {
            removeUserFromLocalStorage()
            navigate('LoginScreen')
          })
      }
    })
    if (!deviceToken.deviceRegistered) {
      this.props.registerPushToken(deviceToken)
    }
  }

  render () {
    return (
      <Container>
        <Image source={Images.splashBackground} style={styles.backgroundImage} />
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  user: (state) => state,
  nav: (state) => get(state, 'nav'),
  deviceToken: (state) => get(state, 'notification.deviceToken'),
  paymentMethodExists: (state) => get(state, 'payments.paymentMethodExists'),
  profileComplete: (state) => get(state, 'auth.profileComplete')
})

const mapDispatchToProps = (dispatch) => ({
  fetchPaymentMethods: () => new Promise((resolve, reject) =>
      dispatch(Actions.fetchPaymentMethodsRequest(resolve, reject))),
  fetchAppSettings: () => new Promise((resolve, reject) =>
      dispatch(Actions.fetchAppSettingsRequest(resolve, reject))),
  verifyToken: token => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.verifyTokenRequest(token, resolve, reject)))
  },
  registerPushToken: (payload) =>
    dispatch(Actions.registerPushTokenRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
