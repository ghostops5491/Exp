import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button, Text, Item, Input } from 'native-base'

import styles from './styles'

export default class BillingModal extends Component {
  static propTypes = {
  }

  render() {
    return (
      <Modal animationType={"fade"} transparent={true}
       visible = {this.props.visible}
       onRequestClose = {() => { console.log("Modal has been closed.") }}>
       <TouchableWithoutFeedback onPress={() => this.props.toggle()} >
         <Text style={styles.vacantSpaceBilling}> </Text>
       </TouchableWithoutFeedback>
       <View style={styles.modalContainer}>
        <View style={styles.modal}>
           <View style={styles.modalInnerContainer}>
              <Text style={styles.modalTitle}>
                UPDATE BILLING
              </Text>
              <View>
                <Text style={styles.modalDescriptionText}>
                  Please select your payment method. Your card will not be
                    charged unitl job completion and approval.
                </Text>
              </View>
              <View style={{marginBottom: 40, marginTop: 40}}>
                <Item>
                  <Input
                    placeholder="Default card - "
                    style={styles.input}
                  />
                </Item>
              </View>
              <Button primary
                style={styles.button}
                onPress = {() => {this.props.toggle()}}
              >
                 <Text style={{width: '100%', fontWeight: "bold" }}>
                  UPDATE BILLING
                 </Text>
              </Button>
           </View>
        </View>
       </View>
       <TouchableWithoutFeedback onPress={() => this.props.toggle()} >
         <Text style={styles.vacantSpaceBilling}></Text>
       </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
