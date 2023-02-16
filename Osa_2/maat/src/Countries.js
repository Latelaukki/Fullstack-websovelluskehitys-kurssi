import axios from 'axios'

const baseUrl = 'https://restcountries.com/v2/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getWeather = (country) => {
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  const api_key = process.env.REACT_APP_API_KEY
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  const request = axios.get(weatherUrl)
  return request.then((response) => response.data)
}

const service = { getAll, getWeather }
export default service
