import personService from '../services/persons'

const Person = ({person, handlePersonDelete}) => {
    return (
        <div>
            <p>{person.name} {person.number} <button type="submit" onClick={() => handlePersonDelete(person.id, person.name)}>delete</button></p>
        </div>
    )
}
export default Person