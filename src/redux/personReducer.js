// import { createStore } from 'redux'
// const createStore = require('redux').createStore

// const counterReducer = (state = 0, action) => {
//     const { type } = action
//     switch (type) {
//     case 'INCREMENT':
//         return state + 1
//     case 'DECREMENT':
//         return state - 1
//     case 'ZERO':
//         return 0
//     default:
//         return state
//     }
// }

// const store = createStore(counterReducer)

// store.subscribe(() => {
//     const storeNow = store.getState()
//     console.log(storeNow)
// })

const personReducer = (state = [], action) => {
    const { type } = action
    switch (type) {
    case 'NEW_PERSON':
        return [...state, action.data]
    case 'CHANGE_NUMBER':
    {
        const { id } = action.data
        const needChangePerson = state.find(e => e.id === id)
        const changedPerson = {
            ...needChangePerson,
            id
        }
        return state.map(e => {
            return e.id !== id ? e : changedPerson
        })
    }
    case 'DEL_PERSON':
    {
        const { id } = action.data
        return state.filter(e => {
            return e.id !== id
        })
    }
    default:
        return state
    }
}

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const createPerson = (data) => {
    const { newName:name,newNumber:number } = data
    return {
        type: 'NEW_PERSON',
        data: {
            name,
            number,
            id: generateId()
        }
    }
}

export const delPerson = (id) => {
    return {
        type: 'DEL_PERSON',
        data: {
            id
        }
    }
}

export default personReducer
