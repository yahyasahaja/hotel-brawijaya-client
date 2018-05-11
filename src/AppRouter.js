//MODULES
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Snackbar from 'react-toolbox/lib/snackbar'
import { observer } from 'mobx-react'
import Dialog from 'react-toolbox/lib/dialog'

//SCREENS
import asyncComponent from './components/AsyncComponent'
const Home = asyncComponent(() => import('./screens/Home'))
const Rooms = asyncComponent(() => import('./screens/Rooms'))

//STYLES
import styles from './assets/css/app-router.scss'

//STORE
import { dialog } from './services/stores'

//COMPONENT
@observer class AppRouter extends Component {
  componentDidMount() {
    let { onlineStatus: { goOffline, goOnline }, snackbar: { show } } = this.props
    window.ononline = () => {
      goOnline()
      // window.location.reload()
    }
    window.onoffline = () => {
      goOffline()
      show('You\'re offline!')
    }

    if (window.navigator.onLine) goOnline()
    else goOffline()
  }

  closeSnackbar = () => {
    this.props.snackbar.hide()
  }

  // renderTabBar = props => {
  //   return <div className={styles.page}>
  //   <div className={styles.content} >
  //   <Switch>
  //     <Route path="/home" component={Home} />
  //     <Route path="/favorite" component={Favorite} />
  //     <Route path="/promo" component={Promo} />
  //     <Route path="/chat" component={Chat} />
  //     <Route path="/account" component={Account} />
  //     <Route path="*" component={PageNotFound} />
  //   </Switch>
  //   </div>

  //   <Route path="*" render={props => <BottomTabBar {...props} icons={BOTTOM_TAB_BAR_DATA} />} />
  //   </div>
  // }

  render() {
    let { onlineStatus: { isOnline }, snackbar: { data: snackbar } } = this.props

    return (
      <BrowserRouter>
        <div className={`${styles.container} ${isOnline ? '' : styles.offline}`}>
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" component={Home} />
            <Redirect from="/order" exact to="/order/rooms" />
            <Route path="/order/rooms" component={Rooms} />
          </Switch>

          <section>
            <Snackbar
              action={snackbar.action}
              active={snackbar.active}
              label={snackbar.label}
              timeout={snackbar.timeout}
              onClick={this.closeSnackbar}
              onTimeout={this.closeSnackbar}
              type={snackbar.type}
            />
          </section>

          <section>
            <Dialog
              actions={dialog.actions}
              active={dialog.active}
              onEscKeyDown={dialog.onEscKeyDown}
              onOverlayClick={dialog.onOverlayClick}
              title={dialog.title}
            >
              {dialog.content}
            </Dialog>
          </section>
        </div>
      </BrowserRouter>
    )
  }
}

export default AppRouter
