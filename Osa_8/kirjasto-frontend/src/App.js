import { useState } from 'react'
import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { useApolloClient } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from "./queries"
import { ALL_BOOKS } from "./queries"


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const authorResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const bookResult = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  if (authorResult.loading)  {
    return <div>loading...</div>
  }

  if (bookResult.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
        <>
          <button onClick={() => setPage('add')}>add</button>
          <button onClick={logout}>logout</button>
        </>
        : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} authors = {authorResult.data.allAuthors} setErrorMessage={setErrorMessage} token={token}/>

      <Books show={page === 'books'} books = {bookResult.data.allBooks}/>

      <NewBook show={page === 'add' && token} 
        setErrorMessage = {setErrorMessage}
        setPage={setPage}/>

      <LoginForm show={page === 'login'}
        setToken = {setToken}
        setPage = {setPage}
        setErrorMessage = {setErrorMessage}/>
    </div>
  )
}

export default App
