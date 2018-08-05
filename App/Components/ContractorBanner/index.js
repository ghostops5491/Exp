/**
 *
 * ContractorBanner
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'
import { get } from 'lodash'
import { Images } from 'App/Themes'
import { RenderIcon } from '../'
import styles from './styles'
import Provider from '../Provider'

export default class ContractorBanner extends Component {
  static propTypes = {}

  render() {
    const { contractor } = this.props
    const profilePhoto = contractor && get(contractor, 'profile_photo.medium')
    return (
      <View style={{ flexDirection: 'row', flex: 0.8 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={profilePhoto ? { uri: profilePhoto } : Images.avatar}
            style={styles.avatar}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          {!!contractor && (
            <View>
              <Provider
                firstName={contractor.first_name}
                lastName={contractor.last_name}
                provider={contractor}
                providerNameStyles={styles.providerName}
              />
            </View>
          )}
        </View>
      </View>
    )
  }
}
