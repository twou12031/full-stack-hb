import React, { useState } from 'react'
import {   useDispatch } from 'react-redux'
import {  delPerson } from '../../redux/personReducer'

const Person = ({ person }) => {
    const dispatch = useDispatch()
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
                    dispatch(delPerson(person.id))
                }}>del</button>
            </li>
            <li style={showWhenVisible}>
                {person.name} {person.number}
                <button onClick={() => {
                    setVisible(false)
                }}>cancel</button>
                <button onClick={() => {
                    dispatch(delPerson(person.id))
                }}>del</button>
            </li>
        </div>
    )
}

export default Person
