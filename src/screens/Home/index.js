import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-toolbox/lib/button'

export default class componentName extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', lineHeight: '100vh', }} >
          <Link to="/order/rooms">
            <Button label='Booking Now' primary raised />
          </Link>
        </div>
      </div>
    )
  }
}
