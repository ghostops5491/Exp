import React, { Component } from 'react'
import { Image, ImageBackground, ScrollView, View, Keyboard, Dimensions } from 'react-native'
import { Container, Content } from 'native-base'
import { RenderIcon } from 'App/Components'
import { Images } from 'App/Themes'
import styles from './styles'

export default class AuthScreenLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyboardActive: false,
      displayHeight: Dimensions.get('window').height
    }
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  _keyboardDidShow (e) {
    this.setState({
      keyboardActive: true,
      displayHeight: Dimensions.get('window').height * 0.9 - e.endCoordinates.height
    })
  }

  _keyboardDidHide () {
    this.setState({
      keyboardActive: false,
      displayHeight: Dimensions.get('window').height
    })
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{flex: 1, marginBottom: this.state.keyboardActive ? 100 : 0}}
          scrollEnabled={this.state.keyboardActive}>
          <View style={[styles.mainContent, {maxHeight: this.state.displayHeight}]}>
            <View style={styles.headerImageWrapper}>
              <ImageBackground
                source={Images.loginScreen}
                style={styles.backgroundImage}
              />
            </View>
            <View style={styles.contentView}>
              <View style={styles.logoContainer}>
                <Image source={Images.primaryLogo} style={styles.logo}/>
              </View>
              {this.props.children}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
