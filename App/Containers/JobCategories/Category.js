/**
 *
 * UnselectedCategory
 *
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { View } from "react-native"
import { Button, Text } from "native-base"
import styles from "./styles"

export default class UnselectedCategory extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  }

  render() {
    const { category, isSelected, selectCategory } = this.props

    const selectedButton = () => (
      <Button
        style={{ width: 130, height: 60 }}
        onPress={() => selectCategory(category.id)}
      >
        <Text style={styles.selectedButtonText} allowFontScaling={false}>
          {category.title.toUpperCase()}
        </Text>
      </Button>
    )

    const UnSelectedButton = () => (
      <Button
        bordered
        style={{ width: 130, height: 60 }}
        onPress={() => selectCategory(category.id)}
      >
        <Text style={styles.buttonText} allowFontScaling={false}>{category.title.toUpperCase()}</Text>
      </Button>
    )

    return (
      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
          marginLeft: 10,
          marginRight: 10
        }}
      >
        {isSelected(category) ? selectedButton() : UnSelectedButton()}
      </View>
    )
  }
}
