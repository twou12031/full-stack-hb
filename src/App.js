import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PhoneBook/PersonForm'
import LoginForm from './components/PhoneBook/LoginForm'
import Filter from './components/PhoneBook/Filter'
import Person from './components/PhoneBook/Person'
import Toggle from './components/PhoneBook/Toggle'

import personService from './services/person'
import loginService from './services/login'

import store from './redux'

const App = () => {
    const [ errMessage, setErrMessage ] = useState('')

    const [ persons, setPersons ] = useState([])

    const [ filterNumber, setFilterNumber ] = useState('')

    const [ user, setUser ] = useState(null)

    const personFormRef = useRef()

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

    const addPerson = async newPerson => {

        const { newName, newNumber } = newPerson
        try {
            const hasSame = persons.find( e => {
                return e.name === newName
            })

            if (hasSame) {
                const res = await personService.update(hasSame.id, {
                    ...hasSame,
                    number: newNumber
                })
                setPersons(persons.map(e => e.id === hasSame.id? res: e))
                return
            }

            const newPersonData = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            const res = await personService.create(newPersonData)
            setPersons([
                ...persons,
                res
            ])
            personFormRef.current.toggleVisibility()
        } catch (err) {
            console.log(err)
            alert('addNote failed')
        }
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
        ? store.getState()
        : store.getState().filter(e => {
            return e.number.toString().match(filterNumber)
        })

    const filterHandler = val => {
        setFilterNumber(val)
    }

    const handleLogin = async ({ username, password }) => {
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
        } catch (err) {
            console.log(err)
            setErrMessage('login failed')
            setTimeout(() => {
                setErrMessage(null)
            }, 5000)
        }
    }

    // <div>
    //     <div>
    //         {store.getState()}
    //     </div>
    //     <button
    //         onClick={() => store.dispatch({ type: 'INCREMENT' })}
    //     >
    //     plus
    //     </button>
    //     <button
    //         onClick={() => store.dispatch({ type: 'DECREMENT' })}
    //     >
    //     minus
    //     </button>
    //     <button
    //         onClick={() => store.dispatch({ type: 'ZERO' })}
    //     >
    //     zero
    //     </button>
    // </div>

    return (
        <div>
            <p>{errMessage}</p>
            <h1>Phonebook</h1>
            {
                user === null
                    ?
                    <Toggle buttonLabel="login">
                        <LoginForm
                            loginHandler={handleLogin}></LoginForm>
                    </Toggle>
                    :
                    <div>
                        <p>{user.name} logged-in</p>
                        {
                            <Toggle buttonLabel="new Person" ref={personFormRef}>
                                <PersonForm createPerson={addPerson}></PersonForm>
                            </Toggle>
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

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

store.subscribe(renderApp)

export default App
