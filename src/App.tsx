import './App.css'

import Amplify from 'aws-amplify'
import React from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'
import Dashboard from './components/Dashboard'
import ScrollToTop from './components/ScrollTop'

import awsconfigdev from './aws-exports-dev'

import { createStoreWithMiddleware } from './redux/CreateStore'
import { IAppScenario } from './redux/IAppScenario'
import { IAppServices } from './redux/IAppServices'

Amplify.configure(awsconfigdev)

function createDependencies(appScenario: IAppScenario): IAppServices {
  switch (appScenario.type) {
    case 'mock':
      return {
        // MARKER_MOCK_SERVICES
      }
    case 'real':
      return {
        // MARKER_REAL_SERVICES
      }
  }
}

interface AppProps {
  scenario?: IAppScenario
}

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: blue[900]
        },
        primary: {
            main: indigo[700]
        }
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '"Lato"',
            'sans-serif'
        ].join(',')
    }
});

function App(props: AppProps) {
  const store = createStoreWithMiddleware(createDependencies(props.scenario || { type: 'real' }));

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <HashRouter>
            <ScrollToTop>
              <Switch>
                <Route exact path='/' component={ Dashboard } />
                <Route path='/product' component={ Dashboard } />
                <Route path='/About' component={ Dashboard } />
                <Route path='/Pricing' component={ Dashboard } />
                <Route path='/Blog' component={ Dashboard } />
                <Route path='/Contact' component={ Dashboard } />
              </Switch>
            </ScrollToTop>
          </HashRouter>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
