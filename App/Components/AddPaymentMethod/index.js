import React, { Component } from 'react'
import {
  ScrollView,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Button, Content } from 'native-base'
import { FormControl } from 'App/Components'
import { get } from 'lodash'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button'
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { Colors } from 'App/Themes'
import styles from './styles'

class AddPaymentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      primary: true
    }
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }

  scanCard() {
    CardIOModule
      .scanCard()
      .then(card => {
        this.props.changeCardNumber(card.cardNumber)
        this.props.changeExpiryMonth(card.expiryMonth)
        this.props.changeExpiryYear(card.expiryYear)
        this.props.changeCVC(card.cvv)
      })
      .catch(() => {
        // the user cancelled
      })
  }

  togglePrimarySource = () => {
    this.setState({
      primary: !this.state.primary
    })
  }

  render() {
    const {
      editable,
      formData,
      changeCardNumber,
      changeExpiryMonth,
      visible,
      apiError,
      changeCVC,
      changeExpiryYear,
      onAddSuccessful,
      addPaymentMethodRequest,
      togglePrimarySource
    } = this.props

    if (!visible) return null
    return (
        <Modal
          animationType="none"
          transparent={false}
          style={styles.modalView}
          visible={visible}>
            <KeyboardAvoidingView style={styles.container}>
              <TouchableOpacity onPress={onAddSuccessful} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <RadioButton
                  labelHorizontal={true}
                  key={0}
                  style={{ alignContent: 'flex-start' }}
                >
                  <RadioButtonLabel
                    obj={{ label: 'Set as primarys payment source', value: 0 }}
                    index={0}
                    labelHorizontal={true}
                    onPress={togglePrimarySource}
                    labelStyle={styles.darkBlueText}
                  />
                  <RadioButtonInput
                    obj={{ label: 'param1', value: 0 }}
                    index={0}
                    isSelected={formData.isDefault}
                    onPress={togglePrimarySource}
                    borderWidth={2}
                    buttonInnerColor={
                      formData.isDefault ? Colors.darkSlateBlue : Colors.white
                    }
                    buttonOuterColor={Colors.warmGreyTwo}
                    buttonSize={10}
                    buttonOuterSize={24}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                </RadioButton>
              </View>
              <Button success style={styles.scanButton} onPress={this.scanCard.bind(this)}>
                <Text style={styles.scanButtonText}>Scan Your Card</Text>
              </Button>
              <Text style={styles.errorSignleLine}> {apiError} </Text>
              <FormControl
                labelText={'CARD NUMBER'}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                data={formData.cardNumber}
                editable={editable}
                changeInput={changeCardNumber}
                errors={formData.errors.cardNumber}
              />
              <FormControl
                labelText={'EXPIRY MONTH'}
                placeholder="MM"
                data={formData.expiryMonth}
                editable={editable}
                changeInput={changeExpiryMonth}
                errors={formData.errors.expiryMonth}
              />
              <FormControl
                labelText={'EXPIRY YEAR'}
                placeholder="YYYY"
                data={formData.expiryYear}
                editable={editable}
                changeInput={changeExpiryYear}
                errors={formData.errors.expiryYear}
              />
              <FormControl
                labelText={'CVC'}
                placeholder="xxx"
                data={formData.cvc}
                editable={editable}
                changeInput={changeCVC}
                errors={formData.errors.cvc}
              />
              {this.props.requesting && (
                <ActivityIndicator size="large" color={Colors.turtleGreen} />
              )}
              <Button primary style={styles.button} onPress={addPaymentMethodRequest}>
                <Text style={styles.buttonText}> SUBMIT </Text>
              </Button>
            </KeyboardAvoidingView>
        </Modal>
    )
  }
}

export default AddPaymentModal
