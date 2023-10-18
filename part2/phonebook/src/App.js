import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setNewPersonFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('error')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = 
  personFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    const exisitingPerson = persons.find(person => person.name === personObject.name)
    if(exisitingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...exisitingPerson, number: newNumber}
        personService
          .update(exisitingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== exisitingPerson.id ? person : updatedPerson))
            setNotification(
              `${updatedPerson.name}'s number was updated.`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification(
              `Information of ${updatedPerson.name} has already been removed from the server.`
            )
            setNotificationType('error')
            setPersons(persons.filter(p => p.name !== updatedPerson.name))
        })
        setNewName('')
        setNewNumber('')
      }
    }else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationType('success')
          setNotification(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      setNewNumber('')
      setNewName('')
    }
  }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handlePersonFilterChange = (event) => {
    console.log(event.target.value)
    setNewPersonFilter(event.target.value)
  }

  const handlePersonDelete = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
      .deletePerson(id)
      .then( _ => {
          setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notification} />
        <Filter personFilter={personFilter} handlePersonFilterChange={handlePersonFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} handlePersonDelete={handlePersonDelete}/>
    </div>
  )
}

export default App