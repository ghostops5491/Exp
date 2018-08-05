/**
*
* Processing
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// import get from 'lodash/get'
import { View, ScrollView, Modal, Image } from 'react-native'
import { Content, Button, Text } from 'native-base'
import { Container } from 'App/Components'
import styles from './styles'
import { Images } from 'App/Themes';
import Actions from 'App/Redux/Actions'

class Processing extends Component {
  static propTypes = {}
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <View style={styles.screenBody}>
            <View style={styles.title}>
              <Text style={styles.title}>
                PASSWORD RESET PROCESSING
              </Text>
            </View>
            <View style={styles.d_container}>
              <Text style={styles.description}>
                If your email is found in our system then you will receive an email with intructions.
              </Text>
            </View>
            <View style={styles.bodyBottom}>
              <Button
                primary style={styles.nextButton}
                onPress={() => this.props.navigation.navigate("LoginScreen")}>
                  <Text style={styles.nextButtonText}>BACK TO LOGIN</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Processing)
