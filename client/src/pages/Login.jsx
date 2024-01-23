
function Login() {

	
	const logUser = (event) => {
		event.preventDefault()
	}
	return <form onSubmit={logUser}>
		<input type="text" name="username" id="username" placeholder="Username"/>
		<input type="text" name="password" id="password" placeholder="Password"/>
		<button type="submit" >Login</button>
	</form>
}

export default Login