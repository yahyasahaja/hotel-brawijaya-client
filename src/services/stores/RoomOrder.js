//MODULES
import { observable, action, computed } from 'mobx'
import moment from 'moment'
import axios from 'axios'

//CONFIG
import {getEndPoint} from '../../config'

//UTILS
import { objectPick } from '../../utils'

//STORE
import Snackbar from './Snackbar'

//STORE
class RoomOrder {
  @observable check_in_raw = new Date(Date.now() + 86400000)
  @observable duration = ''
  @observable adults_capacity = 0
  @observable children_capacity = 0
  @observable max_rooms = null
  @observable max_beds = null
  @observable available_rooms = []
  @observable available_beds = []
  @observable rooms = []
  @observable isLoading = false
  @observable customer_name = ''
  @observable phone = ''
  @observable customer_nin = ''
  @observable isLoadingReservation = false
  @observable reservation_data = {}

  @computed
  get total_price() {
    return this.selected_rooms.reduce((prev, cur) => prev + cur.price, 0)
  }

  @computed
  get check_out_raw() {
    if (this.duration) 
      return moment(this.check_in).add(this.duration, 'days').toDate()
  }

  @computed
  get check_out() {
    if (this.check_out_raw)
      return moment(this.check_out_raw).format('YYYY-MM-DD')
  }

  @computed
  get check_in() {
    if (this.check_in_raw)
      return moment(this.check_in_raw).format('YYYY-MM-DD')
  }

  @computed
  get selected_rooms() {
    let rooms = this.rooms.slice()
    let res = []
    let extra_bed = this.max_beds
    for (let room of rooms) if (room.checked) {
      if (extra_bed-- != 0) room.extra_bed = 1
      else room.extra_bed = 0
      res.push({...room})
    }
    
    return res
  }

  @computed
  get selected_rooms_length() {
    return this.selected_rooms.length
  }
  
  @action
  getRoomById(id) {
    let rooms = this.rooms.slice()
    for (let i in rooms) if (rooms[i].id == id) return rooms[i]
  }

  @action
  toggleChooseRoom(id, isChosen) {
    let room = this.getRoomById(id)
    if (!room) return
    if (isChosen && this.selected_rooms_length >= this.max_rooms) return

    room.checked = isChosen
    
    if (this.selected_rooms_length >= this.max_rooms) {
      let rooms = this.rooms.slice()
      for (let room of rooms) if (!room.checked) room.disabled = true
    } else {
      let rooms = this.rooms.slice()
      for (let room of rooms) room.disabled = false
    }
  }
  
  @action
  setAdultsCapacity(arg) {
    this.adults_capacity = arg
    this.setAvailableRooms()
  }

  @action
  setChildrenCapacity(arg) {
    this.children_capacity = arg
    this.setAvailableRooms()
  }
  
  @action
  setAvailableRooms() {
    let adults = this.adults_capacity
    let children = this.children_capacity
    let available_rooms = []
    let maxRooms = adults + children
    if (maxRooms > 10) maxRooms = 10
    let minRooms = Math.max(Math.ceil(adults / 2), Math.ceil(children / 2)) - 1
    if (minRooms < 1) minRooms = 1
    for (let i = minRooms; i <= maxRooms; i++) available_rooms.push({value: i, label: `${i} room(s)`})
    this.available_rooms = observable(available_rooms)
    
    this.setMaxRooms(minRooms)
  }

  @action
  setMaxRooms(max_rooms) {
    let available_beds = []
    let minBeds = 0
    let maxBeds = max_rooms
    for (let i = minBeds; i <= maxBeds; i++) available_beds.push({value: i, label: `${i} bed(s)`})
    this.available_beds = observable(available_beds)
    this.max_rooms = max_rooms
    this.max_beds = minBeds
    this.fetchRooms()
  }

  @action
  async fetchRooms() {
    let { check_in, duration, max_rooms, check_out } = this
    
    if (!max_rooms || max_rooms == 'null') return
    if (!duration || duration == 'null') return
    if (!check_in || !check_out) return
    
    try {
      this.isLoading = true
      let { data } = await axios.get(getEndPoint(`/rooms?start=${check_in}&end=${check_out}`))
      this.isLoading = false

      if (data.data)
        this.rooms = observable(data.data.map(d => ({...d, checked: false, disabled: false})))
    } catch (e) {
      console.log(e)
    }
  }

  @action
  async reservation() {
    let body = objectPick(this, [
      'check_in', 
      'check_out', 
      'customer_name',
      'customer_nin',
      'phone',
      'children_capacity'
    ])

    body.adult_capacity = this.adults_capacity
    body.rooms = this.selected_rooms.map(d => objectPick(d, ['id', 'name', 'type', 'extra_bed', 'price']))
    let res

    try {
      this.isLoadingReservation = true
      let { data } = await axios.post(getEndPoint('/reservations'), body)
      console.log(data)
      Snackbar.show('Reservation Successful')
      this.reservation_data = observable(data.data)
      res = true
    } catch(e) {
      Snackbar.show(e.response.data.errors[0].message)
      res = false
    }

    this.isLoadingReservation = false
    return res
  }
}

export default window.RoomOrder = new RoomOrder()
