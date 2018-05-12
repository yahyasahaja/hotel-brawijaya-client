import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'

//STYLES
import styles from './css/index.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

export default class componentName extends Component {
  state = {
    nama: '',
    phone: ''
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  }

  render() {
    return (
      <Popup
        title="Customer Information"
        backLink="/order/rooms"
        anim={ANIMATE_HORIZONTAL}
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
            value={this.state.nama} 
            onChange={this.handleChange.bind(this, 'nama')} 
            maxLength={21}
            required />

          <Input 
            type='text' 
            label='Phone Number' 
            name='phone'
            hint='08xxxxxxxxxx' 
            value={this.state.phone} 
            onChange={this.handleChange.bind(this, 'phone')} 
            maxLength={12} 
            required />
        </div>
        <ButtonBottom 
            link="/order/checkout"
            name="GO"
        />
      </Popup>
    )
  }
}
