import React, { useState, useEffect } from 'react'
import PersonForm from './components/PhoneBook/PersonForm'
import LoginForm from './components/PhoneBook/LoginForm'
import Filter from './components/PhoneBook/Filter'
import Person from './components/PhoneBook/Person'

import personService from './services/person'
import loginService from './services/login'

const App = () => {
    const [ errMessage, setErrMessage ] = useState('')

    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const [ filterNumber, setFilterNumber ] = useState('')

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ user, setUser ] = useState(null)

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

    useEffect(() => {
        const userJSON = window.localStorage.getItem('user')
        if (userJSON) {
          const user = JSON.parse(userJSON)
          setUser(user)
          personService.setToken(user.token)
        }
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
                    number: newNumber
                })
                .then(res => {
                    setPersons(persons.map(e => e.id === hasSame.id? res: e))
                    setNewName('')
                    setNewNumber('')
                })
               .catch(err => {
                   console.log(err)
                })
            return
        }

        const newPerson = {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        }

        personService
            .create(newPerson)
            .then(res => {
                setPersons(persons.concat(res))
                setNewName('')
                setNewNumber('')
            })
           .catch(err => {
                console.log(err.response.data)
                const { data } = err.response
                alert(data.err.toString())
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

    const needShow = filterNumber.length <= 0
        ? persons
        : persons.filter(e => {
            return e.number.toString().match(filterNumber)
        })

    const filterHandler = val => {
        setFilterNumber(val)
    }

    const handleLogin = async (ev) => {
        ev.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem(
                'user', JSON.stringify(user)
            )
            personService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (err) {
            console.log(err)
            setErrMessage('login failed')
            setTimeout(() => {
                setErrMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <p>{errMessage}</p>
            <h2>Phonebook</h2>
            {
                user === null
                ?
                    <LoginForm username={username}
                        password={password}
                        submitHandler={handleLogin}
                        setUsername={(val) => {
                            setUsername(val)
                        }}
                        setPassword={(val) => {
                            setPassword(val)
                        }}></LoginForm>
                :
                    <div>
                        <p>{user.name} logged-in</p>
                        {
                            <PersonForm newName={newName}
                                newNumber={newNumber}
                                submitHandler={submitHandler}
                                setNewName={(val) => {
                                    setNewName(val)
                                }}
                                setNewNumber={(val) => {
                                    setNewNumber(val)
                                }}></PersonForm>
                        }
                    </div>
            }
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
