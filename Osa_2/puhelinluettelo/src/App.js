import { useState } from 'react'
import PersonFilter from './components/PersonFilter'
import NewPersonForm from './components/NewPersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
 
const addPerson = (event) => {
  console.log(newName)
  console.log(newNumber)
  event.preventDefault()
  const personObject = {
    name: newName,  
    number: newNumber,
  }

  let isNewName = true
  persons.forEach(function(person) {
    if (person.name === newName) {
      isNewName = false
    }
  })
  if (isNewName) {
    setPersons(persons.concat(personObject))
  } else {
    window.alert(`${newName} is already added to phonebook`)
  }
  setNewName('')
  setNewNumber('')
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
} 

const handleFilterString = (event) => {
  setFilterString(event.target.value)
} 

const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter 
        filterString={filterString} 
        handleFilterString={handleFilterString}/>
      <NewPersonForm 
        handleSubmit={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}/>
      <PersonList 
        personsToShow={personsToShow} />
    </div>
  )
}

export default App