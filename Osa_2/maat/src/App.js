import { useState, useEffect } from 'react'
import countryService from 'Countries'

const Country = ({ inputString, handleSearch}) => {
  return (
    <div>
      filter shown with
      <input
      value={inputString}
      onChange={handleSearch}
      />
    </div>
  )
}

const App = () => {
  const [inputString, setInputString] = useState['']
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])  

  const handleSearch = (event) => {
    setInputString(event.target.value)
  }

  return (
    <div>
      <Country 
        inputString={inputString}
        handleSearch={handleSearch}/>
    </div>
  )
}
export default App;
