import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, Item, Input } from 'native-base'
import { isEmpty } from 'lodash'
import { Colors } from 'App/Themes'
import styles from './styles'

export default class FormControl extends Component {
  static propTypes = {
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    editable: PropTypes.bool,
  }
  render () {
    const { errors, labelText, placeholder, editable, data } = this.props
    let inputStyle = [styles.input, errors && errors === "undefined" ? styles.errorInput : null]
    inputStyle = inputStyle.concat(editable ? styles.inputOpaque : null)
    return (
      <View>
        {labelText && <View style={styles.headerStyle}>
          <Text style={styles.header}>
            {labelText}
          </Text>
        </View>}

        <Item style={styles.item}>
          <Input
            autoCorrect={false}
            keyboardType={this.props.keyboardType}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={Colors.grayFive}
            style={inputStyle}
            value={this.props.data}
            onChangeText={(text) => this.props.changeInput(text)}
            onEndEditing={() => this.props.onEndEditing && this.props.onEndEditing()}
          />
        </Item>
        {!isEmpty(errors) && <Text style={styles.errorSignleLine}>
          {errors}
        </Text>}
      </View>
    )
  }
}
