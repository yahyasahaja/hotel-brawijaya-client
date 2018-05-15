//MODULES
import React, { Component } from 'react'
import DatePicker from 'material-ui/DatePicker'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'
import Checkbox from 'material-ui/Checkbox'
import axios from 'axios'
import moment from 'moment'
import { observer } from 'mobx-react'
import CircularProgress from 'material-ui/CircularProgress'

//STYLES
import styles from './css/index-rooms.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'

//STORE
import { roomOrder, step } from '../../services/stores'

//INNER CONFIG
const availableDuration = []
for (let i = 1; i <= 30; i++) availableDuration.push({value: i, label: `${i} night(s)`})

const availableAdults = []
for (let i = 1; i <= 10; i++) availableAdults.push({value: i, label: `${i} guest(s)`})

const availableChildren = []
for (let i = 1; i <= 20; i++) availableChildren.push({value: i, label: `${i} child(s)`})
window.moment = moment

//COMPONENT
@observer
class Rooms extends Component {
  handleChange(item, value) {
    if (item === 'adults_capacity') {
      roomOrder.setAdultsCapacity(value)
    } else if (item === 'children_capacity') {
      roomOrder.setChildrenCapacity(value)
    } else if (item === 'max_rooms') {
      roomOrder.setMaxRooms(value)
    } else {
      roomOrder[item] = value
    }

    if (item === 'duration' || item ==='rooms') roomOrder.fetchRooms()
  }

  handleMuiChange(item, evt, value) {
    roomOrder[item] = value
    roomOrder.fetchRooms()
  }

  onSubmit = e => {
    e.preventDefault()
    
  }
  
  renderRoomList() {
    if (roomOrder.isLoading) return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}} >
        <CircularProgress />
      </div>
    )
    
    return roomOrder.rooms.slice().map((data, i) => {
      return (
        <Checkbox 
          key={i}
          checked={data.checked}
          disabled={data.disabled}
          onCheck={(evt, val) => roomOrder.toggleChooseRoom(data.id, val)}
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
    for (let obj in roomOrder) obj
    
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
              onChange={this.handleMuiChange.bind(this, 'check_in_raw')} 
              value={roomOrder.check_in_raw} 
              minDate={new Date(Date.now() + 86400000)}
              maxDate={new Date(Date.now() + 2592000000)}
              required 
            />

            <Dropdown
              label="Duration"
              onChange={this.handleChange.bind(this, 'duration')}
              source={availableDuration}
              value={roomOrder.duration}
              required
              readOnly={false}
            />

            <div className={styles.horizontal}>
              <Dropdown
                label="Adult"
                onChange={this.handleChange.bind(this, 'adults_capacity')}
                source={availableAdults}
                value={roomOrder.adults_capacity}
                required
                readOnly={false}
              />

              <Dropdown
                label="Children"
                onChange={this.handleChange.bind(this, 'children_capacity')}
                source={availableChildren}
                value={roomOrder.children_capacity}
              />
            </div>

            <div className={styles.horizontal}>
              <Dropdown
                label="Rooms"
                onChange={this.handleChange.bind(this, 'max_rooms')}
                source={roomOrder.available_rooms.slice()}
                disabled={!roomOrder.max_rooms || roomOrder.max_rooms == 'null'}
                value={roomOrder.max_rooms}
                required
              />
              
              <Dropdown
                label="Extra Beds"
                onChange={this.handleChange.bind(this, 'max_beds')}
                source={roomOrder.available_beds.slice()}
                disabled={roomOrder.max_beds == null || roomOrder.max_beds == 'null'}
                value={roomOrder.max_beds}
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
            onClick={() => step.currentStep === 1 ? step.inc() : 0}
          />
        </form>
      </Popup>
    )
  }
}

export default Rooms