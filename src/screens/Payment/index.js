import React, { Component } from 'react'

//STYLE
import styles from './css/index.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

export default class Payment extends Component {
  render() {
    return (
      <div>
        <Popup
          title="Payment"
          backLink="/order/checkout"
          anim={ANIMATE_HORIZONTAL}
        >

          <ButtonBottom 
            link="/order/invoice"
            name="GO"
          />
        </Popup>
      </div>
    )
  }
}
