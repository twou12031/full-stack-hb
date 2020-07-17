import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const randomSelect = () => {
        const newIndex = parseInt(Math.random() * anecdotes.length)
        setSelected(newIndex)
    }

    const reviewStyle = {
        height: '80px'
    }

    const [voteArray, setVote] = useState(anecdotes.map(e => 0))

    const voteOne = () => {
        const bus = [...voteArray]
        bus[selected] += 1
        setVote(bus)
    }

    const maxVote = voteArray.reduce((num1, num2) => {
        return num1 > num2 ? num1 : num2}
    )

    const mostPopularIndex = voteArray.findIndex(e => e === maxVote)

    return (
        <div>
            <h5>random</h5>
            <div style={reviewStyle}>
                {props.anecdotes[selected]}
            </div>
            <div>
                <button onClick={voteOne}>vote this one</button>
            </div>
            <div>
                <button onClick={randomSelect}>show next one</button>
            </div>
            <h5>most popular</h5>
            {
                maxVote > 0 ? (
                    <div style={reviewStyle}>
                        {props.anecdotes[mostPopularIndex]}
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
