import React from 'react'
import ReactDOM from 'react-dom'
import {ReactQueryDevtools} from 'react-query-devtools'

import * as serviceWorker from './serviceWorker'

import App from 'app/App'

import {AppProviders} from 'features'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err)
    })
}

ReactDOM.render(
  <AppProviders>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </AppProviders>,
  document.getElementById('root'),
)

serviceWorker.register()
