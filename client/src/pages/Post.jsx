import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Post() {

	const [post, setPost] = useState({})
	const {id} = useParams()

	useEffect(() => {
		fetch(`http://localhost:8080/post/${id}`)
			.then(res => res.json().then( setPost )
			).catch( err => console.error(err))
	}, [])

	return <p>
		{JSON.stringify(post)}
	</p>
}

export default Post