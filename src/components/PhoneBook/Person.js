import React from 'react'

const Person = ({person, delHandler}) => (
    <li>{person.name} {person.number} <button onClick={() => {
        delHandler(person.id)
    }}>del</button></li>
)

export default Person
