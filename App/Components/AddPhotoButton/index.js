import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import styles from './styles'
import { Fonts, Colors, Metrics } from 'App/Themes'

export default class AddPhotoButton extends Component {
  render () {
    return (
      <Button primary style={styles.button}>
        <Text style={styles.buttonText}> + </Text>
      </Button>
    )
  }
}
