//MODULES
import React, { Component } from 'react'
import DatePicker from 'material-ui/DatePicker'
import Dropdown from 'react-toolbox/lib/dropdown'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'

//STYLES
import styles from './css/index-rooms.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

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

  onSubmit = e => {
    e.preventDefault()

  }

  render() {
    console.log(styles)
    return (
      <Popup
        title="Order Room"
        backLink="/home"
        anim={ANIMATE_HORIZONTAL}
      >
        <form onSubmit={this.onSubmit} >
          <div className={styles.container}>
            <DatePicker 
              floatingLabelText='Check In' 
              onChange={this.handleChange.bind(this, 'checkIn')} 
              value={this.state.checkIn} 
              minDate={new Date(Date.now() + 86400000)}
              maxDate={new Date(Date.now() + 2592000000)}
              required 
            />

            <Dropdown
              label="Duration"
              onChange={this.handleChange.bind(this, 'duration')}
              source={availableDuration}
              value={this.state.duration}
              required
            />

            <div className={styles.horizontal}>
              <Dropdown
                label="Adult"
                onChange={this.handleChange.bind(this, 'adults')}
                source={availableAdults}
                value={this.state.adults}
                required
              />

              <Dropdown
                label="Children"
                onChange={this.handleChange.bind(this, 'children')}
                source={availableChildren}
                value={this.state.children}
                required
              />
            </div>

            <div className={styles.horizontal}>
              <Dropdown
                label="Rooms"
                onChange={this.handleChange.bind(this, 'rooms')}
                source={this.state.availableRooms}
                value={this.state.rooms}
                disabled={this.state.rooms === null}
                required
              />
              
              <Dropdown
                label="Extra Beds"
                onChange={this.handleChange.bind(this, 'beds')}
                source={this.state.availableBeds}
                disabled={this.state.beds === null}
                value={this.state.beds}
                required
              />
            </div>

            <RadioGroup 
              name='Room Type' 
              value={this.state.type} 
              onChange={this.handleChange.bind(this, 'type')}
            >
              <RadioButton label={
                <div className={styles.list}>
                  <div className={styles.image} >
                    <img src="/static/img/app_store_badge.svg" />
                  </div>

                  <div className={styles.desc} >
                    <span className={styles.title} >Superior</span>
                    <span className={styles.title} >Rp 400.000/night</span>
                  </div>
                </div>
              } value='superior'/>

              <RadioButton label={
                <div className={styles.list}>
                  <div className={styles.image} >
                    <img src="/static/img/app_store_badge.svg" />
                  </div>

                  <div className={styles.desc} >
                    <span className={styles.title} >Deluxe</span>
                    <span className={styles.title} >Rp 600.000/night</span>
                  </div>
                </div>
              } value='deluxe'/>
            </RadioGroup>
          </div>
          <ButtonBottom 
            link="/order/customer"
            name="GO"
          />
        </form>
      </Popup>
    )
  }
}
