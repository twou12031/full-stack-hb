import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Togglable from './Toggle'

describe('Toggle Component', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv"></div>
            </Togglable>
        )
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('@start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const cancelBtn = component.getByText('cancel')
        fireEvent.click(cancelBtn)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})
