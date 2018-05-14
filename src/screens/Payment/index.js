import React, { Component } from 'react'

//STYLE
import styles from './css/index.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

export default class Payment extends Component {
  state = {
    accountNumber: '165 524 789 26',
    accountName: 'Brawijaya Hotel',
    totalPrice: '800.000'
  }
  
  render() {
    return (
      <div>
        <Popup
          title="Payment"
          backLink="/order/checkout"
          // anim={ANIMATE_HORIZONTAL}
        >
          <div className={styles.container} >
            <h3>Please transfer to the following <br/>bank account number.</h3>
            <div className={styles.bank} >
              <img src='/static/img/mandiri.PNG' />
              <div>
                {this.state.accountNumber}<br/>
                {this.state.accountName}
              </div>
            </div>
            <div className={styles.countdown} >
              <h1>00 : 29 : 59</h1>
            </div>
            <div className={styles.price} >
              Total Price
              <div className={styles.totalPrice}>
                Rp. {this.state.totalPrice}
              </div>
            </div>
          </div>

          <ButtonBottom 
            link="/order/invoice"
            name="WAITING"
          />
        </Popup>
      </div>
    )
  }
}
