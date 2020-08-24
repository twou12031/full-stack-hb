import React from 'react'

const Filter = ({newName, setNewName, newNumber, setNewNumber, submitHandler}) => {
    const disableAddBtn = newName.length <= 0 || newNumber.length <= 0

    return (
        <form>
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
                <button disabled={disableAddBtn} type="submit" onClick={submitHandler}>add</button>
            </div>
        </form>
    )
}

export default Filter
