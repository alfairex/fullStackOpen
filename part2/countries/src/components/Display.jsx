import weatherService from '../services/weather.js'
import { useState, useEffect } from 'react'

const Display = ({country}) => {
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null)
    const renderLanguageList = () => {
        const languages = []
        for(const [id, language] of Object.entries(country.languages)){
            console.log(id, language)
            languages.push(<li key={id}>{language}</li>)
        }
        return languages
    }
    const [lat, lon] = country.latlng
    useEffect(() => {
        weatherService
          .getCurrentWeatherData(lat, lon)
          .then(weatherData => {
            setWeather(weatherData)
            setIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
            console.log(weatherData)
          })
      }, [])

    if(weather && icon){
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>capital(s): {country.capital.join(", ")}</p>
                <p>area: {country.area}</p>
                <h3>languages</h3>
                <ul>{renderLanguageList()}</ul>
                <img src={country.flags.png} alt={country.flags.alt} />
                {/* Can't handle multiple capitals yet just choose first one from */}
                <h1>Weather in {country.capital[0]}</h1>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={icon} />
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }else{
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>capital(s): {country.capital.join(", ")}</p>
                <p>area: {country.area}</p>
                <h3>languages</h3>
                <ul>{renderLanguageList()}</ul>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        )
    }

}

export default Display