import React, { useState } from 'react'
import Person from './components/PhoneBook/Person'
import PersonForm from './components/PhoneBook/PersonForm'
import Filter from './components/PhoneBook/Filter'

const App = () => {
    const [ persons, setPersons ] = useState([
            {
                id: 1,
                name: 'Arto Hellas',
                phone: '13133333333'
            },
            {
                id: 2,
                name: 'Ada Lovelace',
                phone: '39-44-5323523'
            },
            {
                id: 3,
                name: 'Dan Abramov',
                phone: '12-43-234345' },
            {
                id: 4,
                name: 'Mary Poppendieck',
                phone: '39-23-6423122'
            }
        ])
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')

    const [ filterPhone, setFilterPhone ] = useState('')

    const submitHandler = ev => {
        ev.preventDefault()

        const hasSame = persons.findIndex( e => {
            return e.name === newName
        }) !== -1

        if (hasSame) {
            alert(`${newName} has already added to the phonebook`)
            return
        }

        setPersons(persons.concat({
            id: persons.length + 1,
            name: newName,
            phone: newPhone
        }))
        setNewName('')
        setNewPhone('')
    }


    const needShow = filterPhone.length <= 0
        ? persons
        : persons.filter(e => {
            return e.phone.match(filterPhone)
        })

    const filterHandler = val => {
        console.log(val)
        setFilterPhone(val)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <PersonForm newName={newName}
                newPhone={newPhone}
                submitHandler={submitHandler}
                setNewName={(val) => {
                    setNewName(val)
                }}
                setNewPhone={(val) => {
                    setNewPhone(val)
                }}></PersonForm>
            <h2>Filter</h2>
            <Filter filterHandler={filterHandler}></Filter>
            <h2>Numbers</h2>
            {
                needShow.map( e => {
                    return (
                        <Person person={e} key={e.id}></Person>
                    )
                })
            }
        </div>
    )
}

export default App
