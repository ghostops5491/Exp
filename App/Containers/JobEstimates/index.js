import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, map, find, first, isEmpty } from 'lodash'
import { Image, View, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native'
import { Content, Button, Text, Item, Input } from 'native-base'
import { Colors } from 'App/Themes'
import { MainContainer, Container, AddPaymentModal } from 'App/Components'
import ModalDropdown from 'react-native-modal-dropdown'
import Actions from 'App/Redux/Actions'
import Stripe from 'react-native-stripe-api'
import moment from 'moment'
import styles from './styles'

class JobEstimates extends Component {
  static propTypes = {
    changePaymentMethodId: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      showAddPaymentModal: false,
      error: null,
      paymentMethodSelected: false
    }
  }

  componentDidMount() {
    const defaultPayment = find(this.props.paymentMethods, (pm) => pm.is_default === true)
    defaultPayment && this.props.changePaymentMethodId(defaultPayment.id)
  }

  submitServiceRequest() {
    const { notes, urgency, problem_id, address_id, photoURIs, jobSchedule,
      serviceRequestType, payment_method_id, contractor_id } = this.props
    if(!this.state.paymentMethodSelected) {
      return false;
    }
    if (payment_method_id) {
      this.setState({ error: null })
      const startTime = jobSchedule.time ? first(jobSchedule.time.split('-')) : moment()
      let service_time = moment(
        jobSchedule.date + ' ' + startTime,
        'dddd, MMM DD, YYYY hh:mm a ZZ'
      )
      service_time = service_time.format('dddd, MMM DD, YYYY hh:mm a ZZ')
      const serviceRequest = { notes, urgency, service_time, problem_id, address_id, payment_method_id }
      this.props.submitServiceRequest({serviceRequest, serviceRequestType, contractor_id})
        .then((job) => {
          this.props.clearAddress()
          this.props.clearServiceRequest()
          this.props.clearSelectedProblem()
          this.props.clearSelectedProblemCategory()
          this.props.uploadPhotos(photoURIs, job.id)
            .then(() => this.props.resetPhotoUris())
            .catch(console.log)
            this.props.navigation.navigate('FindingProvider')
        })
    } else {
      this.setState({ error: 'Make sure a Payment Method is selected' })
    }
  }

  showAddPaymentButton = () => isEmpty(this.props.paymentMethods)

  showAddPaymentScreen = () => {
    this.setState({ showAddPaymentModal: true, editable: true })
  }

  hideAddPaymentScreen = () => {
    this.setState({ showAddPaymentModal: false })
    this.props.clearPaymentMethodForm()
  }

  validateInput = async () => {
    const { accountForm: { errors: { expiryMonth, expiryYear, cvc, cardNumber } } } = this.props
    return isEmpty(expiryMonth) && isEmpty(expiryYear) && isEmpty(cvc) && isEmpty(cardNumber)
  }

  addPaymentMethod = async () => {
    const { addPaymentMethodRequest, accountForm, validateFormData, addApiError, appSettings } = this.props
    const client = new Stripe(appSettings.publishable_key)
    validateFormData()
    if (this.validateInput()) {
      const token = await client.createToken({
        number: accountForm.cardNumber,
        exp_month: accountForm.expiryMonth,
        exp_year: accountForm.expiryYear,
        cvc: accountForm.cvc,
      })
      console.log(token);

      if (isEmpty(token.error)) {
        addPaymentMethodRequest({ token: token.id, last4: get(token, 'card.last4'), is_default: accountForm.isDefault ? 1 : 0 })
        .then(this.hideAddPaymentScreen)
        .catch(console.log)
      }
      else {
        addApiError(get(token, 'error.message'))
      }
    }
  }

  getPaymentMethods = () => {
    return this.props.paymentMethods.map(pm => {
      return "********"+pm.last4;
    }).concat(['+ Add a payment method']);
  }

  onSelect(index, rowData){
    if (+index === this.props.paymentMethods.length) {
      this.setState({
        paymentMethodSelected: false
      })
      return this.showAddPaymentScreen()
    }
    this.setState({
      paymentMethodSelected: true
    })
    this.props.changePaymentMethodId(this.props.paymentMethods[index].id)
  }

  getCards() {
    const arr = this.props.addresses.map(addr => {
      return addr.street_address;
    } )
    return arr;
  }

  renderDropdownRow(rowData, rowID, highlighted) {
    if (!rowData) { return null }
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_2_row, {backgroundColor: 'white'}]}>
          <Text style={[styles.dropdown_2_row_text, highlighted && {color: Colors.midBlue}]}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const { changeCardNumber, changeExpiryMonth, changeCVC, paymentMethods,
      changeExpiryYear, accountForm, apiError, changeDefaultPayment,
      requesting, requestingAddPayment
     } = this.props
    const service_fee = this.props.appSettings.cancellation_fee_3 / 100

    return (
      <Container>
          <ScrollView>
            <Content>
                <View style={styles.screenBody}>
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
                    togglePrimarySource={() => {}}
                    requesting={requestingAddPayment}
                  />
                  <View>
                    <View>
                      <Text style={styles.titleText}>
                        SERVICE FEE
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.scheduleJobText}>
                        The Provider will charge a service call fee.
                      </Text>
                      <Text style={styles.serviceFee}>
                        ${service_fee}
                      </Text>
                      <Text style={styles.serviceFeeText}>
                        will be charged to
                      </Text>
                    </View>
                  </View>
                  {!requesting &&
                  <View style={{ justifyContent: 'center'}}>
                    <Item style={styles.item}>
                      <View style={styles.input}>
                        <ModalDropdown
                          options={this.getPaymentMethods()}
                          renderRow={this.renderDropdownRow}
                          defaultValue={"Select a card"}
                          animated={false}
                          style={styles.addressContainer}
                          textStyle={styles.problemCategoryDropdownTextStyle}
                          onSelect={this.onSelect.bind(this)}
                          dropdownStyle={styles.problemCategoryDropdownDropdownStyle}
                        />
                      </View>
                    </Item>
                  </View>}
                  <View style={{flex: 2}}>
                    <View style={styles.activityIndicator}>
                      {this.props.submitting && <ActivityIndicator size="large"
                        color={Colors.turtleGreen} />}
                    </View>
                    {this.props.error && <View>
                        <Text style={styles.errorMessage}>
                          {this.props.error}
                        </Text>
                    </View>}
                    <View>
                        <Text style={styles.hintMessage}>
                          *Full price to be estimated when service provider arrives at service address
                        </Text>
                    </View>
                    <View>
                      {this.state.error && <Text style={styles.errorMessage}>{this.state.error}</Text>}
                      <Button primary={this.state.paymentMethodSelected}
                        style={[styles.submitServiceRequestButton, !this.state.paymentMethodSelected? styles.disabled: '']}
                        onPress={() => this.submitServiceRequest()}
                      >
                        <Text style={styles.buttonText}> REQUEST SERVICE </Text>
                      </Button>
                    </View>
                  </View>
                </View>
            </Content>
          </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  requesting: (state) => get(state, 'serviceRequest.requesting'),
  error: (state) => get(state, 'serviceRequest.error'),
  problem_id: (state) => get(state, 'problem.selectedProblem'),
  notes: (state) => get(state, 'serviceRequest.notes'),
  urgency: (state) => get(state, 'serviceRequest.urgency'),
  address_id: (state) => get(state, 'serviceRequest.address_id'),
  photoURIs: (state) => get(state, 'serviceRequest.photoURIs'),
  submitting: (state) => get(state, 'serviceRequest.submitting'),
  jobSchedule: (state) => get(state, 'serviceRequest.jobSchedule'),
  serviceRequestType: (state) => get(state, 'serviceRequest.serviceRequestType'),
  paymentMethods: (state) => get(state, 'payments.paymentMethods'),
  payment_method_id: (state) => get(state, 'serviceRequest.payment_method_id'),
  contractor_id: (state) => get(state, 'serviceRequest.selectedProvider'),
  requestingAddPayment: (state) => get(state, 'payments.requesting'),
  accountForm: (state) => get(state, 'payments.accountForm'),
  apiError: (state) => get(state, 'payments.error'),
  appSettings: (state) => get(state, 'payments.appSettings'),
})

const mapDispatchToProps = (dispatch) => ({
  changePaymentMethodId: (payload) => dispatch(Actions.changePaymentMethodId(payload)),
  uploadPhotos: (photoURIs, jobId) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.uploadPhotosRequest(photoURIs, jobId, resolve, reject)))
  },
  submitServiceRequest: (serviceRequest) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.createServiceRequestRequest(serviceRequest, resolve, reject)))
  },
  findPreferredContractor: (serviceRequestId) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.findPreferredContractorRequest(serviceRequestId, resolve, reject)))
  },
  resetPhotoUris: () => dispatch(Actions.resetPhotoUris()),
  clearAddress: () => dispatch(Actions.clearAddress()),
  clearServiceRequest: () => dispatch(Actions.clearServiceRequest()),
  clearSelectedProblem: () => dispatch(Actions.clearSelectedProblem()),
  clearSelectedProblemCategory: () => dispatch(Actions.clearSelectedProblemCategory()),
  changeDefaultPayment: (payload) => dispatch(Actions.changeDefaultPayment(payload)),
  changePaymentMethodId: (payload) => dispatch(Actions.changePaymentMethodId(payload)),
  addPaymentMethodRequest: (payload) =>  new Promise((resolve, reject) =>
    dispatch(Actions.addPaymentMethodRequest(payload, resolve, reject))),
  changeCardNumber: (payload) => dispatch(Actions.changeCardNumber(payload)),
  changeExpiryMonth: (payload) => dispatch(Actions.changeExpiryMonth(payload)),
  changeCVC: (payload) => dispatch(Actions.changeCvc(payload)),
  changeExpiryYear: (payload) => dispatch(Actions.changeExpiryYear(payload)),
  validateFormData: () => dispatch(Actions.validateFormData()),
  addApiError: (payload) => dispatch(Actions.addApiError(payload)),
  clearPaymentMethodForm: (payload) => dispatch(Actions.clearPaymentMethodForm(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JobEstimates)
