import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button, Text, Item, Input } from 'native-base'
import FormControl from 'App/Components/FormControl'
import { emailRegex, phoneRegex } from 'App/Lib/Regex'
import styles from './styles'
import { get, last, isEmpty } from 'lodash'

export default class ShareModal extends Component {
  constructor(props) {
    super(props)

    this.state = { email: "", phone: "", name: "", errors: []}
    this.onClick = this.onClick.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)

    this.validateInputs = this.validateInputs.bind(this)
  }

  validateInputs = () => {
    if (this.props.type === "EMAIL") {
      return this.validEmail()
    }
  }

  validEmail = () => {
    const email = this.state.email
    const errors = this.state.errors.slice(0)
    if (isEmpty(email)) {

      errors.push("Enter recipient's email")
      this.setState({errors: errors})
      return false
    } else if (!emailRegex.test(email)) {

      errors.push("Enter valid email address")
      this.setState({errors: errors})
      return false
    }
    else {
      this.setState({errors: []})
      return true
    }
  }

  handleEmailChange = (text) => {
    this.setState({email: text})
  }

  handleNameChange = (text) => {
    this.setState({ name: text })
  }

  onClick = () => {
    if (this.validateInputs()) {
      if (this.props.type === "EMAIL") {
        this.props.submit(this.state.email, this.state.name)
      }
    }
  }

  close = () => {
    this.setState(
      { email: "", phone: "", name: "", errors: []}
    )
    this.props.toggle()
  }

  render() {
    const { header, description, type, buttonText, toggle } = this.props

    return (
      <Modal animationType={"fade"} transparent={true}
       visible = {this.props.visible}
       onRequestClose = {() => { console.log("Modal has been closed.") }}>
       <TouchableWithoutFeedback onPress={() => this.props.toggle()} >
         <Text style={styles.vacantSpaceShare}> </Text>
       </TouchableWithoutFeedback>
       <View style={styles.modalContainer}>
          <View style={styles.modal}>
             <View style={styles.modalInnerContainer}>
               <Text
               style={styles.closeButton}
               onPress={this.close}
               >X</Text>
                <Text style={styles.modalTitle}>
                  {header}
                </Text>
                <View>
                  <Text style={styles.modalDescriptionText}>
                  {description}
                  </Text>
                </View>
                {type === "PHONE" &&
                <View>
                <View style={{marginBottom: 10, marginTop: 40}}>
                  <Item>
                    <Input
                      placeholder="### ### ####"
                      style={styles.input}
                    />
                  </Item>
                </View>
                <View style={styles.add}>
                  <Button transparent style={styles.addButton}>
                    <Text style={{ fontSize: 12 }}> ADD MORE + </Text>
                  </Button>
                </View>
              </View>
                }
                {type === "EMAIL" &&
                <View>
                  <FormControl
                    labelText="EMAIL"
                    data={this.state.email}
                    changeInput={(text) => this.handleEmailChange(text)}
                    errors={this.state.errors}
                  />
                  <FormControl
                    labelText="NAME"
                    data={this.state.name}
                    changeInput={(text) => this.handleNameChange(text)}
                    errors={this.state.errors}
                  />

            </View>
                }

                <Button primary
                  style={styles.button}
                  onPress = {() => this.onClick()}
                >
                   <Text style={{width: '100%', fontWeight: "bold" }}>
                    {buttonText}
                   </Text>
                </Button>
             </View>
          </View>
        </View>
       <TouchableWithoutFeedback onPress={() => this.onClick()} >
         <Text style={styles.vacantSpaceShare}></Text>
       </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
