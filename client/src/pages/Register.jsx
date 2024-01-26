import {useState} from "react"

function Register() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	
	const logUser = (event) => {
		event.preventDefault()
		fetch("http://localhost:8080/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({username, email, password})
		})
	}

	const changeUsername = (event) => {
		setUsername(event.target.value)
	}

	const changePassword = (event) => {
		setPassword(event.target.value)
	}

	const changeEmail = (event) => {
		setEmail(event.target.value)
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
			name="email"
			placeholder="email"
			value={email}
			onChange={changeEmail}
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

export default Register