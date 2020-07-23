import React, { useState, useEffect } from 'react'
import PersonForm from './components/PhoneBook/PersonForm'
import Filter from './components/PhoneBook/Filter'
import Person from './components/PhoneBook/Person'

import personService from './services/person'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')

    const [ filterPhone, setFilterPhone ] = useState('')

    useEffect(() => {
        personService
           .getAll()
            .then(res => {
                setPersons(res)
            })
           .catch(err => {
               console.log(err)
            })
    }, [])

    const submitHandler = ev => {
        ev.preventDefault()

        const hasSame = persons.find( e => {
            return e.name === newName
        })

        if (hasSame) {
            personService
                .update(hasSame.id, {
                    ...hasSame,
                    phone: newPhone
                })
                .then(res => {
                    setPersons(persons.map(e => e.id === hasSame.id? res: e))
                    setNewName('')
                    setNewPhone('')
                })
               .catch(err => {
                   console.log(err)
                })
            return
        }

        const newPerson = {
            id: persons.length + 1,
            name: newName,
            phone: newPhone
        }

        personService
            .create(newPerson)
            .then(res => {
                setPersons(persons.concat(res))
                setNewName('')
                setNewPhone('')
            })
           .catch(err => {
               console.log(err)
            })
    }

    const delHandler = id => {
        const res = window.confirm('make sure del this?')

        if (!res) {
            return
        }

        personService
            .remove(id)
            .then(res => {
                if (typeof res === 'object') {
                    setPersons(persons.filter(e => e.id !== id))
                }
            })
           .catch(err => {
               console.log(err)
            })
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
                        <Person person={e} key={e.id} delHandler={delHandler}></Person>
                    )
                })
            }
            </div>
    )
}

export default App
