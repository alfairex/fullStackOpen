import Country from './Country'
import Display from './Display'
import { useState, useEffect } from 'react'

const Countries = ({displayedCountries}) => {
    const [displayCountry, setDisplayCountry] = useState({show: false, countryToDisplay: null})

    const handleCountryDisplay = (country) =>{
        setDisplayCountry({show: true, countryToDisplay: country})
    }


    if(displayedCountries.length > 10) {
        return(
            <div>
                <p>Too many matches, please specify another filter.</p>
            </div>
        )
    }else if(displayedCountries.length === 1){
        return(
            <Display country={displayedCountries[0]} />
        )
    }else if(displayCountry.show){
        displayCountry.show = false
        return(
            <Display country={displayCountry.countryToDisplay}/> 
        )
    }else{
        return(
            <div>
                {displayedCountries.map(country => 
                    <Country key={country.cioc} country={country} handleCountryDisplay={handleCountryDisplay}/>)}
            </div>
        )
    }
}

export default Countries

