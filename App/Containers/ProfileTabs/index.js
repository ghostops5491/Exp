import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { View, Container, Header, Content, Tab, Tabs } from 'native-base'
import { get, isEmpty } from 'lodash'

import Tab1 from '../Profile'
import Tab2 from '../Payments'
import { HeaderNav, FooterNav } from 'App/Components'
import { Colors } from 'App/Themes'
import styles from './styles'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

class ProfileTabs extends Component {
  constructor (props) {
    super(props)
    this.changeTab = this.changeTab.bind(this)
    this.navigateToMyJobs = this.navigateToMyJobs.bind(this)

  }

// removing the forced entry of payment method but this code might be useful guidance to the
// user so leaving it in as comment just in case - lori 7/19
  // componentDidMount() {
  //   // this line causes the payment tab to show if the profile is done but there is no payment.
  //   setTimeout(() => this.tabView.goToPage(this.props.profileComplete && !this.props.paymentMethodExists ? 1 : 0), 300)
  // }


  changeTab = (index) => {
    console.log(index)
    this.tabView.goToPage(index)

  }

  navigateToMyJobs = () => {
    this.props.navigation.navigate('Dashboard')
  }

  render() {
    return (
      <ScrollableTabView
        ref={(tabView) => { this.tabView = tabView }}
        style={{backgroundColor: Colors.grayThree}}
        initialPage={0}
        tabBarUnderlineStyle={styles.tabView}
        tabBarActiveTextColor={Colors.midBlue}
        tabBarInactiveTextColor={Colors.grayFour}
        tabBarTextStyle={{fontWeight: '400'}}
        renderTabBar={() => <ScrollableTabBar />}

      >
        <View tabLabel='PROFILE'>
          <Tab1 navigation={this.props.navigation} changeTab={this.changeTab}/>
        </View>
        <View tabLabel='PAYMENTS'>
          <Tab2 navigation={this.props.navigation} changeTab={this.changeTab} navigateToMyJobs={this.navigateToMyJobs}/>
        </View>
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  paymentMethodExists: state => get(state, 'payments.paymentMethodExists'),
  profileComplete: state => get(state, 'auth.profileComplete')
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabs)
