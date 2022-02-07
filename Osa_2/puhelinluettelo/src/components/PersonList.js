const PersonList = ({ personsToShow, handleDelete }) => {
    return (
      <div>
        <h2>Numbers</h2>  
        {personsToShow.map(person =>
          <p key={person.name}> {person.name} {person.number}
          <button onClick={handleDelete} value={person.name}>delete</button></p>
        )}
      </div>
    )
  }

export default PersonList