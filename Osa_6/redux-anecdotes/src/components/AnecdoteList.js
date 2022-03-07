import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterString = useSelector(state => state.filtering)
  const anecdotesToShow = anecdotes.filter(a => a.content.toLowerCase().includes(filterString.toLowerCase()))
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList