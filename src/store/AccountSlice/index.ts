import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserT } from '../UsersSlice/index'
const ACCOUNT_SLICE = 'account'

const initialState = {
  account: null,
} as {
  account: UserT | null
}

export const accountSlice = createSlice({
  name: ACCOUNT_SLICE,
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserT>) {
      state.account = action.payload
    },
    logout(state) {
      state.account = null
    },
  },
})
export const { logout, login } = accountSlice.actions

export default accountSlice.reducer
