import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import Actions from '../../Redux/Actions'
import StarRating from '../StarRating';
import styles from './styles';
import DebugConfig from '../../Config/DebugConfig';

const Provider = ({ 
    provider, name, providerNameStyles,
    navigation, setCurrentPreferredContractor,
    starControlStyles, providerContainerStyles,
    firstName, lastName, shouldNotNavigate
}) => {
  return (
      <TouchableOpacity onPress={() => { 
          if (!!shouldNotNavigate) return;
          setCurrentPreferredContractor(provider)
          navigation.navigate('PreferredProviderDetails')
        }}
        disabled={shouldNotNavigate}
        style={[styles.providerContainer].concat(providerContainerStyles)}
      >
        <View style={[styles.nameContainer].concat()}>
            <Text style={[styles.name].concat(providerNameStyles)}>
              {firstName} {lastName}
            </Text>
        </View>
        <StarRating
          total={5}
          achieved={4}
          starControlStyles={starControlStyles}
        />
      </TouchableOpacity>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentPreferredContractor: (provider) => 
    dispatch(Actions.setCurrentPreferredContractor(provider))
})

export default withNavigation(connect(null, mapDispatchToProps)(Provider));