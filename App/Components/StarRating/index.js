import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { times } from 'lodash'
import { Images } from 'App/Themes'
import styles from './styles'
import DebugConfig from '../../Config/DebugConfig';

class StarRating extends Component {

  renderActiveStars(count) {
    return times(count, (index) =>
      <View key={"active"+index}>
        <Image source={Images.starRatingActive}
          style={styles.star}/>
      </View>
    );
  }

  renderInActiveStars(count) {
    return times(count, (index) => 
      <View key={"inactive"+index}>
        <Image source={Images.starRatingInactive}
          style={styles.star}/>
      </View>
    );
  }

  render(){
    const { total, achieved } = this.props;
    const remaining = total - Math.ceil(achieved);
    const showRating = DebugConfig.featureFlags.showRating;

    if (!showRating) return null;
    
    return(
      <View style={styles.starControl}>
        {this.renderActiveStars(achieved)}
        {this.renderInActiveStars(remaining)}
        <Text style={styles.rating}>
          {achieved} / {total}
        </Text>
      </View>
    );
  }  
}

export default StarRating;
