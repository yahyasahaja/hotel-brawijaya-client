import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-toolbox/lib/button'

export default class componentName extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', paddingTop: '20vh' }} >
          <div>
            <img src='/static/img/logo.png' />
          </div>
          <h1>Brawijaya Hotel</h1>
          <div style={{ paddingTop: '10vh' }} >
            <Link to="/order/rooms">
              <Button label='Booking Now' primary raised />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
