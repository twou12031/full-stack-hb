import React from 'react'

const Filter = ({filterPhone, filterHandler}) => {
    const changeHandler = ev => {
        filterHandler(ev.target.value)
    }
    return (
        <form>
            <div>
                filter Key: <input value={filterPhone} onChange={changeHandler}/>
            </div>
        </form>
    )
}

export default Filter
