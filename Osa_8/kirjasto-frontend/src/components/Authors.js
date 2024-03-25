import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = ({show, authors, setErrorMessage, token}) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setErrorMessage(messages)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors}) => {
        return {
          allAuthors: allAuthors
        }
      })
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map((a) => (
                <option
                  key={a.name}
                  value={a.name}>{a.name}</option>
              ))}
              </select>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value), 10)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
