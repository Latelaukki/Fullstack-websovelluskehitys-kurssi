import { useState } from 'react'

const Books = ({show, books}) => {
  const [genre, setGenre] = useState('ALL')

  const genres = [...new Set(books.flatMap((b) => b.genres).filter((genre) => genre.length > 0))]

  if (genre !== 'ALL') {
    books = books.filter(b => b.genres.includes(genre))
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre !== 'ALL' &&
        <>in genre <b>{genre}</b></>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
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
        <button onClick={() => setGenre('ALL')}>all genres</button>
    </div>
  )
}

export default Books
