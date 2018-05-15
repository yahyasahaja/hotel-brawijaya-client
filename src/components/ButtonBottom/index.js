import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import styles from './css/index.scss'

class ButtonBottom extends Component {
  render () {
    let { link, onClick } = this.props
    return (
      <button type="submit" className={styles.container} onClick={() => {
        link && this.props.history.push(this.props.link)
        onClick && onClick()
      }} >
        {this.props.name}
      </button>
    ) 
  }
}

export default withRouter(ButtonBottom)