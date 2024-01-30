import { useState, useContext } from "react"
import {UserContext} from "../App"

function Login() {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errors, setErrors] = useState([])

	const [user, setUser] = useContext(UserContext)
	
	const logUser = (event) => {
		event.preventDefault()

		const formData = {username, password}

		fetch("http://localhost:8080/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		}).then( res => {
			res.json().then(res => {
				if(res.errors !== undefined) {
					setErrors(res.errors)
				}
				else {
					setUser(res)
				}
			}).catch(err => console.error(err))
		}).catch(err => console.error(err))
	}

	const changeUsername = (event) => {
		setUsername(event.target.value)
	}

	const changePassword = (event) => {
		setPassword(event.target.value)
	}

	return <>
		<form onSubmit={logUser}>
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
	<ul>
		{errors.map((err, i) => <li key={i}>{JSON.stringify(err)}</li>)}
	</ul>
	</>
}

export default Login