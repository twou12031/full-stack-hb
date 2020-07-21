import React from 'react'
import Country from './Country'

const Results = ({results, showAllHandler}) => {
    if (results.length <= 0) {
        return (
            <p>nothing has finded</p>
        )
    }

    if (results.length > 10) {
        return (
            <p>type more word</p>
        )
    }

    if (results.length > 1) {
        return (
            results.map( e => {
                return (
                    <Country
                        item={e}
                        showDetail={e.__showAll}
                        key={e.numericCode}
                        showAllHandler={showAllHandler}></Country>
                )
            })
        )
    }

    const justOne = results[0]

    return (
        <Country item={justOne} showDetail={true}></Country>
    )
}

export default Results
