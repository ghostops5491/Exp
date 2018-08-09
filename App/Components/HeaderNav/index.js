import React, { Component } from 'react'
import { Image,  View } from 'react-native'
import { Button, Text, Header, Left, Right, Icon, Body } from 'native-base'
import RenderIcon from '../RenderIcon'
import { Images } from 'App/Themes'
import styles from './styles'
import Section from '../Section'

export default class HeaderNav extends Component {
  constructor(props) {
    super(props)
  }

  goBack = () => {
    const { navigator } = this.props
    if(navigator) {
      navigator.props.navigation.goBack(null)
    }
  }

  render() {
    const { showBackButton } = this.props
    return (
      <Header style={styles.header}>
        <Left style={{flex: 1, }}>
          {(showBackButton && <Button transparent onPress={() => {this.goBack()}}>
            <RenderIcon name="back" width="15"/>
          </Button>)}
        </Left>
        <Body style={{flex: 2, }}>
          <View style={styles.innerBody}>
            <View style={styles.logoContainer}>
              <Image source={Images.primaryLogo} style={styles.logo} />
            </View>
          </View>
        </Body>
        <Right style={{flex: 1, justifyContent: 'flex-end'}}>
        </Right>
      </Header>
    )
  }
}
