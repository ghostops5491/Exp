import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Item, Input } from 'native-base'
import { Colors } from 'App/Themes'
import styles from './styles'

export default class ServiceAddress extends Component {

  constructor(props){
    super(props);
  }

  render () {
    const {
      onChangeStreet,
      onChangeAddress2,
      onChangeCity,
      onChangeState,
      onChangeZip,
      validationErrors,
      editable,
      labelText,
    } = this.props;
    const errorStyle = { borderColor: Colors.paleRed }
    return (
      <View>
        {labelText && <View style={styles.header}>
          <Text style={styles.headerText}>{labelText}</Text>
        </View>}

        <Item style={styles.item}>
          <Input
            autoCorrect = { false }
            style={styles.input}
            style={[styles.input, (validationErrors.street ? errorStyle : {})]}
            editable={editable}
            placeholder="Street"
            placeholderTextColor={Colors.grayFive}
            value={this.props.street}
            onChangeText={(text) => onChangeStreet(text)}
          />
        </Item>

        <Item style={styles.item}>
          <Input
            autoCorrect = { false }
            style={styles.input}
            editable={editable}
            placeholder="Address 2 (Optional)"
            placeholderTextColor={Colors.grayFive}
            value={this.props.address_2}
            onChangeText={(text) => onChangeAddress2(text)}
          />
        </Item>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 0.5,
          }}>
          <Item style={styles.item}>
            <Input
              autoCorrect = { false }
              style={[styles.input, (validationErrors.city ? errorStyle : {})]}
              editable={editable}
              placeholder="City"
              placeholderTextColor={Colors.grayFive}
              value={this.props.city}
              onChangeText={(text) => onChangeCity(text)}
            />
          </Item>
            </View>
          <View style={{
            marginLeft: 5,
            flex: 0.25,
          }}>
            <Item style={styles.item}>
              <Input
                autoCorrect = { false }
                style={[styles.input, (validationErrors.state ? errorStyle : {})]}
                editable={editable}
                placeholder="State"
                placeholderTextColor={Colors.grayFive}
                value={this.props.state}
                onChangeText={(text) => onChangeState(text)}
              />
            </Item>
          </View>
          <View style={{
            marginLeft: 5,
            flex: 0.25,
          }}>
            <Item style={styles.item}>
              <Input
                autoCorrect = { false }
                style={[styles.input, (validationErrors.zip ? errorStyle : {})]}
                editable={editable}
                placeholder="Zip"
                placeholderTextColor={Colors.grayFive}
                value={this.props.zip}
                onChangeText={(text) => onChangeZip(text)}
              />
            </Item>
          </View>
        </View>
      </View>
    )
  }
}

ServiceAddress.defaultProps = {
  onChangeStreet: (text) => {},
  onChangeAddress2: (text) => {},
  onChangeCity: (text) => {},
  onChangeState: (text) => {},
  onChangeZip: (text) => {},
  street: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  validationErrors: {}
}
