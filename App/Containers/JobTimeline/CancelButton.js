import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import styles from './styles'

export default function CancelButton(props) {
  return (
    <View style={styles.cancelButton}>
      <Button
      onPress={() => props.confirmWorkCancelled()}
      >
        <Text style={styles.buttonText}>
          CANCEL SERVICE </Text>
      </Button>
    </View>
  )
}
