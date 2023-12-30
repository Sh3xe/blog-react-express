import { NavLink } from "react-router-dom";

function Header() {
	return <nav>
		<NavLink to="/">Home</NavLink>
		<NavLink to="/login">Login</NavLink>
		<NavLink to="/settings">Settings</NavLink>
	</nav>
}

export default Header;