import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { get } from 'lodash'
import { Image, View, ScrollView } from 'react-native'
import { Button, Text, Content } from 'native-base'
import { map } from 'App/Lib/lodash'
import { Images, Metrics } from 'App/Themes'
import styles from './styles'
import { MainContainer, Container, HeaderNav, FooterNav } from 'App/Components'
import Actions from 'App/Redux/Actions'
import Category from './Category'

class JobCategories extends Component {
  static propTypes = {
    fetchProblemCategories: PropTypes.func.isRequired,
    selectCategory: PropTypes.func.isRequired,
    problemCategories: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.isSelected = this.isSelected.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
  }

  componentWillMount() {
    this.props.fetchProblemCategories()
    .catch(console.log)
  }

  selectCategory(categoryId) {
    this.props.selectCategory(categoryId)
    // this.props.navigation.navigate("JobDetails")
    this.props.navigation.navigate("ScheduleJob")
  }

  isSelected(category) {
    return category.id === this.props.selectedCategory
  }

  render () {
    const { isSelected, selectCategory } = this;
    return (
      <Container>
        <ScrollView>
          <View>
            <Text style={styles.titleText}>
              WHAT DO YOU NEED HELP WITH?
            </Text>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 32,
          }}>
            {map((category, index) => (
              <Category {...{ category, selectCategory, isSelected }} key={index+1}/>
            ), this.props.problemCategories)}
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  problemCategories: (state) => get(state, 'problemCategory.categories'),
  selectedCategory:  (state) => get(state, 'problemCategory.selectedCategory'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchProblemCategories: () => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.fetchProblemCategoriesRequest(resolve, reject)))
  },
  selectCategory: (category) => dispatch(Actions.selectProblemCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(JobCategories)
