import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)

    const [newNote, setNewNote] = useState('')

    const [showAll, setShowAll] = useState(true)

    const inputChangeHandler = event => {
        console.log('@input change')
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const addNote = event => {
        event.preventDefault()
        const newNoteData = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random < 0.5
        }
        setNotes(notes.concat(newNoteData))
        setNewNote('')
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(e => e.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={()=>{
                    setShowAll(!showAll)
                }}>
                    查看{showAll ? '重要': '全部'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input placeholder="a new note..." value={newNote} onChange={inputChangeHandler}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
