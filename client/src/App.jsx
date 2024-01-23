import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Header from "./components/Header"
import Search from "./pages/Search"
import UserSettings from "./pages/UserSettings"
import Post from "./pages/Post"
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
				path: "/post/:id",
				element: <Post />
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