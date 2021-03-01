import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppState from './store'
import '~*/assets/styles/index.less'


ReactDOM.render(<App store={AppState} />, document.getElementById('app'))