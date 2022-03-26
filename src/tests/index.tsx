import { ChakraProvider } from '@chakra-ui/react'
import { FC, ReactElement } from 'react'
import { FeedbackContext, FeedbackT } from '../context/FeedbackProvider'
import { QuestionContext, QuestionT } from '../context/QuestionProvider'
import { UserContext } from '../context/UserProvider'
import { AccountContext } from '../context/AccountProvider'
import { UserT } from '../context/types'
import { BrowserRouter } from 'react-router-dom'

import { render, RenderOptions } from '@testing-library/react'
import { createMemoryHistory } from 'history'

interface IAllProviders {
  accountValue: UserT | null
  userValue: UserT[] | null
  questionValue: QuestionT[] | null
  feedbackValue: FeedbackT[]
}
const AllProviders: FC<IAllProviders> = ({
  children,
  accountValue,
  userValue,
  questionValue,
  feedbackValue,
}) => {
  const history = createMemoryHistory()

  return (
    <AccountContext.Provider value={accountValue}>
      <UserContext.Provider value={userValue}>
        <QuestionContext.Provider value={questionValue}>
          <FeedbackContext.Provider value={feedbackValue}>
            <ChakraProvider>{children}</ChakraProvider>
          </FeedbackContext.Provider>
        </QuestionContext.Provider>
      </UserContext.Provider>
    </AccountContext.Provider>
  )
}

const customRender = (
  ui: ReactElement,
  initState: IAllProviders,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {
    wrapper: (props) => <AllProviders {...initState} {...props} />,
    ...options,
  })

export default customRender
// import { FC, ReactElement } from 'react'
// import { FeedbackContext } from '../context/FeedbackProvider'
// import { QuestionContext } from '../context/QuestionProvider'
// import { UserContext } from '../context/UserProvider'
// import { AccountContext } from '../context/AccountProvider'

// import { RenderOptions, render } from '@testing-library/react'
// import React from 'react'
// import { ChakraProvider } from '@chakra-ui/react'

// const AllProviders: FC = ({ children }) => {
//   const questions = React.useContext(QuestionContext)
//   const feedbacks = React.useContext(FeedbackContext)
//   const account = React.useContext(AccountContext)
//   const employees = React.useContext(UserContext)

//   return (
//     <AccountContext.Provider value={account}>
//       <UserContext.Provider value={employees}>
//         <QuestionContext.Provider value={questions}>
//           <FeedbackContext.Provider value={feedbacks}>
//             <ChakraProvider>{children}</ChakraProvider>
//           </FeedbackContext.Provider>
//         </QuestionContext.Provider>
//       </UserContext.Provider>
//     </AccountContext.Provider>
//   )
// }

// const customRender = (
//   ui: ReactElement,
//   options?: Omit<RenderOptions, 'wrapper'>,
// ) => render(ui, { wrapper: AllProviders, ...options })

// export default customRender
