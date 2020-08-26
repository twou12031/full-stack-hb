import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Person from './Person'

test('renders content', () => {
    const person = {
        name: 'abc',
        number: 13111112222
    }

    const mockHandler = jest.fn()

    const component = render(
        <Person person={person} delHandler={mockHandler}></Person>
    )

    // expect(component.container).toHaveTextContent(
    //     'abc'
    // )

    // component.debug()

    // const li = component.container.querySelector('li')

    // console.log(prettyDOM(li))

    const button = component.getAllByText('del')
    // console.log(button)
    fireEvent.click(button[0])

    expect(mockHandler.mock.calls).toHaveLength(1)
})
