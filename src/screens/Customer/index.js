import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'

//STYLES
import styles from './css/index.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

export default class componentName extends Component {
  state = {
    nama: 'Full Name',
    phone: ''
  }

  render() {
    return (
      <Popup
        title="Customer Information"
        backLink="/order/rooms"
        anim={ANIMATE_HORIZONTAL}
      >
        {/* <Input 
          type='text' 
          label='Name' 
          name='nama' 
          value={this.state.nama} 
          onChange={this.handleChange.bind(this, 'nama')} 
          maxLength={16} /> */}
      </Popup>
    )
  }
}
