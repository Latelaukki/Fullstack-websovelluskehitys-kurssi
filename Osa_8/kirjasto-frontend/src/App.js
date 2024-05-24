import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { useSubscription } from '@apollo/client'

import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED } from './queries.js'
import { ALL_AUTHORS } from "./queries"
import { ALL_BOOKS } from "./queries"
import { ME } from "./queries"

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()

  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)

  useEffect(() => {
    client.refetchQueries({
      include: [ME],
    });
    if (token) {
      setFavoriteGenre(meResult.data.me.favoriteGenre)
    }
  }, [setToken])
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      setErrorMessage(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  if (authorResult.loading || bookResult.loading || meResult.loading) {
    return <div>loading...</div>
  }

  if (authorResult.error || bookResult.error || meResult.error) {
    return <div>Error occurred...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    client.refetchQueries({
      include: [ME],
    });
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </>
        : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} authors = {authorResult.data.allAuthors} setErrorMessage={setErrorMessage} token={token}/>
      <Books show={page === 'books'} books = {bookResult.data.allBooks}/>
      {token ?
        <>
          <NewBook show={page === 'add'} 
            setErrorMessage = {setErrorMessage}
            setPage={setPage}/>
          <Recommend show={page === 'recommend'} genre = {favoriteGenre}/>
        </>
        :
        <LoginForm show={page === 'login'}
          setToken = {setToken}
          setPage = {setPage}
          setErrorMessage = {setErrorMessage}/>
      }
    </div>
  )
}

export default App
