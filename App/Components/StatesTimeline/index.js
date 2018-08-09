/**
*
* StatesTimeline
*
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { map, filter } from 'lodash'
import JobState from '../JobState'
import styles from './styles'

export default function StatesTimeline(props) {
  const { WAITING, MATCHED, ON_THE_WAY, ARRIVED, QUOTE_OFFER, QUOTE_CONFIRMED, QUOTE_REJECTED, WORK_STARTED, WORK_PAUSED,
    WORK_RESUMED, WORK_COMPLETED, WORK_CANCELLED } = props.jobStates
  let states = filter(props.states, (s) => (
    s.state !== 'waiting' && s.state !== 'matched'
  ))
  states = map(states, state => {
    if (state.state === WORK_COMPLETED || state.state === WORK_CANCELLED) {
      return state.merge({ hideVerticalBar: true })
    }
    return state
  })
  const active = props.active

  const allNextStates = [
    { id: 'fake_on_the_way', state: ON_THE_WAY, state_humanize: 'ON THE WAY' },
    { id: 'fake_arrived', state:  ARRIVED, state_humanize: 'ARRIVED' },
    { id: 'fake_quote_offered', state: QUOTE_OFFER, state_humanize: 'QUOTE OFFERED'},
    { id: 'fake_quote_confirmed', state: QUOTE_CONFIRMED, state_humanize: 'QUOTE CONFIRMED' },
    { id: 'fake_work_started', state: WORK_STARTED, state_humanize: 'WORK STARTED' },
    { id: 'fake_work_completed', state: WORK_COMPLETED, state_humanize: 'WORK COMPLETED', hideVerticalBar: true }
  ]
  let nextStates = null
  switch (active) {
    case WAITING:
      nextStates = allNextStates
      break;
    case MATCHED:
      nextStates = allNextStates
      break;
    case ON_THE_WAY:
      nextStates = allNextStates.slice(1,6)
      break;
    case ARRIVED:
      nextStates = allNextStates.slice(2,6)
      break;
    case QUOTE_OFFER:
      nextStates = allNextStates.slice(3,6)
      break;
    case QUOTE_CONFIRMED:
      nextStates = allNextStates.slice(4,6)
      break;

    case WORK_STARTED:
      nextStates = allNextStates.slice(5,6)
      break;
    case WORK_PAUSED:
      nextStates = allNextStates.slice(5,6)
      break;
    case WORK_RESUMED:
      nextStates = allNextStates.slice(5,6)
      break;
    default:
      nextStates = []
  }
  activeIndex = states.length - 1;
  return (
    <View>
      {map(states, (state, index) => (
        <JobState
          state={state}
          key={state.id}
          active={active}
          activeIndex={activeIndex}
          index={index}
          job={props.job}
        />
      ))}
      {map(nextStates, (state) => (
        <JobState
          state={state}
          key={state.id}
        />
      ))}
    </View>
  );
}
