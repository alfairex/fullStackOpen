import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const baseIcon = 'https://openweathermap.org/img/wn'



const getCurrentWeatherData = (lat,lon) => {
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

const getIcon = (code) => {
    const request = axios.get(`${baseIcon}/${code}@2x.png`)
    return request.then(response => response.data)
}

export default { 
  getCurrentWeatherData,
  getIcon
}