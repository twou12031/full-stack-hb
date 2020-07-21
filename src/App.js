import React, { useState, useEffect } from 'react'
import Note from './components/Note'

import axios from 'axios'



const App = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        console.log('@effect')

        axios
            .get('http://localhost:3001/notes')
            .then(res => {
                setNotes(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    console.log('render', notes.length, 'notes')

    return (
        <div>
            {
                notes.map( e => {
                    return (
                        <Note note={e} key={e.id}></Note>
                    )
                })
            }
        </div>
    )
}

export default App
