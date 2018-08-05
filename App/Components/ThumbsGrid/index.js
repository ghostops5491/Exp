import React, { Component } from 'react'
import { View, Image, Platform, Modal, Dimensions, TouchableOpacity, Text } from 'react-native'
import { map } from 'lodash'
import styles from './styles'
import { Images } from 'App/Themes'

class ThumbsGrid extends Component {
  constructor () {
    super()
    this.state = {
      modalVisible: false,
      uri: ''
    }
  }

  openImage = (uri) => {
    this.setState({
      modalVisible: true,
      uri
    })
  }

  render() {
    const { photosArray, photoGridStyles, photoStyles } = this.props
    return (
      <View style={[styles.photoGrid].concat(photoGridStyles)}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.imageViewer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => this.setState({modalVisible: false})}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image
              loadingIndicatorSource={Images.loader}
              source={{uri: this.state.uri}}
              style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width}}
            />
          </View>
        </Modal>
        {map(photosArray, (photo, index) => {
          return (
            photo &&
            (
             <TouchableOpacity onPress={() => this.openImage(photo.medium)}>
               <Image
                 loadingIndicatorSource={Images.loader}
                 key={index}
                 source={photo ? { uri: photo.medium } : Images.loader}
                 style={[styles.photo].concat(photoStyles)}
               />
             </TouchableOpacity>
            )
          )
        })}
      </View>
    )
  }
}

export default ThumbsGrid
