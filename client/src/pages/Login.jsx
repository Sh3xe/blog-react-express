import { useState } from "react"

function Login() {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	
	const logUser = (event) => {
		event.preventDefault()
	}

	const changeUsername = (event) => {
		setUsername(event.target.value)
	}

	const changePassword = (event) => {
		setPassword(event.target.value)
	}

	return <form onSubmit={logUser}>
		<input
			type="text"
			name="username"
			placeholder="Username"
			value={username}
			onChange={changeUsername}
		/>
		<input
			type="text"
			name="password"
			placeholder="Password"
			value={password}
			onChange={changePassword}
		/>
		<button type="submit">Login</button>
	</form>
}

export default Login