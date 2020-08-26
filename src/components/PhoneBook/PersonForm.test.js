import React from 'react'
import { render,fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PersonForm from './PersonForm'

test('<PersonForm/> updates parent state and calls onSubmit', () => {
    const createPerson = jest.fn()

    const component = render(
        <PersonForm createPerson={createPerson}></PersonForm>
    )

    const input = component.container.querySelectorAll('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input[0], {
        target: {
            value: 'abc'
        }
    })

    fireEvent.change(input[1], {
        target: {
            value: '13133332222'
        }
    })

    fireEvent.submit(form)

    expect(createPerson.mock.calls).toHaveLength(1)
    expect(createPerson.mock.calls[0][0].newName).toBe('abc')
})
