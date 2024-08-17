import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import './index.css'
import * as React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
