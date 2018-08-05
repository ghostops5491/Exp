import React, { Component } from 'react'
import { Image, View, Text, } from 'react-native'
import { get } from 'lodash'
import { Section } from 'App/Components'
import { Images } from 'App/Themes'
import styles from './styles'
import Provider from '../../Components/Provider'
import { getResponsiveCSSFrom8 } from '../../Lib/Utils'


class ProviderRow extends Component {

  render(){

    const { provider } = this.props;
    const profilePhoto = provider && get(provider, 'profile_photo.medium')
    return(
      <View style={styles.rowContainer}>
          <Image
            source={ profilePhoto ? {uri: profilePhoto } : Images.avatar}
            style={{
                width: getResponsiveCSSFrom8(40).width, 
                height: getResponsiveCSSFrom8(40).width, 
                borderRadius: getResponsiveCSSFrom8(20).width
            }}
          />
          <View style={styles.userInfo}>
            <Provider 
              firstName={provider.first_name}
              lastName={provider.last_name}
              provider={provider} 
              providerNameStyles={styles.provider}
            />
          </View>
      </View>
    );
  }
}
export default ProviderRow;
