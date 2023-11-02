import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './store.js'
import React from 'react'



const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
)
