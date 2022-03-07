import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  initialState: '',
  name: 'filtering',
  reducers: {
    changeFilter(state, action) {
      return action.payload
    }
  }
})

export const { changeFilter } = filterSlice.actions

export const handleFiltering = (filterString) => {
  return dispatch => {
    dispatch(changeFilter(filterString))
  }
}

export default filterSlice.reducer