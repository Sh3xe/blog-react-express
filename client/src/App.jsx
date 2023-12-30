import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Header from "./components/Header"
import Search from "./pages/Search"
import UserSettings from "./pages/UserSettings"
import Blog from "./pages/Blog"
import Unknown from "./pages/Unknown"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Unknown />,
		children: [
			{
				path: "/login",
				element: <Login />
			}, {
				path: "/",
				element: <Search />
			}, {
				path: "/settings",
				element: <UserSettings />
			}, {
				path: "/blog/:id",
				element: <Blog />
		}]
	}
])

function Root() {
	return <div><Header /><Outlet /></div>
}

function App() {
	return <RouterProvider router={router} />
}

export default App