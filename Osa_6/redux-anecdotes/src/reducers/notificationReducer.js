import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, timeoutId: 0 }

const notificationSlice = createSlice ({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      state = action.payload
      return state
    },
    clearMessage(state, action) {
      state.message = ''
      return state
    },
    resetTimer(state, action) {
      clearTimeout(state.timeoutId)
    }
  }
})

export const { notify, clearMessage, resetTimer } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(resetTimer())
    const timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
    const notificationObject = { message: message, timeoutId: timeoutId }
    dispatch(notify(notificationObject))
  }
}


export default notificationSlice.reducer