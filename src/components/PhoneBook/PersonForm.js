import React from 'react'

const Filter = ({newName, setNewName, newPhone, setNewPhone, submitHandler}) => {
    const disableAddBtn = newName.length <= 0 || newPhone.length <= 0

    return (
        <form>
            <div>
                name: <input value={newName} onChange={ev => {
                    setNewName(ev.target.value)
                }}/>
                <br/>
                phone: <input value={newPhone} onChange={ev => {
                    setNewPhone(ev.target.value)
                }}/>
            </div>
            <div>
                <button disabled={disableAddBtn} type="submit" onClick={submitHandler}>add</button>
            </div>
        </form>
    )
}

export default Filter
