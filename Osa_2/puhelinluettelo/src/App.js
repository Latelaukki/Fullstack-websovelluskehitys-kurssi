import { useEffect, useState } from 'react'

import PersonFilter from './components/PersonFilter'
import NewPersonForm from './components/NewPersonForm'
import PersonList from './components/PersonList'
import personService from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])  
 
const addPerson = (event) => {
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
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    setIsError(false)
    setNotificationMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  } else {
    setIsError(true)
    setNotificationMessage(
      `${newName} is already added to phonebook`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }
  setNewName('')
  setNewNumber('')
}

const removePerson = (event) => {
  const personToDelete= persons.find(person => person.name === event.target.value)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
    personService
      .remove(personToDelete.id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== persons.indexOf(returnedPerson)))
      })
      .catch(error => {
        setIsError(true)
        setNotificationMessage(
          `${personToDelete.name} is already deleted`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
    setIsError(false)
    setNotificationMessage(
      `${personToDelete.name} deleted`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }
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
      <Notification message={notificationMessage} isError={isError} />
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
        handleDelete={removePerson} 
        personsToShow={personsToShow} />
    </div>
  )
}

export default App