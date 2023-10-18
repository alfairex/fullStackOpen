import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [newCountry, setNewCountry] = useState('')
 
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        console.log(initialCountries)
      })
  }, [])

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setNewCountry(event.target.value)
  }

  function removeWhitespace(str) {
    return str.split(' ').filter(Boolean).join('');
  }

  if(!countries) {
    console.log("bla")
    return null
  }else {
    const displayedCountries = countries.filter(country => {
      const query = removeWhitespace(newCountry.trim().toLowerCase())
      const nameOfCountry = removeWhitespace(country.name.common.trim().toLowerCase())
      return nameOfCountry.includes(query)
    })
    return(
      <div>
        <Filter newCountry={newCountry} countries={countries} handleCountryChange={handleCountryChange}/>
        <Countries displayedCountries={displayedCountries}/>
      </div>
    )
  } 
}

export default App
