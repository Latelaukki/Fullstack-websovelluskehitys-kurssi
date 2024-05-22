import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"

const Recommend = ({ show, genre }) => {
    const { loading, error, data } =  useQuery(ALL_BOOKS, {
      variables: { genre },
    })

    if (loading) return <div>loading...</div>
    if (error) return `Error! ${error}`

    const books = data.allBooks

    if (!show) {
      return null
    }    

    return (
        <div>
          <h2>books</h2>
            <>in genre <b>{genre}</b></>
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
        </div>
      )
}

export default Recommend