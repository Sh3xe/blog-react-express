import { NavLink } from "react-router-dom"
import { UserContext } from "../App"
import { useContext } from "react"

function Header() {
	const [user, setUser] = useContext(UserContext)

	const logout = (e) => {
		e.preventDefault()
		setUser(undefined)
	}
	
	return <nav>
		{ user !== undefined ? (
			<>
				<NavLink to="/settings">Settings</NavLink>
				<NavLink to="/">Home</NavLink>
				<a onClick={logout}>Logout</a>
			</>
		): (
			<>
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/register">Register</NavLink>
			</>
		)}
	</nav>
}

export default Header