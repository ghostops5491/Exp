import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Content, Text } from 'native-base'
import { connect } from 'react-redux'
import { Images } from 'App/Themes'
import styles from './styles'
import { Container } from 'App/Components'
import Actions from 'App/Redux/Actions'

class ProviderNotFound extends Component {

  componentWillMount() {
    this.props.dismissNoneContractorMatch();
  }

  render () {
    return (
      <Container>
        <Content>
          <View style={styles.logoOuterContainer}>
            <View style={styles.logoContainer}>
              <Image source={Images.secondaryLogo} style={styles.logo} />
            </View>
          </View>
          <View>
            <Text style={styles.bodyText}>
              We are sorry, but no provider is available right now.
              We will contact you as soon as any provider is available.
            </Text>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  nav: (state) => get(state, 'nav'),
  dismissNoneContractorMatch: () => dispatch(Actions.dismissNoneContractorMatch())
})

export default connect(null, mapDispatchToProps)(ProviderNotFound)
