//MODULES
import React, { Component } from 'react'

//STYLES
import styles from './css/index-room.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'

//COMPONENT
export default class Room extends Component {
  render() {
    return (
      <Popup
        title="Order Room"
        backLink="/home"
        anim={ANIMATE_HORIZONTAL}
      >
        <span>hi</span>
      </Popup>
    )
  }
}
