import React from 'react'

const Login = ({username, setUsername, password, setPassword, submitHandler}) => {
    const disableAddBtn = username.length <= 0 || password.length <= 0

    return (
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
    )
}

export default Login
