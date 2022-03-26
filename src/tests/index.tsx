import { ChakraProvider } from '@chakra-ui/react'
import { FC, ReactElement } from 'react'
import { QuestionT } from '../store/QuestionsSlice/index'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { UserT } from '../store/UsersSlice'
import { FeedbackT } from '../store/FeedbackSlice'
import { rootReducer } from '../store'

interface IAllProviders {
  accountValue: UserT | null
  userValue: UserT[]
  questionValue: QuestionT[]
  feedbackValue: FeedbackT[]
}
const AllProviders: FC<IAllProviders> = ({
  children,
  accountValue,
  userValue,
  questionValue,
  feedbackValue,
}) => {
  return (
    <Provider
      store={configureStore({
        reducer: rootReducer,
        preloadedState: {
          users: {
            users: userValue,
            usersError: '',
            usersLoading: 'idle',
          },
          questions: {
            questions: questionValue,
            questionsError: '',
            questionsLoading: 'idle',
          },
          account: {
            account: accountValue,
          },
          feedbacks: {
            feedbacks: feedbackValue,
          },
        },
      })}
    >
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
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
