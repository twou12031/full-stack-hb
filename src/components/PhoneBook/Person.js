import React, { useState } from 'react'

const Person = ({ person, delHandler }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <div className="person">
            <li style={hideWhenVisible}>
                {person.name}
                <button onClick={() => {
                    setVisible(true)
                }}>view</button>
                <button onClick={() => {
                    delHandler(person.id)
                }}>del</button>
            </li>
            <li style={showWhenVisible}>
                {person.name} {person.number}
                <button onClick={() => {
                    setVisible(false)
                }}>cancel</button>
                <button onClick={() => {
                    delHandler(person.id)
                }}>del</button>
            </li>
        </div>
    )
}

export default Person
