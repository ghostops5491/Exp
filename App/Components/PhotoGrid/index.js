import React, { Component } from 'react'
import { View, Image, Platform } from 'react-native'
import { map, get } from 'lodash'
import styles from './styles'
import { Images } from 'App/Themes'

class PhotoGrid extends Component {
  render() {
    const { photosArray } = this.props
    return (
      <View style={styles.photoGrid}>
        {map(photosArray, (photo, index) => {
          return (
            photo &&
            photo.original && (
              <Image
                loadingIndicatorSource={Images.loader}
                key={index}
                source={photo ? { uri: get(photo, 'medium') } : Images.loader}
                style={styles.photo}
              />
            )
          )
        })}
      </View>
    )
  }
}

export default PhotoGrid
