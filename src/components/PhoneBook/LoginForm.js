import React, { useState } from 'react'

const Login = ({ loginHandler }) => {


    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const disableAddBtn = username.length <= 0 || password.length <= 0

    const submitHandler = (ev) => {
        ev.preventDefault()
        loginHandler({
            username,
            password
        })
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={submitHandler}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button disabled={disableAddBtn} type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
