/**
 *
 * PaymentSource
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import {
  Button,
  Text,
  Content,
  Form,
  Item,
  Input,
  Right,
  ListItem,
  Radio
} from 'native-base'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import FormControl from 'App/Components/FormControl'
// import get from 'lodash/get'
import {
  MainContainer,
  Container,
  Section,
  HeaderNav,
  FooterNav
} from 'App/Components'
import styles from './styles'

class PaymentSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  changeTitle(title) {
    this.setState({ title })
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <View style={{ marginLeft: 20, marginRight: 10 }}>
            <View style={styles.mainContent}>
              <Text style={styles.cards}>Set as primary payment source</Text>
              <Radio selected={true} />
            </View>
            <FormControl
              labelText="BANK NAME"
              data="Wells Fargo"
              changeInput={this.changeTitle.bind(this)}
            />
            <FormControl
              labelText="ACCOUNT NUMBER"
              data="*******8463"
              changeInput={this.changeTitle.bind(this)}
            />
            <FormControl
              labelText="ROUTING NUMBER"
              data="2749639"
              changeInput={this.changeTitle.bind(this)}
            />
            <FormControl
              labelText="ACCOUNT HOLDER NAME"
              data="Jane Mary Doe"
              changeInput={this.changeTitle.bind(this)}
            />
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  state: state => state
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSource)
