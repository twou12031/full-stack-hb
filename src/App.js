import React, { useState, useEffect } from 'react'
import Filter from './components/Countries/Filter'
import Results from './components/Countries/Results'

import axios from 'axios'

const App = () => {
    const [ countries, setCountries ] = useState([])

    const [ filterKey, setFilterKey ] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                const { data } = res
                data.forEach(e => {
                    e.__showAll = false
                })
                setCountries(data.slice(0,10))
            })
    }, [])


    const results = filterKey.length <= 0
        ? countries
        : countries.filter(e => {
            return e.name.match(filterKey)
        })

    const filterHandler = val => {
        setFilterKey(val)
    }

    const showAllHandler = item => {
        item.__showAll = !item.__showAll
        setCountries([...countries])
    }

    return (
        <div>
            <Filter filterHandler={filterHandler}></Filter>
            <h2>Results</h2>
            <Results results={results} showAllHandler={showAllHandler}></Results>
        </div>
    )
}

export default App
