import React, { useState, useEffect } from 'react'
import PersonForm from './components/PhoneBook/PersonForm'
import Filter from './components/PhoneBook/Filter'
import Person from './components/PhoneBook/Person'

import axios from 'axios'




const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')

    const [ filterPhone, setFilterPhone ] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(res => {
                const { data } = res
                setPersons(data)
            })
    }, [])

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
