/**
 *
 * Payments
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Text, Content, Form, Item, Input, Right, ListItem, Radio } from 'native-base'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, isEmpty, map } from 'lodash'
import Stripe from 'react-native-stripe-api'
import Swipeout from 'react-native-swipeout'
import Actions from 'App/Redux/Actions'
// import get from 'lodash/get'
import { MainContainer, Container, Section, HeaderNav, FooterNav, AddPaymentModal } from 'App/Components'
import styles from './styles'

class Payments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddPaymentModal: false,
      tabError: null,
    }
  }

  componentWillMount() {
    this.props.fetchPaymentMethods()
  }

  static propTypes = {
    clearPaymentMethodForm: PropTypes.func.isRequired,
    fetchPaymentMethods: PropTypes.func.isRequired,
    changeDefaultPayment: PropTypes.func.isRequired,
    addPaymentMethod: PropTypes.func.isRequired,
    deletePaymentMethod: PropTypes.func.isRequired,
  }

  showAddPaymentScreen = () => {
    this.setState({showAddPaymentModal: true, editable: true})
  }

  hideAddPaymentScreen = () => {
    this.setState({showAddPaymentModal: false})
    this.props.clearPaymentMethodForm()

  }

  deletePaymentMethod = (paymentMethod) => {
    const {addApiError} = this.props
    this.props.deletePaymentMethodRequest({paymentMethod})
      .then(() => {
        this.setState({tabError: null})
        this.props.navigation.navigate('Payments')
      })
      .catch((e) => {
        this.setState({tabError: e})
      })
  }
  validateInput = async() => {
    const {accountForm: {errors: {expiryMonth, expiryYear, cvc, cardNumber}}} = this.props
    return isEmpty(expiryMonth) && isEmpty(expiryYear) && isEmpty(cvc) && isEmpty(cardNumber)
  }

  addPaymentMethod = async() => {
    const {addPaymentMethodRequest, accountForm, validateFormData, addApiError, appSettings} = this.props
    const client = new Stripe(appSettings.publishable_key)
    validateFormData()
    this.setState({tabError: null})
    if (this.validateInput()) {
      const token = await client.createToken({
        number: accountForm.cardNumber,
        exp_month: accountForm.expiryMonth,
        exp_year: accountForm.expiryYear,
        cvc: accountForm.cvc,
      })

      if (token && isEmpty(token.error)) {
        addPaymentMethodRequest({
          token: token.id,
          last4: get(token, 'card.last4'),
          is_default: accountForm.isDefault ? 1 : 0
        })
          .then(this.hideAddPaymentScreen)
          .catch(console.log)
      }
      else {
        addApiError(get(token, 'error.message'))
      }
    }
  }

  render() {
    const {
      changeCardNumber, changeExpiryMonth, changeCVC, paymentMethods, changeExpiryYear, accountForm, apiError, changeDefaultPayment, requesting, paymentMethodExists
    } = this.props

    return (
      <ScrollView>
        <View>
          <AddPaymentModal
            changeCardNumber={changeCardNumber}
            changeExpiryMonth={changeExpiryMonth}
            changeCVC={changeCVC}
            changeExpiryYear={changeExpiryYear}
            formData={accountForm}
            visible={this.state.showAddPaymentModal}
            onAddSuccessful={this.hideAddPaymentScreen}
            editable={this.state.editable}
            addPaymentMethodRequest={this.addPaymentMethod}
            apiError={apiError}
            togglePrimarySource={changeDefaultPayment}
            requesting={requesting}
          />
          <View>
            <Section>
              <View>

                {this.state.tabError && (
                  <Text style={styles.alertTitleText}>
                    {this.state.tabError}
                  </Text>
                )}

                  <Text style={styles.titleText}>
                    Add a debit or credit card.
                  </Text>

              </View>
              <View>
                {!this.state.showAddPaymentModal && (
                  <Button primary
                          style={styles.button}
                          onPress={this.showAddPaymentScreen}
                  >
                    <Text style={styles.buttonText}> ADD {paymentMethods.length > 0 ? 'ANOTHER' : 'A'} PAYMENT
                      METHOD </Text>
                  </Button>
                )}
                {this.state.showAddPaymentModal && (
                  <Button primary
                          style={styles.button}
                          onPress={this.hideAddPaymentScreen}
                  >
                    <Text style={styles.buttonText}> CANCEL </Text>
                  </Button>
                )}
              </View>
            </Section>
            <View>
              <Text style={styles.subheadingText}>PAYMENT METHODS</Text>
            </View>
            {map(paymentMethods, (paymentMethod) => {
                return <View>
                  <Swipeout right={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    onPress: () => {this.deletePaymentMethod(paymentMethod)}
                  }]}>
                    <Section>
                      <View style={styles.cardsDirectionControl}>
                        <Text style={styles.cards}> *******{paymentMethod.last4} </Text>
                        <Radio selected={paymentMethod.is_default}/>
                      </View>
                    </Section>
                  </Swipeout>
                </View>
              }
            )}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  accountForm: (state) => get(state, 'payments.accountForm'),
  apiError: (state) => get(state, 'payments.error'),
  paymentMethods: (state) => get(state, 'payments.paymentMethods'),
  appSettings: (state) => get(state, 'payments.appSettings'),
  requesting: (state) => get(state, 'payments.requesting'),
  profileComplete: (state) => get(state, 'auth.profileComplete'),
  paymentMethodExists: state => get(state, 'payments.paymentMethodExists'),
  tabError: (state) => get(state, 'tabError'),
})

const mapDispatchToProps = (dispatch) => ({
  clearPaymentMethodForm: (payload) =>
    dispatch(Actions.clearPaymentMethodForm(payload)),
  fetchPaymentMethods: () => new Promise((resolve, reject) =>
    dispatch(Actions.fetchPaymentMethodsRequest(resolve, reject))),
  deletePaymentMethodRequest: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.deletePaymentMethodRequest(payload, resolve, reject))),
  changeDefaultPayment: (payload) =>
    dispatch(Actions.changeDefaultPayment(payload)),
  addPaymentMethodRequest: (payload) => new Promise((resolve, reject) =>
    dispatch(Actions.addPaymentMethodRequest(payload, resolve, reject))),
  changeCardNumber: (payload) => dispatch(Actions.changeCardNumber(payload)),
  changeExpiryMonth: (payload) => dispatch(Actions.changeExpiryMonth(payload)),
  changeCVC: (payload) => dispatch(Actions.changeCvc(payload)),
  changeExpiryYear: (payload) =>
    dispatch(Actions.changeExpiryYear(payload)),
  validateFormData: () => dispatch(Actions.validateFormData()),
  addApiError: (payload) => dispatch(Actions.addApiError(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Payments)
