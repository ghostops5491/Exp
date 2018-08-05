import React, { Component } from 'react'
import { Image, View, } from 'react-native'
import { get } from 'lodash'
import { Images } from 'App/Themes'
import styles from './styles'
import Provider from '../../Components/Provider'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'
import CheckBox from 'react-native-check-box'

class CheckProviderRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: true,
    }
  }

  toggleRow = (id) => {
    this.props.parentToggle(id, this.state.checked)
    this.setState({ checked: !this.state.checked })
  }

  render () {
    const {provider} = this.props
    const profilePhoto = provider && get(provider, 'profile_photo.medium')
    return (
      <View style={styles.rowContainer}>
        <Image
          source={profilePhoto ? {uri: profilePhoto} : Images.avatar}
          style={styles.imageStyle}
        />
        <View style={styles.userFields}>
          <Provider
            firstName={provider.first_name}
            lastName={provider.last_name}
            provider={provider}
            providerNameStyles={styles.providerName}
          />
        </View>
        <View style={styles.checkBoxOuter}>
          {this.props.checkListVisible &&
            <CheckBox style={styles.checkBox}
                    onClick={() => this.toggleRow(provider.id)}
                    isChecked={this.state.checked}
          />}
        </View>
      </View>
    )
  }
}

export default CheckProviderRow;

