const Recommend = ({show, books, genre}) => {
  
    books = books.filter(b => b.genres.includes(genre))

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