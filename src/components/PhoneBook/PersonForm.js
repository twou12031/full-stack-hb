import React, { useState } from 'react'

const PersonForm = ({ createPerson }) => {

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const addPerson = ev => {
        ev.preventDefault()
        createPerson({
            newName,
            newNumber,
        })

        setNewName('')
        setNewNumber('')
    }

    const disableAddBtn = newName.length <= 0 || newNumber.length <= 0

    return (
        <div className="formDiv">
            <h2>Create a new Person</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={ev => {
                        setNewName(ev.target.value)
                    }}/>
                    <br/>
                    number: <input value={newNumber} onChange={ev => {
                        setNewNumber(ev.target.value)
                    }}/>
                </div>
                <div>
                    <button disabled={disableAddBtn} type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
