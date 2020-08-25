import React from 'react'

const Content = ({ data }) => {
    console.log(data)

    return (
        <p>{data.name} {data.exercises}</p>
    )
}

export default Content
