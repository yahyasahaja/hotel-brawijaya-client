import React, { Component } from 'react'

//STYLE
import styles from './css/index.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

export default class Invoice extends Component {
  render() {
    return (
      <div>
        <Popup
          title="Invoice"
          backLink="/home"
          anim={ANIMATE_HORIZONTAL}
        >

          <ButtonBottom 
            link="/home"
            name="SAVE INVOICE"
          />
        </Popup>
      </div>
    )
  }
}
