import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import http from '../../common/http'

export const USERS_SLICE = 'users'
export type UserT = {
  avatarUrl: string
  id: string
  name: string
}
interface UserState {
  users: UserT[]
  usersLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  usersError?: string
}
const initialState = {
  users: [],
  usersLoading: 'idle',
  usersError: '',
} as UserState

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await http.get('people')
  return response as UserT[]
})
export const usersSlice = createSlice({
  name: USERS_SLICE,
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserT[]>) {
      state.users = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.usersLoading = action.meta.requestStatus
        state.usersError = ''
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoading = 'failed'
        state.usersError = action.error.message
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersError = ''
        state.usersLoading = 'succeeded'
        usersSlice.caseReducers.setUsers(state, action)
      })
  },
})

export default usersSlice.reducer
