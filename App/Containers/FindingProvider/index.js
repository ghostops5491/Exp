import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, View } from 'react-native'
import { Text } from 'native-base'
import { Images } from 'App/Themes'
import styles from './styles'
import { Container } from 'App/Components'
import Actions from 'App/Redux/Actions'

export default class FindingProvider extends Component {
  render () {
    return (
      <Container>
        <View style={[styles.logoOuterContainer, { flex : 0.8 }]}>
          <View style={styles.logoContainer}>
            <Image source={Images.secondaryLogo} style={styles.logo} />
          </View>
        </View>
        <View style={{ flex : 0.2 }}>
          <Text style={styles.bodyText}>
            Contacting available service providers. Please be patient, it could take a few minutes.
          </Text>
        </View>
      </Container>
    )
  }
}
