import React from 'react'

const Person = ({person, delHandler}) => (
    <li>{person.name} {person.phone} <button onClick={() => {
        delHandler(person.id)
    }}>del</button></li>
)

export default Person
