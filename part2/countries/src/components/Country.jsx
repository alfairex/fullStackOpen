const Country = ({country, handleCountryDisplay}) => {
    //console.log("NAME", name)
    return(
        <div>
            <p>
                {country.name.common} <button type="submit" onClick={() => handleCountryDisplay(country)}>show</button>
            </p>
        </div>
    )
}

export default Country