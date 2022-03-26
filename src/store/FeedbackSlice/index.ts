import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

const initialState = {
  feedbacks: [],
} as {
  feedbacks: FeedbackT[]
}

const FEEDBACKS_SLICE = 'feedbacks'

export const feedbacksSlice = createSlice({
  name: FEEDBACKS_SLICE,
  initialState,
  reducers: {
    addFeedback(state, action: PayloadAction<FeedbackT>) {
      state.feedbacks = [...state.feedbacks, action.payload]
    },
  },
})

export const { addFeedback } = feedbacksSlice.actions

export default feedbacksSlice.reducer
