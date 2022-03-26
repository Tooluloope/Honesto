import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createAction,
} from '@reduxjs/toolkit'
import http from '../../common/http'

export const QUESTIONS_SLICE = 'questions'
export type QuestionT = {
  id: string
  type: 'scale' | 'text' | 'multipleChoice'
  required: boolean
  label: string
  options?: {
    label: string
    value: number
  }[]
}
interface QuestionsState {
  questions: QuestionT[]
  questionsLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  questionsError?: string
}
const initialState = {
  questions: [],
  questionsLoading: 'idle',
  questionsError: '',
} as QuestionsState

export const getQuestions = createAsyncThunk(
  'questions/getQuestions',
  async () => {
    const response = await http.get('questions')
    return response as QuestionT[]
  },
)

const setQuestions = createAction('questions/setQuestions')
export const questionsSlice = createSlice({
  name: QUESTIONS_SLICE,
  initialState,
  reducers: {
    [setQuestions.type]: (state, action: PayloadAction<QuestionT[]>) => {
      state.questions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state, action) => {
        state.questionsLoading = action.meta.requestStatus
        state.questionsError = ''
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.questionsLoading = 'failed'
        state.questionsError = action.error.message
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questionsError = ''
        state.questionsLoading = 'succeeded'
        questionsSlice.caseReducers[setQuestions.type](state, action)
      })
  },
})
export default questionsSlice.reducer
