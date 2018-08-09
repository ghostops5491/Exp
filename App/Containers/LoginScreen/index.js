import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import { Button, Text, Form, Item, Input, Icon } from 'native-base'
import { get, isEmpty } from 'lodash'
import { AuthScreenLayout, RenderIcon } from 'App/Components'
import { Colors } from 'App/Themes'
import styles from './styles'
import Actions from 'App/Redux/Actions'

export class LoginScreen extends Component {
  static propTypes = {
    clearError: PropTypes.func.isRequired,
    addError: PropTypes.func.isRequired
  }

  state = {
    hidePassword: true
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.clearForm()
  }

  login() {
    const {
      email,
      password,
      registerPushToken,
      deviceToken,
      currentUser,
      profileComplete,
      fetchNotifications
    } = this.props
    if (this.validateInputs()) {
      this.props.clearError()
      this.props
        .login(email, password)
        .then(() => {
          this.props.fetchPaymentMethods().then(() => {
            this.props.clearForm()

            this.props.navigation.navigate('JobCategories')

            registerPushToken(deviceToken)
          })
          fetchNotifications()
        })
        .catch(console.log)
    }
  }

  validateInputs() {
    return this.validEmail() && this.validPassword()
  }

  validEmail = () => {
    const { email, addError } = this.props
    const emailRegex = /^(([^$-\/:-?{-~!"^`\[\]@\\#]+([.\-_+][^$-\/:-?{-~!"^`\[\]@\\]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (isEmpty(email)) {
      addError({ input: 'email', message: 'Please input email.' })
      return false
    } else if (!emailRegex.test(email)) {
      addError({ input: 'email', message: 'Please input valid email.' })
      return false
    }
    return true
  }

  validPassword() {
    const { password, addError } = this.props
    if (isEmpty(password)) {
      addError({ input: 'password', message: 'Please input password.' })
      return false
    } else if (password.length < 6) {
      addError({
        input: 'password',
        message: 'Too short password. Input at least 6 characters.'
      })
      return false
    }
    return true
  }

  togglePassword = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }

  render() {
    const { hidePassword } = this.state;
    const { error } = this.props
    const emailInputStyle = [
      styles.input,
      error.input === 'email' && { borderColor: Colors.paleRed }
    ]
    const passwordInputStyle = [
      styles.input,
      styles.passwordInput,
      error.input === 'password' && { borderColor: Colors.paleRed }
    ]
    return (
      <AuthScreenLayout>
        <KeyboardAvoidingView>
          <View style={styles.formWrapper}>
            <View style={styles.hasError}>
              <Text style={styles.errorText}>{error && error.message}</Text>
            </View>
            <Form>
              <Item style={styles.item}>
                <View style={styles.icon}>
                  <RenderIcon name="username" />
                </View>
                <Input
                  placeholder="Email"
                  style={emailInputStyle}
                  value={this.props.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={email => this.props.changeEmail(email)}
                />
              </Item>
              <Item style={styles.item}>
                <View style={styles.icon}>
                  <RenderIcon name="password" />
                </View>
                <Input
                  placeholder="Password"
                  secureTextEntry={hidePassword}
                  style={passwordInputStyle}
                  value={this.props.password}
                  onChangeText={password => this.props.changePassword(password)}
                />
                <Button style={styles.rightIcon} iconLeft transparent primary onPress={this.togglePassword}>
                  <Icon name={hidePassword ? 'eye' : 'eye-off'} />
                </Button>
              </Item>
              <View style={styles.activityIndicator}>
                {this.props.loggingIn && (
                  <ActivityIndicator size="large" color={Colors.turtleGreen} />
                )}
              </View>
              <Item style={styles.item}>
                <Button
                  primary
                  style={styles.loginButton}
                  onPress={() => this.login()}
                >
                  <Text style={styles.loginButtonText}> LOG IN </Text>
                </Button>
              </Item>
              <View>
                <Text
                  style={styles.helpingText}
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPasswordScreen')
                  }
                >
                  Forgot your password?
                </Text>
              </View>
            </Form>
            <View style={styles.signUpLine}>
              <Text style={styles.signUpText}>New to Jonny On It?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignupScreen')}
              >
                <Text style={styles.signUpLink}>Sign Up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </AuthScreenLayout>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  error: state => get(state, 'auth.form.error'),
  email: state => get(state, 'auth.form.email'),
  password: state => get(state, 'auth.form.password'),
  currentUser: state => get(state, 'auth.currentUser'),
  loggingIn: state => get(state, 'auth.loggingIn'),
  deviceToken: state => get(state, 'notification.deviceToken'),
  paymentMethodExists: state => get(state, 'payments.paymentMethodExists'),
  profileComplete: state => get(state, 'auth.profileComplete')
})

const mapDispatchToProps = dispatch => ({
  registerPushToken: payload =>
    dispatch(Actions.registerPushTokenRequest(payload)),
  clearError: payload => dispatch(Actions.clearError(payload)),
  addError: payload => dispatch(Actions.addError(payload)),
  login: (email, password) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.loginRequest(email, password, resolve, reject))
    )
  },
  fetchPaymentMethods: () => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.fetchPaymentMethodsRequest(resolve, reject))
    )
  },
  fetchNotifications: () => new Promise((resolve, reject) =>
    dispatch(Actions.fetchNotificationsRequest(resolve, reject))),
  changeEmail: email => dispatch(Actions.changeEmail(email)),
  changePassword: password => dispatch(Actions.changePassword(password)),
  clearForm: email => dispatch(Actions.clearForm(Actions.email))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
