//MODULES
import React, { Component } from 'react'
import DatePicker from 'material-ui/DatePicker'
import Dropdown from 'react-toolbox/lib/dropdown'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'
import Checkbox from 'material-ui/Checkbox'
import axios from 'axios'
import moment from 'moment'

//STYLES
import styles from './css/index-rooms.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

//CONFIG
import {getEndPoint} from '../../config'

//INNER CONFIG
const availableDuration = []
for (let i = 1; i <= 30; i++) availableDuration.push({value: i, label: `${i} night(s)`})

const availableAdults = []
for (let i = 1; i <= 15; i++) availableAdults.push({value: i, label: `${i} guest(s)`})

const availableChildren = []
for (let i = 1; i <= 15; i++) availableChildren.push({value: i, label: `${i} child(s)`})
window.moment = moment

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
    roomList: [],
    selectedRooms: []
  }

  handleChange(item, value) {
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

      if (item === 'duration' || item === 'rooms') this.updateRoomData()
    })
  }

  handleMuiChange(item, evt, value) {
    this.setState({
      [item]: value
    }, this.updateRoomData)
  }

  updateRoomData = async () => {
    let { checkIn, duration, rooms } = this.state
    
    if (!rooms) return
    if (!checkIn) return
    let startDate = moment(checkIn).format('YYYY-MM-DD')
    let endDate = moment(checkIn).add(duration, 'days').format('YYYY-MM-DD')

    let { data } = await axios.get(getEndPoint(`/rooms?start=${startDate}&end=${endDate}`))

    if (!data.data) return
    let roomList = data.data.map(d => ({...d, checked: false}))
    this.setState({roomList})
  }

  onSubmit = e => {
    e.preventDefault()
  }

  addRoom = id => {
    let { roomList, selectedRooms } = this.state

    for (let room of roomList) if (room.id === id) {
      selectedRooms.push(room)
      selectedRooms = selectedRooms.slice()
      this.setState({selectedRooms})
      break
    }
  }

  removeRoom = id => {
    let { roomList, selectedRooms } = this.state

    for (let i in roomList) if (roomList[i].id === id) {
      selectedRooms.splice(i, 1)
      selectedRooms = selectedRooms.slice()
      this.setState({selectedRooms})
      break
    }
  }

  handleRoomChoosing(id, evt, value) {
    if (value) return this.addRoom(id)
    this.removeRoom(id)
  }

  renderRoomList() {
    return this.state.roomList.map((data, i) => {
      return (
        <Checkbox 
          key={i}
          value={data.checked}
          onCheck={this.handleRoomChoosing.bind(this, i)}
          label={(
            <div className={styles.list} >
              <div className={styles['img-wrapper']} >
                <img src={`/static/img/${data.type.toLowerCase()}.jpg`} />
              </div>
              <div className={styles.text} >
                <div className={styles.title} >{data.name}</div>
                <span className={styles.price} >Rp. {data.price}/night</span>
              </div>
            </div>
          )}
        />
      )
    })
  }

  render() {
    return (
      <Popup
        title="Order Room"
        backLink="/home"
        // anim={ANIMATE_HORIZONTAL}
      >
        <form onSubmit={this.onSubmit} >
          <div className={styles.container}>
            <DatePicker 
              floatingLabelText='Check In' 
              onChange={this.handleMuiChange.bind(this, 'checkIn')} 
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
            <div className={styles.wrapper} >
              {this.renderRoomList()}
            </div>
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
