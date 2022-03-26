import './index.module.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import UserProvider from './context/UserProvider'
import QuestionProvider from './context/QuestionProvider'
import AccountProvider from './context/AccountProvider'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import FeedbackProvider from './context/FeedbackProvider'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}
const theme = extendTheme({ config })

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <AccountProvider>
      <UserProvider>
        <QuestionProvider>
          <FeedbackProvider>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </FeedbackProvider>
        </QuestionProvider>
      </UserProvider>
    </AccountProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
