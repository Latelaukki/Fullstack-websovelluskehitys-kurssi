import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, timeoutId: 0 }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      state = action.payload
      return state
    },
    clearMessage(state) {
      state.message = ''
      return state
    },
    resetTimer(state) {
      clearTimeout(state.timeoutId)
    },
  },
})

export const { notify, clearMessage, resetTimer } = notificationSlice.actions

export const setNotification = (message, type) => {
  return async (dispatch) => {
    dispatch(resetTimer())
    const timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, 3000)
    const notificationObject = {
      message: message,
      timeoutId: timeoutId,
      type: type,
    }
    dispatch(notify(notificationObject))
  }
}

export default notificationSlice.reducer
