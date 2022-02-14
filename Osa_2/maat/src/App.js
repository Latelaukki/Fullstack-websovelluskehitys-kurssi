import { useState, useEffect } from 'react'
import countryService from './Countries'

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

const CountryList = ({ countriesToShow}) => {
  return (
    <div> 
      {countriesToShow.map(country =>
        <p key={country.name.common}> {country.name.common} </p>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [inputString, setInputString] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])  

  const handleSearch = (event) => {
    setInputString(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(inputString.toLowerCase()))

  return (
    <div>
      filter shown with
      <input
        value={inputString}
        onChange={handleSearch}
      />
      <CountryList countries={countriesToShow}/>
    </div>
  )
}
export default App;
