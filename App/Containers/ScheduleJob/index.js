import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get, isEmpty, map, findIndex, first } from 'lodash'
import { Images, Colors } from 'App/Themes'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'
import { Button, Text, Content, Form, Item, Input } from 'native-base'
import { MainContainer, Container, Section } from 'App/Components'
import styles from './styles'
import ModalDropdown from 'react-native-modal-dropdown'
import DatePicker from 'react-native-datepicker'
import Actions from 'App/Redux/Actions'
import moment from 'moment'
import AddAddressModal from '../Profile/AddAddressModal'
import Loader from '../../Components/Loader'

const URGENCY_TYPES = {
  IMMEDIATELY: 'immediate',
  SCHEDULE: 'scheduled'
}

class ScheduleJob extends Component {
  static propTypes = {
    selectUrgency: PropTypes.func.isRequired,
    urgency: PropTypes.string,
    addresses: PropTypes.array,
    fetchAddresses: PropTypes.func.isRequired,
    createAddress: PropTypes.func.isRequired,
    changeStreet: PropTypes.func.isRequired,
    changeAddress2: PropTypes.func.isRequired,
    changeCity: PropTypes.func.isRequired,
    changeState: PropTypes.func.isRequired,
    changeZip: PropTypes.func.isRequired,
    street: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      addressSelected: false,
      selectedAddress: null,
      errors: {
        street: null,
        city: null,
        state: null,
        zip: null,
        urgency: null,
        showAddressFields: false
      },
      timeRange: [],
      addAddressModalVisible: false
    }
    this.validateInputFields = this.validateInputFields.bind(this)
  }

  selectUrgency = urgency => {
    this.props.selectUrgency(urgency)
    this.setState({
      errors: { ...this.state.errors, urgency: null },
      showAddressFields: true
    })
  }

  componentWillMount() {
    this.props
      .fetchAddresses()
      .then(() => this.setState({ reload: true }))
      .catch(console.log)
  }

  componentDidMount() {
    this.props.changeDate(moment().format('dddd, MMMM DD, YYYY'))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scheduledDate) {
      this.setTimeSlots(nextProps.scheduledDate)
    }
  }

  setTimeSlots = scheduledDate => {
    const range = [
      '9am - 11am',
      '11am - 1pm',
      '1pm - 3pm',
      '3pm - 5pm',
      '5pm - 7pm'
    ]
    if (moment(scheduledDate).isSame(moment(), 'day')) {
      const h = moment().hours()
      let starting_hour = h % 2 === 1 ? h : h + 1
      let ending_hour = starting_hour + 2
      starting_hour =
        starting_hour > 12
          ? starting_hour - 12 + 'pm - '
          : starting_hour + 'am - '
      ending_hour =
        ending_hour > 12 ? ending_hour - 12 + 'pm' : ending_hour + 'am'
      const total_hour = starting_hour + ending_hour
      const index = findIndex(range, time => time === total_hour)
      let rangeToShow = []
      if (index === -1) {
        rangeToShow = starting_hour.includes('am') ? range : []
      } else {
        rangeToShow = range.slice(index + 1)
      }
      this.setState({ timeRange: rangeToShow })
      this.props.changeTime(first(rangeToShow))
    } else {
      this.setState({ timeRange: range })
      this.props.changeTime(first(range))
    }
  }

  onSelectChangeTime = (index, rowData) => {
    this.props.changeTime(rowData)
  }

  onValueChange = selectedAddress => {
    this.setState({ selectedAddress })
    const address = this.props.addresses[selectedAddress]
    this.props.selectExistingAddress(address.id)
    this.props.changeStreet(address.street_address)
    this.props.changeAddress2(address.address_2)
    this.props.changeCity(address.city)
    this.props.changeState(address.state)
    this.props.changeZip(address.zip)
  }

  onNext = e => {
    e.preventDefault()
    if (first(this.state.timeRange) || this.props.urgency === 'immediate') {
      const { street, address2, city, zip, state, urgency } = this.props
      if (this.validateInputFields()) {
        this.props
          .createAddress({
            street_address: street,
            address_2: address2,
            state: state,
            city,
            zip
          })
          .then(address => {
            this.props.selectExistingAddress(address.id)
            this.props.navigation.navigate('JobDetails')
          })
          .catch(e => console.log(e))
      }
    }
  }

  validateInputFields = () => {
    const { street, city, zip, state, urgency } = this.props

    if (isEmpty(urgency)) {
      this.setState({
        errors: { ...this.state.errors, urgency: 'Select Urgency' }
      })
      return false
    }

    if (isEmpty(street)) {
      this.props.addStreetValidationError('Street cannot be empty')
      return false
    }

    if (isEmpty(city)) {
      this.props.addCityValidationError('City cannot be empty')
      return false
    }

    if (isEmpty(state)) {
      this.props.addStateValidationError('State cannot be empty')
      return false
    }

    if (isEmpty(zip)) {
      this.props.addZipValidationError('Zipcode cannot be empty')
      return false
    }

    if (zip.length < 5) {
      this.props.addZipValidationError('Must enter a valid Zipcode')
      return false
    }

    return true
  }

  onSelect = (index, rowData) => {
    if (+index === this.props.addresses.length) {
      this.props.clearAddress()
      return this.toggleAddAddressModal()
    }
    this.setState({ index, addressSelected: true })
    const address = this.props.addresses[index]
    this.props.selectExistingAddress(index)
    this.props.changeStreet(address.street_address)
    this.props.changeAddress2(address.address_2)
    this.props.changeCity(address.city)
    this.props.changeState(address.state)
    this.props.changeZip(address.zip)
  }

  getServiceAddresses = () => {
    return this.props.addresses
      .map(addr => {
        return addr.street_address
      })
      .concat(['+ Create an address'])
  }

  toggleAddAddressModal = () => {
    this.setState({
      addAddressModalVisible: !this.state.addAddressModalVisible,
      addressSelected: this.state.addAddressModalVisible && !!this.props.street
    })
  }

  validationErrorsisEmpty = () => {
    for (let error in this.props.validationErrors) {
      if (!!this.props.validationErrors[error]) return false
    }
    return true
  }

  render() {
    const {
      props: { urgency, validationErrors, jobSchedule },
      selectUrgency,
      onNext
    } = this
    const errorStyle = { borderColor: Colors.paleRed }
    const minDate = moment().format('dddd, MMMM DD, YYYY')
    const maxDate = moment()
      .add(6, 'months')
      .format('dddd, MMMM DD, YYYY')
    const selectedButton = type => (
      <Button style={styles.button} onPress={() => this.selectUrgency(type)}>
        <Text style={styles.buttonText}> {type.toUpperCase()} </Text>
      </Button>
    )

    const unSelectedButton = type => (
      <Button
        bordered
        style={styles.button}
        onPress={() => this.selectUrgency(type)}
      >
        <Text style={styles.unSelectedButtonText}> {type.toUpperCase()} </Text>
      </Button>
    )

    return (
      <Container>
        <ScrollView>
          <View style={styles.screenBody}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={0}
            >
              <View>
                <Text style={styles.titleText}>WHEN DO YOU NEED HELP?</Text>
              </View>
              <View style={styles.jobScheduleButtons}>
                {urgency === URGENCY_TYPES.IMMEDIATELY
                  ? selectedButton(URGENCY_TYPES.IMMEDIATELY)
                  : unSelectedButton(URGENCY_TYPES.IMMEDIATELY)}

                {urgency === URGENCY_TYPES.SCHEDULE
                  ? selectedButton(URGENCY_TYPES.SCHEDULE)
                  : unSelectedButton(URGENCY_TYPES.SCHEDULE)}
              </View>
              {get(this.state, 'errors.urgency') && (
                <View style={styles.hasError}>
                  <Text style={styles.errorText}>Select urgency</Text>
                </View>
              )}
              {urgency === 'scheduled' && (
                <View>
                  <Text style={styles.jobAddressTitle}>DATE</Text>
                  <DatePicker
                    style={{ width: '100%' }}
                    date={jobSchedule.date}
                    mode="date"
                    hideText={false}
                    format="dddd, MMMM DD, YYYY"
                    minDate={minDate}
                    maxDate={maxDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: styles.dateIcon,
                      dateInput: styles.input,
                      dateText: styles.dateText
                    }}
                    iconSource={Images.showMore}
                    onDateChange={date => {
                      this.props.changeDate(date)
                    }}
                  />
                  <Item style={styles.item}>
                    <View style={styles.input}>
                      <Content padder>
                        <ModalDropdown
                          options={this.state.timeRange}
                          renderRow={this.renderDropdownRow}
                          defaultValue={first(this.state.timeRange)}
                          style={styles.addressContainer}
                          animated={false}
                          textStyle={styles.problemCategoryDropdownTextStyle}
                          onSelect={this.onSelectChangeTime}
                          dropdownStyle={
                            styles.problemCategoryDropdownDropdownStyle
                          }
                        />
                      </Content>
                    </View>
                  </Item>
                </View>
              )}
              {this.state.showAddressFields && (
                <View>
                  <View>
                    <View>
                      <Text style={styles.jobAddressTitle}>
                        SERVICE ADDRESS
                      </Text>
                    </View>
                    <AddAddressModal
                      visible={this.state.addAddressModalVisible}
                      toggle={this.toggleAddAddressModal}
                    />

                    <Item style={styles.item}>
                      <View style={styles.input}>
                        <Content padder>
                          <ModalDropdown
                            options={this.getServiceAddresses()}
                            renderRow={this.renderDropdownRow}
                            defaultValue={'Select street address and unit'}
                            style={styles.addressContainer}
                            animated={false}
                            textStyle={
                              styles.problemCategoryDropdownTextStyle
                            }
                            onSelect={this.onSelect}
                            dropdownStyle={
                              styles.problemCategoryDropdownDropdownStyle
                            }
                          />
                        </Content>
                      </View>
                    </Item>
                    {
                      this.props.address2 &&
                      <Item style={styles.item}>
                        <Input
                          placeholder="Address 2 (Optional)"
                          style={styles.input}
                          value={this.props.address2}
                          onChangeText={text => this.props.changeAddress2(text)}
                        />
                      </Item>
                    }
                    <View style={styles.addressRow}>
                      <Item style={styles.addressCity}>
                        <Input
                          placeholder="city"
                          style={[
                            styles.input,
                            validationErrors.city ? errorStyle : {}
                          ]}
                          value={this.props.city}
                          ref={input => (this.cityInput = input)}
                          onChangeText={text => this.props.changeCity(text)}
                        />
                      </Item>
                      <Item style={styles.addressZip}>
                        <Input
                          placeholder="state"
                          style={[
                            styles.input,
                            validationErrors.state ? errorStyle : {}
                          ]}
                          value={this.props.state}
                          ref={input => (this.stateInput = input)}
                          onChangeText={text => this.props.changeState(text)}
                        />
                      </Item>
                      <Item style={styles.addressZip}>
                        <Input
                          placeholder="zip"
                          style={[
                            styles.input,
                            validationErrors.zip ? errorStyle : {}
                          ]}
                          value={this.props.zip}
                          ref={input => (this.zipInput = input)}
                          onChangeText={text => this.props.changeZip(text)}
                        />
                      </Item>
                    </View>
                  </View>
                  <View>
                    {!this.validationErrorsisEmpty(validationErrors) && (
                      <View style={styles.hasError}>
                        <Text style={styles.errorText}>
                          {validationErrors.street ||
                            validationErrors.state ||
                            validationErrors.city ||
                            validationErrors.zip}
                        </Text>
                      </View>
                    )}
                    <Button
                      primary
                      style={styles.nextButton}
                      onPress={onNext}
                    >
                      <Text style={styles.buttonText}> NEXT </Text>
                    </Button>
                  </View>
                </View>
              )}
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <Loader show={this.props.creating} />
      </Container>
    )
  }
  renderDropdownRow(rowData, highlighted) {
    if (rowData) {
      return (
        <TouchableHighlight underlayColor="cornflowerblue">
          <View style={[styles.dropdownRow, { backgroundColor: 'white' }]}>
            <Text
              style={[
                styles.dropdownRowText,
                highlighted && { color: Colors.midBlue }
              ]}
            >
              {rowData}
            </Text>
          </View>
        </TouchableHighlight>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = createStructuredSelector({
  urgency: state => get(state, 'serviceRequest.urgency'),
  addresses: state => get(state, 'address.allAddresses'),
  creating: state => get(state, 'address.creating'),
  street: state => get(state, 'address.form.street'),
  address2: state => get(state, 'address.form.address2'),
  city: state => get(state, 'address.form.city'),
  state: state => get(state, 'address.form.state'),
  zip: state => get(state, 'address.form.zip'),
  validationErrors: state => get(state, 'address.errors'),
  jobSchedule: state => get(state, 'serviceRequest.jobSchedule'),
  scheduledDate: state => get(state, 'serviceRequest.jobSchedule.date'),
  scheduledTime: state => get(state, 'serviceRequest.jobSchedule.time')
})

const mapDispatchToProps = dispatch => ({
  selectUrgency: urgency => dispatch(Actions.selectUrgency(urgency)),
  fetchAddresses: customerId => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.fetchAddressesRequest(customerId, resolve, reject))
    )
  },
  createAddress: address => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.createAddressRequest(address, resolve, reject))
    )
  },
  clearAddress: () => dispatch(Actions.clearAddress()),
  changeDate: date => dispatch(Actions.changeDate(date)),
  changeTime: time => dispatch(Actions.changeTime(time)),
  changeStreet: street => dispatch(Actions.changeStreet(street)),
  changeAddress2: address2 => dispatch(Actions.changeAddress2(address2)),
  changeCity: city => dispatch(Actions.changeCity(city)),
  changeState: state => dispatch(Actions.changeState(state)),
  changeZip: zip => dispatch(Actions.changeZip(zip)),
  selectExistingAddress: address_id =>
    dispatch(Actions.selectExistingAddress(address_id)),
  addStreetValidationError: error =>
    dispatch(Actions.addStreetValidationError(error)),
  addStateValidationError: error =>
    dispatch(Actions.addStateValidationError(error)),
  addCityValidationError: error =>
    dispatch(Actions.addCityValidationError(error)),
  addZipValidationError: error => dispatch(Actions.addZipValidationError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleJob)
