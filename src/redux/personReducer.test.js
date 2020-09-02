import personReducer  from './personReducer'

import deepFreeze from 'deep-freeze'

describe('personReducer', () => {
    test('returns new state with action NEW_PERSON', () => {
        const state = []
        const action = {
            type: 'NEW_PERSON',
            data: {
                name: 'haobaiTestJS',
                number: 4321,
                id: 2
            }
        }

        deepFreeze(state)
        const newPerson = personReducer(state, action)

        expect(newPerson).toHaveLength(1)
        expect(newPerson).toContainEqual(action.data)
    })
})
