import React, { Component } from 'react'
import { Image, View, Text, } from 'react-native'
import { get } from 'lodash'
import { Section } from 'App/Components'
import { Images } from 'App/Themes'
import styles from './styles'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'
import Provider from '../../Components/Provider'


class ProviderRow extends Component {

  render(){
    const { provider } = this.props;
    const profilePhoto = provider && get(provider, 'profile_photo.medium')
    return(
      <View style={styles.rowContainer}>
        <Image
          source={ profilePhoto ? {uri: profilePhoto } : Images.avatar}
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
      </View>
    );
  }
}
export default ProviderRow;
