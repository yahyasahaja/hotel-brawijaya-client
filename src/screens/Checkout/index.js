//MODULES
import React, { Component } from 'react'
import DatePicker from 'react-toolbox/lib/date_picker'
import Dropdown from 'react-toolbox/lib/dropdown'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'

//STYLES
import styles from './css/index-rooms.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'

//INNER CONFIG
const availableDuration = []
for (let i = 1; i <= 30; i++) availableDuration.push({value: i, label: `${i} night(s)`})

const availableAdults = []
for (let i = 1; i <= 15; i++) availableAdults.push({value: i, label: `${i} guest(s)`})

const availableChildren = []
for (let i = 1; i <= 15; i++) availableChildren.push({value: i, label: `${i} child(s)`})

//COMPONENT
export default class Room extends Component {
  
  state = {
    fullName : "Coffee Script",
    phoneNumber : "081363363363",
    checkIn: "9 Mei 2018",
    checkOut: "11 Mei 2018",
    duration: 2,
    adults: 1,
    children: 0,
    rooms: 1,
    extraBeds: 0,
    type: "Superior",
    harga: "400.000", 
  }

  handleChange = (item, value) => {
    this.setState({...this.state, [item]: value}, () => {
      let adults = this.state.adults
      let children = this.state.children

      if (item === 'adults' || item === 'children') {
        let availableRooms = []
        let maxRooms = adults + children
        let minRooms = Math.max(Math.ceil(adults / 2), Math.ceil(children / 2)) - 1
        if (minRooms < 1) minRooms = 1
        for (let i = minRooms; i <= maxRooms; i++) availableRooms.push({value: i, label: `${i} room(s)`})
        
        this.setState({availableRooms, availableBeds: [], beds: null, rooms: ''})
      }
  
      if (item === 'rooms') {
        let availableBeds = []
        let minBeds = 1
        let maxBeds = value
        for (let i = minBeds; i <= maxBeds; i++) availableBeds.push({value: i, label: `${i} bed(s)`})
        this.setState({availableBeds, beds: ''})
      }
    })
  }

  render() {
    adults : "asdf";
    console.log(styles)
    return (
      <Popup
        title="Checkout"
        backLink="/home"
        anim={ANIMATE_HORIZONTAL}
      >
        <div className={styles.container}>

          <div className={styles.horizontal}>
            <div style={{width : 1 }}></div>

            <div >
              <h5 className ={styles.judul}>Full Name</h5>
              <h2 className ={styles.nilai}>{this.state.fullName}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Phone Number</h5>
              <h2 className ={styles.nilai}>{this.state.phoneNumber}</h2>
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
              <h2>{this.state.duration} night(s)</h2>
            </div>
          </div>

          
          <div className={styles.horizontal}>
            <div >
              <h5 className ={styles.judul}>Adult</h5>
              <h2>{this.state.adults}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Child</h5>
              <h2>{this.state.children}</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Room(r) & Extra Bed(s)</h5>
              <h2>{this.state.rooms} room(s),{this.state.extraBeds} Extra Bed(s)</h2>
            </div>
          </div>

          <div className={styles.horizontal}>
            <div className={styles.empty}></div>
          </div>
          
          <div className={styles.horizontal}>
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/chat-app4.appspot.com/o/profile_photo%2Fimg_AlrrKhADPhcVo7zFwRtmtvCVka02.jpg?alt=media&token=5240e830-af77-4414-9f5f-dde6bdba4209" 
              height = "100"
              width = "100"
            />


            <div>
              <div>{this.state.type}</div>
              <h3>Rp {this.state.harga}/night</h3>
            </div>

            <div className={styles.bottom}></div>
          </div>

        </div>
      </Popup>
    )
  }
}
