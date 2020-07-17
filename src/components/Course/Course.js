import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
    const {name, parts} = course

    const total = parts.map(e => e.exercises).reduce((prev, cur) => {
        return cur + prev
    })

    return (
        <div>
            <Header name={name}></Header>
            {
                parts.map(e => (
                    <Content data={e} key={e.id}></Content>
                ))
            }
            <p>
                total&nbsp;{total}
            </p>
        </div>
    )
}

export default Course
