import { useState, useEffect } from 'react'
import countryService from './Countries'

const CountryList = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}
          <button onClick={handleShow} value={country.name}>
            show
          </button>
        </div>
      ))}
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getWeather(country).then((weatherObject) => {
      setWeather(weatherObject)
    })
  }, [country])

  if (!weather) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h1>{country.name} </h1>
      <p />
      capital {country.capital}
      <br />
      area {country.area}
      <p />
      <b>languages:</b>
      <br />
      {country.languages.map((language) => (
        <li key={language.name}> {language.name}</li>
      ))}
      <p />
      <img
        alt='flag'
        src={country.flag}
        style={{ width: '10%', height: '10%' }}
      />
      <h2>Weather in {country.capital}</h2>
      <p />
      temperature {weather.main.temp} Celcius
      <br />
      <img
        alt='weather'
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <br />
      wind {weather.wind.speed} m/s
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [inputString, setInputString] = useState('')

  //const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  const handleSearch = (event) => {
    setInputString(event.target.value)
  }

  const handleShow = (event) => {
    setInputString(event.target.value)
  }

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(inputString.toLowerCase())
  )

  if (countriesToShow.length === 1) {
    return (
      <div>
        find countries
        <input value={inputString} onChange={handleSearch} />
        <p />
        <Country country={countriesToShow[0]} />
      </div>
    )
  }

  if (countriesToShow.length >= 10) {
    return (
      <div>
        find countries
        <input value={inputString} onChange={handleSearch} />
        <p />
        Too many matches, specify filter
      </div>
    )
  }
  return (
    <div>
      find countries
      <input value={inputString} onChange={handleSearch} />
      <p />
      <CountryList countries={countriesToShow} handleShow={handleShow} />
    </div>
  )
}
export default App
