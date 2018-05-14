//MODULES
import React, { Component } from 'react'
import DatePicker from 'react-toolbox/lib/date_picker'
import Dropdown from 'react-toolbox/lib/dropdown'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'

//STYLES
import styles from './css/index-rooms.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

//COMPONENT
export default class Room extends Component {
  
  state = {
    name: 'Coffe Script',
    phone: '085851851276',
    checkIn: '9 Mei 2018',
    checkOut: '11 Mei 2018',
    duration: '2',
    adult: '1',
    child: '0',
    room: '1',
    extraBed: '0',
    typeRoom: [
      "/static/img/deluxe.jpg",
      "Superior",
      "400.000"
    ],
    totalPrice: '800.000'
  }

  render() {
    adults : "asdf";
    console.log(styles)
    return (
      <Popup
        title="Checkout"
        backLink="/order/customer"
        anim={ANIMATE_HORIZONTAL}
      >
        <div className={styles.container}>

          <div className={styles.horizontal}>
            <div style={{width : 1 }}></div>

            <div >
              <h5 className ={styles.judul}>Full Name</h5>
              <h2 className ={styles.nilai}>{this.state.name}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Phone Number</h5>
              <h2 className ={styles.nilai}>{this.state.phone}</h2>
            </div>

            <div className={styles.top}></div>
          </div>

          <div className={styles.horizontal}>
            <div >
              <h5 className ={styles.judul}>Check-in Date</h5>
              <h2>{this.state.checkIn}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Check-out Date</h5>
              <h2>{this.state.checkOut}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Duration</h5>
              <h2>{this.state.duration} night(2)</h2>
            </div>
          </div>

          
          <div className={styles.horizontal}>
            <div >
              <h5 className ={styles.judul}>Adult</h5>
              <h2>{this.state.adult}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Child</h5>
              <h2>{this.state.child}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Room(s) & Extra Bed(s)</h5>
              <h2>{this.state.room} room(s), {this.state.extraBed} Extra Bed(s)</h2>
            </div>
          </div>

          <div className={styles.horizontal}>
            <div className={styles.empty}></div>
          </div>
          
          <div className={styles.typeRoom} >
            <img src={this.state.typeRoom[0]} className={styles.imageRoom} />
            <div>
              <h4>{this.state.typeRoom[1]}</h4>
              <h3>Rp {this.state.typeRoom[2]}/night</h3>
            </div>
          </div>

          <div className={styles.totalPrice}>
            <div >
              <h5 className ={styles.judul}>Total Price</h5>
              <h2>Rp. {this.state.totalPrice}</h2>
            </div>

            <div className={styles.bottom}></div>
          </div>

        </div>
        <ButtonBottom 
            link="/order/payment"
            name="GO"
        />
      </Popup>
    )
  }
}
