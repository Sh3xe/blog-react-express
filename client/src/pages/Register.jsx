import {useState, useContext} from "react"

import {UserContext} from "../App"

function Register() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const [errors, setErrors] = useState(["bonjour"])
	
	const [user, setUser] = useContext(UserContext)

	const logUser = (event) => {
		event.preventDefault()
		fetch("http://localhost:8080/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({username, email, password})
		}).then( res => {
			res.json().then(res => {
				if(res.errors) {
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

	const changeEmail = (event) => {
		setEmail(event.target.value)
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
	<ul>
		{errors.map((err, i) => <li key={i}>{JSON.stringify(err)}</li>)}
	</ul>
	</>
}

export default Register