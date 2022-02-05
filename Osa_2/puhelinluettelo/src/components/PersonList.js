const PersonList = ({ personsToShow}) => {
    return (
      <div>
        <h2>Numbers</h2>
        {personsToShow.map(person =>
          <p key={person.name}> {person.name} {person.number} </p>
        )}
      </div>
    )
  }

export default PersonList