import React, { Component } from 'react'
import { View } from 'react-native'
import { Container } from 'native-base'
import styles from './styles'

export default class MainContainer extends Component {
  render () {
    return (
      <Container style={styles.container}>
        {this.props.children}
      </Container>
    )
  }
}
