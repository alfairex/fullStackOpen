const Filter = ({personFilter, handlePersonFilterChange}) => {
    return(
        <div>
            <form>
                <div>
                    filter shown with: <input value={personFilter} onChange={handlePersonFilterChange} />
                </div>
            </form>
        </div>
    )
}

export default Filter