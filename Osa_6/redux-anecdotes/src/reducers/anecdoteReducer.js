import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedAnecdote= action.payload
      state = state.map(anecdote => 
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
      return state.sort((a1, a2) => a2.votes - a1.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (anecdoteObject) => {
  return async dispatch => {
    const changedAnecdote = {...anecdoteObject, votes: anecdoteObject.votes + 1}
    const updatedAnecdote = await anecdoteService.update(changedAnecdote.id, changedAnecdote)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer