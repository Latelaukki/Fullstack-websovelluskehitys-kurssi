import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"

const Books = ({show, books}) => {
  const [genre, setGenre] = useState('')

  const genres = [...new Set(books.flatMap((b) => b.genres).filter((genre) => genre.length > 0))]

  const { loading, error, data } =  useQuery(ALL_BOOKS, {
    variables: { genre },
  })

  if (loading) return <div>loading...</div>
  if (error) return `Error! ${error}`

  const filteredBooks = data.allBooks



  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre !== '' &&
        <>in genre <b>{genre}</b></>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
            <button key={genre}
            value={genre}
            onClick={({ target }) => setGenre(target.value)}>{genre}</button> 
          ))}
        <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
