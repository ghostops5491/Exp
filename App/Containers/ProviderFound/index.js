import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Content, Text } from 'native-base'
import { Images } from 'App/Themes'
import styles from './styles'
import { Container } from 'App/Components'
import Actions from 'App/Redux/Actions'

class ProviderFound extends Component {
  
  componentDidMount(){
    const currentRoute = this.props.nav.currentRoute
    this.props.dismissContractorMatch();
    setTimeout(() => {
      if (currentRoute !== 'PreferredProvider') {
        console.log("Loading Preferred Provider");
        
        this.props.navigation.navigate("PreferredProvider")
      }
    }, 3000)
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
            Great! We have found a provider for you and he is on his way!
            </Text>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  nav: (state) => get(state, 'nav'),
  dismissContractorMatch: () => dispatch(Actions.dismissContractorMatch())
})

export default connect(null, mapDispatchToProps)(ProviderFound)
