import Person from './Person'

const Persons = ({personsToShow, handlePersonDelete}) => {
    return(
        <div>
            {personsToShow.map(person =>
                <Person key={person.name} person={person} handlePersonDelete={handlePersonDelete}/>)}
        </div>
    )
}

export default Persons