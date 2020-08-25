import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Country = ({ item, showDetail, showAllHandler }) => {
    const [ weather, setWeather ] = useState({})

    const weatherAPIKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${weatherAPIKey}&query=${item.name}`)
            .then(res => {
                const { data } = res
                setWeather(data.current || {})
            })
    }, [item.name, weatherAPIKey])

    const itemMask = {
        display: 'flex'
    }

    if (!showDetail) {
        return (
            <div style={itemMask}>
                <p>{item.name}</p>
                <button onClick={() => {
                    showAllHandler()
                }}>ShowAll</button>
            </div>
        )
    }

    let languagesKey = 0


    return (
        <div>
            <h3>
                {item.name}
            </h3>
            <p>
                capital {item.capital}
            </p>
            <p>
                population {item.population}
            </p>
            <h3>
                languages
            </h3>
            <ul>
                {
                    item.languages.map(e => {
                        return (
                            <li key={languagesKey++}>{e.name}</li>
                        )
                    })
                }
            </ul>
            <img src={item.flag} alt="" width="200px"></img>
            <h3>weather in {item.capital}</h3>
            <p>
                temperature: {weather.temperature}
            </p>
            <img src={weather.weather_icons? weather.weather_icons[0]: ''} alt="" width="50px"></img>
            <p>
                wind: {weather.wind_speed} mph direction {weather.wind_dir}
            </p>
        </div>
    )
}

export default Country
