import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import styles from './css/room-list.scss'

//STORE
import { roomOrder } from '../services/stores'

export default class RoomList extends Component {
  renderList() {
    return roomOrder.selected_rooms.map((data, i) => {
      return (
        <div key={i} className={styles.list} >
          <div className={styles['img-wrapper']} >
            <img src={`/static/img/${data.type.toLowerCase()}.jpg`} />
          </div>
          <div className={styles.text} >
            <div className={styles.title} >{data.name}</div>
            <span className={styles.price} >Rp. {data.price}/night</span>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        {this.renderList()}
      </div>
    ) 
  }
}