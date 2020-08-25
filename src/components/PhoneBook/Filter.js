import React from 'react'

const Filter = ({ filterPhone, filterHandler }) => {
    const changeHandler = ev => {
        ev.preventDefault()
        filterHandler(ev.target.value)
    }
    return (
        <form>
            <div>
                filter phone: <input value={filterPhone} onChange={changeHandler}/>
            </div>
        </form>
    )
}

export default Filter
