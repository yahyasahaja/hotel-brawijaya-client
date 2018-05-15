//MODULES
import React, { Component } from 'react'
import DatePicker from 'react-toolbox/lib/date_picker'
import Dropdown from 'react-toolbox/lib/dropdown'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'
import { observer } from 'mobx-react'
import moment from 'moment'
import CircularProgress from 'material-ui/CircularProgress'

//STYLES
import styles from './css/index.scss'

//COMPONENTS
import Popup, { ANIMATE_HORIZONTAL } from '../../components/Popup'
import ButtonBottom from '../../components/ButtonBottom'
import RoomList from '../../components/RoomList'

//STORE
import { roomOrder } from '../../services/stores'

//COMPONENT
@observer
class Invoice extends Component {
  handleClick = async () => {
    let res = await roomOrder.reservation()
    if (res) this.props.history.push('/order/home')
  }

  renderContent() {
    if (roomOrder.isLoadingReservation) return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}} >
        <CircularProgress />
      </div>
    )

    return (
      <div className={styles.container}>
        <div className={styles.horizontal}>
          <div style={{width : 1 }}></div>

          <div >
            <h5 className ={styles.judul}>Full Name</h5>
            <h2 className ={styles.nilai}>{roomOrder.customer_name}</h2>
          </div>

          <div >
            <h5 className ={styles.judul}>Phone Number</h5>
            <h2 className ={styles.nilai}>{roomOrder.phone}</h2>
          </div>

          <div className={styles.top}></div>
        </div>

        <div className={styles.horizontal}>
          <div >
            <h5 className ={styles.judul}>Check-in Date</h5>
            <h2>{moment(roomOrder.check_in).format('DD MMM YYYY')}</h2>
          </div>

          <div >
            <h5 className ={styles.judul}>Check-out Date</h5>
            <h2>{moment(roomOrder.check_out).format('DD MMM YYYY')}</h2>
          </div>

          <div >
            <h5 className ={styles.judul}>Duration</h5>
            <h2>{roomOrder.duration} night(2)</h2>
          </div>
        </div>


        <div className={styles.horizontal}>
          <div >
            <h5 className ={styles.judul}>Adult</h5>
            <h2>{roomOrder.adults_capacity}</h2>
          </div>

          <div >
            <h5 className ={styles.judul}>Child</h5>
            <h2>{roomOrder.children_capacity}</h2>
          </div>

          <div >
            <h5 className ={styles.judul}>Room(s) & Extra Bed(s)</h5>
            <h2>{roomOrder.max_rooms} room(s), {roomOrder.max_beds} Extra Bed(s)</h2>
          </div>
        </div>

        <div className={styles.horizontal}>
          <div className={styles.empty}></div>
        </div>

        <RoomList />

        <div className={styles.totalPrice}>
          <div >
            <h5 className ={styles.judul}>Total Price</h5>
            <h2>Rp. {roomOrder.reservation_data.total_price}</h2>
          </div>

          <div className={styles.bottom}></div>
        </div>

      </div>
    )
  }

  render() {
    return (
      <Popup
        title="Invoice"
        backLink="/home"
        anim={ANIMATE_HORIZONTAL}
      >
        {this.renderContent()}
        <ButtonBottom
            onClick={this.handleClick}
            name="BACK TO HOME"
        />
      </Popup>
    )
  }
}

export default Invoice
