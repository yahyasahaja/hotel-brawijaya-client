//MODULES
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-css-themr'
import { observer } from 'mobx-react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//CSS
import theme from './assets/theme/theme.js'

//ROUTER
import AppRouter from './AppRouter'

//SERVICES
import { onlineStatus, snackbar } from './services/stores'

//SERVICE_WORKER
import registerServiceWorker from './registerServiceWorker'

registerServiceWorker()
axios.defaults.headers['Content-Type'] = 'application/json'
// if (tokens.token) axios.defaults.headers['Authorization'] = tokens.token

@observer
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <ThemeProvider theme={theme}>
          <AppRouter onlineStatus={onlineStatus} snackbar={snackbar} />
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))