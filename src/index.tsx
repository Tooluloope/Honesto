import './index.module.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}
const theme = extendTheme({ config })

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
