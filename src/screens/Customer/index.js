import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import { observer } from 'mobx-react'

//STYLES
import styles from './css/index.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

//CONFIG
import { roomOrder, step } from '../../services/stores'

//COMPONENT
@observer
class Customer extends Component {
  componentDidMount() {
  }

  state = {
    nama: '',
    phone: ''
  }

  handleChange = (name, value) => {
    roomOrder[name] = value
  }

  render() {
    return (
      <Popup
        title="Customer Information"
        backLink="/order/rooms"
        // anim={ANIMATE_HORIZONTAL}
      >
        <div className={styles.container} >
          <h3>
            Please complete the following fields
          </h3>
          <Input
            className={styles.input} 
            type='text' 
            label='Full Name' 
            name='nama'
            hint='Your Full Name' 
            value={roomOrder.customer_name} 
            onChange={this.handleChange.bind(this, 'customer_name')} 
            maxLength={21}
            required />

          <Input 
            type='text' 
            label='Phone Number' 
            name='phone'
            hint='08xxxxxxxxxx' 
            value={roomOrder.phone} 
            onChange={this.handleChange.bind(this, 'phone')} 
            maxLength={12} 
            required />

          <Input 
            type='text' 
            label='Social Security Number (SSN)' 
            name='nin'
            hint='Your Social Security Number' 
            value={roomOrder.customer_nin} 
            onChange={this.handleChange.bind(this, 'customer_nin')} 
            maxLength={18} 
            required />
        </div>
        <ButtonBottom 
            link="/order/checkout"
            name="GO"
            onClick={() => step.currentStep === 2 ? step.inc() : 0}
        />
      </Popup>
    )
  }
}

export default Customer