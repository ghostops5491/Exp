import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text } from 'native-base'
import { Images } from 'App/Themes'
import styles from './styles'
import { Container } from 'App/Components'


export default class PreferredProviderNotFound extends Component {
  render () {
    return (
    <Container>
      <View style={styles.logoOuterContainer}>
        <View style={styles.logoContainer}>
          <Image source={Images.secondaryLogo} style={styles.logo} />
        </View>
      </View>
      <View>
        <Text style={styles.bodyText}>
          We are sorry, but your preferred providers are busy right now.
          Looking for another skilled pro for your job.
        </Text>
      </View>
    </Container>
    )
  }
}
