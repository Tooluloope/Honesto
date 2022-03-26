import * as React from 'react'

type userId = string
type questionId = string

export type Feedbacks = {
  [x: questionId]: string | number
}
export type FeedbackT = {
  questions: Feedbacks
  to: userId
  from: userId
}

type DispatchFeedbackContextT = any

export const DispatchFeedbackContext =
  React.createContext<DispatchFeedbackContextT | null>(null)
export const FeedbackContext = React.createContext<FeedbackT[]>([])

type AddFeedbackT = {
  action: 'ADD_FEEDBACK'
  payload: FeedbackT
}

const reducer = (state: FeedbackT[], update: AddFeedbackT): FeedbackT[] => {
  if (update.action === 'ADD_FEEDBACK') {
    return [...state, update.payload]
  }
  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbackContext.Provider value={state}>
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
