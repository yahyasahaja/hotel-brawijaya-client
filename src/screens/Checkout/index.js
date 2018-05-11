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
    checkIn: new Date(Date.now() + 86400000),
    duration: '',
    adults: '',
    children: '',
    rooms: null,
    beds: null,
    availableRooms: [],
    availableBeds: [],
    type: null,
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
    console.log(styles)
    return (
      <Popup
        title="Checkout"
        backLink="/home"
        anim={ANIMATE_HORIZONTAL}
      >
        <div className={styles.container}>

          <div className={styles.horizontal}>
            <div >
              <h5 className ={styles.judul}>Full Name</h5>
              <h2 className ={styles.nilai}>Coffee Script</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Phone Number</h5>
              <h2 className ={styles.nilai}>081363363363</h2>
            </div>
          </div>

          <div className={styles.horizontal}>
            <div >
              <h5 className ={styles.judul}>Check-in Date</h5>
              <h2>9 Mei 2018</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Check-out Date</h5>
              <h2>11 Mei 2018</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Duration</h5>
              <h2>2 night(2)</h2>
            </div>
          </div>

          
          <div className={styles.horizontal}>
            <div >
              <h5 className ={styles.judul}>Adult</h5>
              <h2>1</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Child</h5>
              <h2>0</h2>
            </div>

            <div >
              <h5 className ={styles.judul}>Room(r) & Extra Bed(s)</h5>
              <h2>1 room(s), 0 Extra Bed(s)</h2>
            </div>
          </div>
          
          <div className={styles.horizontal}>
            <img src="" />


            <div>
              <h4>Superior</h4>
              <h3>Rp 400.000/night</h3>
            </div>
          </div>
        </div>
      </Popup>
    )
  }
}
