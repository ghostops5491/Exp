import React, { Component } from 'react'
import { View, Modal } from 'react-native'
import { Button, Text } from 'native-base'
import styles from './styles'
import { WebView } from 'react-native';

export default class TermsConditionsModal extends Component {
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible = {this.props.visible}
        onRequestClose = {() => { console.log("Modal has been closed.") }}>
       <View style={styles.termsModalContainer}>
          <Text style={styles.modalTitle}>
            Jonny On It Terms and Conditions
          </Text>
          <View style={styles.termsContainer}>
            <WebView
              source={{uri: 'https://www.jonnyonit.com/user-terms?bare=true'}}
              style={styles.terms}
            />
          </View>
          { this.props.showAcceptDeclineButtons
            ? <View>
              <Button primary
                style={styles.acceptButton}
                onPress = {() => this.props.acceptTerms()}
                >
                <Text style={{width: '100%', fontWeight: "bold" }}>
                Accept
                </Text>
              </Button>
              <Button primary
                style={styles.declineButton}
                onPress = {() => this.props.declineTerms()}
                >
                <Text style={{width: '100%', fontWeight: "bold" }}>
                Decline
                </Text>
              </Button>
            </View>
            : <Button primary
              style={styles.button}
              onPress = {() => this.props.toggle()}
            >
                <Text style={{width: '100%', fontWeight: "bold" }}>
                Close
                </Text>
            </Button>
          }
       </View>
      </Modal>
    );
  }
}
