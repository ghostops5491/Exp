import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Image, View } from 'react-native'
import { Text } from 'native-base'
import { Images } from 'App/Themes'
import { get, isEmpty } from 'lodash'
import styles from './styles'
import { Container } from 'App/Components'
import Actions from 'App/Redux/Actions'

class FindProvider extends Component {

  render () {
    return (
      <Container>
        <View style={styles.logoOuterContainer}>
          <View style={styles.logoContainer}>
            <Image source={Images.secondaryLogo} style={styles.logo} />
          </View>
        </View>
        <View>
          <Text style={styles.bodyText}>Contacting your preferred providers first!</Text>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  serviceRequestId: (state) => get(state, 'serviceRequest.serviceRequest.id'),
  currentJobId: (state) => get(state, 'job.currentJobId'),
  recentContractorMatches: (state) => get(state, 'job.recentContractorMatches'),
})

const mapDispatchToProps = (dispatch) => ({
  findPreferredContractor: (serviceRequestId) => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.findPreferredContractorRequest(serviceRequestId, resolve, reject)))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FindProvider)
