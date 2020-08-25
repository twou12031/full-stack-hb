import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.clickHandler}>{props.text}</button>
)

const Statistics = (props) => (
    <p>{props.name} {props.sum}</p>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const clickHandler = (key) => () => {
        switch (key) {
        case 'good':
            setGood(good + 1)
            break
        case 'neutral':
            setNeutral(neutral + 1)
            break
        case 'bad':
            setBad(bad + 1)
            break
        default:
            break
        }
    }

    const all = good + neutral + bad

    const average =  (good  - bad) === 0? 0: (good  - bad) / all

    const positive =  good === 0? 0: good / all * 100 + '%'

    return (
        <div>
            <h5>Feedback</h5>
            <Button text={'good'} clickHandler={clickHandler('good')}></Button>
            <Button text={'neutral'} clickHandler={clickHandler('neutral')}></Button>
            <Button text={'bad'} clickHandler={clickHandler('bad')}></Button>
            <h5>statistics</h5>
            {
                all ? (
                    <div>
                        <Statistics name={'good'} sum={good}></Statistics>
                        <Statistics name={'neutral'} sum={neutral}></Statistics>
                        <Statistics name={'bad'} sum={bad}></Statistics>
                        <Statistics name={'all'} sum={all}></Statistics>
                        <Statistics name={'average'} sum={average}></Statistics>
                        <Statistics name={'positive'} sum={positive}></Statistics>
                    </div>
                ) : (
                    <p>abc</p>
                )
            }
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
