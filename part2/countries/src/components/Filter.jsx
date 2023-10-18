const Filter = ({newCountry, countries, handleCountryChange}) => {
    return(
        <div>
            find countries: <input value={newCountry} onChange={handleCountryChange} />
        </div>
    )
}

export default Filter