/**
*
* JobState
*
*/

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Button, Text } from 'native-base'
import { get } from 'lodash'
import styles from './styles'
import RenderIcon from '../RenderIcon'
import Actions from 'App/Redux/Actions'

class JobState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuoteDropdown: false
    }
  }

  toggleQuoteDropdoen = () => {
    this.setState({ showQuoteDropdown: !this.state.showQuoteDropdown })
  }

  goToQuote = () => {
    this.props.setCurrentJob(this.props.job.id)
    this.props.navigation.navigate('QuoteConfirmScreen')
  }

  renderQuoteDropdown() {
    const { job, invoice } = this.props
    let quoteAmount = 0;
    invoice.forEach(invoiceItem => quoteAmount += Number(invoiceItem.amount*invoiceItem.quantity))

    return(
      <View style={styles.quoteDropdown}>
        { this.props.invoice.map((invoiceItem) => {
          return (
            <View style={styles.quoteDropdownRow}>
              <View style={{flex: 2}}>
                <Text style={styles.quoteDropdownLabel}>{invoiceItem.item_type}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.quoteDropdownValue}>${(invoiceItem.amount*invoiceItem.quantity).toFixed(2)}</Text>
              </View>
            </View>
          )
        })}

        <View style={styles.quoteDropdownRow}>
          <View style={{flex: 2}}>
            <Text style={styles.quoteDropdownLabel}>Total</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.quoteDropdownValue}>${quoteAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const activeState = (this.props.activeIndex >= 0) && (this.props.index === this.props.activeIndex)
    const bubbleStyle = activeState ? styles.timeBubbleActive : styles.timeBubbleInactive
    const boxStyle = activeState ? styles.stateBoxActive : styles.stateBoxInactive
    const itemStyle = activeState ? styles.itemActive : styles.itemInactive
    const quoteConfirmed = this.props.state.state === 'quote_confirmed' && this.props.job
    const quoteOffered = this.props.state.state === 'quote_offer' && activeState

    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={bubbleStyle}>
            <Text style={styles.time}>{this.props.state.time}</Text>
          </View>
          {!this.props.state.hideVerticalBar && <View style={styles.timeLine}>
            <Text></Text>
          </View>}
        </View>
        <View style={{flex: 4}}>
          <View style={boxStyle}>
            <Text style={itemStyle}>{this.props.state.state_humanize}</Text>
            {quoteOffered && <Text
              onPress={() => this.goToQuote()}
              style={styles.viewQuote}>
                View Quote
            </Text>}
            {quoteConfirmed && <Button
              style={styles.showMore}
              transparent
              onPress={this.toggleQuoteDropdoen}
            >
              <RenderIcon name={this.state.showQuoteDropdown ? 'showLess' : 'showMore'} width="15"/>
            </Button>}
            {this.state.showQuoteDropdown && this.renderQuoteDropdown()}
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setCurrentJob: (payload) => dispatch(Actions.setCurrentJob(payload))
})

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(JobState)
)
