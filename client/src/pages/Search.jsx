import { useState } from "react"

function Search() {
	const [posts, setPosts] = useState([])
	const [query, setQuery] = useState("")

	const changeQuery = (e) => {
		setQuery(e.target.value)
	}

	const sendQuery = (e) => {
		fetch("http://localhost:8080/post/query", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({query})
		}).then( res => {
			res.json()
				.then(res => setPosts(res))
				.catch(err => console.error(err))
		}).catch( err => console.error(err))
	}

	return <>
		<input type="text" calue={query} onChange={changeQuery}/>
		<button onClick={sendQuery}>Rechercher</button>
		<ul>
			{posts.map((post, i) => <li key={i}>{JSON.stringify(post)}</li>)}
		</ul>
	</>
}

export default Search