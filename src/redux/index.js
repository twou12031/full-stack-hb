import { createStore } from 'redux'
import personReducer from './personReducer'

const store = createStore(personReducer)

store.dispatch({
    type: 'NEW_PERSON',
    data: {
        name: 'abc redux test',
        number: 123213,
        id: 12321321
    }
})

export default store

